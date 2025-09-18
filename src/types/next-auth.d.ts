import { UserType } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      username?: string
      userType?: UserType
    }
  }

  interface User {
    id: string
    username?: string
    userType?: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username?: string
    userType?: UserType
  }
}