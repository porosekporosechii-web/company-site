interface Props {
  /**
   * - `section` — adapts to theme: graphite lines on light bg, LED on dark (60px)
   * - `hero` — always LED lines (80px), for permanently-dark sections like banners
   */
  variant?: 'section' | 'hero';
}

export function ArchitecturalGrid({ variant = 'section' }: Props) {
  if (variant === 'hero') {
    return <div aria-hidden="true" className="absolute inset-0 pointer-events-none arch-grid-hero" />;
  }
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none arch-grid-light dark:hidden" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none arch-grid-dark hidden dark:block" />
    </>
  );
}
