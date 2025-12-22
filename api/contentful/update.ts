import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'contentful-management';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, entryId, fields } = req.body;

  if (token !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
    });

    const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment('master');
    const entry = await environment.getEntry(entryId);

    Object.keys(fields).forEach(key => {
      const value = fields[key];
      if (value && typeof value === 'object' && value.nodeType === 'document') {
        entry.fields[key] = {
          'en-US': {
            ...value,
            data: {},
            content: value.content.map((node: any) => ({
              ...node,
              data: {},
              content: node.content.map((textNode: any) => ({ ...textNode, data: {}, marks: [] }))
            }))
          }
        };
      } else {
        entry.fields[key] = { 'en-US': value };
      }
    });

    const updated = await entry.update();
    await updated.publish();

    return res.status(200).json({ success: true, message: 'Changes saved successfully!' });
  } catch (error) {
    console.error('Failed to update entry:', error);
    return res.status(500).json({ success: false, message: 'Failed to save changes.' });
  }
}
