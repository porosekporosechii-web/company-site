import { db } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [works, posts, partners, directions] = await Promise.all([
    db.work.count(),
    db.post.count(),
    db.partner.count(),
    db.serviceDirection.count(),
  ]);

  const stats = [
    { label: 'Работ в портфолио', value: works, href: '/admin/works' },
    { label: 'Статей в блоге', value: posts, href: '/admin/posts' },
    { label: 'Партнёров', value: partners, href: '/admin/partners' },
    { label: 'Направлений услуг', value: directions, href: '/admin/directions' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Сводка</h1>
      <p className="text-sm text-muted mb-8">Текущее состояние контента сайта</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="block p-5 bg-snow dark:bg-surface-dark border border-graphite/[0.08] dark:border-white/[0.06] hover:border-accent transition-colors"
          >
            <div className="text-3xl font-bold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </a>
        ))}
      </div>

      <div className="mt-10 p-5 border border-dashed border-graphite/15 dark:border-white/10 text-sm text-muted">
        <strong className="text-graphite dark:text-snow">CRUD разделы в разработке.</strong> Дальше идёт работа по портфолио, блогу, партнёрам, услугам и текстам.
      </div>
    </div>
  );
}
