import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
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

const ribbonText = 'ВИТРИНЫ · ТОРГОВЫЕ ЗОНЫ · ИНТЕРЬЕРНЫЕ ВЫВЕСКИ · ДЕКОР · POSM · ОФОРМЛЕНИЕ · РЕКЛАМА · МОНТАЖ · ';

export default async function ServicesPage() {
  const services = await db.serviceDirection.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  const navLabels = services.map((s) => s.title);
  const navIds = services.map((s) => s.slug);

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

        <div className="absolute left-0 right-0 overflow-hidden pointer-events-none" style={{ top: '68px' }}>
          <div className="flex items-center border-y border-white/12 bg-white/5 py-2">
            <p className="whitespace-nowrap text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em] select-none">
              {ribbonText.repeat(12)}
            </p>
          </div>
        </div>

        <MessengerBadge />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-40 pb-16">
          <div className="max-w-[1600px] mx-auto">
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

        <div className="relative overflow-hidden h-12 pointer-events-none">
          <div className="-rotate-[1.2deg] absolute inset-y-0 -inset-x-4 flex items-center border-y border-white/14 bg-white/7">
            <p className="whitespace-nowrap text-white/32 text-[11px] font-semibold uppercase tracking-[0.28em] select-none">
              {ribbonText.repeat(10)}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="relative bg-snow dark:bg-graphite">
        <ArchitecturalGrid />

        {services.map((s, idx) => {
          const isReversed = idx % 2 === 1;
          const items: string[] = (() => {
            try { return JSON.parse(s.itemsJson); } catch { return []; }
          })();

          return (
            <div
              key={s.id}
              id={`service-${s.slug}`}
              className={`relative border-b border-graphite/[0.08] dark:border-white/[0.06] overflow-hidden ${
                isReversed ? 'bg-surface/80 dark:bg-surface-dark/70' : ''
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute bottom-0 font-black leading-none select-none pointer-events-none z-0 text-graphite/[0.04] dark:text-white/[0.03] ${
                  isReversed ? 'left-[-0.04em]' : 'right-[-0.04em]'
                }`}
                style={{ fontSize: 'clamp(10rem, 24vw, 30rem)' }}
              >
                {s.tag}
              </div>

              <div
                className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:min-h-[800px] ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={`lg:h-full ${isReversed ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-graphite/10 dark:bg-white/[0.04]">
                    {s.image && (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="block w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center px-10 sm:px-14 lg:px-16 xl:px-20 2xl:px-24 py-16 lg:py-20 ${
                    isReversed ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <AnimateOnScroll>
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="font-black leading-none text-accent/10 tabular-nums"
                        style={{ fontSize: 'clamp(2rem, 3.2vw, 3.5rem)' }}
                      >
                        {s.tag}
                      </span>
                      <span className="block flex-1 h-px bg-graphite/10 dark:bg-white/10" />
                    </div>

                    <Link href={`/services/${s.slug}`} className="group inline-block mb-5">
                      <h2
                        className="font-bold text-graphite dark:text-snow group-hover:text-accent transition-colors leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.2rem, 3.5vw, 4rem)' }}
                      >
                        {s.title}
                      </h2>
                    </Link>

                    <p className="text-muted leading-relaxed mb-8 text-base lg:text-lg max-w-[420px]">
                      {s.description}
                    </p>

                    {items.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10">
                        {items.map((item) => (
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
                    )}

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
                        href={`/services/${s.slug}`}
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

      {/* ─── ACCENT RIBBON ─── */}
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

      <div id="feedback">
        <Feedback />
      </div>
    </main>
  );
}
