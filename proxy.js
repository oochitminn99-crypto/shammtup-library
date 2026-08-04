import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "./lib/route";


export async function proxy(request) {
    const { NextUrl } = request;
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const isPublicRoute = ((PUBLIC_ROUTES.find(route =>NextUrl.pathname.startsWith(route)) || NextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route =>NextUrl.pathname.includes(route)));

    if(!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, NextUrl));
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc) (.*)"],
}