// 📄 src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// 🟢 PERBAIKAN: Ambil langsung dari file menus murni (Bebas dari kontaminasi ioredis)
import { ALL_MENUS } from '@/components/layout/sidebar/sidebar.menus'; 

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/login' || 
    pathname === '/unauthorized' || 
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  const matchingMenu = ALL_MENUS.find((menu) => pathname.startsWith(menu.href));

  if (matchingMenu && matchingMenu.roles) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback_secret_lokal_sementara'
      );
      const { payload } = await jwtVerify(token, secret);
      
      const userRole = (payload.role as string)?.toUpperCase();
      const isAuthorized = matchingMenu.roles.some((menuRole) => menuRole === userRole);

      if (!userRole || !isAuthorized) {
        console.log(`🔒 Akses ditolak! Role [${userRole}] dilarang membuka [${pathname}]`);
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

    } catch (error) {
      console.error('❌ Middleware JWT validation error:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};