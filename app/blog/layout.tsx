import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Практические материалы о наружной рекламе, торговом оборудовании, LED-экранах, декорациях и текстильных лайтбоксах от производственной компании RAUCO.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
