import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наружная реклама',
  description:
    'Фасадные вывески, объёмные буквы, крышные установки и отдельно стоящие конструкции из металла. Изготовление, монтаж и согласование под ключ.',
};

import Link from 'next/link';
import { Feedback } from '@/components/Feedback';
import { ServiceHero } from '@/components/ServiceHero';
import { ServiceBlocks, ServiceBlock } from '@/components/ServiceBlocks';

const blocks: ServiceBlock[] = [
  {
    id: 'bukvy',
    num: '01',
    title: 'Объёмные световые буквы',
    description: 'Изготавливаем объёмные буквы с LED-подсветкой любого типа: лицевое свечение, контражур, торцевая и полная засветка. Металл, акрил, нержавеющая сталь.',
    items: [
      { label: 'Буквы с лицевым свечением', seed: 'front-lit-channel-letters' },
      { label: 'Буквы со светящимся торцом', seed: 'edge-lit-letters-sign' },
      { label: 'Буквы с контражурной подсветкой', seed: 'halo-lit-letters-facade' },
      { label: 'Полностью светящиеся буквы', seed: 'fully-lit-acrylic-letters' },
      { label: 'Нержавеющие буквы с контражуром', seed: 'stainless-halo-lit-letters' },
    ],
  },
  {
    id: 'koroby',
    num: '02',
    title: 'Световые короба',
    description: 'Световые короба с равномерной LED-подсветкой. Классические лайтбоксы, фигурные и логотипные конструкции, короба с прорезкой или инкрустацией.',
    items: [
      { label: 'Классические лайтбоксы', seed: 'classic-lightbox-sign' },
      { label: 'Композитные короба с прорезкой', seed: 'composite-cutout-lightbox' },
      { label: 'Композитные короба с инкрустацией', seed: 'composite-inlay-lightbox' },
      { label: 'Фигурные световые короба', seed: 'shaped-lightbox-custom' },
      { label: 'Короба в форме логотипа', seed: 'logo-shaped-lightbox' },
    ],
  },
  {
    id: 'kronshteyny',
    num: '03',
    title: 'Панель-кронштейны',
    description: 'Вывески на кронштейне, выступающие перпендикулярно фасаду. Видны вдоль улицы с обеих сторон. Световые, двусторонние, фигурные и с инкрустацией.',
    items: [
      { label: 'Световые панель-кронштейны', seed: 'illuminated-projecting-sign' },
      { label: 'Двусторонние вывески', seed: 'double-sided-bracket-sign' },
      { label: 'Круглые и фигурные конструкции', seed: 'round-shaped-bracket-sign' },
      { label: 'Панель-кронштейны из композита', seed: 'composite-bracket-sign' },
      { label: 'Варианты с инкрустацией', seed: 'inlay-bracket-sign' },
    ],
  },
  {
    id: 'neon',
    num: '04',
    title: 'Неоновые вывески',
    description: 'Вывески из современного светодиодного гибкого неона — яркие, долговечные, с потреблением как у LED. Надписи, логотипы, контурное оформление фасадов и входных групп.',
    items: [
      { label: 'Неоновые надписи', seed: 'neon-led-sign-lettering' },
      { label: 'Логотипы из LED-неона', seed: 'neon-led-logo-sign' },
      { label: 'Вывески на прозрачной подложке', seed: 'neon-transparent-backing' },
      { label: 'Фигурные неоновые конструкции', seed: 'neon-shaped-custom-sign' },
      { label: 'Контурное оформление фасада', seed: 'neon-facade-contour-entrance' },
    ],
  },
];

export default function OutdoorPage() {
  return (
    <main>
      <ServiceHero
        title="Наружная"
        highlight="реклама"
        subtitle="Изготавливаем и монтируем металлические рекламные конструкции любого формата. Работаем по индивидуальным проектам и по готовым макетам. Получение разрешений — в комплекте услуги."
        tag="03 · Наружная реклама"
        backgroundImage="/banner-outdoor.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Услуги', href: '/services' },
          { label: 'Наружная реклама' },
        ]}
      />

      <ServiceBlocks blocks={blocks} />

      <section className="py-16 bg-graphite border-t border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-snow font-bold text-xl mb-1">Нужен расчёт стоимости?</p>
            <p className="text-muted text-sm">Ответим в течение 30 минут, выезд на замер бесплатно</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/contacts" className="px-8 py-4 bg-accent hover:bg-led text-snow font-bold text-sm tracking-wide transition-colors">
              Оставить заявку
            </Link>
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
