import { useState, useEffect } from 'react';
import { contentfulClient } from '../lib/contentful';

export function useContentfulData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, skills, hero, about, contact] = await Promise.all([
          contentfulClient.getEntries({ content_type: 'project', order: ['fields.order'] }),
          contentfulClient.getEntries({ content_type: 'skill', order: ['fields.order'] }),
          contentfulClient.getEntries({ content_type: 'hero', limit: 1 }),
          contentfulClient.getEntries({ content_type: 'about', limit: 1 }),
          contentfulClient.getEntries({ content_type: 'contact', limit: 1 }),
        ]);

        setData({
          name: 'Adelodun Peter',
          hero: {
            tagline: hero.items[0]?.fields.tagline as string,
            mission: hero.items[0]?.fields.mission as string,
            subtext: (hero.items[0]?.fields.subtext as any)?.content?.[0]?.content?.[0]?.value,
            features: hero.items[0]?.fields.features as any,
          },
          about: {
            heading: about.items[0]?.fields.heading as string,
            subheading: about.items[0]?.fields.subheading as string,
            approach: (about.items[0]?.fields.approach as any)?.content?.[0]?.content?.[0]?.value,
            principles: about.items[0]?.fields.principles as string[],
            features: [],
          },
          email: contact.items[0]?.fields.email as string,
          social: {
            github: contact.items[0]?.fields.githubUrl as string,
            linkedin: contact.items[0]?.fields.linkedinUrl as string,
          },
          projects: projects.items.map(p => ({
            id: p.fields.id as string,
            title: p.fields.title as string,
            description: (p.fields.description as any)?.content?.[0]?.content?.[0]?.value || '',
            tech: p.fields.tech as string[] || [],
            link: p.fields.link as string || '',
            demo: p.fields.demo as string || '',
            fullDescription: (p.fields.fullDescription as any)?.content?.[0]?.content?.[0]?.value || '',
            features: p.fields.features as string[] || [],
            challenges: (p.fields.challenges as any)?.content?.[0]?.content?.[0]?.value || '',
            outcome: (p.fields.outcome as any)?.content?.[0]?.content?.[0]?.value || '',
          })),
          skills: skills.items.map(s => ({
            name: s.fields.name as string,
            proficiency: s.fields.proficiency as number,
          })),
          tagline: 'FullStack Engineer & Problem Solver',
        });
      } catch (error) {
        console.error('Failed to fetch from Contentful:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
