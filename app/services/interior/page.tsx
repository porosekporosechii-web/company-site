import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Интерьерные вывески',
  description:
    'Объёмные буквы, металлические логотипы и декоративные панели для офисов, ресторанов и торговых залов. Нержавейка, алюминий, чёрный металл.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'bukvy-interior',
    num: '01',
    title: 'Объёмные буквы',
    description: 'Металлические буквы для рецепций, переговорных и торговых залов. Нержавейка, алюминий, чёрный металл — высота от 5 до 150 см.',
    items: [
      { label: 'Буквы из нержавеющей стали', seed: 'stainless-steel-letters-interior' },
      { label: 'Алюминиевые буквы', seed: 'aluminum-letters-wall' },
      { label: 'Буквы из чёрного металла', seed: 'black-metal-letters-office' },
      { label: 'С LED-подсветкой', seed: 'backlit-letters-reception' },
      { label: 'Матовая и зеркальная полировка', seed: 'mirror-polish-letters' },
      { label: 'Высота от 5 до 150 см', seed: 'large-interior-letters' },
    ],
  },
  {
    id: 'logotipy',
    num: '02',
    title: 'Логотипы и знаки',
    description: 'Металлические логотипы компаний на стены, ресепшн и стекло. Зеркальная полировка или покраска в корпоративный цвет бренда.',
    items: [
      { label: 'Металлические логотипы компаний', seed: 'metal-logo-company-wall' },
      { label: 'Знаки на ресепшн', seed: 'reception-logo-sign' },
      { label: 'Логотипы на стекло', seed: 'glass-logo-sign' },
      { label: 'Зеркальная полировка', seed: 'mirror-polished-logo' },
      { label: 'Покраска в корпоративный цвет', seed: 'corporate-color-logo-sign' },
      { label: 'Крепление без видимого крепежа', seed: 'hidden-mount-logo-sign' },
    ],
  },
  {
    id: 'paneli',
    num: '03',
    title: 'Декоративные панели',
    description: 'Перфорированные и резные металлические панели для зонирования пространства, декора стен и создания акцентов.',
    items: [
      { label: 'Перфорированные металлические панели', seed: 'perforated-metal-panel-wall' },
      { label: 'Резные декоративные экраны', seed: 'laser-cut-metal-screen' },
      { label: 'Зонирующие перегородки', seed: 'metal-partition-zoning' },
      { label: 'Панели для акцентных стен', seed: 'accent-wall-metal-panel' },
      { label: 'Геометрические узоры и орнаменты', seed: 'geometric-pattern-metal' },
      { label: 'Любой формат и рисунок', seed: 'custom-cut-metal-decor' },
    ],
  },
  {
    id: 'tablički',
    num: '04',
    title: 'Навигационные таблички',
    description: 'Системы навигации для офисов, торговых центров и гостиниц. Единый стиль серии, любой тираж, монтаж и замена.',
    items: [
      { label: 'Системы навигации для офисов', seed: 'office-wayfinding-system' },
      { label: 'Таблички для торговых центров', seed: 'mall-directory-sign' },
      { label: 'Гостиничная навигация', seed: 'hotel-wayfinding-sign' },
      { label: 'Единый стиль серии', seed: 'unified-sign-series' },
      { label: 'Любой тираж', seed: 'signage-production-bulk' },
      { label: 'Монтаж и замена вставок', seed: 'sign-installation-update' },
    ],
  },
  {
    id: 'restorany',
    num: '05',
    title: 'Ресторанные вывески',
    description: 'Художественные вывески и надписи в интерьере заведений. Состаренный металл, патинирование, лофт-эстетика.',
    items: [
      { label: 'Художественные надписи в интерьере', seed: 'restaurant-interior-letters' },
      { label: 'Вывески из состаренного металла', seed: 'aged-metal-sign-restaurant' },
      { label: 'Патинирование и браширование', seed: 'patina-brushed-metal-sign' },
      { label: 'Меню-борды', seed: 'menu-board-restaurant' },
      { label: 'Декоративные слова и фразы', seed: 'decorative-words-cafe' },
      { label: 'Нестандартные шрифты и стили', seed: 'custom-font-sign-interior' },
    ],
  },
  {
    id: 'nomera',
    num: '06',
    title: 'Номерные знаки',
    description: 'Таблички для кабинетов, номеров отелей и парковочных мест. Любой размер, покрытие и тираж.',
    items: [
      { label: 'Таблички для кабинетов', seed: 'office-door-number-sign' },
      { label: 'Номера отельных номеров', seed: 'hotel-room-number-plate' },
      { label: 'Парковочные знаки', seed: 'parking-number-sign' },
      { label: 'Противопожарная маркировка', seed: 'fire-safety-sign-metal' },
      { label: 'Шрифт Брайля', seed: 'braille-sign-accessibility' },
      { label: 'Любое покрытие и цвет', seed: 'sign-coating-color-options' },
    ],
  },
  {
    id: 'art',
    num: '07',
    title: 'Арт-объекты',
    description: 'Декоративные металлические инсталляции, скульптурные элементы и настенный декор для уникальных интерьеров.',
    items: [
      { label: 'Металлические инсталляции', seed: 'metal-art-installation-interior' },
      { label: 'Скульптурные элементы', seed: 'metal-sculpture-interior' },
      { label: 'Настенный металлический декор', seed: 'wall-metal-art-decor' },
      { label: 'Объёмные композиции', seed: 'volumetric-metal-composition' },
      { label: 'Любой масштаб', seed: 'large-scale-metal-art' },
      { label: 'Уникальные изделия по эскизам', seed: 'bespoke-metal-artwork' },
    ],
  },
  {
    id: 'nestandart',
    num: '08',
    title: 'Нестандартные решения',
    description: 'Изготовление по эскизам, 3D-моделям и чертежам заказчика. Любая геометрия, сложность и комбинирование материалов.',
    items: [
      { label: 'Изготовление по эскизам заказчика', seed: 'custom-sketch-metalwork' },
      { label: '3D-моделирование и прототипирование', seed: '3d-modeling-metal-prototype' },
      { label: 'Сложная геометрия и формы', seed: 'complex-geometry-metal' },
      { label: 'Комбинирование материалов', seed: 'mixed-material-metal-wood' },
      { label: 'Лимитированные серии', seed: 'limited-series-metalwork' },
      { label: 'Проект любой сложности', seed: 'complex-metal-project' },
    ],
  },
];

export default function InteriorPage() {
  return (
    <main>
      <ServiceHero
        title="Интерьерные"
        highlight="вывески"
        subtitle="Объёмные буквы, металлические логотипы и декоративные элементы для офисов, ресторанов, отелей и торговых залов. Нержавейка, алюминий, чёрный металл — покраска RAL или полировка."
        tag="04 · Интерьерные вывески"
        backgroundImage="/banner-services.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Интерьерные вывески' },
        ]}
      />

      <ServiceBlocks blocks={blocks} />

      <section className="py-16 bg-graphite border-t border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-snow font-bold text-xl mb-1">Нужен расчёт стоимости?</p>
            <p className="text-muted text-sm">Ответим в течение 30 минут, выезд на замер бесплатно</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/contacts" className="px-8 py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors">
              Оставить заявку
            </Link>
            <Link href="/services" className="px-8 py-4 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors">
              Все услуги
            </Link>
          </div>
        </div>
      </section>

      <Feedback />
    </main>
  );
}
