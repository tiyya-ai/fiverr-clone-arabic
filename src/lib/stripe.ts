import Stripe from 'stripe'
import { prisma } from './prisma'
import { Order, User, Service } from '@prisma/client'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Create payment intent for order
export async function createPaymentIntent(
  orderId: string,
  amount: number,
  currency: string = 'sar'
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        orderId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

// Create Stripe customer
export async function createStripeCustomer(user: User) {
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.fullName,
      metadata: {
        userId: user.id,
      },
    })

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    })

    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}

// Create connected account for sellers
export async function createConnectedAccount(user: User) {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'SA', // Saudi Arabia
      email: user.email,
      metadata: {
        userId: user.id,
      },
    })

    // Update user with Stripe account ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeAccountId: account.id },
    })

    return account
  } catch (error) {
    console.error('Error creating connected account:', error)
    throw error
  }
}

// Create account link for onboarding
export async function createAccountLink(accountId: string, userId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/onboarding?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/dashboard?setup=complete`,
      type: 'account_onboarding',
    })

    return accountLink
  } catch (error) {
    console.error('Error creating account link:', error)
    throw error
  }
}

// Process payment and transfer to seller
export async function processOrderPayment(
  order: Order & { service: Service; buyer: User; seller: User }
) {
  try {
    const platformFeePercent = 0.05 // 5% platform fee
    const totalAmount = order.totalAmount * 100 // Convert to cents
    const platformFee = Math.round(totalAmount * platformFeePercent)
    const sellerAmount = totalAmount - platformFee

    // Create payment intent with application fee
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'sar',
      application_fee_amount: platformFee,
      transfer_data: {
        destination: order.seller.stripeAccountId!,
      },
      metadata: {
        orderId: order.id,
        buyerId: order.buyer.id,
        sellerId: order.seller.id,
        serviceId: order.service.id,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error('Error processing order payment:', error)
    throw error
  }
}

// Handle successful payment
export async function handleSuccessfulPayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const orderId = paymentIntent.metadata.orderId

    if (!orderId) {
      throw new Error('Order ID not found in payment intent metadata')
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'ACTIVE',
        paymentIntentId,
        paidAt: new Date(),
      },
      include: {
        service: true,
        buyer: true,
        seller: true,
      },
    })

    return updatedOrder
  } catch (error) {
    console.error('Error handling successful payment:', error)
    throw error
  }
}

// Create refund
export async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: string
) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: reason as Stripe.RefundCreateParams.Reason,
    })

    return refund
  } catch (error) {
    console.error('Error creating refund:', error)
    throw error
  }
}

// Get account balance
export async function getAccountBalance(accountId: string) {
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: accountId,
    })

    return balance
  } catch (error) {
    console.error('Error getting account balance:', error)
    throw error
  }
}

// Create payout
export async function createPayout(
  accountId: string,
  amount: number,
  currency: string = 'sar'
) {
  try {
    const payout = await stripe.payouts.create(
      {
        amount: Math.round(amount * 100),
        currency,
      },
      {
        stripeAccount: accountId,
      }
    )

    return payout
  } catch (error) {
    console.error('Error creating payout:', error)
    throw error
  }
}

// Verify webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    return event
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw error
  }
}

// Handle webhook events
export async function handleWebhookEvent(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handleSuccessfulPayment(paymentIntent.id)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        const orderId = failedPayment.metadata.orderId
        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
          })
        }
        break

      case 'account.updated':
        const account = event.data.object as Stripe.Account
        const userId = account.metadata?.userId
        if (userId && account.charges_enabled) {
          await prisma.user.update({
            where: { id: userId },
            data: { stripeOnboardingComplete: true },
          })
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error handling webhook event:', error)
    throw error
  }
}

// Calculate platform fees
export function calculateFees(amount: number) {
  const platformFeePercent = 0.05 // 5%
  const stripeFeePercent = 0.029 // 2.9%
  const stripeFeeFixed = 0.30 // 30 cents
  
  const platformFee = amount * platformFeePercent
  const stripeFee = (amount * stripeFeePercent) + stripeFeeFixed
  const sellerAmount = amount - platformFee - stripeFee
  
  return {
    totalAmount: amount,
    platformFee,
    stripeFee,
    sellerAmount,
    platformFeePercent,
    stripeFeePercent
  }
}