import { Edit2 } from 'lucide-react';

interface EditButtonProps {
  onClick: () => void;
}

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors z-10"
      aria-label="Edit section"
    >
      <Edit2 size={20} />
    </button>
  );
}
