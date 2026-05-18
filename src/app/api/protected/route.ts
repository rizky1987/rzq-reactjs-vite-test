import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Akses ditolak, token tidak ditemukan' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string };

    const isTokenActive = await redis.get(`token:${token}`);
    if (!isTokenActive) {
      return NextResponse.json({ error: 'Sesi Anda telah berakhir (Token Invalid)' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Akses diterima! Data rahasia berhasil dimuat.',
      secretData: [
        { id: 1, project: 'Project Alpha Rocket', budget: '$2,000,000' },
        { id: 2, project: 'Project Beta Cyber', budget: '$1,500,000' }
      ],
      user: decoded
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Token kadaluwarsa atau tidak valid' }, { status: 401 });
  }
}