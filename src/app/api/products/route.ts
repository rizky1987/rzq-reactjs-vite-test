import { NextResponse } from "next/server";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "@/app/(admin)/product/services/product.service";

export async function GET() {
  try {
    const data = await getProducts(); 
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Gagal memuat data produk:", error);
    return NextResponse.json({ error: "Gagal memuat data produk" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await createProduct(body); 
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Gagal menyimpan produk baru:", error);
    return NextResponse.json({ error: "Gagal menyimpan produk ke database" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...inputData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID produk wajib disertakan, gaes" }, { status: 400 });
    }

    const updatedProduct = await updateProduct(id, inputData);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("❌ Gagal memperbarui produk via API:", error);
    return NextResponse.json({ error: "Gagal memperbarui produk di database" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID produk wajib disertakan, gaes" }, { status: 400 });
    }

    const deletedProduct = await deleteProduct(id);

    return NextResponse.json({ 
      message: "Product deleted successfully", 
      product: deletedProduct 
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Gagal menghapus produk via API:", error);
    return NextResponse.json({ error: "Gagal menghapus produk dari database" }, { status: 500 });
  }
}