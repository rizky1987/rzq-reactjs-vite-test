import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
      // Hapus token dari Redis
      await redis.del(`token:${token}`);
    }

    // Bersihkan cookie di browser client
    const response = NextResponse.json({ message: 'Logout sukses' }, { status: 200 });
    response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}