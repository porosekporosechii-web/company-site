import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Технологии сварки и металлообработки, советы по уходу за изделиями, тренды в дизайне торговых пространств и обзоры оборудования.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
