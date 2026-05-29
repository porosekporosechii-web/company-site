'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ServiceHero } from '@/components/ServiceHero';
import { Feedback } from '@/components/Feedback';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ArchitecturalGrid } from '@/components/ArchitecturalGrid';
import { posts, blogCategories as categories } from '@/lib/posts';

/**
 * Stable 3-col grid layout for blog cards.
 * - Featured post is rendered separately as a big block — grid cards stay uniform.
 * - All cards are 1×1; only the LAST card stretches horizontally to fill trailing
 *   empty cells in its row, so the grid never ends with grey holes.
 */
function lgLastColSpan(idx: number, total: number): string {
  if (total === 0 || idx !== total - 1) return '';
  const COLS = 3;
  const cellsBefore = total - 1; // all previous cards are 1-cell
  const colOfLast = cellsBefore % COLS;
  const trailing = COLS - 1 - colOfLast;
  if (trailing === 2) return 'lg:col-span-3';
  if (trailing === 1) return 'lg:col-span-2';
  return '';
}
function mdLastColSpan(idx: number, total: number): string {
  return idx === total - 1 && total % 2 === 1 ? 'md:col-span-2' : '';
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Все статьи');

  const filtered =
    activeCategory === 'Все статьи'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured =
    activeCategory === 'Все статьи' ? posts.find((p) => p.featured) ?? filtered[0] : filtered[0];

  const grid =
    activeCategory === 'Все статьи'
      ? posts.filter((p) => !p.featured)
      : filtered.slice(1);

  return (
    <main>
      <ServiceHero
        title="Наш"
        highlight="блог"
        subtitle="Делимся опытом: технологии сварки и металлообработки, советы по уходу за изделиями, тренды в дизайне торговых пространств и обзоры оборудования."
        tag="Статьи и советы"
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Блог' },
        ]}
      />

      {/* Blog content */}
      <section className="relative py-20 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Editorial section header */}
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Материалы
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <h2
                className="font-bold text-graphite dark:text-snow leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
              >
                {activeCategory === 'Все статьи' ? 'Все статьи' : activeCategory}
              </h2>
              <p className="text-muted max-w-sm text-sm leading-relaxed">
                Технологии, советы, разборы — на основе работы собственного цеха площадью 800 м² и проектов с 2014 года.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Filter panel — premium, matches portfolio */}
          <div className="mb-12">
            <div className="bg-surface/60 dark:bg-surface-dark/60 border border-graphite/[0.08] dark:border-white/[0.06] p-3 flex gap-2 overflow-x-auto md:flex-wrap">
              {categories.map((cat) => {
                const count =
                  cat === 'Все статьи'
                    ? posts.length
                    : posts.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`group inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-accent text-snow'
                        : 'bg-snow/80 dark:bg-graphite/70 text-graphite dark:text-snow hover:text-accent border border-graphite/[0.06] dark:border-white/[0.06] hover:border-accent/40'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 text-[10px] font-bold tabular-nums leading-none ${
                        isActive
                          ? 'bg-white/20 text-snow'
                          : 'bg-graphite/[0.06] dark:bg-white/[0.08] text-muted group-hover:bg-accent/15 group-hover:text-accent'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured post */}
          {featured && (
            <AnimateOnScroll className="mb-14">
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] overflow-hidden border border-graphite/[0.08] dark:border-white/[0.06] hover:border-accent/40 transition-colors bg-snow dark:bg-graphite"
              >
                {/* Image column */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-graphite/10 dark:bg-white/[0.05]">
                  <img
                    src={`https://picsum.photos/seed/${featured.seed}/1400/1050`}
                    alt={featured.title}
                    className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Subtle hover wash */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/15 transition-colors duration-500"
                  />
                  {/* Top featured marker */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-led rounded-full animate-pulse" />
                    <span className="text-snow text-[10px] font-bold tracking-[0.3em] uppercase">
                      Главное
                    </span>
                  </div>
                  {/* Corner accent */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-5 w-5 h-5 border-t border-r border-led/50 z-10"
                  />
                </div>

                {/* Text column */}
                <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 xl:p-14">
                  {/* Category + read time */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="block w-8 h-[2px] bg-led" />
                    <span className="text-led text-[10px] font-semibold tracking-[0.25em] uppercase">
                      {featured.category}
                    </span>
                    <span aria-hidden="true" className="text-muted/50">·</span>
                    <span className="text-muted text-[11px] tracking-wide uppercase">
                      {featured.readTime} чтения
                    </span>
                  </div>

                  <h3
                    className="font-bold text-graphite dark:text-snow leading-tight tracking-tight mb-5 group-hover:text-accent transition-colors"
                    style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)' }}
                  >
                    {featured.title}
                  </h3>

                  <p className="text-muted text-base leading-relaxed mb-8 max-w-lg">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-graphite/[0.08] dark:border-white/[0.08]">
                    <span className="text-xs text-muted tabular-nums">{featured.date}</span>
                    <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.2em] uppercase group-hover:gap-3 transition-all">
                      Читать
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          )}

          {/* Sub-section title for the rest */}
          {grid.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                {activeCategory === 'Все статьи' ? 'Все материалы' : 'Ещё в категории'}
              </span>
              <span aria-hidden="true" className="block flex-1 h-px bg-graphite/[0.08] dark:bg-white/[0.08]" />
              <span className="text-xs text-muted tabular-nums">{grid.length} {grid.length === 1 ? 'статья' : 'материалов'}</span>
            </div>
          )}

          {/*
            Editorial grid — featured is rendered separately, this grid stays uniform.
            - sm: 1 col
            - md: 2 cols (last card stretches on odd count)
            - lg: 3 cols (last card stretches when its row would otherwise leave 1 or 2 trailing empties)
            - Fixed image height keeps row heights consistent regardless of how wide a card is.
            - Spans live on the AnimateOnScroll WRAPPER (which is the grid item), not inside.
          */}
          {grid.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite/[0.08] dark:bg-white/[0.06]">
              {grid.map((post, idx) => {
                const lgClass = lgLastColSpan(idx, grid.length);
                const mdClass = mdLastColSpan(idx, grid.length);
                return (
                  <AnimateOnScroll
                    key={post.id}
                    delay={Math.min(idx * 40, 280)}
                    className={`flex ${mdClass} ${lgClass}`}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group relative flex flex-col flex-1 bg-snow dark:bg-graphite hover:bg-surface/70 dark:hover:bg-surface-dark/70 transition-colors"
                    >
                      {/* Image — fixed height so wider cards don't blow up row height */}
                      <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden bg-graphite/10 dark:bg-white/[0.05] flex-shrink-0">
                        <img
                          src={`https://picsum.photos/seed/${post.seed}/1200/750`}
                          alt={post.title}
                          className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/20 transition-colors duration-500"
                        />
                        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-graphite/85 backdrop-blur-sm text-led text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1.5">
                          {post.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-6 lg:p-7">
                        <div className="flex items-center gap-2 mb-3 text-[11px] text-muted tracking-wide tabular-nums">
                          <span>{post.date}</span>
                          <span aria-hidden="true" className="opacity-50">·</span>
                          <span>{post.readTime} чтения</span>
                        </div>

                        <h3 className="font-bold text-graphite dark:text-snow leading-snug tracking-tight mb-3 text-base lg:text-lg group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted leading-relaxed mb-5 flex-1 line-clamp-2">
                          {post.excerpt}
                        </p>

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
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center border border-graphite/[0.08] dark:border-white/[0.06]">
              <p className="text-muted text-sm">Статей в этой категории пока нет</p>
            </div>
          )}

          {/* Topics promo strip — compact */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Темы блога
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-graphite/[0.08] dark:bg-white/[0.06]">
              {[
                {
                  title: 'Технологии',
                  desc: 'Сварка, покрытия, резка металла — объясняем сложное просто',
                  filter: 'Технологии',
                  count: posts.filter((p) => p.category === 'Технологии').length,
                },
                {
                  title: 'Дизайн и стиль',
                  desc: 'Тренды в оформлении торговых пространств и лофт-интерьеров',
                  filter: 'Дизайн и стиль',
                  count: posts.filter((p) => p.category === 'Дизайн и стиль').length,
                },
                {
                  title: 'Советы и оборудование',
                  desc: 'Как выбрать, заказать и ухаживать за металлическими изделиями',
                  filter: 'Советы',
                  count: posts.filter((p) => p.category === 'Советы' || p.category === 'Торговое оборудование').length,
                },
              ].map((topic) => (
                <button
                  key={topic.title}
                  onClick={() => setActiveCategory(topic.filter)}
                  className="group bg-snow dark:bg-graphite p-8 text-left hover:bg-surface/70 dark:hover:bg-surface-dark/70 transition-colors"
                >
                  <div className="w-8 h-[2px] bg-accent mb-5" />
                  <h3 className="font-bold text-graphite dark:text-snow text-base mb-2 group-hover:text-accent transition-colors flex items-baseline gap-2">
                    {topic.title}
                    <span className="text-xs font-normal text-muted tabular-nums">· {topic.count}</span>
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{topic.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Feedback />
    </main>
  );
}
