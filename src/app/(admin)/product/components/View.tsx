import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { Product } from "@/app/(admin)/product/types/product.type";

interface ProductViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product : Product;
  proccess : 'view' | 'delete'
}

const ViewProductModal = ({isOpen, onClose, proccess, product}: ProductViewModalProps) => {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {/* ATUR LEBAR DI SINI: w-full max-w-md */}
          <div className="bg-white p-3 rounded-xl shadow-xl w-full max-w-md flex flex-col overflow-hidden max-h-[90vh]">
             {proccess === 'delete' && (
              <Title 
                title='Are you sure want to delete this item?' 
                titleType="danger"
              />
            )}
            {/* Scrollable Area: Agar jika teks sangat panjang, modal bisa di-scroll */}
            <div className="overflow-y-auto p-6">
              
              {/* Kontainer Gambar */}
              <div className="relative mb-4">
                <img 
                  className="rounded-lg w-full" 
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?..." 
                  alt="Product"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </div>

              {/* Konten Text */}
              <div className="space-y-2">
                <h5 className="text-xl font-bold text-gray-800">{product.description}</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
                <Button 
                    variant="secondary"
                    buttonType="close"
                    onClick={onClose}
                  >
                    Close
                </Button>
                

                {proccess === 'delete' && (
                  <Button 
                      variant="danger"
                      buttonType="delete"
                      onClick={onClose}>
                      Delete
                    </Button>
                )}
                
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProductModal;