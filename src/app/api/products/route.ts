// 📄 src/app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

// 1. GET: Ambil semua produk (Sudah ada dari langkah sebelumnya)
export async function GET() {
  try {
    const data = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat data produk" }, { status: 500 });
  }
}

// 2. POST: Tambah Produk Baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: 150.0, // Nilai default sementara, silakan ganti jika ada inputnya
        stock: 10,    // Nilai default sementara
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80", // Placeholder gambar
        status: "In Stock"
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Gagal menyimpan produk baru:", error);
    return NextResponse.json({ error: "Gagal menyimpan produk ke database" }, { status: 500 });
  }
}

// 3. PUT: Perbarui Produk Lama
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description } = body;

    if (!id) {
      return NextResponse.json({ error: "ID produk wajib disertakan" }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description }
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("❌ Gagal memperbarui produk:", error);
    return NextResponse.json({ error: "Gagal memperbarui produk di database" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID produk wajib disertakan" }, { status: 400 });
    }

    // Eksekusi hapus data di PostgreSQL via Prisma
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Gagal menghapus produk:", error);
    return NextResponse.json({ error: "Gagal menghapus produk dari database" }, { status: 500 });
  }
}