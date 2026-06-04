import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton, BackLink } from '../../_components/AdminShell';
import { ImageUpload } from '../../_components/ImageUpload';
import { MarkdownEditor } from '../../_components/MarkdownEditor';

interface PageProps { params: Promise<{ id: string }>; }

async function updatePost(fd: FormData) {
  'use server';
  const id = Number(fd.get('id'));
  const title = String(fd.get('title') ?? '').trim();
  const slug = String(fd.get('slug') ?? '').trim();
  const category = String(fd.get('category') ?? '').trim();
  const excerpt = String(fd.get('excerpt') ?? '').trim();
  const content = String(fd.get('content') ?? '').trim();
  const coverImage = String(fd.get('coverImage') ?? '').trim() || null;
  const readTime = String(fd.get('readTime') ?? '5 мин').trim();
  const published = fd.get('published') === 'on';
  const featured = fd.get('featured') === 'on';

  await db.post.update({
    where: { id },
    data: { title, slug, category, excerpt, content, coverImage, readTime, published, featured },
  });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin/posts');
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id: Number(id) } });
  if (!post) notFound();

  return (
    <AdminShell title="Редактировать статью">
      <BackLink href="/admin/posts" />
      <form action={updatePost} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={post.id} />

        <FormField label="Заголовок" htmlFor="title">
          <input id="title" name="title" required defaultValue={post.title} className={inputClass} />
        </FormField>

        <FormField label="Slug (URL)" htmlFor="slug">
          <input id="slug" name="slug" required defaultValue={post.slug} className={inputClass} />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Категория" htmlFor="category">
            <input id="category" name="category" required defaultValue={post.category} className={inputClass} />
          </FormField>
          <FormField label="Время чтения" htmlFor="readTime">
            <input id="readTime" name="readTime" defaultValue={post.readTime} className={inputClass} />
          </FormField>
        </div>

        <FormField label="Краткое описание (excerpt)" htmlFor="excerpt">
          <textarea id="excerpt" name="excerpt" required defaultValue={post.excerpt} className={textareaClass} style={{ minHeight: 80 }} />
        </FormField>

        <FormField label="Текст статьи (Markdown)" htmlFor="content">
          <MarkdownEditor name="content" defaultValue={post.content} />
        </FormField>

        <ImageUpload name="coverImage" current={post.coverImage} label="Обложка" />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="published" type="checkbox" defaultChecked={post.published} className="w-4 h-4 accent-accent" />
            <span className="text-sm text-graphite dark:text-snow">Опубликовать</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="featured" type="checkbox" defaultChecked={post.featured} className="w-4 h-4 accent-accent" />
            <span className="text-sm text-graphite dark:text-snow">Главная статья</span>
          </label>
        </div>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
