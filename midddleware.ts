// middleware.ts
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: any, event: any) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  // 1. Redirect logged-in users away from the login/register pages
  if ((pathname === "/sign-in" || pathname === "/sign-up") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2. Allow public assets and API paths to bypass middleware completely
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") || 
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  // 3. Fallback to standard NextAuth behavior for protected routes
  const authMiddleware = withAuth({
    pages: { signIn: "/sign-in" }
  });
  
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
