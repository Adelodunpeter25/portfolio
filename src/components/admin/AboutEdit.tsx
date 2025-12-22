import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface AboutEditProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    heading: string;
    subheading: string;
    approach: string;
    principles: string[];
  };
  entryId: string;
  onSuccess: () => void;
}

export function AboutEdit({ isOpen, onClose, data, entryId, onSuccess }: AboutEditProps) {
  const [formData, setFormData] = useState(data);
  const { updateEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateEntry('about', entryId, {
      heading: formData.heading,
      subheading: formData.subheading,
      approach: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.approach }] }] },
      principles: formData.principles,
    });
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title="Edit About Section">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Heading</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subheading</label>
          <input
            type="text"
            value={formData.subheading}
            onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Approach</label>
          <textarea
            value={formData.approach}
            onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Principles (one per line)</label>
          <textarea
            value={formData.principles.join('\n')}
            onChange={(e) => setFormData({ ...formData, principles: e.target.value.split('\n').filter(p => p.trim()) })}
            rows={4}
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
