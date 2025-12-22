import { useState } from 'react';
import { useContentfulData } from '../../hooks/useContentfulData';
import { EditButton } from './EditButton';
import { HeroEdit } from './HeroEdit';
import { AboutEdit } from './AboutEdit';
import { ProjectEdit } from './ProjectEdit';
import { SkillEdit } from './SkillEdit';
import { ContactEdit } from './ContactEdit';

export function AdminPanel() {
  const { data, loading } = useContentfulData();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleEdit = (section: string, index: number = 0) => {
    setEditMode(section);
    setSelectedIndex(index);
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">Admin Panel</h1>

        {/* Hero Section */}
        <div className="bg-white rounded-lg p-6 relative">
          <EditButton onClick={() => handleEdit('hero')} />
          <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
          <p className="text-gray-600">{data.hero.tagline}</p>
          <p className="text-gray-600">{data.hero.mission}</p>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg p-6 relative">
          <EditButton onClick={() => handleEdit('about')} />
          <h2 className="text-2xl font-bold mb-4">About Section</h2>
          <p className="text-gray-600">{data.about.heading}</p>
          <p className="text-gray-600">{data.about.subheading}</p>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid gap-4">
            {data.projects.map((project: any, index: number) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 relative">
                <EditButton onClick={() => handleEdit('project', index)} />
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid gap-4">
            {data.skills.map((skill: any, index: number) => (
              <div key={skill.name} className="border border-gray-200 rounded-lg p-4 relative">
                <EditButton onClick={() => handleEdit('skill', index)} />
                <h3 className="font-bold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.proficiency}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg p-6 relative">
          <EditButton onClick={() => handleEdit('contact')} />
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
          <p className="text-gray-600">{data.email}</p>
          <p className="text-gray-600">{data.social.github}</p>
        </div>
      </div>

      {/* Edit Modals */}
      <HeroEdit
        isOpen={editMode === 'hero'}
        onClose={() => setEditMode(null)}
        data={data.hero}
        entryId={data.hero.entryId}
        onSuccess={handleSuccess}
      />
      <AboutEdit
        isOpen={editMode === 'about'}
        onClose={() => setEditMode(null)}
        data={data.about}
        entryId={data.about.entryId}
        onSuccess={handleSuccess}
      />
      {editMode === 'project' && (
        <ProjectEdit
          isOpen={true}
          onClose={() => setEditMode(null)}
          project={data.projects[selectedIndex]}
          entryId={data.projects[selectedIndex].entryId}
          onSuccess={handleSuccess}
        />
      )}
      {editMode === 'skill' && (
        <SkillEdit
          isOpen={true}
          onClose={() => setEditMode(null)}
          skill={data.skills[selectedIndex]}
          entryId={data.skills[selectedIndex].entryId}
          onSuccess={handleSuccess}
        />
      )}
      <ContactEdit
        isOpen={editMode === 'contact'}
        onClose={() => setEditMode(null)}
        data={{ email: data.email, githubUrl: data.social.github, linkedinUrl: data.social.linkedin }}
        entryId={data.contactEntryId}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default AdminPanel;
