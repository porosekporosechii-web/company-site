'use client';

export function ConfirmDeleteButton({
  action,
  id,
  label = 'Удалить',
  message = 'Удалить?',
}: {
  action: (fd: FormData) => Promise<void>;
  id: number | string;
  label?: string;
  message?: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold border border-red-400/40 text-red-500 hover:bg-red-500 hover:text-snow transition-colors"
        onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}
      >
        {label}
      </button>
    </form>
  );
}
