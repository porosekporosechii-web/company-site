import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { serviceDirections } from '@/lib/company';

// TODO: replace with the real domain once it's known.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rauco.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/services`,  changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/portfolio`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/blog`,      changeFrequency: 'weekly',  priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/about`,     changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/contacts`,  changeFrequency: 'monthly', priority: 0.7, lastModified: now },
  ];

  const services: MetadataRoute.Sitemap = serviceDirections.map((s) => ({
    url: `${SITE_URL}/services/${s.id}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: now,
  }));

  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: now,
  }));

  return [...staticRoutes, ...services, ...blogPosts];
}
