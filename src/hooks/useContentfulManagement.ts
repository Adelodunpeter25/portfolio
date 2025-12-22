import { useState } from 'react';

export function useContentfulManagement() {
  const [saving, setSaving] = useState(false);

  const updateEntry = async (entryId: string, fields: any) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/contentful/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, entryId, fields }),
      });
      const data = await res.json();
      return data;
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
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/contentful/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, contentType, fields }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to create entry:', error);
      return { success: false, message: 'Failed to create. Please try again.' };
    } finally {
      setSaving(false);
    }
  };

  return { updateEntry, createEntry, saving };
}
