import { NextRequest, NextResponse } from 'next/server'
import { sanitizeInput } from '@/utils/sanitize'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map()

export function rateLimit(req: NextRequest, limit = 100, windowMs = 15 * 60 * 1000) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const key = `${ip}:${req.nextUrl.pathname}`
  
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, [])
  }
  
  const requests = rateLimitStore.get(key)
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    return false
  }
  
  validRequests.push(now)
  rateLimitStore.set(key, validRequests)
  
  return true
}

export function validateInput(data: any): { isValid: boolean; sanitized?: any; errors?: string[] } {
  const errors: string[] = []
  const sanitized: any = {}
  
  if (typeof data !== 'object' || data === null) {
    return { isValid: false, errors: ['Invalid data format'] }
  }
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const sanitizedValue = sanitizeInput(value)
      if (sanitizedValue !== value) {
        errors.push(`Invalid characters in ${key}`)
      }
      sanitized[key] = sanitizedValue
    } else {
      sanitized[key] = value
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors: errors.length > 0 ? errors : undefined
  }
}

export function securityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}