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
import { RequestButton } from '@/components/RequestButton';

const blocks: ServiceBlock[] = [
  {
    id: 'bukvy',
    num: '01',
    title: 'Объёмные световые буквы',
    description: 'Изготавливаем объёмные буквы с LED-подсветкой любого типа: лицевое свечение, контражур, торцевая и полная засветка. Металл, акрил, нержавеющая сталь.',
    items: [
      { label: 'Буквы с лицевым свечением',       seed: 'front-lit-channel-letters',   img: '/images/portfolio/vyveski/grandramadzh/portfolio-066.webp' },
      { label: 'Буквы со светящимся торцом',       seed: 'edge-lit-letters-sign',        img: '/images/portfolio/vyveski/oksouno/portfolio-070.webp' },
      { label: 'Буквы с контражурной подсветкой',  seed: 'halo-lit-letters-facade',      img: '/images/portfolio/vyveski/emka/portfolio-056.webp' },
      { label: 'Полностью светящиеся буквы',       seed: 'fully-lit-acrylic-letters',    img: '/images/portfolio/vyveski/portfolio-033/portfolio-033.webp' },
      { label: 'Нержавеющие буквы с контражуром',  seed: 'stainless-halo-lit-letters',   img: '/images/portfolio/vyveski/portfolio-034/portfolio-034.webp' },
    ],
  },
  {
    id: 'koroby',
    num: '02',
    title: 'Световые короба',
    description: 'Световые короба с равномерной LED-подсветкой. Классические лайтбоксы, фигурные и логотипные конструкции, короба с прорезкой или инкрустацией.',
    items: [
      { label: 'Классические лайтбоксы',             seed: 'classic-lightbox-sign',       img: '/images/portfolio/svetovye-koroba/svetovoy-korob-1/portfolio-194.webp' },
      { label: 'Композитные короба с прорезкой',     seed: 'composite-cutout-lightbox',   img: '/images/portfolio/svetovye-koroba/svetovoy-korob-2/portfolio-192.webp' },
      { label: 'Композитные короба с инкрустацией',  seed: 'composite-inlay-lightbox',    img: '/images/portfolio/vyveski/portfolio-036/portfolio-036.webp' },
      { label: 'Фигурные световые короба',           seed: 'shaped-lightbox-custom',      img: '/images/portfolio/vyveski/portfolio-041/portfolio-041.webp' },
      { label: 'Короба в форме логотипа',            seed: 'logo-shaped-lightbox',        img: '/images/portfolio/vyveski/portfolio-045/portfolio-045.webp' },
    ],
  },
  {
    id: 'kronshteyny',
    num: '03',
    title: 'Панель-кронштейны',
    description: 'Вывески на кронштейне, выступающие перпендикулярно фасаду. Видны вдоль улицы с обеих сторон. Световые, двусторонние, фигурные и с инкрустацией.',
    items: [
      { label: 'Световые панель-кронштейны',        seed: 'illuminated-projecting-sign', img: '/images/portfolio/panel-kronshteyn/portfolio-035/portfolio-035.webp' },
      { label: 'Двусторонние вывески',              seed: 'double-sided-bracket-sign',   img: '/images/portfolio/panel-kronshteyn/portfolio-187/portfolio-187.webp' },
      { label: 'Круглые и фигурные конструкции',    seed: 'round-shaped-bracket-sign',   img: '/images/portfolio/panel-kronshteyn/portfolio-188/portfolio-188.webp' },
      { label: 'Панель-кронштейны из композита',    seed: 'composite-bracket-sign',      img: '/images/portfolio/panel-kronshteyn/portfolio-189/portfolio-189.webp' },
      { label: 'Варианты с инкрустацией',           seed: 'inlay-bracket-sign',          img: '/images/portfolio/panel-kronshteyn/portfolio-190/portfolio-190.webp' },
    ],
  },
  {
    id: 'neon',
    num: '04',
    title: 'Неоновые вывески',
    description: 'Вывески из современного светодиодного гибкого неона — яркие, долговечные, с потреблением как у LED. Надписи, логотипы, контурное оформление фасадов и входных групп.',
    items: [
      { label: 'Неоновые надписи',                  seed: 'neon-led-sign-lettering',     img: '/images/portfolio/neonovye-vyveski/portfolio-177/portfolio-177.webp' },
      { label: 'Логотипы из LED-неона',             seed: 'neon-led-logo-sign',          img: '/images/portfolio/neonovye-vyveski/portfolio-179/portfolio-179.webp' },
      { label: 'Вывески на прозрачной подложке',    seed: 'neon-transparent-backing',    img: '/images/portfolio/neonovye-vyveski/portfolio-180/portfolio-180.webp' },
      { label: 'Фигурные неоновые конструкции',     seed: 'neon-shaped-custom-sign',     img: '/images/portfolio/neonovye-vyveski/portfolio-181/portfolio-181.webp' },
      { label: 'Контурное оформление фасада',       seed: 'neon-facade-contour-entrance', img: '/images/portfolio/neonovye-vyveski/portfolio-182/portfolio-182.webp' },
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
