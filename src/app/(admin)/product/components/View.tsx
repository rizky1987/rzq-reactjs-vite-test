import React, { useState } from 'react';
import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { Product } from "@/app/(admin)/product/types/product.type";

interface ProductViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null; 
  proccess: 'view' | 'delete';
  // 💡 Tambahkan prop ini untuk mengirim status sukses ke komponen induk
  onSuccess: (message: string, alertType: "success" | "danger" | "warning") => void; 
}

const ViewProductModal = ({ isOpen, onClose, proccess, product, onSuccess: onModalClose }: ProductViewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Jika modal ditutup atau data produk belum di-set, jangan render apa-apa
  if (!isOpen || !product) return null;

  // Fungsi untuk mengeksekusi penghapusan ke database
  // 📄 Perbaikan di dalam src/app/(admin)/product/components/View.tsx

const handleDelete = async () => {
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
      
      // 💡 BERI PENGAMAN: Hanya jalankan jika onModalClose dikirim oleh parent
      if (typeof onModalClose === "function") {
        onModalClose("Product Deleted Successfully!", "success");
      }

    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
      
      // 💡 BERI PENGAMAN JUGA DI SINI
      if (typeof onModalClose === "function") {
        onModalClose(errorMessage, "danger");
      } else {
        // Fallback jika tidak ada fungsi handle alert dari parent
        alert(errorMessage); 
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal Card */}
      <div className="relative bg-white p-3 rounded-xl shadow-xl w-full max-w-md flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Loading Overlay untuk proses Delete */}
        {isLoading && (
          <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white/95 backdrop-blur-[1px]">
            <div className="h-12 w-12 rounded-full border-4 border-red-100 border-t-red-600 animate-spin"></div>
            <p className="mt-3 text-xs font-bold text-red-600 uppercase tracking-wider">Deleting from Database...</p>
          </div>
        )}

        {proccess === 'delete' && (
          <div className="p-3 pb-0">
            <Title 
              title='Are you sure want to delete this item?' 
              titleType="danger"
            />
          </div>
        )}

        {/* Scrollable Area */}
        <div className="overflow-y-auto p-4 space-y-4">
          
          {/* Kontainer Gambar Dinamis dari DB */}
          <div className="relative">
            <img 
              className="rounded-lg w-full bg-gray-100" 
              src={product.image || "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80"} 
              alt={product.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>

          {/* Konten Text Dinamis dari DB */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {product.status || "In Stock"}
            </span>
            <h5 className="text-xl font-bold text-gray-800 pt-1">{product.name}</h5>
            <p className="text-sm font-semibold text-blue-600">${product.price}</p>
            <p className="text-sm text-gray-600 leading-relaxed pt-2">
              {product.description || <span className="italic text-gray-400">No description provided.</span>}
            </p>
          </div>
        </div>

        {/* Action Footer Buttons */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
          <Button 
            variant="secondary"
            buttonType="close"
            onClick={onClose}
            disabled={isLoading}
          >
            {proccess === 'delete' ? 'Cancel' : 'Close'}
          </Button>
          
          {proccess === 'delete' && (
            <Button 
              variant="danger"
              buttonType="delete"
              onClick={handleDelete} // 🔥 Panggil fungsi hapus database asli
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;