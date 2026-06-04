import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';
import { GalleryManager } from './GalleryManager';

interface PageProps { params: Promise<{ id: string }>; }

async function updateWork(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const title = String(fd.get('title') ?? '').trim();
  const slug = String(fd.get('slug') ?? '').trim();
  const category = String(fd.get('category') ?? '').trim();
  const description = String(fd.get('description') ?? '').trim() || null;
  const mainImage = String(fd.get('mainImage') ?? '').trim();
  const order = Number(fd.get('order') ?? 0);
  const published = fd.get('published') === 'on';
  const galleryJson = String(fd.get('galleryJson') ?? '[]');

  await db.work.update({
    where: { id },
    data: { title, slug, category, description, mainImage, galleryJson, order, published },
  });
  revalidatePath('/admin/works');
  revalidatePath('/portfolio');
  revalidatePath('/');
  redirect('/admin/works');
}

export default async function EditWorkPage({ params }: PageProps) {
  const { id } = await params;
  const work = await db.work.findUnique({ where: { id: Number(id) } });
  if (!work) notFound();

  const gallery: string[] = (() => { try { return JSON.parse(work.galleryJson); } catch { return []; } })();

  return (
    <AdminShell title="Редактировать работу">
      <BackLink href="/admin/works" />
      <form action={updateWork} className="max-w-2xl space-y-6">
        <input type="hidden" name="id" value={work.id} />

        <FormField label="Название" htmlFor="title">
          <input id="title" name="title" required defaultValue={work.title} className={inputClass} />
        </FormField>

        <FormField label="Slug (URL)" htmlFor="slug">
          <input id="slug" name="slug" required defaultValue={work.slug} className={inputClass} />
        </FormField>

        <FormField label="Категория" htmlFor="category">
          <input id="category" name="category" required defaultValue={work.category} className={inputClass} />
        </FormField>

        <FormField label="Описание" htmlFor="description">
          <textarea id="description" name="description" defaultValue={work.description ?? ''} className={textareaClass} />
        </FormField>

        <ImageUpload name="mainImage" current={work.mainImage} label="Главное фото" />

        <GalleryManager initialImages={gallery} />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Порядок" htmlFor="order">
            <input id="order" name="order" type="number" defaultValue={work.order} className={inputClass} />
          </FormField>
          <FormField label="Опубликовано" htmlFor="published">
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input id="published" name="published" type="checkbox" defaultChecked={work.published} className="w-4 h-4 accent-accent" />
              <span className="text-sm text-graphite dark:text-snow">Показывать на сайте</span>
            </label>
          </FormField>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
