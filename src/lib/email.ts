import nodemailer from 'nodemailer'
import { Order, User, Service } from '@prisma/client'

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
})

// Email templates
const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'مرحباً بك في منصة خدمات - 5admat',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">مرحباً بك في خدمات</h1>
          <p style="color: #666; font-size: 16px;">منصة الخدمات العربية المهنية</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e40af; margin-bottom: 15px;">أهلاً ${name}!</h2>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
            نحن سعداء لانضمامك إلى منصة خدمات، المنصة العربية الرائدة لتقديم وطلب الخدمات المهنية.
          </p>
          <p style="color: #374151; line-height: 1.6;">
            يمكنك الآن البدء في استكشاف الخدمات المتاحة أو تقديم خدماتك الخاصة للعملاء.
          </p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e40af; margin-bottom: 15px;">الخطوات التالية:</h3>
          <ul style="color: #374151; line-height: 1.8;">
            <li>أكمل ملفك الشخصي لزيادة الثقة</li>
            <li>استكشف الخدمات المتاحة في منطقتك</li>
            <li>ابدأ في تقديم خدماتك إذا كنت مقدم خدمة</li>
            <li>تواصل مع مقدمي الخدمات بسهولة</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
             style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            ابدأ الآن
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>شكراً لاختيارك منصة خدمات</p>
          <p>فريق خدمات</p>
        </div>
      </div>
    `
  }),

  orderConfirmation: (order: Order & { service: Service; buyer: User; seller: User }) => ({
    subject: `تأكيد الطلب #${order.id.substring(0, 8)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #059669; margin-bottom: 10px;">تم تأكيد طلبك</h1>
          <p style="color: #666; font-size: 16px;">رقم الطلب: #${order.id.substring(0, 8)}</p>
        </div>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-right: 4px solid #059669;">
          <h2 style="color: #065f46; margin-bottom: 15px;">تفاصيل الطلب</h2>
          <p><strong>الخدمة:</strong> ${order.service.title}</p>
          <p><strong>مقدم الخدمة:</strong> ${order.seller.fullName}</p>
          <p><strong>السعر:</strong> ${order.totalAmount} ريال</p>
          <p><strong>تاريخ التسليم المتوقع:</strong> ${new Date(order.deliveryDate).toLocaleDateString('ar-SA')}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e40af; margin-bottom: 15px;">الخطوات التالية:</h3>
          <ul style="color: #374151; line-height: 1.8;">
            <li>سيتواصل معك مقدم الخدمة قريباً</li>
            <li>يمكنك متابعة حالة الطلب من لوحة التحكم</li>
            <li>ستصلك إشعارات عند تحديث حالة الطلب</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}" 
             style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            عرض الطلب
          </a>
        </div>
      </div>
    `
  }),

  orderStatusUpdate: (order: Order & { service: Service; buyer: User }, status: string) => ({
    subject: `تحديث حالة الطلب #${order.id.substring(0, 8)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">تحديث حالة الطلب</h1>
          <p style="color: #666; font-size: 16px;">رقم الطلب: #${order.id.substring(0, 8)}</p>
        </div>
        
        <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-right: 4px solid #2563eb;">
          <h2 style="color: #1e40af; margin-bottom: 15px;">الحالة الجديدة: ${getStatusInArabic(status)}</h2>
          <p><strong>الخدمة:</strong> ${order.service.title}</p>
          <p><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-SA')}</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}" 
             style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            عرض تفاصيل الطلب
          </a>
        </div>
      </div>
    `
  }),

  newMessage: (senderName: string, message: string, conversationId: string) => ({
    subject: `رسالة جديدة من ${senderName}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">رسالة جديدة</h1>
          <p style="color: #666; font-size: 16px;">من: ${senderName}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #374151; line-height: 1.6;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/messages/${conversationId}" 
             style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            عرض الرسالة
          </a>
        </div>
      </div>
    `
  })
}

function getStatusInArabic(status: string): string {
  const statusMap: { [key: string]: string } = {
    'PENDING': 'في الانتظار',
    'ACCEPTED': 'مقبول',
    'IN_PROGRESS': 'قيد التنفيذ',
    'DELIVERED': 'تم التسليم',
    'COMPLETED': 'مكتمل',
    'CANCELLED': 'ملغي',
    'DISPUTED': 'متنازع عليه'
  }
  return statusMap[status] || status
}

// Email sending functions
export async function sendWelcomeEmail(email: string, name: string) {
  const template = emailTemplates.welcome(name)
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: template.subject,
    html: template.html
  })
}

export async function sendOrderConfirmationEmail(order: Order & { service: Service; buyer: User; seller: User }) {
  const template = emailTemplates.orderConfirmation(order)
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: order.buyer.email,
    subject: template.subject,
    html: template.html
  })
}

export async function sendOrderStatusUpdateEmail(
  order: Order & { service: Service; buyer: User },
  status: string
) {
  const template = emailTemplates.orderStatusUpdate(order, status)
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: order.buyer.email,
    subject: template.subject,
    html: template.html
  })
}

export async function sendNewMessageEmail(
  recipientEmail: string,
  senderName: string,
  message: string,
  conversationId: string
) {
  const template = emailTemplates.newMessage(senderName, message, conversationId)
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: recipientEmail,
    subject: template.subject,
    html: template.html
  })
}

// Generic email sending function
export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html
  })
}

// Verify email configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('Email configuration is valid')
    return true
  } catch (error) {
    console.error('Email configuration error:', error)
    return false
  }
}