import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'vitriny',
    num: '01',
    title: 'Витрины',
    description: 'Оформление витрин — первое, что видит покупатель. Создаём визуальные решения, которые останавливают взгляд и усиливают продажи.',
    items: [
      { label: 'Оформление торговых витрин',          seed: 'shop-window-display-luxury',   img: '/images/portfolio/nakleki-na-vitriny/portfolio-002/portfolio-002.webp' },
      { label: 'Сезонное украшение и праздничный декор', seed: 'christmas-store-decoration', img: '/images/portfolio/sezonnoe-oformlenie/oromlenie-1/portfolio-023.webp' },
      { label: 'Тематические витринные инсталляции',  seed: 'fashion-window-installation',  img: '/images/portfolio/nakleki-na-vitriny/portfolio-003/portfolio-003.webp' },
      { label: 'Стикеры и плёнки на стекло',          seed: 'glass-film-window-branding',   img: '/images/portfolio/nakleki-na-vitriny/portfolio-004/portfolio-004.webp' },
      { label: 'Объёмные декоративные элементы',      seed: 'volumetric-display-prop',      img: '/images/portfolio/nakleki-na-vitriny/portfolio-005/portfolio-005.webp' },
      { label: 'Подсветка и световые акценты',        seed: 'window-lighting-retail',       img: '/images/portfolio/nakleki-na-vitriny/portfolio-006/portfolio-006.webp' },
    ],
  },
  {
    id: 'pos',
    num: '02',
    title: 'POS-материалы',
    description: 'Рекламные материалы в точке продаж, которые направляют покупателя и стимулируют покупку прямо у полки.',
    items: [
      { label: 'Шелфтокеры и стопперы',              seed: 'shelf-talker-stopper-retail',  img: '/images/portfolio/oformlenie-mest-prodazh/brend-voll/portfolio-235.webp' },
      { label: 'Воблеры и ценникодержатели',          seed: 'wobbler-price-holder-shop',    img: '/images/portfolio/oformlenie-mest-prodazh/portfolio-236/portfolio-236.webp' },
      { label: 'Дисплеи и подставки под продукцию',   seed: 'product-display-stand',        img: '/images/portfolio/oformlenie-mest-prodazh/portfolio-241/portfolio-241.webp' },
      { label: 'Промостойки и флорстендеры',          seed: 'promo-floor-stand-display',    img: '/images/portfolio/oformlenie-mest-prodazh/portfolio-242/portfolio-242.webp' },
      { label: 'Мобайлы и подвесные конструкции',     seed: 'hanging-mobile-retail',        img: '/images/portfolio/oformlenie-mest-prodazh/navigatsiya/portfolio-250.webp' },
      { label: 'Брошюрницы и диспенсеры',             seed: 'brochure-dispenser-holder',    img: '/images/portfolio/oformlenie-mest-prodazh/portfolio-243/portfolio-243.webp' },
    ],
  },
  {
    id: 'led',
    num: '03',
    title: 'Светодиодные экраны',
    description: 'Динамичный контент притягивает внимание лучше статичной графики. Экраны любого формата для витрин, торговых залов и фасадов.',
    items: [
      { label: 'Витринные и прикассовые экраны',      seed: 'led-screen-checkout-retail',   img: '/images/portfolio/svetodiodnye-ekrany/ekran-1/portfolio-205.webp' },
      { label: 'Интерьерные LED-панели',              seed: 'led-interior-panel-display',   img: '/images/portfolio/svetodiodnye-ekrany/portfolio-198/portfolio-198.webp' },
      { label: 'Видеостены и видеокубы',              seed: 'video-wall-led-indoor',        img: '/images/portfolio/svetodiodnye-ekrany/portfolio-199/portfolio-199.webp' },
      { label: 'Наружные рекламные экраны',           seed: 'outdoor-led-advertising-screen', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-201/portfolio-201.webp' },
      { label: 'Прозрачные LED-экраны для витрин',    seed: 'transparent-led-window-screen', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-202/portfolio-202.webp' },
      { label: 'Бегущие строки и табло',              seed: 'led-ticker-information-board',  img: '/images/portfolio/svetodiodnye-ekrany/portfolio-203/portfolio-203.webp' },
    ],
  },
  {
    id: 'lightbox',
    num: '04',
    title: 'Текстильные лайтбоксы',
    description: 'Тонкие, яркие и быстро меняемые — текстильные лайтбоксы идеальны для сезонных кампаний и брендирования пространства.',
    items: [
      { label: 'Пристенные текстильные лайтбоксы',   seed: 'fabric-lightbox-wall-retail',  img: '/images/portfolio/tekstilnye-laytboksy/portfolio-217/portfolio-217.webp' },
      { label: 'Подвесные световые конструкции',      seed: 'hanging-light-box-ceiling',    img: '/images/portfolio/tekstilnye-laytboksy/portfolio-218/portfolio-218.webp' },
      { label: 'Двусторонние лайтбоксы',             seed: 'double-sided-lightbox-display', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-219/portfolio-219.webp' },
      { label: 'Нестандартные формы и форматы',       seed: 'custom-shape-lightbox',        img: '/images/portfolio/tekstilnye-laytboksy/portfolio-221/portfolio-221.webp' },
      { label: 'Печать и замена полотен',             seed: 'textile-print-fabric-banner',  img: '/images/portfolio/tekstilnye-laytboksy/portfolio-222/portfolio-222.webp' },
      { label: 'Монтаж и обслуживание',              seed: 'lightbox-installation-service', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-223/portfolio-223.webp' },
    ],
  },
  {
    id: 'vyveski',
    num: '05',
    title: 'Вывески',
    description: 'Фасадные и интерьерные вывески, объёмные буквы и логотипы — создаём визуальную идентичность торговой точки.',
    items: [
      { label: 'Фасадные вывески и панели',           seed: 'facade-sign-building-exterior', img: '/images/portfolio/vyveski/portfolio-040/portfolio-040.webp' },
      { label: 'Объёмные световые буквы',             seed: 'illuminated-3d-letters-sign',   img: '/images/portfolio/vyveski/portfolio-043/portfolio-043.webp' },
      { label: 'Металлические логотипы и знаки',      seed: 'metal-logo-sign-interior',      img: '/images/portfolio/interernye-vyveski/portfolio-075/portfolio-075.webp' },
      { label: 'Интерьерные навигационные таблички',  seed: 'navigation-sign-office',        img: '/images/portfolio/interernye-vyveski/portfolio-076/portfolio-076.webp' },
      { label: 'Вывески над входом',                  seed: 'entrance-sign-storefront',      img: '/images/portfolio/vyveski/portfolio-046/portfolio-046.webp' },
      { label: 'Панель-кронштейны',                   seed: 'bracket-sign-wall-mount',       img: '/images/portfolio/panel-kronshteyn/portfolio-191/portfolio-191.webp' },
    ],
  },
  {
    id: 'equipment',
    num: '06',
    title: 'Торговое оборудование',
    description: 'Производим металлическое оборудование для магазинов и шоурумов: вешала, ресепшн-стойки, полки и нестандартные конструкции. Проектируем под фирменный стиль и планировку торгового зала.',
    items: [
      { label: 'Вешала и стойки для одежды',        seed: 'wall-rail-clothing-system',      img: '/retail/pristavnye-reily.jpg' },
      { label: 'Ресепшн-стойки',                    seed: 'reception-desk-boutique',        img: '/retail/reception-1.jpg' },
      { label: 'Металлические и деревянные полки',  seed: 'wood-metal-shelf-display',       img: '/retail/polki-1.jpg' },
      { label: 'Уникальное торговое оборудование',  seed: 'custom-retail-design-sketch',    img: '/retail/unique-1.jpg' },
      { label: 'Лук-стойки',                        seed: 'look-stand-collection',          img: '/retail/luk-stoyki.jpg' },
      { label: 'Консоли',                           seed: 'floor-console-clothing-display', img: '/retail/napolnye-konsoli.jpg' },
    ],
  },
  {
    id: 'interior-signs',
    num: '07',
    title: 'Интерьерные вывески',
    description: 'Производим интерьерные вывески для магазинов, торговых зон, шоурумов, офисов и коммерческих пространств. Создаём решения, которые поддерживают фирменный стиль, помогают оформить пространство и делают бренд заметнее внутри помещения.',
    items: [
      { label: 'Объёмные буквы и логотипы',               seed: 'interior-3d-letters-logo-wall',    img: '/images/portfolio/interernye-vyveski/portfolio-077/portfolio-077.webp' },
      { label: 'Световые интерьерные вывески',             seed: 'interior-illuminated-sign-retail', img: '/images/portfolio/interernye-vyveski/portfolio-078/portfolio-078.webp' },
      { label: 'Неоновые LED-надписи',                     seed: 'neon-led-interior-lettering',      img: '/images/portfolio/interernye-vyveski/portfolio-079/portfolio-079.webp' },
      { label: 'Акриловые и композитные конструкции',      seed: 'acrylic-composite-interior-sign',  img: '/images/portfolio/interernye-vyveski/portfolio-080/portfolio-080.webp' },
      { label: 'Навигационные и декоративные элементы',    seed: 'navigation-decorative-retail-space', img: '/images/portfolio/interernye-vyveski/portfolio-081/portfolio-081.webp' },
    ],
  },
  {
    id: 'reception',
    num: '08',
    title: 'Ресепшн-стойки',
    description: 'Стойка администратора — лицо торговой точки. Изготавливаем под размер, стиль и задачи каждого объекта.',
    items: [
      { label: 'Стойки для магазинов и бутиков',    seed: 'reception-desk-boutique',    img: '/retail/reception-1.jpg' },
      { label: 'Ресепшн для салонов красоты',        seed: 'beauty-salon-reception-desk', img: '/retail/reception-2.jpg' },
      { label: 'Стойки для аптек и медцентров',      seed: 'pharmacy-counter-desk',       img: '/retail/reception-3.jpg' },
      { label: 'Барные и кофейные стойки',           seed: 'bar-coffee-counter',          img: '/retail/reception-4.jpg' },
      { label: 'Встроенные тумбы и полки',           seed: 'built-in-cabinet-reception',  img: '/retail/reception-5.jpg' },
      { label: 'Покраска в корпоративный цвет RAL',  seed: 'ral-powder-coat-metal',       img: '/retail/reception-6.jpg' },
    ],
  },
];

export function PosBlocks() {
  return <ServiceBlocks blocks={blocks} />;
}
