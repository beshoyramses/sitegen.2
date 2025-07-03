import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifiySession } from "@/lib/session"; 

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (pathname.startsWith("/dashboard")) {
    const session = await verifiySession().catch(() => null);


    if (!session) {
      const loginUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next(); 
}
