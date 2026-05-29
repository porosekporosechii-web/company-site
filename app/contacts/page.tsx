'use client';

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
    lines: [company.hours.weekdays, company.hours.saturday],
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

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors text-sm"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
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
                    className="w-full px-4 py-3 border border-graphite/20 dark:border-white/[0.12] bg-snow dark:bg-surface-dark text-graphite dark:text-snow placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                    placeholder="Опишите задачу: что нужно сделать, размеры, сроки, объём..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors"
                >
                  Отправить сообщение
                </button>
                <p className="text-xs text-muted text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            </div>

            {/* Requisites */}
            <div className="flex flex-col justify-center">
              <div className="bg-surface dark:bg-surface-dark border border-graphite/[0.08] dark:border-white/[0.06] p-8 space-y-3">
                <h3 className="text-sm font-bold text-graphite dark:text-snow uppercase tracking-widest mb-6">
                  Реквизиты
                </h3>
                {[
                  ['Компания', company.legalName],
                  ['ИНН', company.requisites.inn],
                  ['КПП', company.requisites.kpp],
                  ['ОГРН', company.requisites.ogrn],
                  ['Юр. адрес', company.requisites.legalAddress],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4 text-sm py-3 border-b border-graphite/[0.08] dark:border-white/[0.06] last:border-0">
                    <span className="flex-shrink-0 w-28 text-muted">{k}</span>
                    <span className="text-graphite dark:text-snow font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map — full width */}
      <section className="h-96 bg-surface dark:bg-surface-dark relative overflow-hidden border-t border-graphite/[0.08] dark:border-white/[0.06]">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <svg className="w-10 h-10 text-accent mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-graphite dark:text-snow font-semibold mb-1">
            г. Москва, ул. Промышленная, д. 12, стр. 3
          </p>
          <p className="text-muted text-sm mb-4">
            Ближайшее метро: Печатники
          </p>
          <a
            href="https://yandex.ru/maps/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-accent hover:bg-led text-snow text-sm font-semibold transition-colors"
          >
            Открыть на Яндекс.Картах →
          </a>
        </div>
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(17,19,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,23,0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full ring-8 ring-accent/20" />
      </section>
    </main>
  );
}
