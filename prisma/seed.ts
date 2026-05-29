/**
 * Seed script — migrates the existing hardcoded content into SQLite.
 * Run:  npm run db:seed
 *
 * Idempotent: uses upsert on slugs/keys so re-running won't duplicate.
 */
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// ────────────────────────────────────────────────────────────────
// Portfolio works (sourced from components/PortfolioGallery.tsx)
// ────────────────────────────────────────────────────────────────
const works: Array<{
  slug: string;
  title: string;
  category: string;
  description?: string;
  mainImage: string;
  gallery?: string[];
  specs?: Record<string, string>;
}> = [
  {
    slug: 'pos-clothing-store',
    title: 'Оформление магазина одежды',
    category: 'Оформление мест продаж',
    mainImage: 'https://picsum.photos/seed/pos-clothing-store/1200/900',
    description:
      'Комплексное оформление флагманского магазина одежды площадью 280 м². Концепция, торговое оборудование, навигация и декор — в единой фирменной стилистике.',
    specs: {
      Площадь: '280 м²',
      'Срок реализации': '6 недель',
      'Тип объекта': 'Флагманский магазин',
      Монтаж: 'Под ключ',
    },
  },
  {
    slug: 'pos-brand-zone',
    title: 'Бренд-зона в торговом центре',
    category: 'Оформление мест продаж',
    mainImage: 'https://picsum.photos/seed/pos-brand-zone/1200/900',
    description:
      'Брендированная зона shop-in-shop в торговом центре. Конструкция, графика, подсветка, навигация — за 3 недели от утверждения макета до открытия.',
    specs: {
      Площадь: '42 м²',
      'Срок реализации': '3 недели',
      Подсветка: 'LED по периметру',
      Материалы: 'Металл, ЛДСП, акрил',
    },
  },
  {
    slug: 'retail-shelving',
    title: 'Стеллажи для торгового зала',
    category: 'Торговое оборудование',
    mainImage: '/works/work-2.jpg',
    gallery: ['/works/work-3.jpg', '/works/work-4.jpg'],
    description:
      'Серия торговых стеллажей под индивидуальный проект магазина. Разная высота, нагрузка до 200 кг на полку, покраска RAL по корпоративному стандарту.',
    specs: {
      'Тип конструкции': 'Пристенные и островные',
      'Нагрузка на полку': 'до 200 кг',
      Покрытие: 'Порошковая покраска RAL',
      Монтаж: 'На объекте',
    },
  },
  {
    slug: 'retail-production-object',
    title: 'Производственный объект',
    category: 'Торговое оборудование',
    mainImage: '/works/work-7.jpg',
    gallery: ['/works/work-8.jpg', '/works/work-9.jpg', '/works/work-1.jpg'],
    description:
      'Изготовление металлоконструкций для производственного цеха клиента. Сварка, гибка, покраска, доставка и монтаж на площадке.',
    specs: {
      Материал: 'Профильная труба, листовой металл',
      Покрытие: 'Грунт + порошковая покраска',
      Срок: '4 недели',
    },
  },
  {
    slug: 'retail-custom-metal',
    title: 'Оборудование из металла',
    category: 'Торговое оборудование',
    mainImage: '/works/work-10.jpg',
    gallery: ['/works/work-5.jpg', '/works/work-6.jpg'],
    description:
      'Нестандартное торговое оборудование по эскизу заказчика: проектирование, изготовление и финишная отделка в собственном цехе.',
    specs: {
      'Тип конструкции': 'Уникальная',
      Материал: 'Чёрный металл',
      Производство: 'Собственный цех 800 м²',
    },
  },
  {
    slug: 'outdoor-restaurant-sign',
    title: 'Фасадная вывеска для ресторана',
    category: 'Наружная реклама',
    mainImage: 'https://picsum.photos/seed/outdoor-restaurant-sign/1200/900',
    description:
      'Фасадная вывеска с объёмными буквами и контражурной подсветкой. Изготовление, согласование и монтаж — под ключ.',
    specs: {
      'Тип конструкции': 'Объёмные буквы',
      Подсветка: 'Контражурная LED',
      'Материал лицевой части': 'Композитный алюминий',
      Монтаж: 'Высотный, с автовышки',
    },
  },
  {
    slug: 'led-outdoor-billboard',
    title: 'Уличный рекламный экран',
    category: 'Светодиодные экраны',
    mainImage: 'https://picsum.photos/seed/led-outdoor-billboard/1200/900',
    description:
      'Наружный светодиодный экран P5 с защитой IP65. Проектирование металлоконструкции, монтаж, настройка контента.',
    specs: {
      'Шаг пикселя': 'P5',
      Защита: 'IP65',
      Яркость: '6500 нит',
      Управление: 'CMS, удалённое',
    },
  },
  {
    slug: 'decor-christmas-mall',
    title: 'Новогоднее оформление ТЦ',
    category: 'Декорации',
    mainImage: 'https://picsum.photos/seed/decor-christmas-mall/1200/900',
    description:
      'Праздничное оформление атриума торгового центра: подвесные конструкции, ёлка 7 м, фотозона, гирлянды по периметру.',
    specs: {
      'Высота ёлки': '7 м',
      Цикл: 'Монтаж + хранение + повторный монтаж',
    },
  },
  {
    slug: 'textile-lightbox-retail-store',
    title: 'SEG-лайтбоксы для магазина одежды',
    category: 'Текстильные лайтбоксы',
    mainImage: 'https://picsum.photos/seed/textile-lightbox-retail-store/1200/900',
    description:
      'Серия SEG-лайтбоксов с быстрой сменой полотна для сезонных кампаний. Алюминиевая рамка, силиконовый кант, LED-подсветка.',
    specs: {
      Тип: 'SEG (Silicone Edge Graphics)',
      'Толщина рамки': '80 мм',
      Подсветка: 'LED равномерная',
    },
  },
];

