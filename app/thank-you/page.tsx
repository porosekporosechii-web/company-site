import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';

export const metadata: Metadata = {
  title: 'Спасибо за заявку',
  description: 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
};

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen bg-graphite flex items-center justify-center overflow-hidden">
      <ArchitecturalGrid variant="hero" />

      <div className="relative z-10 max-w-[560px] mx-auto px-6 py-24 text-center">
        {/* Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-accent flex items-center justify-center">
            <svg className="w-10 h-10 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* LED label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="block w-10 h-[2px] bg-led" />
          <span className="text-led text-[10px] font-semibold tracking-[0.3em] uppercase">
            Заявка принята
          </span>
          <span className="block w-10 h-[2px] bg-led" />
        </div>

        {/* Heading */}
        <h1
          className="font-bold text-snow leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Спасибо!
        </h1>

        <p className="text-muted text-base leading-relaxed mb-10 max-w-[400px] mx-auto">
          Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время — обычно перезваниваем в течение 30 минут.
        </p>

        {/* Accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent mb-10" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors"
          >
            Посмотреть портфолио
          </Link>
        </div>
      </div>
    </main>
  );
}
