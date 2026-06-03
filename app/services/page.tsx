import type { Metadata } from 'next';
import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { MessengerBadge } from '@/components/MessengerBadge';
import { RequestButton } from '@/components/RequestButton';

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Шесть направлений: оформление мест продаж, торговое оборудование, наружная реклама, светодиодные экраны, декорации и текстильные лайтбоксы. Собственное производство, монтаж под ключ.',
};

const services = [
  {
    id: 'pos',
    tag: '01',
    title: 'Оформление мест продаж',
    description:
      'Комплексное оформление торговых пространств любого формата — от небольшого бутика до торговой сети. Разрабатываем концепцию, производим оборудование и декор, выполняем монтаж под ключ.',
    seed: 'retail-shop-interior-design',
    localImage: '/banner-pos.png',
    items: [
      'Магазины и бутики',
      'Аптеки и медицинские центры',
      'Салоны красоты и СПА',
      'Рестораны и кафе',
      'Шоурумы и демонстрационные залы',
      'Shop-in-shop и бренд-зоны',
      'Торговые островки в ТЦ',
      'Корпоративные офисы и ресепшн',
    ],
  },
  {
    id: 'retail',
    tag: '02',
    title: 'Торговое оборудование',
    description:
      'Производим металлическую мебель и оборудование для магазинов, шоурумов, кафе и офисов. Проектируем под конкретный торговый зал — учитываем планировку, фирменный стиль и специфику товара.',
    seed: 'retail-shelving-metal',
    localImage: '/banner-retail.png',
    items: [
      'Витрины и прилавки',
      'Торговые стеллажи',
      'Ресепшн-стойки',
      'Кассовые узлы',
      'Вешала и стойки для одежды',
      'Примерочные кабины',
      'Барные стойки для кафе',
      'Офисная мебель из металла',
    ],
  },
  {
    id: 'outdoor',
    tag: '03',
    title: 'Наружная реклама',
    description:
      'Изготавливаем и монтируем фасадные вывески, объёмные буквы, крышные установки и отдельно стоящие рекламные конструкции из металла. Работаем по индивидуальным проектам и по макетам заказчика.',
    seed: 'outdoor-signage-building',
    localImage: '/banner-outdoor.png',
    items: [
      'Фасадные вывески и панель-кронштейны',
      'Объёмные буквы (световые и несветовые)',
      'Крышные рекламные установки',
      'Отдельно стоящие конструкции',
      'Пилоны и указатели',
      'Информационные стенды',
      'Монтаж и демонтаж конструкций',
      'Ремонт и обслуживание',
    ],
  },
  {
    id: 'led',
    tag: '04',
    title: 'Светодиодные экраны',
    description:
      'Производим и монтируем светодиодные экраны любого формата — для наружной рекламы, торговых залов, сцен, конференц-залов и интерьеров. Полный цикл: проектирование, сборка, монтаж, сервис.',
    seed: 'led-screen-display-outdoor',
    localImage: '/banner-led.png',
    items: [
      'Наружные рекламные экраны',
      'Интерьерные и витринные экраны',
      'Экраны для сцен и мероприятий',
      'Бегущие строки и табло',
      'Видеостены и медиафасады',
      'Управление контентом (CMS)',
      'Гарантийное и сервисное обслуживание',
      'Аренда экранов для мероприятий',
    ],
  },
  {
    id: 'decor',
    tag: '05',
    title: 'Декорации',
    description:
      'Праздничное и сезонное оформление торговых пространств, офисов и мероприятий. Новогодние витрины, флористические инсталляции, тематические арт-объекты — под ключ с монтажом и хранением.',
    seed: 'banner-decor',
    localImage: '/banner-decor.png',
    items: [
      'Праздничное оформление торговых залов',
      'Новогодние и сезонные декорации',
      'Корпоративные мероприятия и события',
      'Флористические инсталляции',
      'Тематические арт-объекты и фигуры',
      'Оформление торговых центров (атриумы)',
      'Аренда декоративных элементов',
      'Монтаж, демонтаж и хранение',
    ],
  },
  {
    id: 'textile',
    tag: '06',
    title: 'Текстильные лайтбоксы',
    description:
      'Производство и монтаж тканевых лайтбоксов для торговых залов, витрин, выставочных стендов и интерьеров. SEG-рамки, потолочные и напольные конструкции, печать полотен — любые размеры и формы.',
    seed: 'textile-lightbox-retail-store',
    localImage: '/banner-textile.png',
    items: [
      'Тканевые лайтбоксы SEG',
      'Двусторонние лайтбоксы',
      'Потолочные подвесные конструкции',
      'Напольные стойки-лайтбоксы',
      'Витринные лайтбоксы',
      'Печать тканевых полотен',
      'Замена и смена графики',
      'Нестандартные формы под заказ',
    ],
  },
];

