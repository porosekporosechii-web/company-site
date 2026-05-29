import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { AdminSignOut } from './AdminSignOut';

export const metadata: Metadata = {
  title: 'Админ-панель',
  robots: { index: false, follow: false },
};

const navItems = [
  { href: '/admin', label: 'Сводка', exact: true },
  { href: '/admin/works', label: 'Портфолио' },
  { href: '/admin/posts', label: 'Блог' },
  { href: '/admin/partners', label: 'Партнёры' },
  { href: '/admin/directions', label: 'Услуги' },
  { href: '/admin/contacts', label: 'Контакты' },
  { href: '/admin/texts', label: 'Тексты главной' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-surface dark:bg-graphite text-graphite dark:text-snow">
      {/* Top bar */}
      {session && (
        <header className="border-b border-graphite/[0.08] dark:border-white/[0.08] bg-snow dark:bg-surface-dark">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-bold tracking-tight text-sm">
                RAUCO <span className="text-muted font-normal">/ admin</span>
              </Link>
              <Link href="/" target="_blank" className="text-xs text-muted hover:text-accent transition-colors">
                ↗ Сайт
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>{session.user?.name}</span>
              <AdminSignOut />
            </div>
          </div>
        </header>
      )}

      {/* Body — sidebar + content */}
      {session ? (
        <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          <nav className="text-sm">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 hover:bg-graphite/[0.05] dark:hover:bg-white/[0.05] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      ) : (
        // Login page renders without nav
        <main>{children}</main>
      )}
    </div>
  );
}
