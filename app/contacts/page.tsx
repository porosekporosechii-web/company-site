'use client';

import { useState } from 'react';
import { ServiceHero } from '@/components/ServiceHero';
import { company } from '@/lib/company';

const contactCards = [
  {
    icon: (
      <svg aria-hidden="true" className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Телефон',
    lines: [company.phone.display, company.phoneAlt.display],
    href: company.phone.href,
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    lines: [company.email.display],
    href: company.email.href,
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Режим работы',
    lines: [company.hours.weekdays, company.hours.saturday].filter(Boolean),
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Адрес',
    lines: [company.address.city, company.address.street],
  },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contacts-page' }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main>
      <ServiceHero
        title="Наши"
        highlight="контакты"
        subtitle="Позвоните, напишите или приезжайте в цех. Рассчитаем стоимость вашего проекта бесплатно."
        tag="Связаться"
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Контакты' },
        ]}
      />

      {/* Contact cards */}
      <section className="bg-graphite">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {contactCards.map((card) => (
              <div key={card.label} className="bg-graphite p-8">
                <div className="w-12 h-12 bg-white/[0.06] flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                  {card.label}
                </div>
                {card.href ? (
                  <a href={card.href} className="block hover:text-led transition-colors">
                    {card.lines.map((l) => (
                      <div key={l} className="text-snow font-medium">{l}</div>
                    ))}
                  </a>
                ) : (
                  card.lines.map((l) => (
                    <div key={l} className="text-snow font-medium">{l}</div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Requisites */}
      <section className="relative py-24 bg-snow dark:bg-graphite">
        <div
          className="absolute inset-0 pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(17,19,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,23,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,209,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,209,255,0.045) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  Заявка
                </span>
              </div>
              <h2
                className="font-bold text-graphite dark:text-snow mb-8 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
              >
                Напишите нам —<br />ответим в течение часа
              </h2>

              {status === 'ok' ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-accent/10">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-graphite dark:text-snow font-bold text-xl mb-2">Заявка отправлена</p>
                  <p className="text-muted text-sm">Свяжемся с вами в течение 30 минут</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                        Имя
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors text-sm"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors text-sm"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                      Сообщение
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                      placeholder="Опишите задачу: что нужно сделать, размеры, сроки, объём..."
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-sm text-red-500">Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-accent hover:bg-led disabled:opacity-60 text-snow font-bold text-sm tracking-wide transition-colors"
                  >
                    {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
                  </button>
                  <p className="text-xs text-muted text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  FAQ
                </span>
              </div>
              <h2
                className="font-bold text-graphite dark:text-snow mb-8 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
              >
                Часто задаваемые<br />вопросы
              </h2>
              <div className="space-y-px">
                {[
                  {
                    q: 'Как быстро вы делаете расчёт стоимости?',
                    a: 'В течение 30 минут после получения заявки. Для сложных проектов — в день обращения после уточнения деталей.',
                  },
                  {
                    q: 'Выезжаете ли вы на замер?',
                    a: 'Да, выезд на замер бесплатный. Замерщик приедет в удобное для вас время в любой день недели.',
                  },
                  {
                    q: 'Какой порядок оплаты?',
                    a: 'Работаем по договору: 50% аванс при запуске производства, остаток — при приёмке готового изделия.',
                  },
                  {
                    q: 'Есть ли гарантия на продукцию?',
                    a: 'Да, на всю продукцию предоставляем гарантию от 1 года. На LED-вывески и световые короба — до 3 лет.',
                  },
                ].map(({ q, a }) => (
                  <details key={q} className="group border border-graphite/[0.08] dark:border-white/[0.06] bg-surface dark:bg-surface-dark">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none">
                      <span className="text-sm font-semibold text-graphite dark:text-snow">{q}</span>
                      <svg
                        className="w-4 h-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <p className="px-6 pb-4 text-sm text-muted leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map — full width */}
      <section className="border-t border-graphite/[0.08] dark:border-white/[0.06]">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa6a7cadc87eacc2415f3f20f3beaaf205a7994a4b8b33fe87951d3d389e34e36&source=constructor"
          width="100%"
          height="480"
          frameBorder="0"
          allowFullScreen
          title="Карта — RAUCO"
          className="block"
        />
      </section>
    </main>
  );
}