const steps = [
  {
    num: '01',
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните. Уточним задачу и договоримся о встрече или выезде на объект.',
  },
  {
    num: '02',
    title: 'Расчёт',
    description: 'Рассчитываем стоимость в день обращения. При необходимости — бесплатный выезд на замер.',
  },
  {
    num: '03',
    title: 'Договор',
    description: 'Подписываем договор, фиксируем сроки и стоимость. Предоплата 50%, остаток — после готовности изделия.',
  },
  {
    num: '04',
    title: 'Производство',
    description: 'Изготавливаем в нашем цехе. Ведём фотоотчёт по готовности — можно приехать и посмотреть.',
  },
  {
    num: '05',
    title: 'Доставка',
    description: 'Доставляем и при необходимости монтируем. Гарантия на все изделия.',
  },
];

const navLabels = ['Оформление мест продаж', 'Торговое оборудование', 'Наружная реклама', 'Светодиодные экраны', 'Декорации', 'Текстильные лайтбоксы'];
const navIds    = ['pos', 'retail', 'outdoor', 'led', 'decor', 'textile'];

const ribbonText = 'ВИТРИНЫ · ТОРГОВЫЕ ЗОНЫ · ИНТЕРЬЕРНЫЕ ВЫВЕСКИ · ДЕКОР · POSM · ОФОРМЛЕНИЕ · РЕКЛАМА · МОНТАЖ · ';

