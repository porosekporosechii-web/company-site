import Link from 'next/link';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { MessengerBadge } from '@/components/MessengerBadge';

export default function NotFound() {
  return (
    <main>
      <section className="relative overflow-hidden bg-graphite min-h-[80vh] flex items-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35]"
          style={{ backgroundImage: "url('/banner.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-graphite/60 to-graphite/30" />
        <ArchitecturalGrid variant="hero" />
        <MessengerBadge />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-20">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.25em] uppercase">
                Страница не найдена
              </span>
            </div>

            <h1
              className="font-black text-snow leading-none tracking-tight mb-8 tabular-nums"
              style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}
            >
              <span className="text-accent">404</span>
            </h1>

            <h2
              className="font-bold text-snow leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)' }}
            >
              Здесь пусто, как в цехе перед стартом смены
            </h2>

            <p className="text-snow/65 text-base leading-relaxed mb-10 max-w-xl">
              Страница, которую вы искали, не существует или была перенесена. Вернитесь на главную или выберите раздел ниже.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-led text-snow text-sm font-bold tracking-wide transition-colors"
              >
                На главную
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors"
              >
                Услуги
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors"
              >
                Портфолио
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
