require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');
const fs = require('fs');
const path = require('path');

// Read and parse data.ts
const dataPath = path.join(__dirname, '../src/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');
const dataMatch = dataContent.match(/export const portfolioData = ({[\s\S]*});/);
const portfolioData = eval('(' + dataMatch[1] + ')');

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function seedContentful() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  console.log('Checking content types...');

  // Check if Project content type exists
  try {
    await environment.getContentType('project');
    console.log('✓ Project content type exists');
  } catch (error) {
    console.log('Creating Project content type...');
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
  }

  // Check if Skill content type exists
  try {
    await environment.getContentType('skill');
    console.log('✓ Skill content type exists');
  } catch (error) {
    console.log('Creating Skill content type...');
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
