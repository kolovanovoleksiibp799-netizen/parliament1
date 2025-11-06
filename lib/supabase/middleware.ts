import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_parliamentSUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_parliamentSUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase credentials are missing, skip middleware for public pages
  if (!supabaseUrl || !supabaseAnonKey) {
    // Allow public pages to load without authentication
    if (!request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next({ request })
    }
    // Redirect admin/auth pages to login
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Redirect unauthenticated users to login if accessing protected admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && !user && !request.nextUrl.pathname.startsWith("/auth")) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.error("Supabase middleware error:", error)
    // Allow public pages to work even if Supabase fails
    if (!request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next({ request })
    }
    // For protected routes, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }
}
