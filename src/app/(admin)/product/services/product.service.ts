import prisma from "@/lib/prisma";
import { Product } from "@/app/(admin)/product/types/product.type";

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } }) as Product[];
}

export async function createProduct(data: Omit<Product, "id">) {
  return await prisma.product.create({
    data: {
      ...data,
    }
  });
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id">>) {
  return await prisma.product.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({ where: { id } });
}