import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import path from 'path';

// Pastikan env terisi
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const globalForRedis = globalThis as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis || 
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;