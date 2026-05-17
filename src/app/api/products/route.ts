import { NextResponse } from "next/server";
import { getProducts } from "@/app/(admin)/product/services/product.service";

// Menandakan bahwa fungsi ini WAJIB dijalankan di sisi server Node.js murni
export const runtime = "nodejs"; 

export async function GET() {
  try {
    const data = await getProducts();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memuat data produk dari server" },
      { status: 500 }
    );
  }
}