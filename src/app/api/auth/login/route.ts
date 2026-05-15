import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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

    // 3. Buat JWT Token (Masa berlaku 1 jam)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // 4. Simpan ke Redis dengan TTL 3600 detik (1 jam)
    // Format Key: token:[string_token_jwt]
    await redis.set(`token:${token}`, user.id, 'EX', 3600);

    // 5. Kembalikan response berupa HTTP-Only Cookie demi keamanan dari XSS
    const response = NextResponse.json(
      { message: 'Login Berhasil', user: { name: user.name, email: user.email } },
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
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}