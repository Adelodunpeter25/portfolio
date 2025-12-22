import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';
import type { Project } from '../../types';

interface ProjectEditProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  entryId: string;
  onSuccess: (message: string, type: 'success' | 'error') => void;
}

export function ProjectEdit({ isOpen, onClose, project, entryId, onSuccess }: ProjectEditProps) {
  const [formData, setFormData] = useState(project);
  const { updateEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateEntry(entryId, {
      title: formData.title,
      description: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.description }] }] },
      tech: formData.tech,
      link: formData.link,
      demo: formData.demo,
      fullDescription: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.fullDescription }] }] },
      features: formData.features,
      challenges: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.challenges }] }] },
      outcome: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.outcome }] }] },
    });
    onSuccess(result.message, result.success ? 'success' : 'error');
    if (result.success) onClose();
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title={`Edit ${project.title}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={formData.tech.join(', ')}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map(t => t.trim()) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub Link</label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Demo Link (optional)</label>
          <input
            type="url"
            value={formData.demo || ''}
            onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Full Description</label>
          <textarea
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Features (one per line)</label>
          <textarea
            value={formData.features.join('\n')}
            onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Challenges</label>
          <textarea
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Outcome</label>
          <textarea
            value={formData.outcome}
            onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
            rows={2}
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
