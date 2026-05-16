import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { menus } from '@/components/layout/sidebar/sidebar.actions'; 

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Cari tahu apakah URL yang sedang dibuka user terdaftar di config menu kita
  // Menggunakan startsWith agar sub-route seperti /dashboard/settings tetap ikut kecocok
  const matchingMenu = menus.find((menu) => pathname.startsWith(menu.href));

  // 2. Jika rute tersebut memiliki batasan roles, kita lakukan proteksi
  if (matchingMenu && matchingMenu.roles) {
    const token = request.cookies.get('auth_token')?.value;

    // Jika butuh role tapi token tidak ada, langsung tendang ke /login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 3. Verifikasi token JWT
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback_secret_lokal_sementara'
      );
      const { payload } = await jwtVerify(token, secret);
      
      const userRole = (payload.role as string)?.toUpperCase();

      if (!userRole || !matchingMenu.roles.includes(userRole as any)) {
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

/*
|--------------------------------------------------------------------------
| CONFIG MATCHMENT MIDDLEWARE
|--------------------------------------------------------------------------
*/
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|unauthorized|login).*)',
  ],
};