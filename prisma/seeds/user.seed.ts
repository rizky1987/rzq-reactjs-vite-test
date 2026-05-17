// 📄 prisma/seeds/user.seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // 💡 Bawaan Node.js untuk generate UUID aman

export async function seedUsers(prisma: PrismaClient) {
  console.log('⏳ Seeding users...');
  const hashedPassword = bcrypt.hashSync('password123', 10);

  // Bersihkan data lama
  await prisma.user.deleteMany();

  // Masukkan data baru dengan menyertakan id UUID eksplisit agar aman dari Null constraint
  await Promise.all([
    prisma.user.create({
      data: {
        id: crypto.randomUUID(), // 💡 Amankan kolom ID dengan UUID dari kode
        name: "Rizky Admin",
        email: "superadmin@rizky.com",
        password: hashedPassword,
        role: "SUPERADMIN"
      }
    }),
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: "Rizky Admin",
        email: "admin@rizky.com",
        password: hashedPassword,
        role: "ADMIN"
      }
    }),
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: "Rizky User",
        email: "user@rizky.com",
        password: hashedPassword,
        role: "USER"
      }
    })
  ]);

  console.log('✅ Users seeded successfully!');
}