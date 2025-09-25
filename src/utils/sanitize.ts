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
  
  // Simple HTML sanitization without DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, (match) => {
      // Allow only safe tags
      const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']
      const tagMatch = match.match(/<\/?(\w+)/)
      if (tagMatch && allowedTags.includes(tagMatch[1].toLowerCase())) {
        return match
      }
      return ''
    })
}

// Log sanitization to prevent log injection
export function sanitizeForLog(input: any): string {
  if (typeof input !== 'string') {
    try {
      // Handle circular references and complex objects
      input = JSON.stringify(input, (key, value) => {
        // Handle circular references
        if (typeof value === 'object' && value !== null) {
          if (value.constructor && value.constructor.name) {
            return `[${value.constructor.name}]`
          }
          // Limit object depth to prevent circular references
          return value
        }
        return value
      })
    } catch (error) {
      // Fallback to string conversion if JSON.stringify fails
      input = String(input).replace(/\[object \w+\]/g, '[Object]')
    }
  }
  
  return String(input)
    .replace(/[\r\n]/g, ' ')
    .replace(/\t/g, ' ')
    .substring(0, 1000) // Limit length
}

// URL parameter sanitization
export function sanitizeUrlParam(param: string): string {
  if (!param || typeof param !== 'string') return ''
  
  return encodeURIComponent(param.trim())
}