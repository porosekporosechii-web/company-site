import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Оформление мест продаж',
  description:
    'Комплексное оформление торговых пространств: магазины, бутики, аптеки, салоны красоты, рестораны и shop-in-shop. От концепции до монтажа под ключ.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { PosBlocks } from './PosBlocks';
import { RequestButton } from '@/components/RequestButton';

export default function POSPage() {
  return (
    <main>
      <ServiceHero
        title="Оформление"
        highlight="мест продаж"
        subtitle="Комплексное оснащение и декорирование торговых пространств любого формата — от небольшого бутика до федеральной сети. Производство, доставка, монтаж под ключ."
        tag="01 · Оформление"
        backgroundImage="/banner-pos.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Оформление мест продаж' },
        ]}
      />

      <PosBlocks />

      <section className="py-16 bg-graphite border-t border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-snow font-bold text-xl mb-1">Нужен расчёт стоимости?</p>
            <p className="text-muted text-sm">Ответим в течение 30 минут, выезд на замер бесплатно</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <RequestButton className="px-8 py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors">
              Оставить заявку
            </RequestButton>
            <Link href="/services" className="px-8 py-4 border border-white/20 hover:border-led/60 text-snow text-sm font-semibold transition-colors">
              Все услуги
            </Link>
          </div>
        </div>
      </section>

      <Feedback />
    </main>
  );
}
