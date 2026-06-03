'use client';

import { useEffect, useCallback, useState } from 'react';
import { useModal } from './ModalProvider';

export interface LightboxImage {
  img: string;
  title: string;
  category: string;
  description?: string;
  /** Optional list of things that were done — rendered as "Что выполнено" bullets. */
  deliverables?: string[];
  specs?: Record<string, string>;
  /** Optional extra photos. The main `img` is always shown first; gallery appends additional ones. */
  gallery?: string[];
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  const { openModal } = useModal();
  const current = images[index];
  const projectPhotos = [current.img, ...(current.gallery ?? [])];
  const hasMultiplePhotos = projectPhotos.length > 1;
  const specEntries = current.specs ? Object.entries(current.specs) : [];
  const hasSpecs = specEntries.length > 0;
  const deliverables = current.deliverables ?? [];
  const hasDeliverables = deliverables.length > 0;
  const description =
    current.description?.trim() ||
    `Проект из категории «${current.category}». В галерее представлены фотографии реализованной работы с разных ракурсов.`;

  const [activePhoto, setActivePhoto] = useState(0);

  // Reset to first photo whenever the project changes
  useEffect(() => {
    setActivePhoto(0);
  }, [index]);

  const goToPhoto = (i: number) => setActivePhoto(((i % projectPhotos.length) + projectPhotos.length) % projectPhotos.length);
  const photoPrev = () => goToPhoto(activePhoto - 1);
  const photoNext = () => goToPhoto(activePhoto + 1);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // ←/→ navigate photos within a project when there are multiple;
      // Shift+←/→ (or ←/→ on single-photo projects) navigate between projects.
      if (e.key === 'ArrowRight') {
        if (hasMultiplePhotos && !e.shiftKey) photoNext();
        else onNext();
      }
      if (e.key === 'ArrowLeft') {
        if (hasMultiplePhotos && !e.shiftKey) photoPrev();
        else onPrev();
      }
    },
    [onClose, onNext, onPrev, hasMultiplePhotos, photoNext, photoPrev],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-graphite/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-4 right-4 z-20 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/15 transition-colors"
        aria-label="Закрыть"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Project counter (across all projects) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 text-white/45 text-[11px] tracking-[0.3em] tabular-nums uppercase">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Project prev — outside the modal card */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-accent text-white transition-colors"
        aria-label="Предыдущая работа"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Project next — outside the modal card */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-accent text-white transition-colors"
        aria-label="Следующая работа"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content card */}
      <div
        className="relative w-full max-w-[1400px] max-h-[88vh] grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] bg-graphite border border-white/[0.08] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image column — vertical: image area + (optional) thumbnails */}
        <div className="flex flex-col bg-black min-h-0">
          {/* Main image area */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0 overflow-hidden bg-black">
            <img
              src={projectPhotos[activePhoto]}
              alt={`${current.title} — фото ${activePhoto + 1}`}
              className="block w-full h-full object-cover select-none"
              draggable={false}
            />

            {hasMultiplePhotos && (
              <>
                {/* Photo counter (within project) */}
                <span className="absolute top-3 left-3 z-10 bg-black/55 backdrop-blur-sm text-white/80 text-[10px] font-semibold tracking-[0.25em] tabular-nums uppercase px-2.5 py-1.5">
                  {String(activePhoto + 1).padStart(2, '0')} / {String(projectPhotos.length).padStart(2, '0')}
                </span>

                {/* Gallery prev */}
                <button
                  type="button"
                  onClick={photoPrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/55 hover:bg-accent backdrop-blur-sm text-white transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Gallery next */}
                <button
                  type="button"
                  onClick={photoNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/55 hover:bg-accent backdrop-blur-sm text-white transition-colors"
                  aria-label="Следующее фото"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails strip — only when multi-photo */}
          {hasMultiplePhotos && (
            <div className="flex-shrink-0 flex gap-2 p-3 bg-black/40 border-t border-white/[0.06] overflow-x-auto">
              {projectPhotos.map((src, i) => {
                const isActive = i === activePhoto;
                return (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => goToPhoto(i)}
                    aria-label={`Фото ${i + 1}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex-shrink-0 w-24 h-16 overflow-hidden border transition-all ${
                      isActive
                        ? 'border-led opacity-100'
                        : 'border-white/10 opacity-55 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="block w-full h-full object-cover"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="flex flex-col p-7 sm:p-9 lg:p-10 xl:p-12 overflow-y-auto max-h-[42vh] lg:max-h-none">
          {/* Category tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-led" />
            <span className="text-led text-[10px] font-semibold tracking-[0.25em] uppercase">
              {current.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-snow leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)' }}
          >
            {current.title}
          </h3>

          {/* Description — always shown (real or fallback) */}
          <p className="text-white/65 text-sm lg:text-base leading-relaxed mb-7">
            {description}
          </p>

          {/* What was done */}
          {hasDeliverables && (
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/40 text-[10px] font-semibold tracking-[0.25em] uppercase">
                  Что выполнено
                </span>
                <span className="block flex-1 h-px bg-white/[0.08]" />
              </div>
              <ul className="space-y-2.5">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span aria-hidden="true" className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 bg-led" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs */}
          {hasSpecs && (
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/40 text-[10px] font-semibold tracking-[0.25em] uppercase">
                  Характеристики
                </span>
                <span className="block flex-1 h-px bg-white/[0.08]" />
              </div>
              <dl className="space-y-0">
                {specEntries.map(([k, v]) => (
                  <div key={k} className="flex gap-4 text-sm py-2.5 border-b border-white/[0.05] last:border-0">
                    <dt className="flex-shrink-0 w-40 text-muted">{k}</dt>
                    <dd className="text-white/85 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* CTA — sits right after the content, not anchored to the bottom */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => { onClose(); openModal({ service: current.title, source: 'lightbox' }); }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-led text-snow text-sm font-semibold transition-colors"
            >
              Заказать похожий проект
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
