'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  id?: string
  email?: string | null
  name?: string | null
  image?: string | null
  username?: string
  userType?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  userType?: string
  country?: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResult>
  register: (userData: RegisterData) => Promise<AuthResult>
  logout: () => Promise<void>
  loginWithProvider: (provider: string) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    if (!credentials?.email || !credentials?.password) {
      return { success: false, error: 'Email and password are required' }
    }
    
    try {
      setLoading(true)
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<AuthResult> => {
    if (!userData?.email || !userData?.password || !userData?.firstName) {
      return { success: false, error: 'Required fields are missing' }
    }
    
    try {
      setLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          fullName: `${userData.firstName} ${userData.lastName}`,
          phone: userData.phone,
          location: userData.country || 'السعودية',
          userType: userData.userType?.toUpperCase() || 'BUYER',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' }
      }

      // Auto login after successful registration
      const loginResult = await login({
        email: userData.email,
        password: userData.password,
      })

      return loginResult
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const loginWithProvider = async (provider: string): Promise<void> => {
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error(`${provider} login error:`, error)
    }
  }

  const value: AuthContextType = {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    loading: loading || status === 'loading',
    login,
    register,
    logout,
    loginWithProvider,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext