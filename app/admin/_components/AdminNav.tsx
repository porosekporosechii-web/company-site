'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Сводка', exact: true },
  { href: '/admin/works', label: 'Портфолио' },
  { href: '/admin/posts', label: 'Блог' },
  { href: '/admin/partners', label: 'Партнёры' },
  { href: '/admin/directions', label: 'Услуги' },
  { href: '/admin/contacts', label: 'Контакты' },
  { href: '/admin/texts', label: 'Тексты главной' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="text-sm">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 transition-colors ${
                  active
                    ? 'bg-accent/10 text-accent font-semibold border-l-2 border-accent'
                    : 'text-graphite dark:text-snow hover:bg-graphite/[0.05] dark:hover:bg-white/[0.05] border-l-2 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
