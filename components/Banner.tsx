'use client';

import { useState } from 'react';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { MessengerBadge } from './MessengerBadge';

export function Banner() {
  const [phone, setPhone] = useState('');

  return (
    <section className="relative overflow-hidden bg-graphite min-h-[88vh]">
      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
        style={{ backgroundImage: "url('/banner.png')" }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/10 to-transparent" />

      <ArchitecturalGrid variant="hero" />

      {/* Top ribbon (below navbar) */}
      <div className="absolute left-0 right-0 z-[1] overflow-hidden h-8" style={{ top: '68px' }}>
        <div className="-rotate-[0.4deg] w-[110%] -translate-x-[5%] bg-white/5 border-y border-white/[0.08] h-full flex items-center overflow-hidden">
          <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap mx-10">
                ТОРГОВОЕ ОБОРУДОВАНИЕ · НАРУЖНАЯ РЕКЛАМА · ДЕКОРАЦИИ · СВЕТОДИОДНЫЕ ЭКРАНЫ ·
              </span>
            ))}
          </span>
        </div>
      </div>

      <MessengerBadge />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-44 pb-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-[2px] bg-led" />
            <span className="text-led text-xs font-semibold tracking-[0.25em] uppercase">
              Оформление мест продаж · Наружная реклама · Вывески · Светодиодные экраны
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white leading-[0.92] tracking-tight uppercase mb-9"
            style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
          >
            <span className="block text-snow">Оформление</span>
            <span className="block text-snow">мест продаж</span>
            <span className="relative inline-block text-accent">
              любой сложности
              <span className="absolute -top-2 -left-3 w-6 h-6 border-t-2 border-l-2 border-led/60 pointer-events-none" />
              <span className="absolute -bottom-2 -right-3 w-6 h-6 border-b-2 border-r-2 border-led/60 pointer-events-none" />
            </span>
          </h1>

          {/* Description + form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end max-w-4xl mb-14">
            <p className="text-base text-neutral-300 leading-relaxed">
              Производим сварные конструкции, лофт-мебель из металла и дерева, стеллажи и витрины для торговли. Работаем с юридическими и физическими лицами.
            </p>
            <div>
              <div className="flex flex-col sm:flex-row gap-0 mb-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-sm"
                />
                <button
                  type="button"
                  className="px-6 py-3.5 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors whitespace-nowrap"
                >
                  Получить расчёт
                </button>
              </div>
              <p className="text-white/30 text-xs">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '10+',  label: 'лет на рынке' },
              { value: '500+', label: 'выполненных заказов' },
              { value: '800',  label: 'м² производственного цеха' },
              { value: '14',   label: 'специалистов в цехе' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-snow">{s.value}</div>
                <div className="text-sm text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ribbon */}
      <div className="relative z-[1] overflow-hidden h-12">
        <div className="-rotate-[1.2deg] w-[115%] -translate-x-[7%] bg-white/[0.07] border-y border-white/[0.14] py-3 flex overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap text-white/[0.32] text-xs font-black uppercase tracking-[0.22em] mx-10">
              ТОРГОВОЕ ОБОРУДОВАНИЕ · НАРУЖНАЯ РЕКЛАМА · ДЕКОРАЦИИ · СВЕТОДИОДНЫЕ ЭКРАНЫ ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
