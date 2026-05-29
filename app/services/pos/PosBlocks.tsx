import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'vitriny',
    num: '01',
    title: 'Витрины',
    description: 'Оформление витрин — первое, что видит покупатель. Создаём визуальные решения, которые останавливают взгляд и усиливают продажи.',
    items: [
      { label: 'Оформление торговых витрин', seed: 'shop-window-display-luxury' },
      { label: 'Сезонное украшение и праздничный декор', seed: 'christmas-store-decoration' },
      { label: 'Тематические витринные инсталляции', seed: 'fashion-window-installation' },
      { label: 'Стикеры и плёнки на стекло', seed: 'glass-film-window-branding' },
      { label: 'Объёмные декоративные элементы', seed: 'volumetric-display-prop' },
      { label: 'Подсветка и световые акценты', seed: 'window-lighting-retail' },
    ],
  },
  {
    id: 'pos',
    num: '02',
    title: 'POS-материалы',
    description: 'Рекламные материалы в точке продаж, которые направляют покупателя и стимулируют покупку прямо у полки.',
    items: [
      { label: 'Шелфтокеры и стопперы', seed: 'shelf-talker-stopper-retail' },
      { label: 'Воблеры и ценникодержатели', seed: 'wobbler-price-holder-shop' },
      { label: 'Дисплеи и подставки под продукцию', seed: 'product-display-stand' },
      { label: 'Промостойки и флорстендеры', seed: 'promo-floor-stand-display' },
      { label: 'Мобайлы и подвесные конструкции', seed: 'hanging-mobile-retail' },
      { label: 'Брошюрницы и диспенсеры', seed: 'brochure-dispenser-holder' },
    ],
  },
  {
    id: 'led',
    num: '03',
    title: 'Светодиодные экраны',
    description: 'Динамичный контент притягивает внимание лучше статичной графики. Экраны любого формата для витрин, торговых залов и фасадов.',
    items: [
      { label: 'Витринные и прикассовые экраны', seed: 'led-screen-checkout-retail' },
      { label: 'Интерьерные LED-панели', seed: 'led-interior-panel-display' },
      { label: 'Видеостены и видеокубы', seed: 'video-wall-led-indoor' },
      { label: 'Наружные рекламные экраны', seed: 'outdoor-led-advertising-screen' },
      { label: 'Прозрачные LED-экраны для витрин', seed: 'transparent-led-window-screen' },
      { label: 'Бегущие строки и табло', seed: 'led-ticker-information-board' },
    ],
  },
  {
    id: 'lightbox',
    num: '04',
    title: 'Текстильные лайтбоксы',
    description: 'Тонкие, яркие и быстро меняемые — текстильные лайтбоксы идеальны для сезонных кампаний и брендирования пространства.',
    items: [
      { label: 'Пристенные текстильные лайтбоксы', seed: 'fabric-lightbox-wall-retail' },
      { label: 'Подвесные световые конструкции', seed: 'hanging-light-box-ceiling' },
      { label: 'Двусторонние лайтбоксы', seed: 'double-sided-lightbox-display' },
      { label: 'Нестандартные формы и форматы', seed: 'custom-shape-lightbox' },
      { label: 'Печать и замена полотен', seed: 'textile-print-fabric-banner' },
      { label: 'Монтаж и обслуживание', seed: 'lightbox-installation-service' },
    ],
  },
  {
    id: 'vyveski',
    num: '05',
    title: 'Вывески',
    description: 'Фасадные и интерьерные вывески, объёмные буквы и логотипы — создаём визуальную идентичность торговой точки.',
    items: [
      { label: 'Фасадные вывески и панели', seed: 'facade-sign-building-exterior' },
      { label: 'Объёмные световые буквы', seed: 'illuminated-3d-letters-sign' },
      { label: 'Металлические логотипы и знаки', seed: 'metal-logo-sign-interior' },
      { label: 'Интерьерные навигационные таблички', seed: 'navigation-sign-office' },
      { label: 'Вывески над входом', seed: 'entrance-sign-storefront' },
      { label: 'Панель-кронштейны', seed: 'bracket-sign-wall-mount' },
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
      { label: 'Объёмные буквы и логотипы',                        seed: 'interior-3d-letters-logo-wall' },
      { label: 'Световые интерьерные вывески',                     seed: 'interior-illuminated-sign-retail' },
      { label: 'Неоновые LED-надписи',                             seed: 'neon-led-interior-lettering' },
      { label: 'Акриловые и композитные конструкции',              seed: 'acrylic-composite-interior-sign' },
      { label: 'Навигационные и декоративные элементы',            seed: 'navigation-decorative-retail-space' },
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
