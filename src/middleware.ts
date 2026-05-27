import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { proxy } from '@/proxy'

const PROTECTED = ['/admin', '/dashboard/bodega', '/dashboard/viajero']

function isProtected(pathname: string): boolean {
  const plain = pathname.replace(/^\/(en|ca)/, '') || '/'
  return PROTECTED.some(p => plain === p || plain.startsWith(p + '/'))
}

function localeSegment(pathname: string): string {
  if (pathname.startsWith('/en/') || pathname === '/en') return '/en'
  if (pathname.startsWith('/ca/') || pathname === '/ca') return '/ca'
  return ''
}

export async function middleware(request: NextRequest) {
  type CookieItem = { name: string; value: string; options?: Record<string, unknown> }
  const cookieBuffer: CookieItem[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieBuffer.push({ name, value, options: options as Record<string, unknown> | undefined })
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (isProtected(pathname) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = `${localeSegment(pathname)}/auth/login`
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  const response = proxy(request)

  cookieBuffer.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options)
  })

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|auth/callback).*)',
  ],
}
