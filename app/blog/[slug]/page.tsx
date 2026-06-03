import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ServiceHero } from '@/components/ServiceHero';
import { Feedback } from '@/components/Feedback';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { RequestButton } from '@/components/RequestButton';
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
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
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

  const paragraphs = post.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main>
      {/* ─── HERO ─── */}
      <ServiceHero
        title=""
        highlight={post.title}
        subtitle={post.excerpt}
        tag={post.category}
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* ─── ARTICLE BODY ─── */}
      <section className="relative py-20 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Article meta */}
          <div className="flex items-center gap-4 text-xs text-muted tabular-nums mb-12 pb-6 border-b border-graphite/[0.08] dark:border-white/[0.08]">
            <span>{post.date}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{post.readTime} чтения</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{company.name}</span>
          </div>

          <article className="max-w-[820px]">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base lg:text-lg text-graphite dark:text-snow/90 leading-relaxed mb-7"
              >
                {para}
              </p>
            ))}

            {/* Inline CTA */}
            <div className="mt-14 p-8 border border-graphite/[0.08] dark:border-white/[0.08] bg-surface/60 dark:bg-surface-dark/60">
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                  Связаться
                </span>
              </div>
              <p className="text-graphite dark:text-snow font-semibold text-lg mb-2">
                Нужна консультация по проекту?
              </p>
              <p className="text-sm text-muted mb-5">
                Расскажем на конкретном примере, рассчитаем стоимость, ответим на вопросы.
              </p>
              <RequestButton
                source="blog-post"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-led text-snow text-sm font-semibold transition-colors"
              >
                Получить расчёт
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RequestButton>
            </div>

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-graphite/[0.08] dark:border-white/[0.08]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent transition-colors"
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
                  {/* Cover image */}
                  <div className="relative h-[160px] overflow-hidden bg-graphite flex-shrink-0">
                    {r.coverImage ? (
                      <img
                        src={r.coverImage}
                        alt={r.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage:
                              'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(0deg, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-start p-6">
                          <span className="text-snow/[0.05] font-black uppercase tracking-tight leading-none select-none text-5xl">
                            {r.category}
                          </span>
                        </div>
                      </>
                    )}
                    <div aria-hidden="true" className="absolute inset-0 bg-graphite/0 group-hover:bg-accent/10 transition-colors duration-500" />
                    <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-graphite/85 backdrop-blur-sm text-led text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1.5 border border-led/20">
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
