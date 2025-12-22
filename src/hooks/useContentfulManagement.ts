import { useState } from 'react';
import { createClient } from 'contentful-management';

const managementClient = createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

export function useContentfulManagement() {
  const [saving, setSaving] = useState(false);

  const updateEntry = async (entryId: string, fields: any) => {
    setSaving(true);
    try {
      const space = await managementClient.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID);
      const environment = await space.getEnvironment('master');
      const entry = await environment.getEntry(entryId);
      
      Object.keys(fields).forEach(key => {
        const value = fields[key];
        // Check if value is RichText format (has nodeType)
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
      return { success: true, message: 'Changes saved successfully!' };
    } catch (error) {
      console.error('Failed to update entry:', error);
      return { success: false, message: 'Failed to save changes. Please try again.' };
    } finally {
      setSaving(false);
    }
  };

  const createEntry = async (contentType: string, fields: any) => {
    setSaving(true);
    try {
      const space = await managementClient.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID);
      const environment = await space.getEnvironment('master');
      
      const formattedFields: any = {};
      Object.keys(fields).forEach(key => {
        const value = fields[key];
        if (value && typeof value === 'object' && value.nodeType === 'document') {
          formattedFields[key] = { 
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
          formattedFields[key] = { 'en-US': value };
        }
      });
      
      const entry = await environment.createEntry(contentType, { fields: formattedFields });
      await entry.publish();
      return { success: true, message: 'Created successfully!' };
    } catch (error) {
      console.error('Failed to create entry:', error);
      return { success: false, message: 'Failed to create. Please try again.' };
    } finally {
      setSaving(false);
    }
  };

  return { updateEntry, createEntry, saving };
}
