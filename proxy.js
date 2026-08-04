import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";

const { auth } =withAuth();
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "./lib/route";


export async function proxy(request) {
    const { NextURL } = request;
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const isPublicRoute = ((PUBLIC_ROUTES.find(route =>NextURL.pathname.startsWith(route)) || NextURL.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route =>NextURL.pathname.includes(route)));

    if(!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, NextURL));
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc) (.*)"],
}