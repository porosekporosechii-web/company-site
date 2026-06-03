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
import { RequestButton } from '@/components/RequestButton';

const I = (n: number) => `/images/portfolio/interernye-vyveski/portfolio-0${n}/portfolio-0${n}.webp`;

const blocks: ServiceBlock[] = [
  {
    id: 'bukvy-interior',
    num: '01',
    title: 'Объёмные буквы',
    description: 'Металлические буквы для рецепций, переговорных и торговых залов. Нержавейка, алюминий, чёрный металл — высота от 5 до 150 см.',
    items: [
      { label: 'Буквы из нержавеющей стали',    seed: 'stainless-steel-letters-interior', img: I(75) },
      { label: 'Алюминиевые буквы',              seed: 'aluminum-letters-wall',            img: I(76) },
      { label: 'Буквы из чёрного металла',       seed: 'black-metal-letters-office',       img: I(77) },
      { label: 'С LED-подсветкой',               seed: 'backlit-letters-reception',        img: I(78) },
      { label: 'Матовая и зеркальная полировка', seed: 'mirror-polish-letters',            img: I(79) },
      { label: 'Высота от 5 до 150 см',          seed: 'large-interior-letters',           img: I(80) },
    ],
  },
  {
    id: 'logotipy',
    num: '02',
    title: 'Логотипы и знаки',
    description: 'Металлические логотипы компаний на стены, ресепшн и стекло. Зеркальная полировка или покраска в корпоративный цвет бренда.',
    items: [
      { label: 'Металлические логотипы компаний', seed: 'metal-logo-company-wall',    img: I(81) },
      { label: 'Знаки на ресепшн',               seed: 'reception-logo-sign',         img: I(82) },
      { label: 'Логотипы на стекло',             seed: 'glass-logo-sign',             img: I(83) },
      { label: 'Зеркальная полировка',           seed: 'mirror-polished-logo',        img: I(84) },
      { label: 'Покраска в корпоративный цвет',  seed: 'corporate-color-logo-sign',   img: I(85) },
      { label: 'Крепление без видимого крепежа', seed: 'hidden-mount-logo-sign',      img: I(86) },
    ],
  },
  {
    id: 'paneli',
    num: '03',
    title: 'Декоративные панели',
    description: 'Перфорированные и резные металлические панели для зонирования пространства, декора стен и создания акцентов.',
    items: [
      { label: 'Перфорированные металлические панели', seed: 'perforated-metal-panel-wall',  img: I(87) },
      { label: 'Резные декоративные экраны',           seed: 'laser-cut-metal-screen',       img: I(88) },
      { label: 'Зонирующие перегородки',               seed: 'metal-partition-zoning',       img: I(89) },
      { label: 'Панели для акцентных стен',            seed: 'accent-wall-metal-panel',      img: I(90) },
      { label: 'Геометрические узоры и орнаменты',     seed: 'geometric-pattern-metal',      img: I(91) },
      { label: 'Любой формат и рисунок',               seed: 'custom-cut-metal-decor',       img: I(92) },
    ],
  },
  {
    id: 'tablicki',
    num: '04',
    title: 'Навигационные таблички',
    description: 'Системы навигации для офисов, торговых центров и гостиниц. Единый стиль серии, любой тираж, монтаж и замена.',
    items: [
      { label: 'Системы навигации для офисов',   seed: 'office-wayfinding-system',   img: I(93) },
      { label: 'Таблички для торговых центров',  seed: 'mall-directory-sign',        img: I(94) },
      { label: 'Гостиничная навигация',          seed: 'hotel-wayfinding-sign',      img: I(75) },
      { label: 'Единый стиль серии',             seed: 'unified-sign-series',        img: I(76) },
      { label: 'Любой тираж',                   seed: 'signage-production-bulk',    img: I(77) },
      { label: 'Монтаж и замена вставок',        seed: 'sign-installation-update',   img: I(78) },
    ],
  },
  {
    id: 'restorany',
    num: '05',
    title: 'Ресторанные вывески',
    description: 'Художественные вывески и надписи в интерьере заведений. Состаренный металл, патинирование, лофт-эстетика.',
    items: [
      { label: 'Художественные надписи в интерьере', seed: 'restaurant-interior-letters',  img: I(79) },
      { label: 'Вывески из состаренного металла',    seed: 'aged-metal-sign-restaurant',   img: I(80) },
      { label: 'Патинирование и браширование',       seed: 'patina-brushed-metal-sign',    img: I(81) },
      { label: 'Меню-борды',                         seed: 'menu-board-restaurant',        img: I(82) },
      { label: 'Декоративные слова и фразы',         seed: 'decorative-words-cafe',        img: I(83) },
      { label: 'Нестандартные шрифты и стили',       seed: 'custom-font-sign-interior',    img: I(84) },
    ],
  },
  {
    id: 'nomera',
    num: '06',
    title: 'Номерные знаки',
    description: 'Таблички для кабинетов, номеров отелей и парковочных мест. Любой размер, покрытие и тираж.',
    items: [
      { label: 'Таблички для кабинетов',      seed: 'office-door-number-sign',     img: I(85) },
      { label: 'Номера отельных номеров',     seed: 'hotel-room-number-plate',     img: I(86) },
      { label: 'Парковочные знаки',           seed: 'parking-number-sign',         img: I(87) },
      { label: 'Противопожарная маркировка',  seed: 'fire-safety-sign-metal',      img: I(88) },
      { label: 'Шрифт Брайля',               seed: 'braille-sign-accessibility',  img: I(89) },
      { label: 'Любое покрытие и цвет',       seed: 'sign-coating-color-options',  img: I(90) },
    ],
  },
  {
    id: 'art',
    num: '07',
    title: 'Арт-объекты',
    description: 'Декоративные металлические инсталляции, скульптурные элементы и настенный декор для уникальных интерьеров.',
    items: [
      { label: 'Металлические инсталляции',     seed: 'metal-art-installation-interior', img: I(91) },
      { label: 'Скульптурные элементы',         seed: 'metal-sculpture-interior',        img: I(92) },
      { label: 'Настенный металлический декор', seed: 'wall-metal-art-decor',            img: I(93) },
      { label: 'Объёмные композиции',           seed: 'volumetric-metal-composition',    img: I(94) },
      { label: 'Любой масштаб',                 seed: 'large-scale-metal-art',           img: I(82) },
      { label: 'Уникальные изделия по эскизам', seed: 'bespoke-metal-artwork',           img: I(83) },
    ],
  },
  {
    id: 'nestandart',
    num: '08',
    title: 'Нестандартные решения',
    description: 'Изготовление по эскизам, 3D-моделям и чертежам заказчика. Любая геометрия, сложность и комбинирование материалов.',
    items: [
      { label: 'Изготовление по эскизам заказчика',   seed: 'custom-sketch-metalwork',       img: I(77) },
      { label: '3D-моделирование и прототипирование', seed: '3d-modeling-metal-prototype',    img: I(80) },
      { label: 'Сложная геометрия и формы',           seed: 'complex-geometry-metal',         img: I(85) },
      { label: 'Комбинирование материалов',           seed: 'mixed-material-metal-wood',      img: I(88) },
      { label: 'Лимитированные серии',                seed: 'limited-series-metalwork',       img: I(91) },
      { label: 'Проект любой сложности',              seed: 'complex-metal-project',          img: I(94) },
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
            <RequestButton className="px-8 py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors">
              Оставить заявку
            </RequestButton>
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
