import { NextResponse } from "next/server";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "@/app/(admin)/product/services/product.service";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const data = await getProducts(); 
    return NextResponse.json(data);
  } catch (error) {
    await logger.error("DATABASE DOWN! Failed to fetch product data from PostgreSQL", error, {
      location: "api/products -> GET"
    });
    
    return NextResponse.json(
      { error: "Failed to load product data" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await createProduct(body); 
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    await logger.error("Failed to save new product to database", error, {
      location: "api/products -> POST"
    });

    return NextResponse.json(
      { error: "Failed to save product to database" }, 
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...inputData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" }, 
        { status: 400 }
      );
    }

    const updatedProduct = await updateProduct(id, inputData);
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    await logger.error("Failed to update product via API", error, {
      location: "api/products -> PUT"
    });

    return NextResponse.json(
      { error: "Failed to update product in database" }, 
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validasi input parameter wajib
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" }, 
        { status: 400 }
      );
    }

    const deletedProduct = await deleteProduct(id);

    return NextResponse.json({ 
      message: "Product deleted successfully", 
      product: deletedProduct 
    }, { status: 200 });
  } catch (error) {
    await logger.error("Failed to delete product via API", error, {
      location: "api/products -> DELETE",
      payload: { urlParams: request.url } 
    });

    return NextResponse.json(
      { error: "Failed to delete product from database" }, 
      { status: 500 }
    );
  }
}