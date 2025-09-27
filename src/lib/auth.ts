import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان')
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            throw new Error('البريد الإلكتروني غير مسجل')
          }

          if (!user.password) {
            throw new Error('هذا الحساب مسجل عبر وسائل التواصل الاجتماعي')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('كلمة المرور غير صحيحة')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            image: user.avatar,
            username: user.username,
            userType: user.userType,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          throw error
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.username = user.username
        token.userType = user.userType
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.userType = token.userType as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for OAuth
            await prisma.user.create({
              data: {
                email: user.email!,
                password: '', // OAuth users don't need password
                fullName: user.name!,
                username: user.email!.split('@')[0],
                location: 'السعودية',
                avatar: user.image,
                isVerified: true,
                userType: 'BUYER',
                isOnline: true,
                lastSeen: new Date(),
                memberSince: new Date().getFullYear().toString(),
              }
            })
          }
          return true
        } catch (error) {
          console.error('Error during OAuth sign in:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions