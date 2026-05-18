import { useState, useRef, useEffect } from 'react';
import { Product } from "@/app/(admin)/product/types/product.type";
import { logger } from '@/lib/logger';

interface UseProductModalParams {
  isOpen: boolean;
  onClose: () => void;
  process: 'create' | 'update';
  product: Product | null;
  onSuccess: (message: string, alertType: "success" | "danger" | "warning") => void;
}

export const useCreateProductModal = ({ isOpen, onClose, process, product, onSuccess: onModalClose }: UseProductModalParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sinkronisasi data form saat modal dibuka atau beralih mode
  useEffect(() => {
    if (isOpen) {
      if (product && process === 'update') {
        setName(product.name);
        setDesc(product.description || "");
      } else {
        resetForm();
      }
    }
  }, [product, process, isOpen]);

  const resetForm = () => {
    setName('');
    setDesc('');
    setImage(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!desc.trim()) newErrors.desc = "Description is required";
    
    if (!image && process === 'create') {
      newErrors.image = "Product image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let response;
      
      if (process === 'create') {
        const createPayload = {
          name: name.trim(),
          description: desc.trim(),
          price: 150.0,
          stock: 10,        
          image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
          status: "In Stock"
        };

        response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createPayload), 
        });

      } else {
        const updatePayload = {
          id: product?.id, 
          name: name.trim(),
          description: desc.trim(),
        };

        response = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload), 
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong on the server");
      }
      
      resetForm();
      setIsLoading(false);
      onClose(); 
      
      onModalClose(
        process === 'create' 
          ? "Product Created Successfully!" 
          : "Product Updated Successfully!",
        "success"
      );

    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      logger.error(`Failed to process ${process} to server`, error, {
        location: `useCreateProductModal -> handleSubmit (${process} block)`,
        payload: { name, process, productId: product?.id || null }
      });

      onModalClose(errorMessage, "danger");
    }
  };

  return {
    isLoading,
    errors,
    name,
    setName,
    desc,
    setDesc,
    image,
    setImage,
    fileInputRef,
    handleSubmit
  };
};