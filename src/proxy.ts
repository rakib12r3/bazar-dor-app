import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
import toast from 'react-hot-toast'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

const user = session?.user

if(!user){
 
  const url = new URL("/signin", request.url);
  url.searchParams.set("message", "login-required");
  url.searchParams.set("callbackURL", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}
return NextResponse.next();
}
 
export const config = {
  matcher: ["/profile","/product/:path*"],
}