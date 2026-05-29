import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { company } from '@/lib/company';

const features = [
  {
    title: 'Собственное производство',
    description: 'Цех площадью 800 м² с профессиональным сварочным и металлообрабатывающим оборудованием',
  },
  {
    title: 'Любой объём и сложность',
    description: 'От единичного изделия для частного клиента до серийного выпуска для торговых сетей',
  },
  {
    title: 'Гарантия и сопровождение',
    description: 'Гарантия на все изделия. Доставка и монтаж по Москве и МО',
  },
  {
    title: 'Работаем с юрлицами',
    description: 'Закрываем полный пакет документов: договор, акты, счета-фактуры, НДС',
  },
];

export function CompanyInfo() {
  return (
    <section id="about" className="relative py-24 bg-snow dark:bg-graphite">
      <ArchitecturalGrid />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  О компании
                </span>
              </div>
              <h2
                className="font-bold text-graphite dark:text-snow mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
              >
                Производство металла —<br />наша специализация
              </h2>
            </AnimateOnScroll>
            <p className="text-muted text-lg leading-relaxed mb-5">
              С 2014 года изготавливаем изделия из металла для жилых и коммерческих объектов. Начинали со сварочных работ — сегодня закрываем шесть направлений: конструкции, мебель, торговое оборудование, наружная реклама, лазерная резка и интерьерные вывески.
            </p>
            <p className="text-muted leading-relaxed mb-10">
              Все этапы — проектирование, раскрой, сварка, покраска, доставка — выполняем самостоятельно. Никаких субподрядчиков.
            </p>

            <div className="space-y-5">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 bg-accent flex items-center justify-center">
                    <svg className="w-3 h-3 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold text-graphite dark:text-snow text-sm">{f.title}</div>
                    <div className="text-sm text-muted mt-0.5">{f.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual block */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-graphite/10 dark:bg-white/5 overflow-hidden">
              <img
                src="https://picsum.photos/seed/workshop-metal/800/600"
                alt="Производственный цех"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-graphite dark:bg-surface-dark p-6">
                <div className="text-3xl font-bold text-accent mb-1">{company.stats.yearsOnMarket}</div>
                <div className="text-sm text-muted">лет работы</div>
              </div>
              <div className="bg-graphite dark:bg-surface-dark p-6">
                <div className="text-3xl font-bold text-accent mb-1">{company.stats.completedOrders}</div>
                <div className="text-sm text-muted">выполненных заказов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
