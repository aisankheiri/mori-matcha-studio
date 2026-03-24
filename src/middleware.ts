import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminLogin = pathname.startsWith("/admin-login");
  const isAdminLoginApi = pathname.startsWith("/api/admin/login");

  if (isAdminLogin || isAdminLoginApi) {
    return NextResponse.next();
  }

  if (isAdminPage || isAdminApi) {
    const adminAuth = request.cookies.get("admin_auth")?.value;

    if (adminAuth !== "ok") {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};