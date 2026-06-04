import Link from 'next/link';

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminShell({ title, description, action, children }: Props) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function AdminTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-graphite/10 dark:border-white/10">
            {headers.map((h) => (
              <th key={h} className="text-left py-2 px-3 font-semibold text-muted text-xs uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function AdminRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-graphite/[0.06] dark:border-white/[0.06] hover:bg-graphite/[0.02] dark:hover:bg-white/[0.02] transition-colors">
      {children}
    </tr>
  );
}

export function AdminCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-3 px-3 ${className ?? ''}`}>{children}</td>;
}

export function BtnLink({ href, children, variant = 'ghost' }: { href: string; children: React.ReactNode; variant?: 'ghost' | 'primary' }) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors';
  const cls = variant === 'primary'
    ? `${base} bg-accent text-snow hover:bg-led`
    : `${base} border border-graphite/15 dark:border-white/15 text-graphite dark:text-snow hover:border-accent hover:text-accent`;
  return <Link href={href} className={cls}>{children}</Link>;
}

export function FormField({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-graphite dark:text-snow">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export const inputClass = 'w-full bg-snow dark:bg-surface-dark border border-graphite/20 dark:border-white/15 px-3 py-2 text-sm text-graphite dark:text-snow placeholder:text-muted focus:outline-none focus:border-accent transition-colors';
export const textareaClass = `${inputClass} resize-y min-h-[100px]`;
export const selectClass = `${inputClass}`;

export function SaveButton({ pending }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-accent text-snow text-sm font-semibold hover:bg-led transition-colors disabled:opacity-50"
    >
      {pending ? 'Сохранение…' : 'Сохранить'}
    </button>
  );
}


export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    in_progress: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
    done: 'bg-green-500/15 text-green-600 dark:text-green-400',
    spam: 'bg-graphite/10 dark:bg-white/10 text-muted',
  };
  const labels: Record<string, string> = { new: 'Новая', in_progress: 'В работе', done: 'Закрыта', spam: 'Спам' };
  return (
    <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${map[status] ?? map.new}`}>
      {labels[status] ?? status}
    </span>
  );
}

export function BackLink({ href }: { href: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-6">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Назад
    </Link>
  );
}
