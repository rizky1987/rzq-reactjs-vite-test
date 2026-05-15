import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import path from 'path';

// Pastikan file .env dibaca dengan benar
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Memulai proses seeding database...');

  // 1. Generate password yang aman menggunakan bcrypt
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. Gunakan upsert agar data tidak duplikat jika script dijalankan berulang kali
  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@company.com' },
    update: {},
    create: {
      email: 'superadmin@rizky.com',
      name: 'Rizky Super Admin',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rizky.com' },
    update: {},
    create: {
      email: 'admin@rizky.com',
      name: 'Admin Operational',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@rizky.com' },
    update: {},
    create: {
      email: 'user@rizky.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Seeding berhasil diselesaikan!');
  console.log({ superadmin: superadmin.email, admin: admin.email, user: user.email });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });