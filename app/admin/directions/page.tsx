import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { AdminShell, AdminTable, AdminRow, AdminCell, BtnLink } from '../_components/AdminShell';

async function togglePublished(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const current = await db.serviceDirection.findUnique({ where: { id }, select: { published: true } });
  if (!current) return;
  await db.serviceDirection.update({ where: { id }, data: { published: !current.published } });
  revalidatePath('/admin/directions');
  revalidatePath('/services');
  revalidatePath('/');
}

export default async function DirectionsPage() {
  const directions = await db.serviceDirection.findMany({ orderBy: { order: 'asc' } });

  return (
    <AdminShell
      title="Услуги"
      description="Направления и карточки услуг"
      action={<BtnLink href="/admin/directions/new" variant="primary">+ Добавить</BtnLink>}
    >
      <AdminTable headers={['Тег', 'Название', 'Slug', 'Порядок', 'Опубликовано', '']}>
        {directions.map((d) => (
          <AdminRow key={d.id}>
            <AdminCell className="text-muted font-mono text-xs">{d.tag}</AdminCell>
            <AdminCell className="font-medium text-graphite dark:text-snow">{d.title}</AdminCell>
            <AdminCell className="text-muted text-xs font-mono">{d.slug}</AdminCell>
            <AdminCell className="text-muted tabular-nums">{d.order}</AdminCell>
            <AdminCell>
              <form action={togglePublished}>
                <input type="hidden" name="id" value={d.id} />
                <button type="submit" className={`text-xs font-semibold ${d.published ? 'text-green-600 dark:text-green-400' : 'text-muted'}`}>
                  {d.published ? 'Да' : 'Нет'}
                </button>
              </form>
            </AdminCell>
            <AdminCell>
              <BtnLink href={`/admin/directions/${d.id}`}>Редактировать</BtnLink>
            </AdminCell>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminShell>
  );
}
