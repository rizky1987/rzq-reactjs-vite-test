// 📄 prisma/seeds/user.seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // 💡 Bawaan Node.js untuk generate UUID aman

export async function seedUsers(prisma: PrismaClient) {
  console.log('⏳ Seeding users...');
  const hashedPassword = bcrypt.hashSync('password123', 10);

  // Masukkan data baru dengan menyertakan id UUID eksplisit agar aman dari Null constraint
  await Promise.all([
  // 1. SUPERADMIN
  prisma.user.upsert({
    where: { 
      email: "superadmin@rizky.com" 
    },
    update: {
      name: "Rizky Admin",
      password: hashedPassword,
      role: "SUPERADMIN"
    },
    create: {
      id: crypto.randomUUID(),
      name: "Rizky Admin",
      email: "superadmin@rizky.com",
      password: hashedPassword,
      role: "SUPERADMIN"
    }
  }),

  // 2. ADMIN
  prisma.user.upsert({
    where: { 
      email: "admin@rizky.com" 
    },
    update: {
      name: "Rizky Admin",
      password: hashedPassword,
      role: "ADMIN"
    },
    create: {
      id: crypto.randomUUID(),
      name: "Rizky Admin",
      email: "admin@rizky.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  }),

  // 3. USER
  prisma.user.upsert({
    where: { 
      email: "user@rizky.com" 
    },
    update: {
      name: "Rizky User",
      password: hashedPassword,
      role: "USER"
    },
    create: {
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