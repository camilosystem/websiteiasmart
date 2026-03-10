import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'iasmart_admin_session'
const SESSION_VALUE = 'authenticated'

const PROTECTED_PATHS = ['/editor']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  )

  if (!isProtected) return NextResponse.next()

  const session = request.cookies.get(SESSION_COOKIE)

  if (session?.value === SESSION_VALUE) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/editor', '/editor/:path*'],
}
