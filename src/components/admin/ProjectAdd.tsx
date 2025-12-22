import { useState } from 'react';
import { EditModal } from './EditModal';
import { useContentfulManagement } from '../../hooks/useContentfulManagement';

interface ProjectAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string, type: 'success' | 'error') => void;
}

export function ProjectAdd({ isOpen, onClose, onSuccess }: ProjectAddProps) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    tech: '',
    link: '',
    demo: '',
    fullDescription: '',
    features: '',
    challenges: '',
    outcome: '',
    order: 0,
  });
  const { createEntry, saving } = useContentfulManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createEntry('project', {
      id: formData.id,
      title: formData.title,
      description: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.description }] }] },
      tech: formData.tech.split(',').map(t => t.trim()),
      link: formData.link,
      demo: formData.demo,
      fullDescription: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.fullDescription }] }] },
      features: formData.features.split('\n').filter(f => f.trim()),
      challenges: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.challenges }] }] },
      outcome: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: formData.outcome }] }] },
      order: formData.order,
    });
    onSuccess(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      setFormData({ id: '', title: '', description: '', tech: '', link: '', demo: '', fullDescription: '', features: '', challenges: '', outcome: '', order: 0 });
      onClose();
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub Link</label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Demo Link (optional)</label>
          <input
            type="url"
            value={formData.demo}
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
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Features (one per line)</label>
          <textarea
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Challenges</label>
          <textarea
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Outcome</label>
          <textarea
            value={formData.outcome}
            onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </EditModal>
  );
}
