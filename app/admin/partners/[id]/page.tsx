import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';

interface PageProps { params: Promise<{ id: string }>; }

async function updatePartner(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const name = String(fd.get('name') ?? '').trim();
  const field = String(fd.get('field') ?? '').trim();
  const logo = String(fd.get('logo') ?? '').trim() || null;
  const order = Number(fd.get('order') ?? 0);
  await db.partner.update({ where: { id }, data: { name, field, logo, order } });
  revalidatePath('/admin/partners');
  revalidatePath('/');
  redirect('/admin/partners');
}

export default async function EditPartnerPage({ params }: PageProps) {
  const { id } = await params;
  const partner = await db.partner.findUnique({ where: { id: Number(id) } });
  if (!partner) notFound();

  return (
    <AdminShell title="Редактировать клиента">
      <BackLink href="/admin/partners" />
      <form action={updatePartner} className="max-w-sm space-y-4">
        <input type="hidden" name="id" value={partner.id} />
        <FormField label="Название" htmlFor="name">
          <input id="name" name="name" required defaultValue={partner.name} className={inputClass} />
        </FormField>
        <FormField label="Сфера" htmlFor="field">
          <input id="field" name="field" defaultValue={partner.field} className={inputClass} />
        </FormField>
        <ImageUpload name="logo" current={partner.logo} label="Логотип" />
        <FormField label="Порядок" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={partner.order} className={inputClass} />
        </FormField>
        <SaveButton />
      </form>
    </AdminShell>
  );
}
