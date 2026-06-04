import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { AdminShell, AdminTable, AdminRow, AdminCell, BtnLink } from '../_components/AdminShell';
import { ConfirmDeleteButton } from '../_components/ConfirmDeleteButton';

async function deleteWork(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  await db.work.delete({ where: { id } });
  revalidatePath('/admin/works');
  revalidatePath('/portfolio');
  revalidatePath('/');
}

async function togglePublished(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const current = await db.work.findUnique({ where: { id }, select: { published: true } });
  if (!current) return;
  await db.work.update({ where: { id }, data: { published: !current.published } });
  revalidatePath('/admin/works');
  revalidatePath('/portfolio');
  revalidatePath('/');
}

export default async function WorksPage() {
  const works = await db.work.findMany({ orderBy: { order: 'asc' } });

  return (
    <AdminShell
      title="Портфолио"
      description={`${works.length} работ`}
      action={<BtnLink href="/admin/works/new" variant="primary">+ Добавить</BtnLink>}
    >
      <AdminTable headers={['Фото', 'Название', 'Категория', 'Порядок', 'Опубликовано', '']}>
        {works.map((w) => (
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
    </AdminShell>
  );
}
