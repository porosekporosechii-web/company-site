import { db } from '@/lib/db';
import { workToPortfolio } from '@/lib/works';
import { getSettings } from '@/lib/settings';
import { Banner } from '@/components/Banner';
import { Services } from '@/components/Services';
import { Gallery } from '@/components/Gallery';
import { Feedback } from '@/components/Feedback';
import { CompanyInfo } from '@/components/CompanyInfo';
import { Partners } from '@/components/Partners';
import { Contacts } from '@/components/Contacts';

export default async function HomePage() {
  const [dbWorks, settings] = await Promise.all([
    db.work.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
    getSettings({
      heroTitle:       ['hero.title', 'Оформление мест продаж'],
      heroHighlight:   ['hero.titleHighlight', 'любой сложности'],
      heroSubtitle:    ['hero.subtitle', ''],
      yearsOnMarket:   ['stats.yearsOnMarket', '10+'],
      completedOrders: ['stats.completedOrders', '500+'],
      workshopArea:    ['stats.workshopArea', '800'],
      teamSize:        ['stats.teamSize', '14'],
      features:        ['homepage.features', null],
    }),
  ]);

  const works = dbWorks.map(workToPortfolio);

  const stats = [
    { value: String(settings.yearsOnMarket), label: 'лет на рынке' },
    { value: String(settings.completedOrders), label: 'выполненных заказов' },
    { value: String(settings.workshopArea), label: 'м² производственного цеха' },
    { value: String(settings.teamSize), label: 'специалистов в цехе' },
  ];

  const rawFeatures = settings.features;
  const features = Array.isArray(rawFeatures)
    ? (rawFeatures as { title: string; description: string }[])
    : undefined;

  return (
    <main>
      <Banner
        title={String(settings.heroTitle)}
        titleHighlight={String(settings.heroHighlight)}
        subtitle={String(settings.heroSubtitle)}
        stats={stats}
      />
      <Services />
      <Gallery works={works} />
      <Feedback />
      <CompanyInfo
        features={features}
        stats={{ yearsOnMarket: String(settings.yearsOnMarket), completedOrders: String(settings.completedOrders) }}
      />
      <Partners />
      <Contacts />
    </main>
  );
}
