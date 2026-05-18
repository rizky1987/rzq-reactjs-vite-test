import { useState } from 'react';
import { Product } from "@/app/(admin)/product/types/product.type";
import { logger } from '@/lib/logger';

interface UseProductModalParams {
  product: Product | null;
  onClose: () => void;
  onSuccess: (message: string, alertType: "success" | "danger" | "warning") => void;
}

export const useViewProductModal = ({ product, onClose, onSuccess: onModalClose }: UseProductModalParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?id=${product.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus data dari server");
      }

      setIsLoading(false);
      onClose();
      
      if (typeof onModalClose === "function") {
        onModalClose("Product Deleted Successfully!", "success");
      }

    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      
      logger.error("Failed delete product", error, {
        location: "useViewProductModal -> handleDelete",
        payload: { productId: product.id, productName: product.name }
      });

      if (typeof onModalClose === "function") {
        onModalClose(errorMessage, "danger");
      }
    }
  };

  return {
    isLoading,
    handleDelete
  };
};