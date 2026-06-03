import type { Metadata } from 'next';
import { Feedback } from '@/components/Feedback';
import { Partners } from '@/components/Partners';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { ServiceHero } from '@/components/ServiceHero';

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'RAUCO — производственная компания в Москве. С 2014 года оформляем торговые пространства, производим наружную рекламу, торговое оборудование, LED-экраны, декорации и текстильные лайтбоксы.',
};

const stats = [
  { value: '2014', label: 'год основания' },
  { value: '10+',  label: 'лет на рынке' },
  { value: '500+', label: 'выполненных заказов' },
  { value: '14',   label: 'специалистов' },
  { value: '800',  label: 'м² производственный цех' },
  { value: '6',    label: 'направлений работы' },
];

const values = [
  {
    num: '01',
    title: 'Честность',
    description: 'Называем реальные сроки и стоимость до начала работ. Не берём скрытых доплат — всё фиксируем в договоре.',
  },
  {
    num: '02',
    title: 'Качество',
    description: 'Контроль на каждом этапе: от проектирования до финального монтажа. Гарантия на все изделия.',
  },
  {
    num: '03',
    title: 'Сроки',
    description: 'Соблюдаем дедлайны. Если не укладываемся — предупреждаем заранее и согласовываем решение.',
  },
  {
    num: '04',
    title: 'Результат',
    description: 'Нам важно, чтобы изделие работало и выглядело именно так, как вы задумали. Принимаем правки до финальной сдачи.',
  },
];

const history = [
  { year: '2014', text: 'Основали компанию. Начинали с оформления небольших торговых точек и производства торгового оборудования на заказ.' },
  { year: '2016', text: 'Расширили команду, арендовали первый цех площадью 150 м². Запустили направление POS-оформления для сетевых клиентов.' },
  { year: '2019', text: 'Переехали в цех 800 м², набрали команду из 14 специалистов. Открыли направление наружной рекламы — фасадные вывески, объёмные буквы, крышные установки.' },
  { year: '2022', text: 'Вышли на постоянное сотрудничество с торговыми сетями и дизайн-студиями. Запустили производство светодиодных экранов.' },
  { year: '2024', text: 'Добавили направления декораций и текстильных лайтбоксов. Сегодня RAUCO — шесть полноценных направлений под одной крышей.' },
  { year: 'Сейчас', text: 'Шесть направлений, собственное производство 800 м², 500+ выполненных проектов. Один подрядчик — вся задача целиком.' },
];

const capabilities = [
  'Оформление мест продаж (POS)',
  'Торговое оборудование под заказ',
  'Наружная реклама и вывески',
  'Светодиодные экраны и медиафасады',
  'Декорации для торговых пространств',
  'Текстильные лайтбоксы SEG',
  'Лазерная резка и гравировка',
  'Монтаж и сервисное обслуживание',
];

export default function AboutPage() {
  return (
    <main>
      <ServiceHero
        title="О"
        highlight="компании"
        subtitle="Производственная компания в Москве. С 2014 года — шесть направлений, один подрядчик, полный цикл от проектирования до монтажа."
        tag="О нас"
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'О компании' },
        ]}
      />

      {/* Stats */}
      <section className="bg-graphite">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06]">
            {stats.map((s) => (
              <div key={s.label} className="bg-graphite px-6 py-10 text-center">
                <div className="text-3xl font-bold text-accent mb-1">{s.value}</div>
                <div className="text-xs text-muted leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <AnimateOnScroll>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-8 h-[2px] bg-led" />
                  <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                    История
                  </span>
                </div>
                <h2
                  className="font-bold text-graphite dark:text-snow mb-6 leading-tight"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
                >
                  Десять лет —<br />шесть направлений
                </h2>
              </AnimateOnScroll>
              <p className="text-muted leading-relaxed mb-8">
                Начинали в 2014 году как небольшое производство торгового оборудования. За десять лет выросли в компанию с шестью направлениями, собственным цехом и командой из 14 специалистов. Сегодня RAUCO — это полный цикл: от концепции до монтажа на объекте.
              </p>

              <div className="space-y-0 border-l-2 border-graphite/20 dark:border-white/[0.08] pl-6">
                {history.map((h, i) => (
                  <div key={h.year} className={`relative ${i < history.length - 1 ? 'pb-8' : ''}`}>
                    <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-snow dark:border-graphite" />
                    <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
                      {h.year}
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {h.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:pt-16">
              <div className="aspect-[4/3] overflow-hidden bg-graphite/10 dark:bg-white/[0.05]">
                <img
                  src="/images/about/rauco-interior.webp"
                  alt="Производственный цех RAUCO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[16/6] overflow-hidden bg-graphite/10 dark:bg-white/[0.05]">
                <img
                  src="/images/about/rauco-interior.webp"
                  alt="Офис RAUCO"
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 bg-surface dark:bg-surface-dark">
        <ArchitecturalGrid />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Принципы
              </span>
            </div>
            <h2
              className="font-bold text-graphite dark:text-snow mb-14"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              Как мы работаем
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/[0.08] dark:bg-white/[0.06]">
            {values.map((v) => (
              <div key={v.num} className="bg-surface dark:bg-surface-dark p-8">
                <div className="text-4xl font-bold text-accent mb-4 leading-none">{v.num}</div>
                <h3 className="font-bold text-graphite dark:text-snow mb-2 text-lg">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-24 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Возможности
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <h2
                className="font-bold text-graphite dark:text-snow leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
              >
                Собственный цех<br />800 м²
              </h2>
              <p className="text-muted leading-relaxed max-w-xl lg:text-right">
                Все операции выполняем самостоятельно: проектирование, раскрой, сварка, покраска, сборка и монтаж. Не зависим от субподрядчиков — контролируем качество и сроки на каждом этапе.
              </p>
            </div>
          </AnimateOnScroll>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/[0.08] dark:bg-white/[0.06]">
            {capabilities.map((item) => (
              <li key={item} className="bg-snow dark:bg-graphite px-6 py-5 flex items-center gap-3 text-sm text-graphite dark:text-snow">
                <span className="flex-shrink-0 w-4 h-4 bg-accent flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Partners />
      <Feedback />
    </main>
  );
}
