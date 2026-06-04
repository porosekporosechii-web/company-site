import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, AdminTable, AdminRow, AdminCell, BtnLink, FormField, inputClass, SaveButton } from '../_components/AdminShell';
import { ImageUpload } from '../_components/ImageUpload';
import { ConfirmDeleteButton } from '../_components/ConfirmDeleteButton';

async function createPartner(fd: FormData) {
  'use server';
  const name = String(fd.get('name') ?? '').trim();
  const field = String(fd.get('field') ?? '').trim();
  const logo = String(fd.get('logo') ?? '').trim() || null;
  const order = Number(fd.get('order') ?? 0);
  if (!name) return;
  await db.partner.create({ data: { name, field, logo, order } });
  revalidatePath('/admin/partners');
  revalidatePath('/');
  redirect('/admin/partners');
}

async function deletePartner(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  await db.partner.delete({ where: { id } });
  revalidatePath('/admin/partners');
  revalidatePath('/');
}

export default async function PartnersPage() {
  const partners = await db.partner.findMany({ orderBy: { order: 'asc' } });

  return (
    <AdminShell title="Партнёры" description={`${partners.length} клиентов`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* List */}
        <div>
          <AdminTable headers={['Логотип', 'Название', 'Сфера', 'Порядок', '']}>
            {partners.map((p) => (
              <AdminRow key={p.id}>
                <AdminCell>
                  {p.logo ? (
                    <div className="w-10 h-8 overflow-hidden">
                      <img src={p.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-8 bg-graphite/10 flex items-center justify-center text-[10px] font-bold text-muted">
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </AdminCell>
                <AdminCell className="font-medium text-graphite dark:text-snow">{p.name}</AdminCell>
                <AdminCell className="text-muted">{p.field}</AdminCell>
                <AdminCell className="text-muted tabular-nums">{p.order}</AdminCell>
                <AdminCell>
                  <div className="flex items-center gap-2">
                    <BtnLink href={`/admin/partners/${p.id}`}>Изменить</BtnLink>
                    <ConfirmDeleteButton action={deletePartner} id={p.id} label="✕" />
                  </div>
                </AdminCell>
              </AdminRow>
            ))}
          </AdminTable>
        </div>

        {/* Add form */}
        <div>
          <h2 className="text-base font-bold mb-4">Добавить клиента</h2>
          <form action={createPartner} className="space-y-4">
            <FormField label="Название" htmlFor="name">
              <input id="name" name="name" required className={inputClass} placeholder="Название компании" />
            </FormField>
            <FormField label="Сфера деятельности" htmlFor="field">
              <input id="field" name="field" className={inputClass} placeholder="Ритейл, Строительство…" />
            </FormField>
            <ImageUpload name="logo" label="Логотип (необязательно)" />
            <FormField label="Порядок" htmlFor="order">
              <input id="order" name="order" type="number" defaultValue={partners.length * 10} className={inputClass} />
            </FormField>
            <SaveButton />
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
