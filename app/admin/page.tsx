import { db } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [works, posts, partners, directions, submissions, newSubmissions] = await Promise.all([
    db.work.count({ where: { published: true } }),
    db.post.count({ where: { published: true } }),
    db.partner.count(),
    db.serviceDirection.count({ where: { published: true } }),
    db.submission.count(),
    db.submission.count({ where: { status: 'new' } }),
  ]);

  const stats = [
    { label: 'Работ в портфолио', value: works, href: '/admin/works' },
    { label: 'Статей в блоге', value: posts, href: '/admin/posts' },
    { label: 'Партнёров', value: partners, href: '/admin/partners' },
    { label: 'Направлений услуг', value: directions, href: '/admin/directions' },
    { label: 'Заявок всего', value: submissions, href: '/admin/contacts' },
    { label: 'Новых заявок', value: newSubmissions, href: '/admin/contacts', highlight: newSubmissions > 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Сводка</h1>
      <p className="text-sm text-muted mb-8">Текущее состояние контента сайта</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className={`block p-5 border transition-colors hover:border-accent ${
              s.highlight
                ? 'bg-accent/10 border-accent/40'
                : 'bg-snow dark:bg-surface-dark border-graphite/[0.08] dark:border-white/[0.06]'
            }`}
          >
            <div className={`text-3xl font-bold tabular-nums ${s.highlight ? 'text-accent' : ''}`}>
              {s.value}
            </div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </a>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        {[
          { href: '/admin/works/new', label: '+ Добавить работу в портфолио' },
          { href: '/admin/posts/new', label: '+ Написать статью в блог' },
          { href: '/admin/directions', label: '✎ Редактировать услуги' },
          { href: '/admin/texts', label: '✎ Тексты главной страницы' },
          { href: '/admin/partners', label: '+ Добавить клиента' },
          { href: '/admin/contacts', label: '↗ Смотреть заявки' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-4 py-3 border border-graphite/10 dark:border-white/10 text-muted hover:text-accent hover:border-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
