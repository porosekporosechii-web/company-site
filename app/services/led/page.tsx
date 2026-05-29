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

const blocks: ServiceBlock[] = [
  {
    id: 'magaziny',
    num: '01',
    title: 'Экраны для магазинов и торговых залов',
    description: 'Для рекламы, акций, навигации, презентации товаров и оформления коммерческого пространства.',
    items: [
      { label: 'Реклама и акции в торговом зале', seed: 'led-indoor-retail-promo' },
      { label: 'Прикассовые и промозоны', seed: 'led-checkout-promo-zone' },
      { label: 'Видеостены и видеокубы', seed: 'video-wall-led-indoor' },
      { label: 'Цифровые витрины и showcases', seed: 'digital-showcase-display' },
      { label: 'Навигация и информирование', seed: 'led-navigation-retail' },
      { label: 'Бегущие строки и табло', seed: 'led-ticker-information-board' },
    ],
  },
  {
    id: 'vitriny',
    num: '02',
    title: 'Экраны для витрин',
    description: 'Яркие решения для привлечения внимания с улицы, включая витринные и прозрачные форматы, которые не перекрывают обзор.',
    items: [
      { label: 'Прозрачные LED-экраны', seed: 'transparent-led-window-screen' },
      { label: 'Яркие витринные панели', seed: 'led-window-transparent-vitrine' },
      { label: 'Привлечение внимания с улицы', seed: 'window-led-attract-street' },
      { label: 'Демонстрация коллекций и акций', seed: 'led-collection-display' },
      { label: 'Управление контентом удалённо', seed: 'led-remote-content-management' },
      { label: 'Форматы под любой размер витрины', seed: 'custom-size-window-led' },
    ],
  },
  {
    id: 'ulica',
    num: '03',
    title: 'Уличные светодиодные экраны',
    description: 'Экраны для фасадов, входных групп и наружной рекламы, рассчитанные на работу при дневном свете и в разных погодных условиях.',
    items: [
      { label: 'Фасадные рекламные экраны', seed: 'led-outdoor-facade-advertising' },
      { label: 'Высокая яркость для дневного света', seed: 'high-brightness-outdoor-led' },
      { label: 'Степень защиты IP65', seed: 'ip65-outdoor-led-screen' },
      { label: 'Входные группы и навигация', seed: 'entrance-led-navigation' },
      { label: 'Большие форматы для дальнего просмотра', seed: 'large-format-outdoor-led' },
      { label: 'Монтаж на фасад и несущие конструкции', seed: 'facade-led-mount-install' },
    ],
  },
  {
    id: 'nestandart',
    num: '04',
    title: 'Нестандартные и гибкие экраны',
    description: 'Индивидуальные решения для колонн, радиусных поверхностей, сложных форм, декоративных зон и нестандартных проектов.',
    items: [
      { label: 'Экраны для колонн (радиусные)', seed: 'led-flexible-column-curved' },
      { label: 'Изогнутые и гнутые модули', seed: 'curved-led-module-custom' },
      { label: 'Декоративные LED-зоны', seed: 'decorative-led-zone-interior' },
      { label: 'Интерактивные инсталляции', seed: 'interactive-led-installation' },
      { label: 'Сложные формы и нестандартные проекты', seed: 'led-flexible-curved-column-custom' },
      { label: 'Индивидуальное проектирование', seed: 'custom-led-project-design' },
    ],
  },
  {
    id: 'tekhnika',
    num: '05',
    title: 'Технические параметры',
    description: 'Подбираем конфигурацию под место установки, дистанцию просмотра и формат контента. Производим экраны с шагом пикселя от P0.8 до P10.',
    items: [
      { label: 'Шаг пикселя P0.8 / P1.25 / P1.53 / P1.86 / P2.5 / P3.9 / P4 / P5 / P8 / P10', seed: 'led-pixel-pitch-range' },
      { label: 'Технологии SMD, COB, GOB', seed: 'led-smd-cob-gob-technology' },
      { label: 'IP20 — интерьер / IP65 — улица', seed: 'led-ip-rating-protection' },
      { label: 'Частота обновления 1920–7680 Гц', seed: 'led-refresh-rate-hz' },
      { label: 'Модули 320×160 мм, кабинеты 500×500 мм', seed: 'led-module-cabinet-format' },
      { label: 'Фронтальное и тыльное обслуживание', seed: 'led-front-rear-maintenance' },
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
