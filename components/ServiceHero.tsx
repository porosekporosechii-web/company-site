import Link from 'next/link';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { MessengerBadge } from './MessengerBadge';
import { RequestButton } from './RequestButton';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  tag: string;
  backgroundImage: string;
  breadcrumb?: BreadcrumbItem[];
  ribbonText?: string;
}

export function ServiceHero({
  title,
  highlight,
  subtitle,
  tag,
  backgroundImage,
  breadcrumb = [],
  ribbonText = 'ТОРГОВОЕ ОБОРУДОВАНИЕ · НАРУЖНАЯ РЕКЛАМА · ДЕКОРАЦИИ · СВЕТОДИОДНЫЕ ЭКРАНЫ',
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-graphite">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Bottom vignette */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/10 to-transparent" />

      <ArchitecturalGrid variant="hero" />

      <MessengerBadge />

      {/* Top ribbon (below navbar) */}
      <div className="absolute left-0 right-0 z-[1] overflow-hidden h-8" style={{ top: '68px' }}>
        <div className="-rotate-[0.4deg] w-[110%] -translate-x-[5%] bg-white/5 border-y border-white/[0.08] h-full flex items-center overflow-hidden">
          <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap mx-10">
                {ribbonText} ·
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-44 pb-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <nav className="flex items-center gap-2 text-[11px] text-white/30 mb-6 uppercase tracking-widest font-medium">
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="opacity-50">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white/60 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-10 h-[2px] bg-led" />
            <span className="text-led text-xs font-bold tracking-[0.3em] uppercase">{tag}</span>
          </div>

          {/* H1 */}
          <h1
            className="font-bold text-snow leading-[0.9] tracking-tight uppercase mb-7"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 6.5rem)' }}
          >
            <span className="block text-snow">{title}</span>
            <span className="relative inline-block text-accent">
              {highlight}
              <span className="absolute -top-2 -left-3 w-5 h-5 border-t border-l border-led/55 pointer-events-none" />
              <span className="absolute -bottom-2 -right-3 w-5 h-5 border-b border-r border-led/55 pointer-events-none" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-neutral-300 max-w-lg leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2.5">
            <RequestButton
              source="service-hero"
              className="px-4 py-2 bg-accent hover:bg-led text-snow font-bold text-xs tracking-wide transition-colors uppercase"
            >
              Получить расчёт
            </RequestButton>
            <a
              href="/portfolio"
              className="px-4 py-2 border border-white/20 hover:border-led/60 text-snow text-xs font-semibold tracking-wide transition-colors uppercase"
            >
              Портфолио
            </a>
          </div>
        </div>
      </div>

      {/* Bottom ribbon */}
      <div className="relative z-[1] overflow-hidden h-12">
        <div className="-rotate-[1.2deg] w-[115%] -translate-x-[7%] bg-white/[0.07] border-y border-white/[0.14] py-3 flex overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap text-white/[0.32] text-xs font-black uppercase tracking-[0.22em] mx-10">
              {ribbonText} ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
