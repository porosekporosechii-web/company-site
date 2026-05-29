'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { ArchitecturalGrid } from './ArchitecturalGrid';

export interface BlockItem {
  label: string;
  seed: string;
  img?: string;
}

export interface ServiceBlock {
  id: string;
  num: string;
  title: string;
  description: string;
  items: BlockItem[];
}

const AUTOPLAY_INTERVAL = 4000;
const FADE_DURATION = 600;

function Block({ block, idx }: { block: ServiceBlock; idx: number }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [prevVisible, setPrevVisible] = useState(false);
  const isReversed = idx % 2 === 1;
  const activeIdxRef = useRef(0);
  const transitioningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  function transition(nextIdx: number) {
    if (transitioningRef.current || nextIdx === activeIdxRef.current) return;
    transitioningRef.current = true;

    const prev = activeIdxRef.current;
    activeIdxRef.current = nextIdx;

    setPrevIdx(prev);
    setPrevVisible(true);
    setActiveIdx(nextIdx);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPrevVisible(false);
      });
    });

    setTimeout(() => {
      setPrevIdx(null);
      transitioningRef.current = false;
    }, FADE_DURATION + 50);
  }

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      transition((activeIdxRef.current + 1) % block.items.length);
    }, AUTOPLAY_INTERVAL);
  }

  function stopInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stopInterval();
    };
  }, []);

  function handleSelect(i: number) {
    if (i === activeIdxRef.current) return;
    transition(i);
    startInterval();
  }

  return (
    <div ref={blockRef} id={block.id} className="relative border-b border-graphite/[0.08] dark:border-white/[0.06]">
      <div className={`grid grid-cols-1 lg:grid-cols-2 lg:min-h-[620px]`}>
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-graphite/10 dark:bg-white/5 min-h-[300px] lg:h-full${
            isReversed ? ' lg:order-2' : ''
          }`}
        >
          <img
            src={block.items[activeIdx].img ?? `https://picsum.photos/seed/${block.items[activeIdx].seed}/1000/800`}
            alt={block.items[activeIdx].label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {prevIdx !== null && (
            <img
              key={prevIdx}
              src={block.items[prevIdx].img ?? `https://picsum.photos/seed/${block.items[prevIdx].seed}/1000/800`}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: prevVisible ? 1 : 0,
                transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              }}
            />
          )}
          {/* Ghost number */}
          <div className="absolute bottom-6 left-6 font-black text-white/10 leading-none tabular-nums select-none pointer-events-none"
               style={{ fontSize: 'clamp(6rem, 14vw, 14rem)' }}>
            {block.num}
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-16 lg:py-20 bg-snow dark:bg-graphite${
            isReversed ? ' lg:order-1' : ''
          }`}
        >
          <ArchitecturalGrid />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-bold tracking-[0.2em] uppercase">
                {block.num}
              </span>
            </div>
            <h3
              className="font-bold text-graphite dark:text-snow mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 2.8vw, 3rem)' }}
            >
              {block.title}
            </h3>
            <p className="text-muted leading-relaxed mb-8">
              {block.description}
            </p>

            <ul className="space-y-1 mb-10">
              {block.items.map((item, i) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleSelect(i)}
                    className={`w-full flex items-center gap-3 text-left text-sm py-2.5 px-3 transition-all duration-200 ${
                      i === activeIdx
                        ? 'bg-accent/[0.08] text-accent font-medium'
                        : 'text-muted hover:bg-graphite/[0.04] dark:hover:bg-white/[0.04] hover:text-graphite dark:hover:text-snow'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-4 h-4 flex items-center justify-center transition-colors duration-200 ${
                        i === activeIdx ? 'bg-accent' : 'bg-graphite/10 dark:bg-white/10'
                      }`}
                    >
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="flex-1">{item.label}</span>
                  </button>
                  {i === activeIdx && (
                    <div className="mx-3 h-[2px] bg-graphite/[0.07] dark:bg-white/[0.07] overflow-hidden">
                      <div
                        key={`${block.id}-${activeIdx}`}
                        className="h-full bg-accent origin-left"
                        style={{ animation: `progress-fill ${AUTOPLAY_INTERVAL}ms linear forwards` }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a
                href="/contacts"
                className="flex-1 text-center px-5 py-3.5 bg-accent hover:bg-led text-snow font-bold text-sm transition-colors"
              >
                Заказать
              </a>
              <a
                href="/portfolio"
                className="flex-1 text-center px-5 py-3.5 border border-graphite/20 dark:border-white/15 hover:border-accent hover:text-accent text-muted font-semibold text-sm transition-colors"
              >
                Портфолио
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceBlocks({ blocks }: { blocks: ServiceBlock[] }) {
  return (
    <section className="bg-snow dark:bg-graphite">
      {/* Section header — contained */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-[1600px] mx-auto">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-led" />
              <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">
                Направления
              </span>
            </div>
            <h2
              className="font-bold text-graphite dark:text-snow mb-2"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              Что мы делаем
            </h2>
            <p className="text-muted text-sm">
              Нажмите на пункт списка, чтобы увидеть примеры работ
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Full-width blocks */}
      <div className="divide-y divide-graphite/[0.08] dark:divide-white/[0.06]">
        {blocks.map((block, idx) => (
          <AnimateOnScroll key={block.id} delay={0}>
            <Block block={block} idx={idx} />
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
