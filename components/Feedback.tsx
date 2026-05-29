'use client';

import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';

export function Feedback() {
  return (
    <section className="relative bg-graphite py-24">
      <ArchitecturalGrid variant="hero" />
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  Обратная связь
                </span>
              </div>
              <h2
                className="font-bold text-snow mb-5 leading-tight"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
              >
                Получите бесплатный<br />расчёт стоимости
              </h2>
            </AnimateOnScroll>
            <p className="text-muted leading-relaxed mb-8">
              Оставьте заявку — перезвоним в течение 30 минут, уточним детали и рассчитаем стоимость вашего проекта. Работаем по Москве и Московской области.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Выезд на замер — бесплатно',
                'Расчёт в день обращения',
                'Гарантия на все изделия',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent flex-shrink-0 flex items-center justify-center">
                    <svg className="w-3 h-3 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-snow/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-surface-dark border border-white/[0.08] p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-graphite border border-white/10 text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors text-sm"
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-graphite border border-white/10 text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors text-sm"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Что нужно сделать?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-graphite border border-white/10 text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                  placeholder="Опишите задачу: тип изделия, размеры, материал, сроки..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-muted/50 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
