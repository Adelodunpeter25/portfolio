require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful');
const fs = require('fs');
const path = require('path');

const client = contentful.createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

async function fetchContent() {
  const results = {};

  console.log('Fetching projects...');
  const projects = await client.getEntries({ content_type: 'project', order: 'fields.order' });
  results.projects = projects.items.map(p => p.fields);

  console.log('Fetching skills...');
  const skills = await client.getEntries({ content_type: 'skill', order: 'fields.order' });
  results.skills = skills.items.map(s => s.fields);

  console.log('Fetching hero...');
  const hero = await client.getEntries({ content_type: 'hero', limit: 1 });
  results.hero = hero.items.length > 0 ? hero.items[0].fields : null;

  console.log('Fetching about...');
  const about = await client.getEntries({ content_type: 'about', limit: 1 });
  results.about = about.items.length > 0 ? about.items[0].fields : null;

  console.log('Fetching contact...');
  const contact = await client.getEntries({ content_type: 'contact', limit: 1 });
  results.contact = contact.items.length > 0 ? contact.items[0].fields : null;

  const outputPath = path.join(__dirname, '../contentful-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Data saved to ${outputPath}`);
  console.log(`\nSummary:`);
  console.log(`  - Projects: ${results.projects.length}`);
  console.log(`  - Skills: ${results.skills.length}`);
  console.log(`  - Hero: ${results.hero ? 'Yes' : 'No'}`);
  console.log(`  - About: ${results.about ? 'Yes' : 'No'}`);
  console.log(`  - Contact: ${results.contact ? 'Yes' : 'No'}`);
}

fetchContent().catch(console.error);
