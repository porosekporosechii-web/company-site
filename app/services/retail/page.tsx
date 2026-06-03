import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Торговое оборудование',
  description:
    'Витрины, стеллажи, ресепшн-стойки, вешала и нестандартное торговое оборудование из металла. Проектируем под конкретный торговый зал.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';
import { RequestButton } from '@/components/RequestButton';

const blocks: ServiceBlock[] = [
  {
    id: 'veshala',
    num: '01',
    title: 'Вешала и стойки для одежды',
    description: 'Напольные и настенные системы для одежды, обуви и аксессуаров. Хромирование, покраска в любой цвет RAL.',
    items: [
      { label: 'Пристенные рейловые системы', seed: 'wall-rail-clothing-system',    img: '/retail/pristavnye-reily.jpg' },
      { label: 'Напольные стойки-рейлы',       seed: 'floor-clothing-rail',          img: '/retail/napolnye-reily.jpg' },
      { label: 'Т-образные и Н-образные стойки', seed: 't-bar-h-rack-clothing',      img: '/retail/t-obraznye.jpg' },
      { label: 'Лук-стойки для коллекций',     seed: 'look-stand-collection',        img: '/retail/luk-stoyki.jpg' },
      { label: 'Напольные консоли',             seed: 'floor-console-clothing-display', img: '/retail/napolnye-konsoli.jpg' },
      { label: 'Хромирование и покраска RAL',   seed: 'chrome-rack-finish',           img: '/retail/pokraska.jpg' },
    ],
  },
  {
    id: 'reshepshn',
    num: '02',
    title: 'Ресепшн-стойки',
    description: 'Стойки администратора для магазинов, салонов и офисов. Изготавливаем под размер, стиль и задачи объекта.',
    items: [
      { label: 'Стойки для магазинов и бутиков',  seed: 'reception-desk-boutique',   img: '/retail/reception-1.jpg' },
      { label: 'Ресепшн для салонов красоты',      seed: 'beauty-salon-reception',    img: '/retail/reception-2.jpg' },
      { label: 'Стойки для аптек и медцентров',    seed: 'pharmacy-reception-desk',   img: '/retail/reception-3.jpg' },
      { label: 'Встроенные тумбы и полки',         seed: 'built-in-cabinet-desk',     img: '/retail/reception-4.jpg' },
      { label: 'Покраска в корпоративный цвет RAL', seed: 'ral-color-reception',      img: '/retail/reception-5.jpg' },
      { label: 'Монтаж под ключ',                  seed: 'reception-installation-site', img: '/retail/reception-6.jpg' },
    ],
  },
  {
    id: 'polki',
    num: '03',
    title: 'Металлические и деревянные полки',
    description: 'Производим навесные и напольные полки для торговых залов, шоурумов и офисов. Металл, дерево, комбинированные решения — под любой интерьер и нагрузку.',
    items: [
      { label: 'Полки с использованием шпона',        seed: 'veneer-shelf-wood-display',    img: '/retail/polki-1.jpg' },
      { label: 'Металлические полки с перфорацией',  seed: 'perforated-metal-shelf-retail', img: '/retail/polki-2.jpg' },
      { label: 'Полки из массива',                   seed: 'solid-wood-shelf-display',      img: '/retail/polki-3.jpg' },
      { label: 'Полки с использованием HPL пластика', seed: 'hpl-plastic-shelf-retail',     img: '/retail/polki-4.jpg' },
      { label: 'Проектирование под торговый зал',    seed: 'shelf-design-retail-layout',    img: '/retail/polki-5.jpg' },
      { label: 'Монтаж под ключ',                    seed: 'shelf-installation-turnkey',    img: '/retail/polki-6.jpg' },
    ],
  },
  {
    id: 'unique',
    num: '04',
    title: 'Уникальное торговое оборудование',
    description: 'Разрабатываем и производим нестандартное торговое оборудование по индивидуальным проектам. От эскиза до готового изделия — полный цикл в собственном цехе.',
    items: [
      { label: 'Проектирование по эскизу заказчика',   seed: 'custom-retail-design-sketch',      img: '/retail/unique-1.jpg' },
      { label: 'Нестандартные конструкции из металла', seed: 'bespoke-metal-retail-fixture',      img: '/retail/unique-2.jpg' },
      { label: 'Сложные геометрические формы',         seed: 'complex-geometry-metal-display',   img: '/retail/unique-3.jpg' },
      { label: 'Комбинирование материалов',            seed: 'mixed-material-retail-display',    img: '/retail/unique-4.jpg' },
      { label: 'Брендирование и фирменный стиль',      seed: 'branded-custom-retail-fixture',    img: '/retail/unique-5.jpg' },
      { label: 'Мелкосерийное и серийное производство', seed: 'series-production-retail-metal', img: '/retail/unique-6.jpg' },
    ],
  },
];

export default function RetailPage() {
  return (
    <main>
      <ServiceHero
        title="Торговое"
        highlight="оборудование"
        subtitle="Производим металлическую мебель и оборудование для магазинов, шоурумов, кафе и офисов. Проектируем под конкретный торговый зал — учитываем планировку, фирменный стиль и специфику товара."
        tag="02 · Торговое оборудование"
        backgroundImage="/banner-retail.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Торговое оборудование' },
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
