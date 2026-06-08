import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { AdminShell, BtnLink } from '../_components/AdminShell';
import { WorksList } from './WorksList';

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
  const works = await db.work.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, title: true, category: true, order: true, published: true, mainImage: true },
  });

  return (
    <AdminShell
      title="Портфолио"
      description={`${works.length} работ`}
      action={<BtnLink href="/admin/works/new" variant="primary">+ Добавить</BtnLink>}
    >
      <WorksList works={works} deleteWork={deleteWork} togglePublished={togglePublished} />
    </AdminShell>
  );
}