export default function ServicesPage() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-graphite">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
          style={{ backgroundImage: "url('/banner.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/10 to-transparent" />
        <ArchitecturalGrid variant="hero" />

        {/* Top graphic ribbon — sits just under the navbar */}
        <div className="absolute left-0 right-0 overflow-hidden pointer-events-none" style={{ top: '68px' }}>
          <div className="flex items-center border-y border-white/12 bg-white/5 py-2">
            <p className="whitespace-nowrap text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em] select-none">
              {ribbonText.repeat(12)}
            </p>
          </div>
        </div>

        <MessengerBadge />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-40 pb-16">
          <div className="max-w-[1600px] mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Хлебные крошки" className="flex items-center gap-2 text-xs text-muted mb-10">
              <Link href="/" className="hover:text-led transition-colors">Главная</Link>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span className="text-snow/70">Услуги</span>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Что мы делаем
              </span>
            </div>

            <h1
              className="font-bold text-snow leading-[0.9] tracking-tight uppercase mb-7"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 6.5rem)' }}
            >
              <span className="block text-snow">Наши</span>
              <span className="relative inline-block text-accent">
                Услуги
                <span className="absolute -top-2 -left-3 w-5 h-5 border-t border-l border-led/55 pointer-events-none" aria-hidden="true" />
                <span className="absolute -bottom-2 -right-3 w-5 h-5 border-b border-r border-led/55 pointer-events-none" aria-hidden="true" />
              </span>
            </h1>

            <p className="text-snow/70 text-base max-w-lg leading-relaxed mb-10">
              Шесть направлений — от торгового оборудования и наружной рекламы до текстильных лайтбоксов и светодиодных экранов. Собственный цех площадью 800 м², монтаж под ключ.
            </p>

            {/* Quick nav */}
            <div className="flex flex-wrap gap-2.5">
              {navLabels.map((label, i) => (
                <a
                  key={label}
                  href={`#service-${navIds[i]}`}
                  className="px-4 py-2 border border-white/20 text-snow text-xs font-medium tracking-wide hover:border-led hover:text-led transition-colors backdrop-blur-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom graphic ribbon */}
        <div className="relative overflow-hidden h-12 pointer-events-none">
          <div className="-rotate-[1.2deg] absolute inset-y-0 -inset-x-4 flex items-center border-y border-white/14 bg-white/7">
            <p className="whitespace-nowrap text-white/32 text-[11px] font-semibold uppercase tracking-[0.28em] select-none">
              {ribbonText.repeat(10)}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SERVICES — wide editorial blocks ─── */}
      <section className="relative bg-snow dark:bg-graphite">
        <ArchitecturalGrid />

        {services.map((s, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={s.id}
              id={`service-${s.id}`}
              className={`relative border-b border-graphite/[0.08] dark:border-white/[0.06] overflow-hidden ${
                isReversed ? 'bg-surface/80 dark:bg-surface-dark/70' : ''
              }`}
            >
              {/* Ghost number — decorative background, very low opacity */}
              <div
                aria-hidden="true"
                className={`absolute bottom-0 font-black leading-none select-none pointer-events-none z-0 text-graphite/[0.04] dark:text-white/[0.03] ${
                  isReversed ? 'left-[-0.04em]' : 'right-[-0.04em]'
                }`}
                style={{ fontSize: 'clamp(10rem, 24vw, 30rem)' }}
              >
                {s.tag}
              </div>

              {/*
                2-col grid — min-height gives each block showcase presence.
                Image chain: grid (min-h-[800px], stretches to content) → column (lg:h-full) → wrapper (lg:h-full, overflow-hidden) → img (block w-full h-full object-cover)
                Any image added via localImage is automatically cropped into this container.
              */}
              <div
                className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:min-h-[800px] ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* IMAGE COLUMN */}
                <div className={`lg:h-full ${isReversed ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-graphite/10 dark:bg-white/[0.04]">
                    <img
                      src={s.localImage ?? `https://picsum.photos/seed/${s.seed}/900/700`}
                      alt={s.title}
                      className="block w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                {/* TEXT COLUMN */}
                <div
                  className={`flex flex-col justify-center px-10 sm:px-14 lg:px-16 xl:px-20 2xl:px-24 py-16 lg:py-20 ${
                    isReversed ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <AnimateOnScroll>
                    {/* Number + rule */}
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="font-black leading-none text-accent/10 tabular-nums"
                        style={{ fontSize: 'clamp(2rem, 3.2vw, 3.5rem)' }}
                      >
                        {s.tag}
                      </span>
                      <span className="block flex-1 h-px bg-graphite/10 dark:bg-white/10" />
                    </div>

                    {/* Title */}
                    <Link href={`/services/${s.id}`} className="group inline-block mb-5">
                      <h2
                        className="font-bold text-graphite dark:text-snow group-hover:text-accent transition-colors leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.2rem, 3.5vw, 4rem)' }}
                      >
                        {s.title}
                      </h2>
                    </Link>

                    {/* Description */}
                    <p className="text-muted leading-relaxed mb-8 text-base lg:text-lg max-w-[420px]">
                      {s.description}
                    </p>

                    {/* Items */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm lg:text-base">
                          <span className="flex-shrink-0 w-4 h-4 bg-accent flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-graphite dark:text-snow">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <RequestButton
                        source="services-list"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-led text-snow text-sm font-semibold transition-colors"
                      >
                        Рассчитать стоимость
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </RequestButton>
                      <Link
                        href={`/services/${s.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-graphite/20 dark:border-white/15 text-graphite dark:text-snow text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                      >
                        Подробнее
                        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </AnimateOnScroll>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── ACCENT RIBBON DIVIDER ─── */}
      <div className="relative overflow-hidden h-14 bg-snow dark:bg-graphite">
        <div className="absolute inset-0 flex items-center">
          <div className="-rotate-[1.2deg] w-[115%] -translate-x-[7%] bg-accent py-3 flex overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap text-snow text-xs font-black uppercase tracking-[0.22em] mx-10">
                ТОРГОВОЕ ОБОРУДОВАНИЕ · НАРУЖНАЯ РЕКЛАМА · СВЕТОДИОДНЫЕ ЭКРАНЫ · ДЕКОРАЦИИ · ОФОРМЛЕНИЕ МЕСТ ПРОДАЖ · ТЕКСТИЛЬНЫЕ ЛАЙТБОКСЫ ·
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HOW WE WORK ─── */}
      <section className="py-24 bg-surface dark:bg-surface-dark">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Процесс
              </span>
            </div>
            <h2 className="text-4xl font-bold text-graphite dark:text-snow mb-14">
              Как мы работаем
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-graphite/10 dark:bg-white/[0.06]">
            {steps.map((step) => (
              <div key={step.num} className="bg-surface dark:bg-surface-dark p-8">
                <div className="text-4xl font-bold text-accent mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="font-bold text-graphite dark:text-snow mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEEDBACK ─── */}
      <div id="feedback">
        <Feedback />
      </div>
    </main>
  );
}
