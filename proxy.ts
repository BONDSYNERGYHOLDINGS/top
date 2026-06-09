import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, getTokenFromRequest } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
    const session = await verifyAdminToken(token);
    if (!session) return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };