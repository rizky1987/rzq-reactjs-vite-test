import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Pastikan env termuat di runtime
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
  prismaInstance = globalForPrisma.prisma;
} else {
  // 1. Buat koneksi pool menggunakan driver murni 'pg'
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Bungkus ke dalam Driver Adapter resmi Prisma 7
  const adapter = new PrismaPg(pool);
  
  // 3. Masukkan adapter ke dalam constructor utama
  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;