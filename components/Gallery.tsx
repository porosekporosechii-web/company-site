'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { SectionHeader } from './SectionHeader';
import { Lightbox } from './Lightbox';
import { getTopWorks, toLightboxImage } from '@/lib/portfolio.config';

/**
 * Editorial homepage selection of 6 best works.
 * Data: top of priority-sorted portfolioWorks (same source as /portfolio).
 * Layout: 1 featured (large) + 4 medium + 1 wide banner.
 * Click → opens the same Lightbox used on /portfolio (with project galleries).
 */
const LIMIT = 6;

export function Gallery() {
  const works = useMemo(() => getTopWorks(LIMIT), []);
  const lightboxImages = useMemo(() => works.map(toLightboxImage), [works]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + works.length) % works.length : null));
  const handleNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % works.length : null));

  const last = works.length - 1;

  return (
    <>
      <section id="gallery" className="relative py-20 bg-surface dark:bg-surface-dark">
        <ArchitecturalGrid />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll>
            <SectionHeader
              tag="Портфолио"
              title="Наши работы"
              description="Каждый проект — индивидуальное решение под задачи клиента. Работаем с любыми объёмами."
              className="mb-12"
            />
          </AnimateOnScroll>

          {/*
            Editorial asymmetric grid:
              Row 1 (tall):   [Project 0 — 2/3 wide] [Project 1 — 1/3]
              Row 2 (medium): [Project 2] [Project 3] [Project 4]
              Row 3 (banner): [Project 5 — full width, short]
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {works.map((work, idx) => {
              const isFeatured = idx === 0;
              const isWide = idx === last && works.length > 5;
              const hasGallery = work.images.length > 1;
              const num = String(idx + 1).padStart(2, '0');

              let sizeClass: string;
              if (isFeatured) {
                sizeClass = 'md:col-span-2 lg:col-span-2 h-[440px] md:h-[480px] lg:h-[520px]';
              } else if (idx === 1) {
                sizeClass = 'h-[380px] md:h-[480px] lg:h-[520px]';
              } else if (isWide) {
                sizeClass = 'md:col-span-2 lg:col-span-3 h-[200px] md:h-[230px]';
              } else {
                sizeClass = 'h-[300px]';
              }

              return (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`${work.title} — ${work.category}`}
                  className={`group relative overflow-hidden block bg-graphite/10 dark:bg-surface-dark text-left ${sizeClass}`}
                >
                  {/* Image wrapper */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient overlay */}
                  {isWide ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-graphite/88 via-graphite/50 to-transparent"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-graphite/92 via-graphite/25 to-graphite/5"
                    />
                  )}

                  {/* Subtle hover darkening */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/20 transition-colors duration-500"
                  />

                  {/* Number tag — top left */}
                  <span className="absolute top-5 left-5 text-led text-[10px] font-bold tracking-[0.3em] uppercase z-10">
                    {num}
                  </span>

                  {/* Multi-photo badge — top right */}
                  {hasGallery && (
                    <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1 bg-graphite/70 backdrop-blur-sm text-snow text-[10px] font-bold tracking-wider px-2 py-1">
                      <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {work.images.length}
                    </span>
                  )}

                  {/* Featured corner accent (only when no badge crowding it) */}
                  {isFeatured && !hasGallery && (
                    <span
                      aria-hidden="true"
                      className="absolute top-5 right-5 w-5 h-5 border-t border-r border-led/35 z-10"
                    />
                  )}

                  {/* Content */}
                  {isWide ? (
                    <div className="absolute inset-0 flex items-center px-8 md:px-12 z-10">
                      <div>
                        <span className="block text-white/45 text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">
                          {work.category}
                        </span>
                        <h3
                          className="font-bold text-snow leading-tight tracking-tight mb-4"
                          style={{ fontSize: 'clamp(1.4rem, 2vw, 2.1rem)' }}
                        >
                          {work.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wide uppercase group-hover:gap-3 transition-all">
                          Смотреть проект
                          <svg
                            aria-hidden="true"
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                      <span className="block text-white/45 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5">
                        {work.category}
                      </span>
                      <h3
                        className="font-bold text-snow leading-tight tracking-tight mb-3"
                        style={{
                          fontSize: isFeatured
                            ? 'clamp(1.6rem, 2.4vw, 2.6rem)'
                            : 'clamp(1.05rem, 1.6vw, 1.45rem)',
                        }}
                      >
                        {work.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        Подробнее
                        <svg
                          aria-hidden="true"
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-graphite/20 dark:border-white/15 text-graphite dark:text-snow text-sm font-semibold hover:bg-accent hover:border-accent hover:text-snow transition-colors"
            >
              Все работы
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
