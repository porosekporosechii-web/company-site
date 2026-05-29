import { ReactNode } from 'react';

interface Props {
  tag: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleSize?: 'md' | 'lg';
}

export function SectionHeader({
  tag,
  title,
  description,
  className = '',
  titleSize = 'lg',
}: Props) {
  const fontSize =
    titleSize === 'lg'
      ? 'clamp(2.4rem, 4.5vw, 5rem)'
      : 'clamp(2rem, 3.5vw, 3.5rem)';

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-5">
        <span className="block w-8 h-[2px] bg-led" />
        <span className="text-led text-xs font-semibold tracking-[0.2em] uppercase">{tag}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h2
          className="font-bold text-graphite dark:text-snow leading-tight tracking-tight"
          style={{ fontSize }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-muted max-w-sm text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
