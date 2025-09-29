import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    
    // If user is not authenticated and trying to access protected route
    if (!req.nextauth.token && !pathname.startsWith('/api/')) {
      // Redirect to login page with callback URL
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Allow the request to continue
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
