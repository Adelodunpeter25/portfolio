import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface SkillAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string, type: 'success' | 'error') => void;
}

export function SkillAdd({ isOpen, onClose, onSuccess }: SkillAddProps) {
  const [formData, setFormData] = useState({ name: '', proficiency: 50, order: 0 });
  const { createEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createEntry('skill', {
      name: formData.name,
      proficiency: formData.proficiency,
      order: formData.order,
    });
    onSuccess(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({ name: '', proficiency: 50, order: 0 });
      onClose();
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title="Add New Skill">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Skill Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Proficiency (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.proficiency}
            onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Skill'}
        </button>
      </form>
    </EditModal>
  );
}
