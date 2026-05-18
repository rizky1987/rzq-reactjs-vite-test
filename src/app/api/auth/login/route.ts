import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { redis } from '@/lib/redis';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_lokal_sementara';
    
    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ Peringatan: JWT_SECRET belum dikonfigurasi di file .env!");
    }

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

    await redis.set(`session:${token}`, JSON.stringify(sessionData), 'EX', 3600);

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
 
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}