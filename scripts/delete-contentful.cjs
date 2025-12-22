require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function deleteAllEntries() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  console.log('Fetching all entries...\n');
  const entries = await environment.getEntries({ limit: 1000 });

  console.log(`Found ${entries.items.length} entries. Deleting...\n`);

  for (const entry of entries.items) {
    try {
      if (entry.isPublished()) {
        await entry.unpublish();
      }
      await entry.delete();
      console.log(`✓ Deleted: ${entry.fields.title?.['en-US'] || entry.fields.name?.['en-US'] || entry.sys.id}`);
    } catch (error) {
      console.log(`✗ Failed to delete: ${entry.sys.id}`);
    }
  }

  console.log('\n✅ All entries deleted!');
}

deleteAllEntries().catch(console.error);
