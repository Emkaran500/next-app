import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (session?.email) {
        if (isAuthPage) {
            return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = { matcher: ["/((?!api|public|.*\\..*).*)",] };