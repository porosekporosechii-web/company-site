import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Feedback } from '@/components/Feedback';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { MessengerBadge } from '@/components/MessengerBadge';
import { getPostBySlug, getRelatedPosts, posts } from '@/lib/posts';
import { company } from '@/lib/company';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Статья не найдена' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [company.name],
      siteName: company.name,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  // Use the excerpt as a fallback intro; placeholder body until real content lands.
  const paragraphs: string[] = post.body
    ? post.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [
        post.excerpt,
        'Полный текст статьи готовится — скоро он появится здесь. А пока расскажем кратко: материалы, технологии и подход, которые мы используем в этом направлении, отрабатывались десятками реализованных проектов с 2014 года.',
        'Если вы планируете похожий проект — оставьте заявку, и мы расскажем подробнее на конкретном примере: технологию, материалы, сроки и стоимость.',
      ];

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-graphite">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
          style={{ backgroundImage: `url('https://picsum.photos/seed/${post.seed}/1600/900')` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-graphite/40 to-graphite/20" />
        <ArchitecturalGrid variant="hero" />

        <MessengerBadge />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-32 pb-20">
          <div className="max-w-[1100px] mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Хлебные крошки" className="flex items-center gap-2 text-xs text-muted mb-10">
              <Link href="/" className="hover:text-led transition-colors">Главная</Link>
              <span aria-hidden="true" className="opacity-40">/</span>
              <Link href="/blog" className="hover:text-led transition-colors">Блог</Link>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span className="text-snow/70 line-clamp-1">{post.title}</span>
            </nav>

            {/* Category */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.25em] uppercase">
                {post.category}
              </span>
              <span aria-hidden="true" className="text-muted/50">·</span>
              <span className="text-muted text-[11px] tracking-wide uppercase">{post.readTime} чтения</span>
            </div>

            {/* Title */}
            <h1
              className="font-bold text-snow leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted tabular-nums">
              <span>{post.date}</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>{company.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <section className="relative py-20 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16">
          <article className="prose-article max-w-[760px] mx-auto">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base lg:text-lg text-graphite dark:text-snow leading-relaxed mb-6"
              >
                {para}
              </p>
            ))}

            {/* Inline CTA */}
            <div className="mt-12 p-8 border border-graphite/[0.08] dark:border-white/[0.08] bg-surface/60 dark:bg-surface-dark/60">
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  Связаться
                </span>
              </div>
              <p className="text-graphite dark:text-snow font-semibold text-lg mb-2">
                Нужна консультация по проекту?
              </p>
              <p className="text-sm text-muted-strong dark:text-muted mb-5">
                Расскажем на конкретном примере, рассчитаем стоимость, ответим на вопросы.
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-led text-snow text-sm font-semibold transition-colors"
              >
                Получить расчёт
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-graphite/[0.08] dark:border-white/[0.08]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-strong dark:text-muted hover:text-accent transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Все статьи блога
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ─── RELATED ─── */}
      {related.length > 0 && (
        <section className="relative py-20 bg-surface dark:bg-surface-dark border-t border-graphite/[0.08] dark:border-white/[0.06]">
          <ArchitecturalGrid />

          <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Читайте также
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite/[0.08] dark:bg-white/[0.06]">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col bg-snow dark:bg-graphite hover:bg-surface/70 dark:hover:bg-surface-dark/70 transition-colors"
                >
                  <div className="relative h-[220px] overflow-hidden bg-graphite/10 dark:bg-white/[0.05]">
                    <img
                      src={`https://picsum.photos/seed/${r.seed}/1200/750`}
                      alt={r.title}
                      className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-graphite/85 backdrop-blur-sm text-led text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1.5">
                      {r.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3 text-[11px] text-muted tracking-wide tabular-nums">
                      <span>{r.date}</span>
                      <span aria-hidden="true" className="opacity-50">·</span>
                      <span>{r.readTime} чтения</span>
                    </div>
                    <h3 className="font-bold text-graphite dark:text-snow leading-snug tracking-tight mb-3 text-base lg:text-lg group-hover:text-accent transition-colors flex-1">
                      {r.title}
                    </h3>
                    <div className="flex items-center justify-end pt-4 border-t border-graphite/[0.06] dark:border-white/[0.06]">
                      <span className="inline-flex items-center gap-1.5 text-accent text-[11px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 group-hover:gap-2.5 transition-all">
                        Читать
                        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Feedback />
    </main>
  );
}
