import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillEditProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill;
  entryId: string;
  onSuccess: () => void;
}

export function SkillEdit({ isOpen, onClose, skill, entryId, onSuccess }: SkillEditProps) {
  const [formData, setFormData] = useState(skill);
  const { updateEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateEntry('skill', entryId, {
      name: formData.name,
      proficiency: formData.proficiency,
    });
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title={`Edit ${skill.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Skill Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </EditModal>
  );
}