// ────────────────────────────────────────────────────────────────
// Blog posts (sourced from app/blog/page.tsx)
// ────────────────────────────────────────────────────────────────
const posts: Array<{
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  readTime: string;
  date: Date;
  featured: boolean;
}> = [
  {
    slug: 'kak-vybrat-metall-dlya-lestnicy',
    category: 'Советы',
    title: 'Как выбрать металл для лестницы: сравниваем нержавейку, чёрный металл и алюминий',
    excerpt:
      'Каждый металл имеет свои плюсы и минусы в зависимости от условий эксплуатации, бюджета и эстетических требований. Разбираем подробно.',
    content:
      '## Нержавеющая сталь\n\nКлассика для лестниц. Не ржавеет, выглядит дорого. Дороже остальных вариантов в 2-3 раза.\n\n## Чёрный металл\n\nДоступная база с порошковой покраской. Требует регулярного ухода.\n\n## Алюминий\n\nЛёгкий, не подвержен коррозии, но дороже чёрного металла.',
    readTime: '5 мин',
    date: new Date('2026-04-12'),
    featured: true,
  },
  {
    slug: 'loft-mebel-trendy-2026',
    category: 'Дизайн и стиль',
    title: 'Лофт-мебель в 2026: актуальные тренды и форматы',
    excerpt:
      'Металл и дерево снова в тренде. Рассказываем, какие решения заказывают дизайнеры и какие размеры стали самыми популярными.',
    content: 'TODO: основной текст статьи.',
    readTime: '4 мин',
    date: new Date('2026-04-03'),
    featured: false,
  },
  {
    slug: 'mig-tig-sravnenie',
    category: 'Технологии',
    title: 'MIG против TIG: в чём разница и когда какую сварку выбирать',
    excerpt:
      'Оба метода применяются в металлообработке, но для разных задач. Простое объяснение без лишнего профессионального жаргона.',
    content: 'TODO: основной текст статьи.',
    readTime: '6 мин',
    date: new Date('2026-03-25'),
    featured: false,
  },
  {
    slug: 'torgovye-stellazhi-pod-zakaz',
    category: 'Торговое оборудование',
    title: 'Стеллажи под заказ vs готовые: что выгоднее для магазина',
    excerpt:
      'Посчитали реальные цифры: стоимость, сроки, срок службы. Спойлер: готовые решения дешевле только на старте.',
    content: 'TODO: основной текст статьи.',
    readTime: '5 мин',
    date: new Date('2026-03-14'),
    featured: false,
  },
  {
    slug: 'uhod-za-metallicheskimi-izdeliyami',
    category: 'Советы',
    title: 'Уход за металлическими изделиями: как сохранить покрытие на годы',
    excerpt:
      'Простые правила чистки и хранения, которые продлят жизнь любому металлическому изделию — будь то мебель или конструкция.',
    content: 'TODO: основной текст статьи.',
    readTime: '3 мин',
    date: new Date('2026-03-05'),
    featured: false,
  },
];

// ────────────────────────────────────────────────────────────────
// Partners (sourced from components/Partners.tsx)
// ────────────────────────────────────────────────────────────────
const partners = [
  { name: 'СтройГрупп', field: 'Строительство' },
  { name: 'Loft Studio', field: 'Дизайн интерьеров' },
  { name: 'МегаТорг', field: 'Торговые сети' },
  { name: 'АрхМастер', field: 'Архитектура' },
  { name: 'ТехноПром', field: 'Промышленность' },
  { name: 'Urban Space', field: 'Девелопмент' },
  { name: 'АвтоДилер Групп', field: 'Автосалоны' },
  { name: 'Форт Ритейл', field: 'Ритейл' },
  { name: 'КофеХаус', field: 'HoReCa' },
  { name: 'МедТехника', field: 'Медицина' },
];

