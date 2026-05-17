// 📄 src/app/(admin)/product/hooks/useProductList.ts
import { useEffect, useState } from "react";
import { Product } from "../types/product.type";

// ❌ HAPUS IMPORT YANG MERUSAK BROWSER INI:
// import { getProducts } from "../services/product.services";

export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // ✅ GANTI DENGAN CALL API: Panggil API Route internal kita yang aman
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}