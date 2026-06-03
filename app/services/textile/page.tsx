import type { Metadata } from 'next';
import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';
import { RequestButton } from '@/components/RequestButton';

export const metadata: Metadata = {
  title: 'Текстильные лайтбоксы для витрин, салонов и торговых пространств',
  description:
    'Производство текстильных лайтбоксов — световых конструкций с тканевым полотном для витрин, магазинов, салонов, шоурумов и ресепшен-зон. Ровное свечение, сменная графика, монтаж под ключ в Москве.',
};

const blocks: ServiceBlock[] = [
  {
    id: 'nastennye',
    num: '01',
    title: 'Настенные лайтбоксы',
    description: 'Световые панели на стену с равномерной LED-подсветкой и SEG-полотном. Подходят для торговых залов, салонов, шоурумов и ресепшен-зон.',
    items: [
      { label: 'Настенные лайтбоксы в торговых залах', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-217/portfolio-217.webp', seed: 'textile-wall-retail' },
      { label: 'Настенные лайтбоксы в шоурумах', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-218/portfolio-218.webp', seed: 'textile-wall-showroom' },
      { label: 'Полноформатные настенные панели', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-219/portfolio-219.webp', seed: 'textile-wall-fullsize' },
      { label: 'Брендинговые настенные конструкции', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-221/portfolio-221.webp', seed: 'textile-wall-brand' },
    ],
  },
  {
    id: 'vitrinnye',
    num: '02',
    title: 'Витринные и фасадные',
    description: 'Лайтбоксы для витрин и входных групп — работают как большой светящийся плакат, видны днём и ночью, выделяют магазин среди соседних точек.',
    items: [
      { label: 'Витринные лайтбоксы', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-222/portfolio-222.webp', seed: 'textile-window-lightbox' },
      { label: 'Фасадные световые панели', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-223/portfolio-223.webp', seed: 'textile-facade-panel' },
      { label: 'Оформление входных групп', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-224/portfolio-224.webp', seed: 'textile-entrance-group' },
      { label: 'Двусторонние витринные конструкции', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-225/portfolio-225.webp', seed: 'textile-double-sided' },
    ],
  },
  {
    id: 'podvesnye',
    num: '03',
    title: 'Подвесные лайтбоксы',
    description: 'Навигационные и декоративные лайтбоксы на подвесе — для торговых центров, зонирования пространства и выделения отделов.',
    items: [
      { label: 'Подвесные в торговых центрах', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-226/portfolio-226.webp', seed: 'textile-hanging-mall' },
      { label: 'Двусторонние подвесные', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-227/portfolio-227.webp', seed: 'textile-hanging-double' },
      { label: 'Навигационные лайтбоксы', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-228/portfolio-228.webp', seed: 'textile-navigation' },
      { label: 'Подвесные для зонирования', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-229/portfolio-229.webp', seed: 'textile-zone' },
    ],
  },
  {
    id: 'nestandartnye',
    num: '04',
    title: 'Нестандартные решения',
    description: 'Встраиваемые в интерьер, угловые, крупноформатные и лайтбоксы под нишу. Изготавливаем под любой размер и конфигурацию по проекту дизайнера.',
    items: [
      { label: 'Встроенные в интерьер', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-230/portfolio-230.webp', seed: 'textile-interior-built-in' },
      { label: 'Крупноформатные конструкции', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-231/portfolio-231.webp', seed: 'textile-large-format' },
      { label: 'Лайтбоксы под нишу', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-232/portfolio-232.webp', seed: 'textile-niche' },
      { label: 'Угловые и нестандартные', img: '/images/portfolio/tekstilnye-laytboksy/portfolio-233/portfolio-233.webp', seed: 'textile-corner-custom' },
    ],
  },
];

export default function TextilePage() {
  return (
    <main>
      <ServiceHero
        title="Текстильные"
        highlight="лайтбоксы"
        subtitle="Производим под размер для магазинов, бутиков, шоурумов, витрин и ресепшен-зон. Тонкий алюминиевый профиль, ровное свечение, быстрая смена изображения под сезон или акцию."
        tag="Световые конструкции"
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