// ────────────────────────────────────────────────────────────────
// Service directions (sourced from lib/company.ts + components/Services.tsx)
// ────────────────────────────────────────────────────────────────
const directions = [
  {
    slug: 'pos',
    tag: '01',
    title: 'Оформление мест продаж',
    description: 'Брендинг торговых пространств, витрины, навигация',
    image: '/banner-pos.png',
  },
  {
    slug: 'retail',
    tag: '02',
    title: 'Торговое оборудование',
    description: 'Витрины, стеллажи, ресепшн-стойки из металла',
    image: '/banner-retail.png',
  },
  {
    slug: 'outdoor',
    tag: '03',
    title: 'Наружная реклама',
    description: 'Вывески, объёмные буквы, крышные установки',
    image: '/banner-outdoor.png',
  },
  {
    slug: 'led',
    tag: '04',
    title: 'Светодиодные экраны',
    description: 'LED-панели для интерьера и наружной рекламы',
    image: '/banner-led.png',
  },
  {
    slug: 'decor',
    tag: '05',
    title: 'Декорации',
    description: 'Праздничное оформление, арт-объекты, инсталляции',
    image: '/banner-decor.png',
  },
  {
    slug: 'textile',
    tag: '06',
    title: 'Текстильные лайтбоксы',
    description: 'SEG-рамки, потолочные и витринные лайтбоксы',
    image: '/banner-textile.png',
  },
];

// ────────────────────────────────────────────────────────────────
// Settings — company info + homepage texts
// ────────────────────────────────────────────────────────────────
const settings = {
  'company.name': 'МеталлЛофт',
  'company.legalName': 'ООО «МеталлЛофт»',
  'company.phone': '+7 (495) 123-45-67',
  'company.phoneHref': 'tel:+74951234567',
  'company.phoneAlt': '+7 (916) 000-11-22',
  'company.email': 'info@rauco.ru',
  'company.addressCity': 'г. Москва',
  'company.addressStreet': 'ул. Промышленная, д. 12, стр. 3',
  'company.metro': 'Печатники',
  'company.hoursWeekdays': 'Пн–Пт: 9:00 – 18:00',
  'company.hoursSaturday': 'Сб: 10:00 – 15:00',
  'company.inn': '7701234567',
  'company.kpp': '770101001',
  'company.ogrn': '1147700123456',
  'company.legalAddress': 'г. Москва, ул. Промышленная, д. 12, стр. 3',
  'company.telegram': 'https://t.me/',
  'company.whatsapp': 'https://wa.me/74951234567',
  'company.founded': 2014,
  'stats.yearsOnMarket': '10+',
  'stats.completedOrders': '500+',
  'stats.workshopArea': '800',
  'stats.teamSize': '14',
  'hero.title': 'Оформление мест продаж',
  'hero.titleHighlight': 'любой сложности',
  'hero.subtitle':
    'Производим сварные конструкции, лофт-мебель из металла и дерева, стеллажи и витрины для торговли. Работаем с юридическими и физическими лицами.',
};

// ────────────────────────────────────────────────────────────────
// Seed runner
// ────────────────────────────────────────────────────────────────
async function main() {
  console.log('Seeding works…');
  for (let i = 0; i < works.length; i++) {
    const w = works[i];
    await db.work.upsert({
      where: { slug: w.slug },
      update: {},
      create: {
        slug: w.slug,
        title: w.title,
        category: w.category,
        description: w.description ?? null,
        mainImage: w.mainImage,
        galleryJson: JSON.stringify(w.gallery ?? []),
        specsJson: JSON.stringify(w.specs ?? {}),
        order: i * 10,
        published: true,
      },
    });
  }

  console.log('Seeding posts…');
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await db.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.coverImage ?? null,
        readTime: p.readTime,
        date: p.date,
        featured: p.featured,
        published: true,
      },
    });
  }

  console.log('Seeding partners…');
  // Wipe-and-reseed partners since they have no natural unique key (besides id).
  const existingPartners = await db.partner.count();
  if (existingPartners === 0) {
    for (let i = 0; i < partners.length; i++) {
      await db.partner.create({
        data: { ...partners[i], order: i * 10 },
      });
    }
  }

  console.log('Seeding directions…');
  for (let i = 0; i < directions.length; i++) {
    const d = directions[i];
    await db.serviceDirection.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        slug: d.slug,
        tag: d.tag,
        title: d.title,
        description: d.description,
        image: d.image,
        itemsJson: '[]',
        order: i * 10,
        published: true,
      },
    });
  }

  console.log('Seeding settings…');
  for (const [key, value] of Object.entries(settings)) {
    await db.setting.upsert({
      where: { key },
      update: {},
      create: { key, value: JSON.stringify(value) },
    });
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
