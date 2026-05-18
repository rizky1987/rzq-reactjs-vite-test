import React from 'react'; 
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-4">
      
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-lg transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white p-5 sm:p-8 shadow-2xl transition-all animate-in fade-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
          <h3 className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <span className="text-2xl mt-[-4px]">&times;</span>
          </button>
        </div>
        
        <div className="text-sm sm:text-base leading-relaxed text-gray-600 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button 
            variant="danger" 
            onClick={onClose} 
            className="w-full sm:w-auto !bg-gray-100 !text-gray-700 hover:!bg-gray-200 border-none py-3 sm:py-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={onClose}
            className="w-full sm:w-auto py-3 sm:py-2 shadow-lg shadow-blue-500/20"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;