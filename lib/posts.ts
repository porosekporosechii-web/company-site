export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  seed: string;
  featured: boolean;
  /** Optional full article body — paragraphs split by blank line. */
  body?: string;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: 'kak-vybrat-metall-dlya-lestnicy',
    category: 'Советы',
    title: 'Как выбрать металл для лестницы: сравниваем нержавейку, чёрный металл и алюминий',
    excerpt:
      'Каждый металл имеет свои плюсы и минусы в зависимости от условий эксплуатации, бюджета и эстетических требований. Разбираем подробно.',
    date: '12 апреля 2026',
    readTime: '5 мин',
    seed: 'staircase-metal-construction',
    featured: true,
  },
  {
    id: 2,
    slug: 'loft-mebel-trendy-2026',
    category: 'Дизайн и стиль',
    title: 'Лофт-мебель в 2026: актуальные тренды и форматы',
    excerpt:
      'Металл и дерево снова в тренде. Рассказываем, какие решения заказывают дизайнеры и какие размеры стали самыми популярными.',
    date: '3 апреля 2026',
    readTime: '4 мин',
    seed: 'loft-furniture-interior-modern',
    featured: false,
  },
  {
    id: 3,
    slug: 'mig-tig-sravnenie',
    category: 'Технологии',
    title: 'MIG против TIG: в чём разница и когда какую сварку выбирать',
    excerpt:
      'Оба метода применяются в металлообработке, но для разных задач. Простое объяснение без лишнего профессионального жаргона.',
    date: '25 марта 2026',
    readTime: '6 мин',
    seed: 'welding-sparks-blue',
    featured: false,
  },
  {
    id: 4,
    slug: 'torgovye-stellazhi-pod-zakaz',
    category: 'Торговое оборудование',
    title: 'Стеллажи под заказ vs готовые: что выгоднее для магазина',
    excerpt:
      'Посчитали реальные цифры: стоимость, сроки, срок службы. Спойлер: готовые решения дешевле только на старте.',
    date: '14 марта 2026',
    readTime: '5 мин',
    seed: 'retail-shelving-store',
    featured: false,
  },
  {
    id: 5,
    slug: 'uhod-za-metallicheskimi-izdeliyami',
    category: 'Советы',
    title: 'Уход за металлическими изделиями: как сохранить покрытие на годы',
    excerpt:
      'Простые правила чистки и хранения, которые продлят жизнь любому металлическому изделию — будь то мебель или конструкция.',
    date: '5 марта 2026',
    readTime: '3 мин',
    seed: 'metal-cleaning-maintenance',
    featured: false,
  },
  {
    id: 6,
    slug: 'pokraska-ili-galvanika',
    category: 'Технологии',
    title: 'Покраска или гальваника: какое покрытие выдержит дольше',
    excerpt:
      'Сравниваем два популярных способа защиты металла от коррозии: порошковую покраску и цинкование. Берём реальные условия Москвы.',
    date: '20 февраля 2026',
    readTime: '5 мин',
    seed: 'powder-coating-metal',
    featured: false,
  },
  {
    id: 7,
    slug: 'retsepshn-dlya-ofisa',
    category: 'Торговое оборудование',
    title: 'Ресепшн из металла для офиса: на что обратить внимание при заказе',
    excerpt:
      'Стойка ресепшн — первое, что видит клиент. Рассказываем, как правильно поставить задачу производителю и не переплатить.',
    date: '10 февраля 2026',
    readTime: '4 мин',
    seed: 'reception-desk-office-metal',
    featured: false,
  },
  {
    id: 8,
    slug: 'naruzhnyy-fasad-trebovaniya',
    category: 'Технологии',
    title: 'Наружная реклама на фасаде: требования Москвы и как их не нарушить',
    excerpt:
      'Правила размещения вывесок в столице обновились. Рассказываем, что изменилось, какие штрафы грозят нарушителям и как согласовать конструкцию быстро.',
    date: '28 января 2026',
    readTime: '7 мин',
    seed: 'facade-sign-installation-city',
    featured: false,
  },
  {
    id: 9,
    slug: 'svetodiodnye-ekrany-vybor',
    category: 'Торговое оборудование',
    title: 'Как выбрать светодиодный экран: пиксельный шаг, яркость и способ монтажа',
    excerpt:
      'P4, P6, P10 — разбираем, что означает пиксельный шаг и при каком расстоянии от зрителя какой экран работает лучше.',
    date: '15 января 2026',
    readTime: '6 мин',
    seed: 'led-screen-outdoor-bright',
    featured: false,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export const blogCategories = [
  'Все статьи',
  'Технологии',
  'Дизайн и стиль',
  'Советы',
  'Торговое оборудование',
];
