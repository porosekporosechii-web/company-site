import type { LightboxImage } from '@/components/Lightbox';
import { portfolioWorks, type PortfolioWork } from './portfolio.generated';

/**
 * Display priority for the "All works" mixed feed and the homepage selector.
 * Categories listed here come first, in this order; everything else goes after,
 * grouped by category name (alphabetical).
 *
 * Filter tabs themselves are NOT affected — those follow their natural alphabetical
 * order from the generator.
 */
export const categoryPriority: string[] = [
  'Уникальное торговое оборудование',
  'Торговое оборудование',
  'Светодиодные экраны',
  'Текстильные лайтбоксы',
  'Вывески',
  'Интерьерные вывески',
];

/** Sort works by priority list, then by category name (for non-priority), then by title. */
export function sortByPriority(works: PortfolioWork[]): PortfolioWork[] {
  return [...works].sort((a, b) => {
    const ra = categoryPriority.indexOf(a.category);
    const rb = categoryPriority.indexOf(b.category);
    const aRank = ra === -1 ? Number.MAX_SAFE_INTEGER : ra;
    const bRank = rb === -1 ? Number.MAX_SAFE_INTEGER : rb;
    if (aRank !== bRank) return aRank - bRank;
    if (ra === -1 && a.category !== b.category) {
      return a.category.localeCompare(b.category, 'ru');
    }
    return a.title.localeCompare(b.title, 'ru');
  });
}

/** Top-N most-presentable works for the homepage block. */
export function getTopWorks(limit = 6): PortfolioWork[] {
  return sortByPriority(portfolioWorks).slice(0, limit);
}

/** Adapt a portfolio work into the shape Lightbox expects. */
export function toLightboxImage(w: PortfolioWork): LightboxImage {
  return {
    img: w.coverImage,
    gallery: w.images.length > 1 ? w.images.slice(1) : undefined,
    title: w.title,
    category: w.category,
    description: w.description,
    specs: w.specs,
  };
}
