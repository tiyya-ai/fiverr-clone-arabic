import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

    if (isAdminPage && token?.userType !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/services',
          '/categories',
          '/contact',
          '/help',
          '/faq',
          '/terms',
          '/privacy',
          '/guarantee'
        ]
        
        // Protected routes that require authentication
        const protectedRoutes = [
          '/client-dashboard',
          '/user-dashboard', 
          '/dashboard',
          '/orders',
          '/messages',
          '/favorites',
          '/profile',
          '/settings'
        ]
        
        if (pathname.startsWith('/api/auth')) return true
        if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) return true
        if (pathname.startsWith('/auth')) return !token
        if (pathname.startsWith('/admin')) return token?.userType === 'ADMIN'
        if (protectedRoutes.some(route => pathname.startsWith(route))) return !!token
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ]
}