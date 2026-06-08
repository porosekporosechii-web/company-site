'use client';

const STATUS_OPTIONS = [
  { value: 'new', label: 'Новая' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Закрыта' },
  { value: 'spam', label: 'Спам' },
];

const selectClass = 'w-full bg-snow dark:bg-surface-dark border border-graphite/20 dark:border-white/15 px-3 py-2 text-sm text-graphite dark:text-snow placeholder:text-muted focus:outline-none focus:border-accent transition-colors';

export function StatusSelect({
  action,
  id,
  current,
}: {
  action: (fd: FormData) => Promise<void>;
  id: number | string;
  current: string;
}) {
  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        className={`${selectClass} w-auto py-1 text-xs`}
        onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button type="submit" className="px-3 py-1 bg-graphite/10 dark:bg-white/10 text-xs font-semibold hover:bg-accent hover:text-snow transition-colors">
        ОК
      </button>
    </form>
  );
}
