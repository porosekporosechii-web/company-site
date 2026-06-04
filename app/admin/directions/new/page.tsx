import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';
import { ItemsEditor } from '../[id]/ItemsEditor';

async function createDirection(fd: FormData) {
  'use server';
  const slug = String(fd.get('slug') ?? '').trim();
  const tag = String(fd.get('tag') ?? '').trim();
  const title = String(fd.get('title') ?? '').trim();
  const description = String(fd.get('description') ?? '').trim();
  const image = String(fd.get('image') ?? '').trim() || null;
  const order = Number(fd.get('order') ?? 0);
  const published = fd.get('published') === 'on';
  const itemsJson = String(fd.get('itemsJson') ?? '[]');

  if (!slug || !title) return;

  await db.serviceDirection.create({ data: { slug, tag, title, description, image, order, published, itemsJson } });
  revalidatePath('/admin/directions');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/directions');
}

export default function NewDirectionPage() {
  return (
    <AdminShell title="Новое направление">
      <BackLink href="/admin/directions" />
      <form action={createDirection} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Тег (номер)" htmlFor="tag">
            <input id="tag" name="tag" className={inputClass} placeholder="07" />
          </FormField>
          <FormField label="Slug" htmlFor="slug" hint="Только латиница и цифры">
            <input id="slug" name="slug" required className={inputClass} placeholder="interior" />
          </FormField>
        </div>

        <FormField label="Название" htmlFor="title">
          <input id="title" name="title" required className={inputClass} placeholder="Интерьерные вывески" />
        </FormField>

        <FormField label="Описание (краткое, для карточки)" htmlFor="description">
          <textarea id="description" name="description" className={textareaClass} style={{ minHeight: 80 }} />
        </FormField>

        <ImageUpload name="image" label="Фото карточки" />

        <ItemsEditor initialItems={[]} />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Порядок" htmlFor="order">
            <input id="order" name="order" type="number" defaultValue={0} className={inputClass} />
          </FormField>
          <FormField label="Видимость" htmlFor="published">
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input id="published" name="published" type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
              <span className="text-sm text-graphite dark:text-snow">Показывать</span>
            </label>
          </FormField>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
