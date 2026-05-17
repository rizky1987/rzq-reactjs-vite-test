import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Pastikan env termuat di runtime
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// 💡 Definisikan tipe global secara eksplisit sesuai standar Prisma 7
const globalForPrisma = globalThis as unknown as {
  prismaGlobal: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("❌ DATABASE_URL tidak ditemukan di environment variables!");
  }

  // 1. Buat koneksi pool menggunakan driver murni 'pg'
  const pool = new Pool({ connectionString });
  
  // 2. Bungkus ke dalam Driver Adapter resmi Prisma 7
  const adapter = new PrismaPg(pool);
  
  // 3. Masukkan adapter ke dalam constructor utama
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prismaGlobal ?? createPrismaClient();

export default prisma; // 🔥 Tambahkan kata 'default' di sini!

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma;
}