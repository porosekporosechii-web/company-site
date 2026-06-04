import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { workToPortfolio } from '@/lib/works';
import { Feedback } from '@/components/Feedback';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { ServiceHero } from '@/components/ServiceHero';

export const metadata: Metadata = {
  title: 'Портфолио',
  description: 'Реализованные проекты: оформление мест продаж, торговое оборудование, наружная реклама, светодиодные экраны, декорации и текстильные лайтбоксы.',
};

export default async function PortfolioPage() {
  const dbWorks = await db.work.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
  const works = dbWorks.map(workToPortfolio);

  return (
    <main>
      <ServiceHero
        title="Наши"
        highlight="работы"
        subtitle="Реализованные проекты по шести направлениям: оформление мест продаж, торговое оборудование, наружная реклама, интерьерные вывески, светодиодные экраны и декорации."
        tag="Портфолио"
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Наши работы' },
        ]}
      />
      <PortfolioGallery works={works} />
      <Feedback />
    </main>
  );
}
