import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Светодиодные экраны',
  description:
    'Производство и монтаж LED-экранов для наружной рекламы, интерьеров, сцен и витрин. Проектирование, сборка, монтаж и сервис.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';
import { RequestButton } from '@/components/RequestButton';

const blocks: ServiceBlock[] = [
  {
    id: 'magaziny',
    num: '01',
    title: 'Экраны для магазинов и торговых залов',
    description: 'Для рекламы, акций, навигации, презентации товаров и оформления коммерческого пространства.',
    items: [
      { label: 'Реклама и акции в торговом зале', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-198/portfolio-198.webp', seed: 'led-indoor-retail-promo' },
      { label: 'Видеостены и видеокубы', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-199/portfolio-199.webp', seed: 'video-wall-led-indoor' },
      { label: 'Навигация и информирование', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-201/portfolio-201.webp', seed: 'led-navigation-retail' },
    ],
  },
  {
    id: 'vitriny',
    num: '02',
    title: 'Экраны для витрин',
    description: 'Яркие решения для привлечения внимания с улицы, включая витринные и прозрачные форматы, которые не перекрывают обзор.',
    items: [
      { label: 'Прозрачные LED-экраны', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-202/portfolio-202.webp', seed: 'transparent-led-window-screen' },
      { label: 'Яркие витринные панели', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-203/portfolio-203.webp', seed: 'led-window-transparent-vitrine' },
      { label: 'Демонстрация коллекций и акций', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-204/portfolio-204.webp', seed: 'led-collection-display' },
    ],
  },
  {
    id: 'ulica',
    num: '03',
    title: 'Уличные светодиодные экраны',
    description: 'Экраны для фасадов, входных групп и наружной рекламы, рассчитанные на работу при дневном свете и в разных погодных условиях.',
    items: [
      { label: 'Фасадные рекламные экраны', img: '/images/portfolio/svetodiodnye-ekrany/ekran-1/portfolio-205.webp', seed: 'led-outdoor-facade-advertising' },
      { label: 'Входные группы и навигация', img: '/images/portfolio/svetodiodnye-ekrany/ekran-1/portfolio-206.webp', seed: 'entrance-led-navigation' },
      { label: 'Большие форматы для дальнего просмотра', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-207/portfolio-207.webp', seed: 'large-format-outdoor-led' },
    ],
  },
  {
    id: 'nestandart',
    num: '04',
    title: 'Нестандартные и гибкие экраны',
    description: 'Индивидуальные решения для колонн, радиусных поверхностей, сложных форм, декоративных зон и нестандартных проектов.',
    items: [
      { label: 'Экраны для колонн (радиусные)', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-208/portfolio-208.webp', seed: 'led-flexible-column-curved' },
      { label: 'Декоративные LED-зоны', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-209/portfolio-209.webp', seed: 'decorative-led-zone-interior' },
      { label: 'Индивидуальное проектирование', img: '/images/portfolio/svetodiodnye-ekrany/portfolio-211/portfolio-211.webp', seed: 'custom-led-project-design' },
    ],
  },
];

export default function LEDPage() {
  return (
    <main>
      <ServiceHero
        title="Светодиодные"
        highlight="экраны"
        subtitle="Производим и монтируем светодиодные экраны любого формата — для наружной рекламы, торговых залов, сцен, конференц-залов и интерьеров. Полный цикл: проектирование, сборка, монтаж, сервис."
        tag="05 · Светодиодные экраны"
        backgroundImage="/banner-led.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Светодиодные экраны' },
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
