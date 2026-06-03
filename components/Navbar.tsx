'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useModal } from './ModalProvider';
import { company } from '@/lib/company';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/about', label: 'О компании' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-snow dark:bg-graphite border-b border-graphite/[0.08] dark:border-white/[0.07]">
      <nav className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Логотип"
            className="h-8 w-auto dark:invert"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-muted hover:text-graphite dark:hover:text-snow'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: phone + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={company.phone.href}
            className="text-sm font-semibold text-graphite dark:text-snow hover:text-accent transition-colors"
          >
            {company.phone.display}
          </a>
          <button
            type="button"
            onClick={() => openModal({ source: 'navbar' })}
            className="px-4 py-2 bg-accent text-snow text-sm font-semibold hover:bg-led transition-colors"
          >
            Заказать
          </button>
        </div>

        {/* Mobile right */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 text-muted hover:text-graphite dark:hover:text-snow transition-colors"
            aria-label="Переключить тему"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            className="p-2 text-graphite/70 dark:text-snow/70"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop theme toggle */}
        <button
          onClick={toggle}
          className="hidden lg:block p-2 text-muted hover:text-graphite dark:hover:text-snow transition-colors"
          aria-label="Переключить тему"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-snow dark:bg-graphite border-t border-graphite/[0.08] dark:border-white/[0.07] px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-accent bg-accent/[0.07]'
                    : 'text-muted hover:bg-graphite/[0.04] dark:hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={company.phone.href}
            className="px-4 py-3 text-sm font-semibold text-graphite dark:text-snow border-t border-graphite/[0.08] dark:border-white/[0.07] mt-2 pt-4"
          >
            {company.phone.display}
          </a>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openModal({ source: 'navbar-mobile' }); }}
            className="mx-4 mt-2 px-4 py-3 bg-accent text-snow text-sm font-semibold text-center hover:bg-led transition-colors"
          >
            Заказать
          </button>
        </div>
      )}
    </header>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}
