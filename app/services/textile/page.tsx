import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Текстильные лайтбоксы',
  description:
    'SEG-лайтбоксы, потолочные и витринные конструкции, печать тканевых полотен. Производство и монтаж под ключ, любые размеры и формы.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'seg',
    num: '01',
    title: 'SEG-лайтбоксы',
    description: 'Лайтбоксы с силиконовым кантом (Silicone Edge Graphics) — самый популярный формат. Тканевое полотно натягивается на алюминиевую рамку и подсвечивается изнутри светодиодами.',
    items: [
      { label: 'Настенные SEG-лайтбоксы', seed: 'seg-lightbox-wall-display' },
      { label: 'Двусторонние SEG-рамки', seed: 'seg-double-sided-frame' },
      { label: 'Модульные SEG-системы', seed: 'seg-modular-system-retail' },
      { label: 'Угловые и арочные конструкции', seed: 'seg-arch-corner-display' },
      { label: 'Лайтбоксы для торговых стоек', seed: 'seg-lightbox-counter-display' },
      { label: 'Ультратонкие рамки от 30 мм', seed: 'seg-slim-frame-ultrathin' },
    ],
  },
  {
    id: 'potolok',
    num: '02',
    title: 'Потолочные лайтбоксы',
    description: 'Подвесные тканевые лайтбоксы для торговых залов, шоурумов и выставочных пространств. Создают равномерную яркую подсветку и выразительный визуальный акцент.',
    items: [
      { label: 'Подвесные лайтбоксы на тросах', seed: 'ceiling-lightbox-suspended-retail' },
      { label: 'Светящиеся потолочные панели', seed: 'ceiling-light-panel-display' },
      { label: 'Бесшовные потолочные лайтбоксы', seed: 'seamless-ceiling-lightbox' },
      { label: 'Фигурные подвесные конструкции', seed: 'custom-shape-hanging-lightbox' },
      { label: 'Двусторонние подвесные рамки', seed: 'double-sided-hanging-lightbox' },
      { label: 'Лайтбоксы для зонирования пространства', seed: 'lightbox-zoning-retail-space' },
    ],
  },
  {
    id: 'vitrina',
    num: '03',
    title: 'Витринные лайтбоксы',
    description: 'Тканевые лайтбоксы для оформления витрин и фасадов — привлекают внимание днём и ночью, меняются за минуты при смене коллекции или сезона.',
    items: [
      { label: 'Полноразмерные витринные лайтбоксы', seed: 'window-lightbox-full-size' },
      { label: 'Витринные рамки под замену полотен', seed: 'window-frame-swap-fabric' },
      { label: 'Лайтбоксы с быстросъёмным полотном', seed: 'snap-frame-lightbox-window' },
      { label: 'Световые короба для фасадов', seed: 'facade-lightbox-exterior' },
      { label: 'Брендирование витрин под ключ', seed: 'branded-window-display-retail' },
      { label: 'Сезонная смена графики', seed: 'seasonal-graphics-change-window' },
    ],
  },
  {
    id: 'napolnye',
    num: '04',
    title: 'Напольные стойки-лайтбоксы',
    description: 'Автономные напольные конструкции с подсветкой для торговых залов, выставок и мероприятий. Легко перемещаются и переконфигурируются.',
    items: [
      { label: 'Напольные стойки-лайтбоксы', seed: 'floor-standing-lightbox-display' },
      { label: 'Х-образные рамки с подсветкой', seed: 'x-frame-lightbox-floor' },
      { label: 'Тотемные лайтбоксы', seed: 'totem-lightbox-display-tall' },
      { label: 'Мобильные конструкции на колёсах', seed: 'mobile-lightbox-wheels-retail' },
      { label: 'Стойки для выставок и ярмарок', seed: 'exhibition-lightbox-stand' },
      { label: 'Разборные конструкции для транспортировки', seed: 'portable-lightbox-kit' },
    ],
  },
  {
    id: 'pechat',
    num: '05',
    title: 'Печать на ткани',
    description: 'Собственное производство тканевых полотен: печать методом сублимации на полиэстере. Яркие цвета, чёткое изображение, стойкость к выцветанию.',
    items: [
      { label: 'Сублимационная печать на полиэстере', seed: 'dye-sublimation-fabric-print' },
      { label: 'Формат от А0 до нестандартных размеров', seed: 'large-format-fabric-printing' },
      { label: 'Силиконовый кант для SEG', seed: 'silicone-edge-fabric-sewing' },
      { label: 'Полотна под существующие рамки', seed: 'fabric-print-existing-frame' },
      { label: 'Срочная печать за 1 день', seed: 'rush-fabric-printing-service' },
      { label: 'Замена полотен с монтажом', seed: 'fabric-replacement-installation' },
    ],
  },
  {
    id: 'nestandart',
    num: '06',
    title: 'Нестандартные формы',
    description: 'Разрабатываем и производим лайтбоксы любой формы: круглые, треугольные, фигурные, изогнутые. Воплощаем любую концепцию дизайнера.',
    items: [
      { label: 'Круглые и овальные лайтбоксы', seed: 'round-circular-lightbox-custom' },
      { label: 'Фигурные рамки по макету', seed: 'custom-shape-lightbox-design' },
      { label: 'Изогнутые и гнутые конструкции', seed: 'curved-lightbox-display' },
      { label: 'Лайтбоксы по эскизу дизайнера', seed: 'designer-sketch-lightbox' },
      { label: 'Нестандартные габариты под заказ', seed: 'bespoke-lightbox-special-size' },
      { label: 'Световые объекты для мероприятий', seed: 'event-light-object-custom' },
    ],
  },
  {
    id: 'montazh',
    num: '07',
    title: 'Монтаж и обслуживание',
    description: 'Профессиональный монтаж лайтбоксов на объекте, подключение к электросети. Гарантийное и послегарантийное обслуживание, замена светодиодных модулей.',
    items: [
      { label: 'Монтаж под ключ на объекте', seed: 'lightbox-installation-site' },
      { label: 'Подключение к электросети', seed: 'electrical-connection-lightbox' },
      { label: 'Замена вышедших из строя LED', seed: 'led-module-replacement-service' },
      { label: 'Гарантия 2 года на конструкции', seed: 'warranty-service-lightbox' },
      { label: 'Выезд сервисного специалиста', seed: 'technician-site-visit-service' },
      { label: 'Демонтаж и утилизация старых конструкций', seed: 'lightbox-dismount-disposal' },
    ],
  },
];

export default function TextilePage() {
  return (
    <main>
      <ServiceHero
        title="Текстильные"
        highlight="лайтбоксы"
        subtitle="Производство и монтаж тканевых лайтбоксов для торговых залов, витрин, выставочных стендов и интерьеров. Яркий визуал, лёгкая смена графики, любые размеры и формы."
        tag="06 · Текстильные лайтбоксы"
        backgroundImage="/banner-textile.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Текстильные лайтбоксы' },
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
