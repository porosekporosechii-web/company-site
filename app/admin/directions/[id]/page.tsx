import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';
import { ItemsEditor } from './ItemsEditor';

interface PageProps { params: Promise<{ id: string }>; }

async function updateDirection(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const slug = String(fd.get('slug') ?? '').trim();
  const tag = String(fd.get('tag') ?? '').trim();
  const title = String(fd.get('title') ?? '').trim();
  const description = String(fd.get('description') ?? '').trim();
  const image = String(fd.get('image') ?? '').trim() || null;
  const order = Number(fd.get('order') ?? 0);
  const published = fd.get('published') === 'on';
  const itemsJson = String(fd.get('itemsJson') ?? '[]');

  await db.serviceDirection.update({
    where: { id },
    data: { slug, tag, title, description, image, order, published, itemsJson },
  });
  revalidatePath('/admin/directions');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/directions');
}

export default async function EditDirectionPage({ params }: PageProps) {
  const { id } = await params;
  const d = await db.serviceDirection.findUnique({ where: { id: Number(id) } });
  if (!d) notFound();

  const items: string[] = (() => { try { return JSON.parse(d.itemsJson); } catch { return []; } })();

  return (
    <AdminShell title="Редактировать направление">
      <BackLink href="/admin/directions" />
      <form action={updateDirection} className="max-w-2xl space-y-6">
        <input type="hidden" name="id" value={d.id} />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Тег (номер)" htmlFor="tag">
            <input id="tag" name="tag" defaultValue={d.tag} className={inputClass} />
          </FormField>
          <FormField label="Slug" htmlFor="slug">
            <input id="slug" name="slug" required defaultValue={d.slug} className={inputClass} />
          </FormField>
        </div>

        <FormField label="Название" htmlFor="title">
          <input id="title" name="title" required defaultValue={d.title} className={inputClass} />
        </FormField>

        <FormField label="Описание (краткое, для карточки)" htmlFor="description">
          <textarea id="description" name="description" defaultValue={d.description} className={textareaClass} style={{ minHeight: 80 }} />
        </FormField>

        <ImageUpload name="image" current={d.image} label="Фото карточки" />

        <ItemsEditor initialItems={items} />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Порядок" htmlFor="order">
            <input id="order" name="order" type="number" defaultValue={d.order} className={inputClass} />
          </FormField>
          <FormField label="Видимость" htmlFor="published">
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input id="published" name="published" type="checkbox" defaultChecked={d.published} className="w-4 h-4 accent-accent" />
              <span className="text-sm text-graphite dark:text-snow">Показывать</span>
            </label>
          </FormField>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
