'use client';

import { useMemo, useState } from 'react';
import { AdminTable, AdminRow, AdminCell, BtnLink, inputClass } from '../_components/AdminShell';
import { ConfirmDeleteButton } from '../_components/ConfirmDeleteButton';

export interface WorkRow {
  id: number;
  title: string;
  category: string;
  order: number;
  published: boolean;
  mainImage: string;
}

interface Props {
  works: WorkRow[];
  deleteWork: (fd: FormData) => Promise<void>;
  togglePublished: (fd: FormData) => Promise<void>;
}

export function WorksList({ works, deleteWork, togglePublished }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return works;
    return works.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q),
    );
  }, [query, works]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию или категории…"
          className={`${inputClass} max-w-sm`}
        />
        <span className="text-xs text-muted whitespace-nowrap">
          {filtered.length} из {works.length}
        </span>
      </div>

      <AdminTable headers={['Фото', 'Название', 'Категория', 'Порядок', 'Опубликовано', '']}>
        {filtered.map((w) => (
          <AdminRow key={w.id}>
            <AdminCell>
              <div className="w-14 h-10 bg-graphite/10 overflow-hidden flex-shrink-0">
                <img src={w.mainImage} alt="" className="w-full h-full object-cover" />
              </div>
            </AdminCell>
            <AdminCell>
              <span className="font-medium text-graphite dark:text-snow">{w.title}</span>
            </AdminCell>
            <AdminCell className="text-muted">{w.category}</AdminCell>
            <AdminCell className="text-muted tabular-nums">{w.order}</AdminCell>
            <AdminCell>
              <form action={togglePublished}>
                <input type="hidden" name="id" value={w.id} />
                <button type="submit" className={`text-xs font-semibold ${w.published ? 'text-green-600 dark:text-green-400' : 'text-muted'}`}>
                  {w.published ? 'Да' : 'Нет'}
                </button>
              </form>
            </AdminCell>
            <AdminCell>
              <div className="flex items-center gap-2">
                <BtnLink href={`/admin/works/${w.id}`}>Редактировать</BtnLink>
                <ConfirmDeleteButton action={deleteWork} id={w.id} label="Удалить" message="Удалить работу?" />
              </div>
            </AdminCell>
          </AdminRow>
        ))}
      </AdminTable>

      {filtered.length === 0 && (
        <p className="text-center py-12 text-muted text-sm">Ничего не найдено</p>
      )}
    </div>
  );
}
