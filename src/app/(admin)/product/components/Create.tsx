import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Title from '@/components/ui/Title';
import { Product } from "@/app/(admin)/product/types/product.type";

interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  process: 'create' | 'update';
  onSuccess: (message: string, alertType: "success" | "danger" | "warning") => void;
  product: Product | null;
}

const CreateProductModal = ({ isOpen, onClose, onSuccess: onModalClose, process, product }: ProductCreateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  if (!isOpen) return null;

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

    } catch (err) {

      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : String(err);
      onModalClose(errorMessage, "danger");
    }
  };

  const resetForm = () => {
    setName('');
    setDesc('');
    setImage(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md shadow-2xl rounded-t-2xl sm:rounded-xl overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 duration-300">
        
        {isLoading && (
          <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white/90 backdrop-blur-[2px]">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-700 tracking-wide uppercase">Processing to Database...</p>
          </div>
        )}

        <div className="p-6">
          <div className="mb-6">
            <Title 
              title={process === 'create' ? 'Add New Product' : 'Update Product'}
              titleType="primary"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Product Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="e.g. Mountain Gear Pack"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.name}</p>}
            </div>

            {/* Input Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Description</label>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${
                  errors.desc ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                }`}
                rows={3}
                placeholder="Describe your product..."
                disabled={isLoading}
              />
              {errors.desc && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.desc}</p>}
            </div>

            {/* Input Image */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Product Image</label>
              <div className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-blue-400'
              }`}>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                <div className="text-center">
                  <div className="text-gray-400 mb-1 text-sm italic">
                    {image ? <span className="text-blue-600 font-semibold">{image.name}</span> : "Click or drag image here"}
                  </div>
                  <p className="text-[10px] text-gray-400">PNG, JPG up to 2MB</p>
                </div>
              </div>
              {process === 'update' && !image && (
                <p className="text-gray-400 text-[10px] italic mt-1">*Leave empty to keep current image</p>
              )}
              {errors.image && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.image}</p>}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
              <Button 
                variant="secondary"
                buttonType="cancel"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                buttonType="submit"
                disabled={isLoading}
              >
                {process === 'create' ? 'Create Product' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;