// 📄 src/app/api/protected-data/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { logger } from '@/lib/logger';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // 1. Validasi Keberadaan Token
    if (!token) {
      await logger.warn("Access denied: auth_token cookie not found", {
        location: "api/protected-data -> GET"
      });
      return NextResponse.json(
        { error: 'Access denied. Token not found.' }, 
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string };

    const isTokenActive = await redis.get(`token:${token}`);
    if (!isTokenActive) {
      await logger.warn("Session expired: Token marked as inactive in Redis", {
        location: "api/protected-data -> GET",
        userId: decoded.userId
      });
      return NextResponse.json(
        { error: 'Your session has expired. Invalid token.' }, 
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Access granted. Confidential data loaded successfully.',
      secretData: [
        { id: 1, project: 'Project Alpha Rocket', budget: '$2,000,000' },
        { id: 2, project: 'Project Beta Cyber', budget: '$1,500,000' }
      ],
      user: decoded
    }, { status: 200 });

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
      await logger.warn("Unauthorized access attempt: Expired or malformed JWT token", {
        location: "api/protected-data -> GET"
      });
      return NextResponse.json(
        { error: 'Token has expired or is invalid.' }, 
        { status: 401 }
      );
    }

    await logger.error("Internal server error during token verification process", error, {
      location: "api/protected-data -> GET"
    });
    return NextResponse.json(
      { error: 'Internal server error.' }, 
      { status: 500 }
    );
  }
}