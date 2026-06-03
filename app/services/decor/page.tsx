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
import { RequestButton } from '@/components/RequestButton';

const S = (sub: string, file: string) =>
  `/images/portfolio/sezonnoe-oformlenie/${sub}/${file}.webp`;
const D = (sub: string, file: string) =>
  `/images/portfolio/dekoratsii-dlya-meropriyatiy/${sub}/${file}.webp`;

const blocks: ServiceBlock[] = [
  {
    id: 'prazdnik',
    num: '01',
    title: 'Праздничное оформление',
    description: 'Новогодний и праздничный декор для торговых пространств, офисов и витрин. Создаём атмосферу, которая привлекает покупателей и поднимает продажи.',
    items: [
      { label: 'Новогоднее оформление витрин',        seed: 'christmas-window-display',      img: S('oromlenie-1', 'portfolio-023') },
      { label: 'Рождественские инсталляции',          seed: 'christmas-decoration-retail',   img: S('oromlenie-1', 'portfolio-024') },
      { label: 'Праздничные гирлянды и иллюминация',  seed: 'holiday-lights-garland',        img: S('portfolio-026', 'portfolio-026') },
      { label: 'Тематические декорации 8 марта',      seed: 'spring-flowers-decoration',     img: S('ofrmlenie-2', 'portfolio-027') },
      { label: 'Оформление на День города',           seed: 'city-day-decoration',           img: S('ofrmlenie-2', 'portfolio-028') },
      { label: 'Корпоративные праздники',             seed: 'corporate-party-decoration',    img: S('ofrmlenie-2', 'portfolio-029') },
    ],
  },
  {
    id: 'sezonnyi',
    num: '02',
    title: 'Сезонный декор',
    description: 'Меняем оформление пространства вместе со временем года. Весна, лето, осень, зима — каждый сезон создаёт нужное настроение для покупателя.',
    items: [
      { label: 'Весеннее оформление пространств', seed: 'spring-store-decoration',    img: S('ofrmlenie-2', 'portfolio-030') },
      { label: 'Летние инсталляции и флористика', seed: 'summer-floral-display',      img: S('ofrmlenie-2', 'portfolio-031') },
      { label: 'Осенний декор и хэллоуин',        seed: 'autumn-halloween-decor',     img: S('ofrmlenie-2', 'portfolio-032') },
      { label: 'Зимние снежные инсталляции',      seed: 'winter-snow-decoration',     img: S('oromlenie-1', 'portfolio-023') },
      { label: 'Смена сезонных коллекций',        seed: 'seasonal-display-change',    img: S('oromlenie-1', 'portfolio-024') },
      { label: 'Хранение декора в межсезонье',    seed: 'decoration-storage-warehouse', img: S('portfolio-026', 'portfolio-026') },
    ],
  },
  {
    id: 'tc',
    num: '03',
    title: 'Оформление торговых центров',
    description: 'Масштабные инсталляции для атриумов и общих зон ТЦ: новогодние ели, фотозоны, световые конструкции и сезонное брендирование.',
    items: [
      { label: 'Атриумные декоративные инсталляции', seed: 'mall-atrium-installation',    img: D('portfolio-101', 'portfolio-101') },
      { label: 'Масштабные ёлки и новогодний декор', seed: 'large-christmas-tree-mall',   img: D('park', 'portfolio-144') },
      { label: 'Фотозоны и инстаграм-объекты',       seed: 'photo-zone-instagram-mall',   img: D('park', 'portfolio-145') },
      { label: 'Сезонное брендирование пространства', seed: 'mall-seasonal-branding',     img: D('park', 'portfolio-146') },
      { label: 'Световые декорации',                 seed: 'light-decoration-mall',       img: D('portfolio-163', 'portfolio-163') },
      { label: 'Навигационный декор',               seed: 'navigation-decor-mall',        img: D('otel', 'portfolio-183') },
    ],
  },
  {
    id: 'art',
    num: '04',
    title: 'Тематические арт-объекты',
    description: 'Объёмные тематические фигуры, декоративные скульптуры и интерактивные инсталляции для торговых залов и мероприятий.',
    items: [
      { label: 'Объёмные тематические фигуры',    seed: 'volumetric-thematic-figure',    img: D('vitrazh-dekor', '2023-08-31-decorations-005') },
      { label: 'Декоративные скульптуры',         seed: 'decorative-sculpture-display',  img: D('vitrazh-dekor', '2023-08-31-decorations-006') },
      { label: 'Интерактивные инсталляции',       seed: 'interactive-art-installation',  img: D('dekorativnyy-podves', 'portfolio-212') },
      { label: 'Декорации для фотозон',           seed: 'photo-zone-prop-decoration',    img: D('dekorativnyy-podves', 'portfolio-213') },
      { label: 'Нестандартные арт-объекты',       seed: 'custom-art-object',             img: D('dekrativnye-panno', 'portfolio-214') },
      { label: 'Изготовление по эскизам',         seed: 'custom-sketch-decor',           img: D('dekrativnye-panno', 'portfolio-215') },
    ],
  },
  {
    id: 'arenda',
    num: '05',
    title: 'Аренда декораций',
    description: 'Аренда новогодних елей, украшений, световых гирлянд и флористических конструкций. Доставка, монтаж и демонтаж включены.',
    items: [
      { label: 'Аренда новогодних елей',            seed: 'christmas-tree-rental',       img: S('ofrmlenie-2', 'portfolio-027') },
      { label: 'Напольные и настольные декорации',  seed: 'floor-table-decor-rental',    img: S('ofrmlenie-2', 'portfolio-028') },
      { label: 'Световые гирлянды и иллюминация',   seed: 'light-garland-rental',        img: S('ofrmlenie-2', 'portfolio-029') },
      { label: 'Цветочные арки и конструкции',      seed: 'flower-arch-rental',          img: S('ofrmlenie-2', 'portfolio-030') },
      { label: 'Краткосрочная и долгосрочная аренда', seed: 'short-long-rental-decor',  img: S('ofrmlenie-2', 'portfolio-031') },
      { label: 'Доставка и монтаж включены',        seed: 'decor-delivery-installation', img: S('ofrmlenie-2', 'portfolio-032') },
    ],
  },
  {
    id: 'montazh',
    num: '06',
    title: 'Монтаж и хранение',
    description: 'Профессиональный монтаж и демонтаж декораций. Хранение инвентаря на собственном складе в межсезонье — без лишних хлопот для клиента.',
    items: [
      { label: 'Профессиональный монтаж декора', seed: 'decoration-installation-team',  img: D('park', 'portfolio-144') },
      { label: 'Демонтаж после мероприятия',     seed: 'decoration-removal-service',    img: D('portfolio-163', 'portfolio-163') },
      { label: 'Хранение декораций на складе',   seed: 'warehouse-decoration-storage',  img: D('lobnoe-mesto', 'portfolio-164') },
      { label: 'Инвентаризация и учёт',          seed: 'inventory-decoration-catalog',  img: D('lobnoe-mesto', 'portfolio-166') },
      { label: 'Плановое обновление декора',     seed: 'decoration-refresh-update',     img: D('samolet', 'portfolio-167') },
      { label: 'Сервисное обслуживание',         seed: 'decoration-maintenance-service', img: D('samolet', 'portfolio-168') },
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
