import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface HeroEditProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    tagline: string;
    mission: string;
    subtext: string;
  };
  entryId: string;
  onSuccess: (message: string, type: 'success' | 'error') => void;
}

export function HeroEdit({ isOpen, onClose, data, entryId, onSuccess }: HeroEditProps) {
  const [formData, setFormData] = useState(data);
  const { updateEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateEntry(entryId, {
      tagline: formData.tagline,
      mission: formData.mission,
      subtext: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.subtext }] }] },
    });
    onSuccess(result.message, result.success ? 'success' : 'error');
    if (result.success) onClose();
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title="Edit Hero Section">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mission</label>
          <input
            type="text"
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subtext</label>
          <textarea
            value={formData.subtext}
            onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
            rows={3}
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
