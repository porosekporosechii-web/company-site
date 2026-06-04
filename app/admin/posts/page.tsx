import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { formatDate } from '@/lib/format';
import { AdminShell, AdminTable, AdminRow, AdminCell, BtnLink } from '../_components/AdminShell';
import { ConfirmDeleteButton } from '../_components/ConfirmDeleteButton';

async function deletePost(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  await db.post.delete({ where: { id } });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
}

async function togglePublished(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const current = await db.post.findUnique({ where: { id }, select: { published: true } });
  if (!current) return;
  await db.post.update({ where: { id }, data: { published: !current.published } });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
}

export default async function PostsPage() {
  const posts = await db.post.findMany({ orderBy: { date: 'desc' } });

  return (
    <AdminShell
      title="Блог"
      description={`${posts.length} статей`}
      action={<BtnLink href="/admin/posts/new" variant="primary">+ Добавить</BtnLink>}
    >
      <AdminTable headers={['Заголовок', 'Категория', 'Дата', 'Опубликовано', '']}>
        {posts.map((p) => (
          <AdminRow key={p.id}>
            <AdminCell>
              <span className="font-medium text-graphite dark:text-snow line-clamp-1">{p.title}</span>
            </AdminCell>
            <AdminCell className="text-muted">{p.category}</AdminCell>
            <AdminCell className="text-muted tabular-nums text-xs">{formatDate(p.date)}</AdminCell>
            <AdminCell>
              <form action={togglePublished}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className={`text-xs font-semibold ${p.published ? 'text-green-600 dark:text-green-400' : 'text-muted'}`}>
                  {p.published ? 'Да' : 'Нет'}
                </button>
              </form>
            </AdminCell>
            <AdminCell>
              <div className="flex items-center gap-2">
                <BtnLink href={`/admin/posts/${p.id}`}>Редактировать</BtnLink>
                <ConfirmDeleteButton action={deletePost} id={p.id} label="Удалить" message="Удалить статью?" />
              </div>
            </AdminCell>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminShell>
  );
}
