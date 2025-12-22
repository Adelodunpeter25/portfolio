require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function checkContentTypes() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  console.log('Fetching content types...\n');

  const contentTypes = await environment.getContentTypes();

  contentTypes.items.forEach(ct => {
    console.log(`Content Type: ${ct.name} (ID: ${ct.sys.id})`);
    console.log('Fields:');
    ct.fields.forEach(field => {
      console.log(`  - ${field.name} (ID: ${field.id}, Type: ${field.type})`);
    });
    console.log('\n');
  });
}

checkContentTypes().catch(console.error);
