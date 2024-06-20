import { NextRequest, NextResponse } from "next/server";
import { EnumToken } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { url, cookies } = req;
  const refreshToken = cookies.get(EnumToken.REFRESH_TOKEN)?.value;
  const isAuthPage = url.includes("/auth");

  switch (true) {
    case !!isAuthPage && !!refreshToken:
      return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
    case !!isAuthPage:
      return NextResponse.next();
    case !refreshToken:
      return NextResponse.redirect(new URL("/auth", req.url));
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/i/:path*", "/auth/:path"],
};
