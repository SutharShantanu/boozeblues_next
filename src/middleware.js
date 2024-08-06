import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;
    if (
        token &&
        (url.pathname.startsWith("/login") ||
            url.pathname.startsWith("/signup") ||
            url.pathname === "/")
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/signup", "/", "/dashboard/:path*"],
};
