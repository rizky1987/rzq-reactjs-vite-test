import { useEffect, useState, useCallback } from "react";
import { Product } from "../types/product.type";

export function useProductList() {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
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
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refreshProducts: loadProducts };
}