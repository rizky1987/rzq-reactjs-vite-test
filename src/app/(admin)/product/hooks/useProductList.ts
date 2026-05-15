"use client";

import { useEffect, useState } from "react";

import { getProducts } from "../actions/product.actions";

import { Product } from "../types/product.type";

export function useProductList() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response =
          await getProducts();

        setProducts(response);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
  };
}