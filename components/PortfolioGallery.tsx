'use client';

import { useMemo, useState } from 'react';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { Lightbox } from './Lightbox';
import { sortByPriority, toLightboxImage } from '@/lib/portfolio.config';
import { deriveCategories } from '@/lib/works';
import type { PortfolioWork } from '@/lib/portfolio.generated';

const INITIAL = 9;
const STEP = 6;
const ALL = 'Все работы';

interface CardSpan { c: number; r: number; }

function computeLgLayout(total: number): CardSpan[] {
  const COLS = 4;
  if (total === 0) return [];
  const useEditorial = total >= 6;
  const spans: CardSpan[] = [];
  for (let i = 0; i < total; i++) {
    if (useEditorial && i === 0) spans.push({ c: 2, r: 2 });
    else if (useEditorial && i > 0 && i % 9 === 7) spans.push({ c: 2, r: 1 });
    else spans.push({ c: 1, r: 1 });
  }
  const grid: number[][] = [];
  const ensureRow = (r: number) => { while (grid.length <= r) grid.push(new Array(COLS).fill(-1)); };
  const positions: { row: number; col: number }[] = [];
  for (let i = 0; i < total; i++) {
    const { c: sc, r: sr } = spans[i];
    let placed = false;
    let row = 0;
    while (!placed) {
      ensureRow(row);
      for (let col = 0; col <= COLS - sc; col++) {
        let ok = true;
        for (let dr = 0; dr < sr && ok; dr++) {
          ensureRow(row + dr);
          for (let dc = 0; dc < sc && ok; dc++) {
            if (grid[row + dr][col + dc] !== -1) ok = false;
          }
        }
        if (ok) {
          for (let dr = 0; dr < sr; dr++)
            for (let dc = 0; dc < sc; dc++)
              grid[row + dr][col + dc] = i;
          positions.push({ row, col });
          placed = true;
          break;
        }
      }
      if (!placed) row++;
    }
  }
  const lastIdx = total - 1;
  const { row, col } = positions[lastIdx];
  const lastSpan = spans[lastIdx];
  let trailing = 0;
  for (let c = col + lastSpan.c; c < COLS; c++) {
    if (grid[row][c] === -1) trailing++;
  }
  if (trailing > 0) lastSpan.c += trailing;
  return spans;
}

function lgClassFor(span: CardSpan): string {
  const parts: string[] = [];
  if (span.c === 2) parts.push('lg:col-span-2');
  else if (span.c === 3) parts.push('lg:col-span-3');
  else if (span.c === 4) parts.push('lg:col-span-4');
  if (span.r === 2) parts.push('lg:row-span-2');
  return parts.join(' ');
}

function mdClassFor(idx: number, total: number): string {
  return idx === total - 1 && total % 2 === 1 ? 'md:col-span-2' : '';
}

interface Props {
  works: PortfolioWork[];
}

export function PortfolioGallery({ works: allWorks }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const [visible, setVisible] = useState(INITIAL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => deriveCategories(allWorks), [allWorks]);

  const filtered = useMemo(
    () => (active === ALL ? sortByPriority(allWorks) : allWorks.filter((w) => w.category === active)),
    [active, allWorks],
  );
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const layout = useMemo(() => computeLgLayout(shown.length), [shown.length]);
  const lightboxImages = useMemo(() => shown.map(toLightboxImage), [shown]);

  const handleFilter = (cat: string) => {
    setActive(cat);
    setVisible(INITIAL);
    setLightboxIndex(null);
  };

  const handlePrev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + shown.length) % shown.length : null));
  const handleNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % shown.length : null));

  return (
    <>
      <section className="relative py-20 bg-snow dark:bg-graphite">
        <ArchitecturalGrid />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">Категории</span>
            </div>
            <div className="bg-surface/60 dark:bg-surface-dark/60 border border-graphite/[0.08] dark:border-white/[0.06] p-3 flex gap-2 overflow-x-auto md:flex-wrap">
              {[{ name: ALL, slug: 'all', count: allWorks.length }, ...categories].map((cat) => {
                const isActive = active === cat.name;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleFilter(cat.name)}
                    aria-pressed={isActive}
                    className={`group inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-accent text-snow'
                        : 'bg-snow/80 dark:bg-graphite/70 text-graphite dark:text-snow hover:text-accent border border-graphite/[0.06] dark:border-white/[0.06] hover:border-accent/40'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 text-[10px] font-bold tabular-nums leading-none ${
                      isActive
                        ? 'bg-white/20 text-snow'
                        : 'bg-graphite/[0.06] dark:bg-white/[0.08] text-muted group-hover:bg-accent/15 group-hover:text-accent'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/10 dark:bg-white/[0.06] lg:auto-rows-[320px] lg:grid-flow-row-dense">
            {shown.map((work, idx) => {
              const span = layout[idx];
              const lgClass = lgClassFor(span);
              const mdClass = mdClassFor(idx, shown.length);
              const isHero = span.r === 2 && span.c === 2;
              const hasGallery = work.images.length > 1;
              return (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`group relative overflow-hidden bg-snow dark:bg-graphite text-left aspect-[4/3] lg:aspect-auto ${mdClass} ${lgClass}`}
                  aria-label={`${work.title} — ${work.category}`}
                >
                  <div className="absolute inset-0 overflow-hidden bg-graphite/[0.07] dark:bg-white/5">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-graphite/90 via-graphite/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div aria-hidden="true" className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/30 transition-colors duration-500" />
                  </div>
                  <span className="absolute top-4 left-4 z-10 text-led text-[10px] font-bold tracking-[0.3em] uppercase tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {hasGallery && (
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 bg-graphite/70 backdrop-blur-sm text-snow text-[10px] font-bold tracking-wider px-2 py-1">
                      <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {work.images.length}
                    </span>
                  )}
                  {isHero && (
                    <span aria-hidden="true" className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-led/40 z-10" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col">
                    <span className="text-led/85 text-[10px] font-semibold uppercase tracking-[0.22em] mb-1.5">
                      {work.category}
                    </span>
                    <h3
                      className="font-bold text-snow leading-tight tracking-tight"
                      style={{ fontSize: isHero ? 'clamp(1.4rem, 2vw, 2rem)' : 'clamp(1rem, 1.4vw, 1.25rem)' }}
                    >
                      {work.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-accent text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Смотреть проект
                      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            {hasMore && (
              <button
                onClick={() => setVisible((v) => v + STEP)}
                className="inline-flex items-center gap-2 px-8 py-4 border border-graphite/20 dark:border-white/15 text-graphite dark:text-snow text-sm font-semibold hover:bg-accent hover:text-snow hover:border-accent transition-colors"
              >
                Показать ещё
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            <p className="text-sm text-muted">
              Показано {shown.length} из {filtered.length} работ
            </p>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}
