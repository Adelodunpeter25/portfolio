import { createClient } from 'contentful-management';
import { portfolioData } from '../src/data.ts';

const SPACE_ID = 'fv7sroabp31h';
const MANAGEMENT_TOKEN = 'GOCSPX-your_management_token_here'; // Get from Contentful Settings > API keys > Content management tokens

async function seedContentful() {
  const client = createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  console.log('Creating content types...');

  // Create Project content type
  try {
    const projectType = await environment.createContentTypeWithId('project', {
      name: 'Project',
      fields: [
        { id: 'projectId', name: 'Project ID', type: 'Symbol', required: true },
        { id: 'title', name: 'Title', type: 'Symbol', required: true },
        { id: 'description', name: 'Description', type: 'Text', required: true },
        { id: 'fullDescription', name: 'Full Description', type: 'Text', required: true },
        { id: 'tech', name: 'Tech Stack', type: 'Array', items: { type: 'Symbol' } },
        { id: 'link', name: 'GitHub Link', type: 'Symbol' },
        { id: 'demo', name: 'Demo Link', type: 'Symbol' },
        { id: 'features', name: 'Features', type: 'Array', items: { type: 'Symbol' } },
        { id: 'challenges', name: 'Challenges', type: 'Text' },
        { id: 'outcome', name: 'Outcome', type: 'Text' },
        { id: 'order', name: 'Order', type: 'Integer' },
      ],
    });
    await projectType.publish();
    console.log('✓ Project content type created');
  } catch (error) {
    console.log('Project content type already exists');
  }

  // Create Skill content type
  try {
    const skillType = await environment.createContentTypeWithId('skill', {
      name: 'Skill',
      fields: [
        { id: 'name', name: 'Name', type: 'Symbol', required: true },
        { id: 'proficiency', name: 'Proficiency', type: 'Integer', required: true },
        { id: 'order', name: 'Order', type: 'Integer' },
      ],
    });
    await skillType.publish();
    console.log('✓ Skill content type created');
  } catch (error) {
    console.log('Skill content type already exists');
  }

  console.log('\nSeeding projects...');
  
  // Seed projects
  for (let i = 0; i < portfolioData.projects.length; i++) {
    const project = portfolioData.projects[i];
    try {
      const entry = await environment.createEntry('project', {
        fields: {
          projectId: { 'en-US': project.id },
          title: { 'en-US': project.title },
          description: { 'en-US': project.description },
          fullDescription: { 'en-US': project.fullDescription },
          tech: { 'en-US': project.tech },
          link: { 'en-US': project.link },
          demo: { 'en-US': project.demo || '' },
          features: { 'en-US': project.features },
          challenges: { 'en-US': project.challenges },
          outcome: { 'en-US': project.outcome },
          order: { 'en-US': i },
        },
      });
      await entry.publish();
      console.log(`✓ Created project: ${project.title}`);
    } catch (error) {
      console.log(`✗ Failed to create project: ${project.title}`);
    }
  }

  console.log('\nSeeding skills...');
  
  // Seed skills
  for (let i = 0; i < portfolioData.skills.length; i++) {
    const skill = portfolioData.skills[i];
    try {
      const entry = await environment.createEntry('skill', {
        fields: {
          name: { 'en-US': skill.name },
          proficiency: { 'en-US': skill.proficiency },
          order: { 'en-US': i },
        },
      });
      await entry.publish();
      console.log(`✓ Created skill: ${skill.name}`);
    } catch (error) {
      console.log(`✗ Failed to create skill: ${skill.name}`);
    }
  }

  console.log('\n✅ Seeding complete!');
}

seedContentful().catch(console.error);
