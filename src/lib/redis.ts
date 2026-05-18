import Redis from 'ioredis';
import { logger } from '@/lib/logger';
const globalForRedis = globalThis as unknown as { redis: Redis };

const createRedisInstance = (): Redis => {
  const client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    // 💡 Tips Senior: Batasi percobaan reconnect agar tidak membebani memori server
    maxRetriesPerRequest: 3, 
    retryStrategy(times) {
      // Coba koneksi ulang setiap 2 detik, maksimal hingga 5 kali percobaan
      if (times > 5) {
        return null; // Berhenti mencoba reconnect jika Redis benar-back mati lama
      }
      return 2000; 
    }
  });

  client.on('error', (error) => {
    logger.error('Koneksi latar belakang ioredis terputus/gagal', error, {
      location: 'lib/redis.ts -> client.on(error)'
    });
  });

  client.on('connect', () => {
    console.log('✅ Berhasil terhubung ke server Redis dengan aman.');
  });

  return client;
};

export const redis = globalForRedis.redis || createRedisInstance();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;