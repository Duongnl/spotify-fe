// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionId } from "./utils/session-store";

export async function middleware(request: NextRequest) {
  const sessionId = getSessionId();
  const pathname = request.nextUrl.pathname;

  // Loại trừ route /login và / khỏi kiểm tra session
  if (pathname === "/login" || pathname === "/" || pathname ==='/signup') {
    // Nếu đã đăng nhập và cố truy cập /login, chuyển hướng về /
    if (sessionId && pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Bỏ qua kiểm tra cho /login và /
  }

  // Các route bảo vệ (yêu cầu đăng nhập)
  const protectedRoutes = [
    "/track",
    "/artist",
    "/user",
    "/playlist",
    "/account",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Nếu không có sessionId và truy cập route bảo vệ, chuyển hướng đến /login
  if (!sessionId && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Cấu hình route để áp dụng middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};