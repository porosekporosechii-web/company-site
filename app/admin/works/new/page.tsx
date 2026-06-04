import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';

async function createWork(fd: FormData) {
  'use server';
  const title = String(fd.get('title') ?? '').trim();
  const slug = String(fd.get('slug') ?? '').trim();
  const category = String(fd.get('category') ?? '').trim();
  const description = String(fd.get('description') ?? '').trim() || null;
  const mainImage = String(fd.get('mainImage') ?? '').trim();
  const order = Number(fd.get('order') ?? 0);
  const published = fd.get('published') === 'on';

  if (!title || !slug || !category || !mainImage) return;

  await db.work.create({
    data: { title, slug, category, description, mainImage, galleryJson: '[]', specsJson: '{}', order, published },
  });
  revalidatePath('/admin/works');
  revalidatePath('/portfolio');
  revalidatePath('/');
  redirect('/admin/works');
}

export default function NewWorkPage() {
  return (
    <AdminShell title="Новая работа">
      <BackLink href="/admin/works" />
      <form action={createWork} className="max-w-2xl space-y-6">
        <FormField label="Название" htmlFor="title">
          <input id="title" name="title" required className={inputClass} placeholder="Витрины для магазина" />
        </FormField>

        <FormField label="Slug (URL)" htmlFor="slug" hint="Только латиница, цифры, дефис — например: posm-store-2024">
          <input id="slug" name="slug" required className={inputClass} placeholder="posm-store-2024" />
        </FormField>

        <FormField label="Категория" htmlFor="category">
          <input id="category" name="category" required className={inputClass} placeholder="Торговое оборудование" />
        </FormField>

        <FormField label="Описание" htmlFor="description">
          <textarea id="description" name="description" className={textareaClass} placeholder="Краткое описание проекта…" />
        </FormField>

        <ImageUpload name="mainImage" label="Главное фото" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Порядок" htmlFor="order" hint="Меньше = выше в списке">
            <input id="order" name="order" type="number" defaultValue={0} className={inputClass} />
          </FormField>
          <FormField label="Опубликовано" htmlFor="published">
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input id="published" name="published" type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
              <span className="text-sm text-graphite dark:text-snow">Показывать на сайте</span>
            </label>
          </FormField>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
