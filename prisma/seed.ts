import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; 
import pg from 'pg';                          
import fs from 'fs';
import path from 'path';
import { seedProducts } from './seeds/product.seed';
import { seedUsers } from './seeds/user.seed';

// 💡 TRICK AMAN: Paksa baca file .env secara manual jika process.env kosong
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, 'utf-8');
      envConfig.split('\n').forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          // Hapus tanda kutip jika ada
          if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          }
          process.env[key] = value.trim();
        }
      });
    }
  } catch (err) {
    console.error('Gagal membaca file .env secara manual:', err);
  }
}

// Periksa ulang apakah DATABASE_URL sudah terisi sekarang
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL tidak ditemukan di environment!");
  process.exit(1);
}

// Buat pool koneksi dengan jaminan DATABASE_URL berupa string aman
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Start database seeding...');
  await seedUsers(prisma);
  await seedProducts(prisma);
  // await seedProducts(prisma); // Aktifkan jika file product seed kamu sudah siap
  console.log('\n🏁 All database seeds completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); 
  });