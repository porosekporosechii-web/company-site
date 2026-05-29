import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Декорации',
  description:
    'Праздничное и сезонное оформление торговых пространств: новогодние витрины, флористические инсталляции, тематические арт-объекты. Под ключ.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'prazdnik',
    num: '01',
    title: 'Праздничное оформление',
    description: 'Новогодний и праздничный декор для торговых пространств, офисов и витрин. Создаём атмосферу, которая привлекает покупателей и поднимает продажи.',
    items: [
      { label: 'Новогоднее оформление витрин', seed: 'christmas-window-display' },
      { label: 'Рождественские инсталляции', seed: 'christmas-decoration-retail' },
      { label: 'Праздничные гирлянды и иллюминация', seed: 'holiday-lights-garland' },
      { label: 'Тематические декорации 8 марта', seed: 'spring-flowers-decoration' },
      { label: 'Оформление на День города', seed: 'city-day-decoration' },
      { label: 'Корпоративные праздники', seed: 'corporate-party-decoration' },
    ],
  },
  {
    id: 'sezonnyi',
    num: '02',
    title: 'Сезонный декор',
    description: 'Меняем оформление пространства вместе со временем года. Весна, лето, осень, зима — каждый сезон создаёт нужное настроение для покупателя.',
    items: [
      { label: 'Весеннее оформление пространств', seed: 'spring-store-decoration' },
      { label: 'Летние инсталляции и флористика', seed: 'summer-floral-display' },
      { label: 'Осенний декор и хэллоуин', seed: 'autumn-halloween-decor' },
      { label: 'Зимние снежные инсталляции', seed: 'winter-snow-decoration' },
      { label: 'Смена сезонных коллекций', seed: 'seasonal-display-change' },
      { label: 'Хранение декора в межсезонье', seed: 'decoration-storage-warehouse' },
    ],
  },
  {
    id: 'floristika',
    num: '03',
    title: 'Флористические инсталляции',
    description: 'Живые и искусственные цветочные композиции, фитостены и вертикальные сады для интерьеров, событий и торговых залов.',
    items: [
      { label: 'Живые цветочные композиции', seed: 'live-flower-arrangement' },
      { label: 'Искусственные растения и цветы', seed: 'artificial-flower-display' },
      { label: 'Вертикальные сады и фитостены', seed: 'vertical-garden-green-wall' },
      { label: 'Напольные цветочные конструкции', seed: 'floor-flower-installation' },
      { label: 'Цветочные арки и тоннели', seed: 'flower-arch-tunnel' },
      { label: 'Тематические флористические объекты', seed: 'thematic-floral-object' },
    ],
  },
  {
    id: 'tc',
    num: '04',
    title: 'Оформление торговых центров',
    description: 'Масштабные инсталляции для атриумов и общих зон ТЦ: новогодние ели, фотозоны, световые конструкции и сезонное брендирование.',
    items: [
      { label: 'Атриумные декоративные инсталляции', seed: 'mall-atrium-installation' },
      { label: 'Масштабные ёлки и новогодний декор', seed: 'large-christmas-tree-mall' },
      { label: 'Фотозоны и инстаграм-объекты', seed: 'photo-zone-instagram-mall' },
      { label: 'Сезонное брендирование пространства', seed: 'mall-seasonal-branding' },
      { label: 'Световые декорации', seed: 'light-decoration-mall' },
      { label: 'Навигационный декор', seed: 'navigation-decor-mall' },
    ],
  },
  {
    id: 'events',
    num: '05',
    title: 'Корпоративные мероприятия',
    description: 'Оформление конференций, банкетов, презентаций и выездных событий. Брендирование пространства и создание стильных фотозон.',
    items: [
      { label: 'Оформление конференц-залов', seed: 'conference-room-decoration' },
      { label: 'Декор для корпоративных банкетов', seed: 'corporate-banquet-decor' },
      { label: 'Выездные события и презентации', seed: 'event-outdoor-decoration' },
      { label: 'Брендирование пространства', seed: 'branded-event-space' },
      { label: 'Фотозоны для мероприятий', seed: 'event-photo-booth-zone' },
      { label: 'Оформление входных групп', seed: 'entrance-event-decoration' },
    ],
  },
  {
    id: 'art',
    num: '06',
    title: 'Тематические арт-объекты',
    description: 'Объёмные тематические фигуры, декоративные скульптуры и интерактивные инсталляции для торговых залов и мероприятий.',
    items: [
      { label: 'Объёмные тематические фигуры', seed: 'volumetric-thematic-figure' },
      { label: 'Декоративные скульптуры', seed: 'decorative-sculpture-display' },
      { label: 'Интерактивные инсталляции', seed: 'interactive-art-installation' },
      { label: 'Декорации для фотозон', seed: 'photo-zone-prop-decoration' },
      { label: 'Нестандартные арт-объекты', seed: 'custom-art-object' },
      { label: 'Изготовление по эскизам', seed: 'custom-sketch-decor' },
    ],
  },
  {
    id: 'arenda',
    num: '07',
    title: 'Аренда декораций',
    description: 'Аренда новогодних елей, украшений, световых гирлянд и флористических конструкций. Доставка, монтаж и демонтаж включены.',
    items: [
      { label: 'Аренда новогодних елей', seed: 'christmas-tree-rental' },
      { label: 'Напольные и настольные декорации', seed: 'floor-table-decor-rental' },
      { label: 'Световые гирлянды и иллюминация', seed: 'light-garland-rental' },
      { label: 'Цветочные арки и конструкции', seed: 'flower-arch-rental' },
      { label: 'Краткосрочная и долгосрочная аренда', seed: 'short-long-rental-decor' },
      { label: 'Доставка и монтаж включены', seed: 'decor-delivery-installation' },
    ],
  },
  {
    id: 'montazh',
    num: '08',
    title: 'Монтаж и хранение',
    description: 'Профессиональный монтаж и демонтаж декораций. Хранение инвентаря на собственном складе в межсезонье — без лишних хлопот для клиента.',
    items: [
      { label: 'Профессиональный монтаж декора', seed: 'decoration-installation-team' },
      { label: 'Демонтаж после мероприятия', seed: 'decoration-removal-service' },
      { label: 'Хранение декораций на складе', seed: 'warehouse-decoration-storage' },
      { label: 'Инвентаризация и учёт', seed: 'inventory-decoration-catalog' },
      { label: 'Плановое обновление декора', seed: 'decoration-refresh-update' },
      { label: 'Сервисное обслуживание', seed: 'decoration-maintenance-service' },
    ],
  },
];

export default function DecorPage() {
  return (
    <main>
      <ServiceHero
        title="Праздничный"
        highlight="декор"
        subtitle="Праздничное и сезонное оформление торговых пространств, офисов и мероприятий. Новогодние витрины, флористические инсталляции, тематические арт-объекты — под ключ с монтажом и хранением."
        tag="05 · Декорации"
        backgroundImage="/banner-decor.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Декорации' },
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
