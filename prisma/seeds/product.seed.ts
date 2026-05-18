import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  console.log('⏳ Seeding products...');
  
 await Promise.all([
  // 1. Mountain Gear X1
  prisma.product.upsert({
    where: { 
      name: "Mountain Gear X1"
    },
    update: {
      description: "Professional climbing equipment.",
      price: 129,
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      status: "In Stock",
    },
    create: {
      name: "Mountain Gear X1",
      description: "Professional climbing equipment.",
      price: 129,
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      status: "In Stock",
    }
  }),

  // 2. Mountain Gear X2
  prisma.product.upsert({
    where: { 
      name: "Mountain Gear X2" 
    },
    update: {
      description: "Professional climbing equipment.",
      price: 139,
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      status: "In Stock",
    },
    create: {
      name: "Mountain Gear X2",
      description: "Professional climbing equipment.",
      price: 139,
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      status: "In Stock",
    }
  })
]);

  console.log('✅ Products seeded successfully!');
}