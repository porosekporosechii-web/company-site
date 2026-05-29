'use client';

import { ReactNode } from 'react';
import { company } from '@/lib/company';

export function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-snow dark:bg-graphite">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Контакты
              </span>
            </div>
            <h2 className="text-4xl font-bold text-graphite dark:text-snow mb-4 leading-tight">
              Обсудим ваш проект
            </h2>
            <p className="text-muted mb-12 leading-relaxed">
              Оставьте заявку или свяжитесь с нами напрямую. Сделаем расчёт стоимости бесплатно в течение рабочего дня.
            </p>

            <div className="space-y-6">
              <ContactRow
                icon={<PhoneIcon />}
                label="Телефон"
                value={company.phone.display}
                href={company.phone.href}
              />
              <ContactRow
                icon={<EmailIcon />}
                label="Email"
                value={company.email.display}
                href={company.email.href}
              />
              <ContactRow
                icon={<ClockIcon />}
                label="Режим работы"
                value={company.hours.short}
              />
              <ContactRow
                icon={<PinIcon />}
                label="Адрес производства"
                value={company.address.full}
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-surface dark:bg-surface-dark border border-graphite/[0.08] dark:border-white/[0.06] p-8">
            <h3 className="text-xl font-bold text-graphite dark:text-snow mb-6">
              Оставить заявку
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-graphite/15 dark:border-white/10 bg-snow dark:bg-graphite text-graphite dark:text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors text-sm"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Телефон или Email
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-graphite/15 dark:border-white/10 bg-snow dark:bg-graphite text-graphite dark:text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors text-sm"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                  Опишите задачу
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-graphite/15 dark:border-white/10 bg-snow dark:bg-graphite text-graphite dark:text-snow placeholder-muted/60 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                  placeholder="Что нужно сделать, размеры, сроки, объём..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-accent hover:bg-led text-snow font-semibold text-sm tracking-wide transition-colors"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-muted/60 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-accent/[0.08] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-0.5">
          {label}
        </div>
        <div className="text-graphite dark:text-snow font-medium">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-70 transition-opacity">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
