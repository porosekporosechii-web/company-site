import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModalProvider } from '@/components/ModalProvider';
import { Navbar } from '@/components/Navbar';
import { RequestButton } from '@/components/RequestButton';
import { company, serviceDirections } from '@/lib/company';

export const metadata: Metadata = {
  title: {
    default: `${company.name} — Производство торгового оборудования и оформление мест продаж`,
    template: `%s — ${company.name}`,
  },
  description:
    'Оформление мест продаж, торговое оборудование, наружная реклама, светодиодные экраны, декорации и текстильные лайтбоксы. Собственный цех 800 м² в Москве. Работаем с 2014 года.',
  keywords: [
    'оформление мест продаж',
    'торговое оборудование',
    'наружная реклама Москва',
    'светодиодные экраны',
    'текстильные лайтбоксы',
    'декорации для торговых залов',
    'производство рекламных конструкций Москва',
  ],
  authors: [{ name: company.name }],
  openGraph: {
    title: `${company.name} — Производство торгового оборудования и оформление мест продаж`,
    description:
      'Оформление мест продаж, наружная реклама, торговое оборудование, LED-экраны и декорации. Собственный цех в Москве.',
    siteName: company.name,
    locale: 'ru_RU',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.legalName,
  alternateName: company.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rauco.ru',
  telephone: company.phone.display,
  email: company.email.display,
  foundingDate: String(company.founded),
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  sameAs: [company.socials.telegram, company.socials.whatsapp].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-surface dark:bg-graphite text-graphite dark:text-snow transition-colors duration-300">
        <ThemeProvider>
          <ModalProvider>
          <Navbar />
          <div className="pt-16">{children}</div>

          {/* ─── Footer ─── */}
          <footer className="bg-graphite border-t border-white/[0.08]">
            {/* Thin LED accent line at top */}
            <div className="h-px bg-gradient-to-r from-transparent via-led/40 to-transparent" />

            <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <img src="/logo.png" alt="Логотип" className="h-7 w-auto mb-4 invert opacity-80" />
                <p className="text-muted text-sm leading-relaxed">
                  Производство рекламных конструкций, торгового оборудования и оформление мест продаж в Москве
                </p>
                <div className="mt-5 flex gap-3">
                  <a href={company.socials.telegram} target="_blank" rel="noopener noreferrer"
                     className="w-8 h-8 border border-white/10 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <a href={company.socials.whatsapp} target="_blank" rel="noopener noreferrer"
                     className="w-8 h-8 border border-white/10 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Directions */}
              <div>
                <div className="text-snow/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Направления</div>
                <ul className="space-y-2.5 text-sm">
                  {serviceDirections.map((item) => (
                    <li key={item.id}>
                      <Link href={`/services/${item.id}`} className="text-muted hover:text-accent transition-colors">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <div className="text-snow/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Компания</div>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: 'О компании', href: '/about' },
                    { label: 'Портфолио', href: '/portfolio' },
                    { label: 'Блог', href: '/blog' },
                    { label: 'Контакты', href: '/contacts' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-muted hover:text-accent transition-colors">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacts */}
              <div>
                <div className="text-snow/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Контакты</div>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href={company.phone.href} className="text-muted hover:text-accent transition-colors">
                      {company.phone.display}
                    </a>
                  </li>
                  <li>
                    <a href={company.email.href} className="text-muted hover:text-accent transition-colors">
                      {company.email.display}
                    </a>
                  </li>
                  <li className="text-muted">{company.hours.short}</li>
                  <li className="pt-3">
                    <RequestButton
                      source="footer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-led text-snow text-xs font-semibold transition-colors"
                    >
                      Написать нам
                      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </RequestButton>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/[0.06] py-5 px-6 sm:px-10 lg:px-16">
              <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-muted/60 text-xs">
                  © {new Date().getFullYear()} {company.name}. Все права защищены.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-led animate-pulse" />
                  <span className="text-[10px] text-muted/50 uppercase tracking-widest font-medium">RAUCO Design System</span>
                </div>
              </div>
            </div>
          </footer>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
