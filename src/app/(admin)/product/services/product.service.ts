import prisma  from "@/lib/prisma";

/**
 * Fungsi untuk mengambil seluruh data produk dari database PostgreSQL.
 */
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  } catch (error) {
    console.error("❌ Gagal mengambil data produk dari database:", error);
    throw new Error("Internal Server Error");
  }
}