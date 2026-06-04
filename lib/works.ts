import type { Work } from '@prisma/client';
import type { PortfolioWork } from './portfolio.generated';

export function workToPortfolio(w: Work): PortfolioWork {
  const images: string[] = (() => {
    try { return JSON.parse(w.galleryJson); } catch { return []; }
  })();
  const specs: Record<string, string> = (() => {
    try { return JSON.parse(w.specsJson); } catch { return {}; }
  })();
  const allImages = images.length > 0 ? images : [w.mainImage];
  return {
    id: w.id,
    slug: w.slug,
    title: w.title,
    category: w.category,
    categorySlug: w.category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9а-яёА-ЯЁ-]/gi, ''),
    coverImage: w.mainImage,
    images: allImages,
    description: w.description ?? undefined,
    specs: Object.keys(specs).length > 0 ? specs : undefined,
  };
}

/** Derive unique categories with counts from a list of portfolio works. */
export function deriveCategories(works: PortfolioWork[]) {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const w of works) {
    const existing = map.get(w.category);
    if (existing) existing.count++;
    else map.set(w.category, { name: w.category, slug: w.categorySlug, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) =>
    b.count - a.count || a.name.localeCompare(b.name, 'ru'),
  );
}
