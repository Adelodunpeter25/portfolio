import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface ContactEditProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    email: string;
    githubUrl: string;
    linkedinUrl: string;
  };
  entryId: string;
  onSuccess: () => void;
}

export function ContactEdit({ isOpen, onClose, data, entryId, onSuccess }: ContactEditProps) {
  const [formData, setFormData] = useState(data);
  const { updateEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateEntry('contact', entryId, {
      email: formData.email,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
    });
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title="Edit Contact Info">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
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
