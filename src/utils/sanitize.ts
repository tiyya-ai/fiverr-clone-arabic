import DOMPurify from 'isomorphic-dompurify'

// Input sanitization utility
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  
  // Remove potential XSS patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim()
}

// HTML sanitization for rich content
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return ''
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li'],
    ALLOWED_ATTR: []
  })
}

// Log sanitization to prevent log injection
export function sanitizeForLog(input: any): string {
  if (typeof input !== 'string') {
    input = JSON.stringify(input)
  }
  
  return input
    .replace(/[\r\n]/g, ' ')
    .replace(/\t/g, ' ')
    .substring(0, 1000) // Limit length
}

// URL parameter sanitization
export function sanitizeUrlParam(param: string): string {
  if (!param || typeof param !== 'string') return ''
  
  return encodeURIComponent(param.trim())
}