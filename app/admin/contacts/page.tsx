import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/format';
import { AdminShell, StatusBadge, inputClass } from '../_components/AdminShell';
import { StatusSelect } from '../_components/StatusSelect';

async function updateStatus(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const status = String(fd.get('status') ?? 'new');
  await db.submission.update({ where: { id }, data: { status } });
  revalidatePath('/admin/contacts');
}

async function saveNote(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const note = String(fd.get('note') ?? '').trim() || null;
  await db.submission.update({ where: { id }, data: { managerNote: note } });
  revalidatePath('/admin/contacts');
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'Новая' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Закрыта' },
  { value: 'spam', label: 'Спам' },
];

export default async function ContactsPage() {
  const submissions = await db.submission.findMany({ orderBy: { createdAt: 'desc' } });
  const counts = { new: 0, in_progress: 0, done: 0, spam: 0 };
  for (const s of submissions) counts[s.status as keyof typeof counts] = (counts[s.status as keyof typeof counts] ?? 0) + 1;

  return (
    <AdminShell
      title="Заявки"
      description={`${submissions.length} всего · ${counts.new} новых`}
    >
      {/* Stats strip */}
      <div className="flex gap-3 mb-8">
        {STATUS_OPTIONS.map((opt) => (
          <div key={opt.value} className="px-4 py-2 border border-graphite/10 dark:border-white/10 text-center">
            <div className="text-2xl font-bold tabular-nums">{counts[opt.value as keyof typeof counts] ?? 0}</div>
            <div className="text-xs text-muted mt-0.5">{opt.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {submissions.map((s) => (
          <div key={s.id} className="border border-graphite/10 dark:border-white/10 p-4 bg-snow dark:bg-surface-dark">
            {/* Header row */}
            <div className="flex flex-wrap items-start gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-graphite dark:text-snow">
                    {s.name ?? '—'}
                  </span>
                  <a href={`tel:${s.phone}`} className="text-accent font-mono text-sm hover:underline">
                    {s.phone}
                  </a>
                  {s.email && (
                    <a href={`mailto:${s.email}`} className="text-muted text-sm hover:text-accent">
                      {s.email}
                    </a>
                  )}
                  <StatusBadge status={s.status} />
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span>{formatDate(s.createdAt)}</span>
                  {s.source && <span>· {s.source}</span>}
                </div>
              </div>

              {/* Status selector */}
              <StatusSelect action={updateStatus} id={s.id} current={s.status} />
            </div>

            {/* Message */}
            {s.message && (
              <p className="text-sm text-muted leading-relaxed mb-3 border-l-2 border-accent/30 pl-3">
                {s.message}
              </p>
            )}

            {/* Note */}
            <form action={saveNote} className="flex gap-2 items-center">
              <input type="hidden" name="id" value={s.id} />
              <input
                name="note"
                type="text"
                defaultValue={s.managerNote ?? ''}
                placeholder="Заметка менеджера…"
                className={`${inputClass} py-1 text-xs flex-1`}
              />
              <button type="submit" className="px-3 py-1 bg-graphite/10 dark:bg-white/10 text-xs font-semibold hover:bg-accent hover:text-snow transition-colors whitespace-nowrap">
                Сохранить
              </button>
            </form>
          </div>
        ))}

        {submissions.length === 0 && (
          <p className="text-center py-12 text-muted text-sm">Заявок пока нет</p>
        )}
      </div>
    </AdminShell>
  );
}
