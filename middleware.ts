import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    
    // Handle post-authentication redirects
    if (token) {
      const isNewUser = (token as any)?.isNewUser
      
      // If user is trying to access sign-in or sign-up pages while authenticated
      if (pathname === '/auth/signin' || pathname === '/signup') {
        if (isNewUser) {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        } else {
          return NextResponse.redirect(new URL('/', req.url))
        }
      }
      
      // If user is trying to access dashboard, check if they're new
      if (pathname === '/dashboard' && !isNewUser) {
        // Returning users might want to go to dashboard, so allow it
        return NextResponse.next()
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/auth/signin',
          '/signup',
          '/login'
        ]
        
        // Check if the current path is a public route
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith('/api/')
        )
        
        // If it's a public route, allow access
        if (isPublicRoute) {
          return true
        }
        
        // For all other routes, require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
