import { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'danger' | 'warning';
  message: string;
  duration?: number;
  onClose: () => void;
}

const Alert = ({ type, message, duration = 3000, onClose }: AlertProps) => {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const icons = {
    success: '✅',
    danger: '❌',
    warning: '⚠️',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`flex items-center p-2 mb-2 border rounded-lg animate-fade-in ${variants[type]}`} role="alert">
      <span className="mr-3">{icons[type]}</span>
      <div className="text-sm font-medium flex-1">{message}</div>
      <button onClick={onClose} className="ml-2 text-lg opacity-50 hover:opacity-100">&times;</button>
    </div>
  );
};

export default Alert;