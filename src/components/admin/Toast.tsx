import { useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] animate-slide-in">
      {type === 'success' ? (
        <CheckCircle className="text-green-500" size={24} />
      ) : (
        <XCircle className="text-red-500" size={24} />
      )}
      <p className="flex-1 text-gray-800">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
    </div>
  );
}
