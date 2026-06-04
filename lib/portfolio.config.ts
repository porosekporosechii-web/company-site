import type { LightboxImage } from '@/components/Lightbox';
import type { PortfolioWork } from './portfolio.generated';

export type { PortfolioWork };

export const categoryPriority: string[] = [
  'Уникальное торговое оборудование',
  'Торговое оборудование',
  'Светодиодные экраны',
  'Текстильные лайтбоксы',
  'Вывески',
  'Интерьерные вывески',
];

export function sortByPriority(works: PortfolioWork[]): PortfolioWork[] {
  return [...works].sort((a, b) => {
    const ra = categoryPriority.indexOf(a.category);
    const rb = categoryPriority.indexOf(b.category);
    const aRank = ra === -1 ? Number.MAX_SAFE_INTEGER : ra;
    const bRank = rb === -1 ? Number.MAX_SAFE_INTEGER : rb;
    if (aRank !== bRank) return aRank - bRank;
    if (ra === -1 && a.category !== b.category) return a.category.localeCompare(b.category, 'ru');
    return a.title.localeCompare(b.title, 'ru');
  });
}

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
