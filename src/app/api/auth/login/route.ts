import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validasi input dasar untuk mencegah query kosong ke DB
    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    // 1. Cari user di PostgreSQL
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    // 2. Cek kecocokan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_lokal_sementara';
    
    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ Peringatan: JWT_SECRET belum dikonfigurasi di file .env!");
    }

    // 3. Buat JWT Token (Masa berlaku 1 jam)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role : user.role },
      secret,
      { expiresIn: '1h' }
    );

    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    // 4. Simpan ke Redis (Pastikan server Redis kamu sudah running!)
    await redis.set(`session:${token}`, JSON.stringify(sessionData), 'EX', 3600);

    // 5. Kembalikan response berupa HTTP-Only Cookie
    const response = NextResponse.json(
      { message: 'Login Berhasil', user: { name: user.name, email: user.email, role : user.role } },
      { status: 200 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    // 💡 Intip terminal server kamu, pesan aslinya pasti tertangkap di sini
    console.error('🔴 LOGIN ERROR CRASHED:', error); 
    
    // Pastikan mengembalikan JSON bersih, bukan string mentah
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}