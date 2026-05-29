import Link from 'next/link';
import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { SectionHeader } from './SectionHeader';

const services = [
  {
    id: 'pos',
    tag: '01',
    title: 'Оформление мест продаж',
    description: 'Брендинг торговых пространств, витрины, навигация',
    image: '/banner-pos.png',
  },
  {
    id: 'retail',
    tag: '02',
    title: 'Торговое оборудование',
    description: 'Витрины, стеллажи, ресепшн-стойки из металла',
    image: '/banner-retail.png',
  },
  {
    id: 'outdoor',
    tag: '03',
    title: 'Наружная реклама',
    description: 'Вывески, объёмные буквы, крышные установки',
    image: '/banner-outdoor.png',
  },
  {
    id: 'led',
    tag: '04',
    title: 'Светодиодные экраны',
    description: 'LED-панели для интерьера и наружной рекламы',
    image: '/banner-led.png',
  },
  {
    id: 'decor',
    tag: '05',
    title: 'Декорации',
    description: 'Праздничное оформление, арт-объекты, инсталляции',
    image: '/banner-decor.png',
  },
  {
    id: 'textile',
    tag: '06',
    title: 'Текстильные лайтбоксы',
    description: 'SEG-рамки, потолочные и витринные лайтбоксы',
    image: '/banner-textile.png',
  },
];

export function Services() {
  const last = services.length - 1;

  return (
    <section id="services" className="relative bg-snow dark:bg-graphite py-20">
      <ArchitecturalGrid />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <AnimateOnScroll>
          <SectionHeader
            tag="Направления"
            title="Наши услуги"
            description="Шесть направлений — производство, монтаж и обслуживание торговых конструкций."
            className="mb-12"
          />
        </AnimateOnScroll>

        {/*
          Editorial asymmetric grid:
            Row 1 (tall):   [Card 0 — 2/3 wide] [Card 1 — 1/3]
            Row 2 (medium): [Card 2] [Card 3] [Card 4]
            Row 3 (banner): [Card 5 — full width, short]
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s, idx) => {
            const isFeatured = idx === 0;
            const isWide = idx === last;

            let sizeClass: string;
            if (isFeatured) {
              sizeClass = 'md:col-span-2 lg:col-span-2 h-[440px] md:h-[480px] lg:h-[520px]';
            } else if (idx === 1) {
              sizeClass = 'h-[380px] md:h-[480px] lg:h-[520px]';
            } else if (isWide) {
              sizeClass = 'md:col-span-2 lg:col-span-3 h-[200px] md:h-[230px]';
            } else {
              sizeClass = 'h-[300px]';
            }

            return (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className={`group relative overflow-hidden block bg-graphite/10 dark:bg-[#1a1d23] ${sizeClass}`}
              >
                {/* Photo */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay — always dark so text is legible on photo */}
                {isWide ? (
                  <div className="absolute inset-0 bg-gradient-to-r from-graphite/85 via-graphite/50 to-transparent" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/92 via-graphite/30 to-graphite/5" />
                )}

                {/* Number tag */}
                <span className="absolute top-5 left-5 text-led text-[10px] font-bold tracking-[0.3em] uppercase z-10">
                  {s.tag}
                </span>

                {/* Corner accent on featured */}
                {isFeatured && (
                  <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-led/35 z-10" />
                )}

                {/* Content */}
                {isWide ? (
                  <div className="absolute inset-0 flex items-center px-8 md:px-12 z-10">
                    <div>
                      <h3
                        className="font-bold text-snow leading-tight tracking-tight mb-2"
                        style={{ fontSize: 'clamp(1.4rem, 2vw, 2.1rem)' }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-white/55 text-sm mb-4">{s.description}</p>
                      <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wide uppercase group-hover:gap-3 transition-all">
                        Подробнее
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                    <h3
                      className="font-bold text-snow leading-tight tracking-tight mb-1.5"
                      style={{
                        fontSize: isFeatured
                          ? 'clamp(1.6rem, 2.4vw, 2.6rem)'
                          : 'clamp(1.05rem, 1.6vw, 1.45rem)',
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className={`text-white/55 mb-3 ${isFeatured ? 'text-sm max-w-xs' : 'text-xs'}`}>
                      {s.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold tracking-wide uppercase group-hover:gap-2.5 transition-all">
                      Подробнее
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-graphite/20 dark:border-white/15 text-graphite dark:text-snow text-sm font-semibold hover:bg-accent hover:border-accent hover:text-snow transition-colors"
          >
            Все направления
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
