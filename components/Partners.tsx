import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';

const partners = [
  { name: 'СтройГрупп',     field: 'Строительство' },
  { name: 'Loft Studio',    field: 'Дизайн интерьеров' },
  { name: 'МегаТорг',       field: 'Торговые сети' },
  { name: 'АрхМастер',      field: 'Архитектура' },
  { name: 'ТехноПром',      field: 'Промышленность' },
  { name: 'Urban Space',    field: 'Девелопмент' },
  { name: 'АвтоДилер Групп',field: 'Автосалоны' },
  { name: 'Форт Ритейл',    field: 'Ритейл' },
  { name: 'КофеХаус',       field: 'HoReCa' },
  { name: 'МедТехника',     field: 'Медицина' },
];

export function Partners() {
  return (
    <section className="relative py-20 bg-snow dark:bg-graphite border-y border-graphite/[0.08] dark:border-white/[0.06]">
      <ArchitecturalGrid />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Клиенты
              </span>
            </div>
            <h2
              className="font-bold text-graphite dark:text-snow"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              С нами работают
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <p className="text-muted max-w-sm text-sm leading-relaxed">
              Среди наших клиентов — строительные и дизайн-студии, торговые сети, рестораны и промышленные компании Москвы.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-graphite/10 dark:bg-white/[0.06]">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group bg-snow dark:bg-graphite px-6 py-8 flex flex-col items-center justify-center text-center hover:bg-surface dark:hover:bg-surface-dark transition-colors"
            >
              <div className="w-12 h-12 bg-graphite/[0.07] dark:bg-white/[0.06] group-hover:bg-accent flex items-center justify-center mb-3 transition-colors">
                <span className="text-sm font-bold text-muted group-hover:text-snow transition-colors leading-none">
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="text-sm font-semibold text-graphite dark:text-snow leading-tight mb-1">
                {p.name}
              </div>
              <div className="text-xs text-muted">
                {p.field}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
