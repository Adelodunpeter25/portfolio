import { useState, useEffect } from 'react';
import { contentfulClient } from '../lib/contentful';
import { portfolioData as fallbackData } from '../data';

export function useContentfulData() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, skills, hero, about, contact] = await Promise.all([
          contentfulClient.getEntries({ content_type: 'project', order: 'fields.order' }),
          contentfulClient.getEntries({ content_type: 'skill', order: 'fields.order' }),
          contentfulClient.getEntries({ content_type: 'hero', limit: 1 }),
          contentfulClient.getEntries({ content_type: 'about', limit: 1 }),
          contentfulClient.getEntries({ content_type: 'contact', limit: 1 }),
        ]);

        setData({
          name: fallbackData.name,
          hero: hero.items[0]?.fields || fallbackData.hero,
          about: about.items[0]?.fields || fallbackData.about,
          email: contact.items[0]?.fields.email || fallbackData.email,
          social: {
            github: contact.items[0]?.fields.githubUrl || fallbackData.social.github,
            linkedin: contact.items[0]?.fields.linkedinUrl || fallbackData.social.linkedin,
          },
          projects: projects.items.map(p => ({
            id: p.fields.id,
            title: p.fields.title,
            description: p.fields.description?.content?.[0]?.content?.[0]?.value || '',
            tech: p.fields.tech || [],
            link: p.fields.link || '',
            demo: p.fields.demo || '',
            fullDescription: p.fields.fullDescription?.content?.[0]?.content?.[0]?.value || '',
            features: p.fields.features || [],
            challenges: p.fields.challenges?.content?.[0]?.content?.[0]?.value || '',
            outcome: p.fields.outcome?.content?.[0]?.content?.[0]?.value || '',
          })),
          skills: skills.items.map(s => ({
            name: s.fields.name,
            proficiency: s.fields.proficiency,
          })),
          tagline: fallbackData.tagline,
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
