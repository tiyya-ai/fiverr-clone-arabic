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
        
        if (pathname.startsWith('/api/auth')) return true
        if (pathname === '/' || pathname.startsWith('/services')) return true
        if (pathname.startsWith('/auth')) return !token
        if (pathname.startsWith('/admin')) return token?.userType === 'ADMIN'
        
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}