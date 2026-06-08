import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';
import { MarkdownEditor } from '../../_components/MarkdownEditor';
import { TitleSlugFields } from '../../_components/TitleSlugFields';

async function createPost(fd: FormData) {
  'use server';
  const title = String(fd.get('title') ?? '').trim();
  const slug = String(fd.get('slug') ?? '').trim();
  const category = String(fd.get('category') ?? '').trim();
  const excerpt = String(fd.get('excerpt') ?? '').trim();
  const content = String(fd.get('content') ?? '').trim();
  const coverImage = String(fd.get('coverImage') ?? '').trim() || null;
  const readTime = String(fd.get('readTime') ?? '5 мин').trim();
  const published = fd.get('published') === 'on';
  const featured = fd.get('featured') === 'on';

  if (!title || !slug || !category || !excerpt) return;

  await db.post.create({
    data: { title, slug, category, excerpt, content, coverImage, readTime, published, featured, date: new Date() },
  });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  redirect('/admin/posts');
}

export default function NewPostPage() {
  return (
    <AdminShell title="Новая статья">
      <BackLink href="/admin/posts" />
      <form action={createPost} className="max-w-3xl space-y-6">
        <TitleSlugFields titleLabel="Заголовок" titlePlaceholder="Как выбрать вывеску для бизнеса" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Категория" htmlFor="category">
            <input id="category" name="category" required className={inputClass} placeholder="Наружная реклама" />
          </FormField>
          <FormField label="Время чтения" htmlFor="readTime">
            <input id="readTime" name="readTime" defaultValue="5 мин" className={inputClass} />
          </FormField>
        </div>

        <FormField label="Краткое описание (excerpt)" htmlFor="excerpt">
          <textarea id="excerpt" name="excerpt" required className={textareaClass} style={{ minHeight: 80 }} placeholder="Описание для превью и SEO…" />
        </FormField>

        <FormField label="Текст статьи (Markdown)" htmlFor="content">
          <MarkdownEditor name="content" />
        </FormField>

        <ImageUpload name="coverImage" label="Обложка" />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="published" type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
            <span className="text-sm text-graphite dark:text-snow">Опубликовать</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="featured" type="checkbox" className="w-4 h-4 accent-accent" />
            <span className="text-sm text-graphite dark:text-snow">Главная статья</span>
          </label>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
