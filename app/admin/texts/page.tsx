import { revalidatePath } from 'next/cache';
import { getSettings, setSetting } from '@/lib/settings';
import { AdminShell, FormField, inputClass, textareaClass, SaveButton } from '../_components/AdminShell';

async function saveTexts(fd: FormData) {
  'use server';
  await Promise.all([
    setSetting('hero.title', fd.get('heroTitle')),
    setSetting('hero.titleHighlight', fd.get('heroHighlight')),
    setSetting('hero.subtitle', fd.get('heroSubtitle')),
    setSetting('stats.yearsOnMarket', fd.get('statsYears')),
    setSetting('stats.completedOrders', fd.get('statsOrders')),
    setSetting('stats.workshopArea', fd.get('statsArea')),
    setSetting('stats.teamSize', fd.get('statsTeam')),
  ]);

  // Features: parse from textarea (one per line, "title|description")
  const featuresRaw = String(fd.get('features') ?? '');
  const features = featuresRaw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf('|');
      if (idx === -1) return { title: line, description: '' };
      return { title: line.slice(0, idx).trim(), description: line.slice(idx + 1).trim() };
    });

  await setSetting('homepage.features', features);

  revalidatePath('/');
  revalidatePath('/admin/texts');
}

export default async function TextsPage() {
  const s = await getSettings({
    heroTitle:       ['hero.title', 'Оформление мест продаж'],
    heroHighlight:   ['hero.titleHighlight', 'любой сложности'],
    heroSubtitle:    ['hero.subtitle', ''],
    statsYears:      ['stats.yearsOnMarket', '10+'],
    statsOrders:     ['stats.completedOrders', '500+'],
    statsArea:       ['stats.workshopArea', '800'],
    statsTeam:       ['stats.teamSize', '14'],
    features:        ['homepage.features', []],
  });

  const featuresArr = Array.isArray(s.features)
    ? (s.features as { title: string; description: string }[])
    : [];

  const featuresText = featuresArr.map((f) => `${f.title}|${f.description}`).join('\n');

  return (
    <AdminShell
      title="Тексты главной"
      description="Hero-блок, статистика и преимущества"
    >
      <form action={saveTexts} className="max-w-2xl space-y-8">
        {/* Hero */}
        <section>
          <h2 className="text-base font-bold mb-4 pb-2 border-b border-graphite/10 dark:border-white/10">
            Hero-блок
          </h2>
          <div className="space-y-4">
            <FormField label="Первая строка заголовка" htmlFor="heroTitle" hint="Отображается белым цветом">
              <input id="heroTitle" name="heroTitle" defaultValue={String(s.heroTitle)} className={inputClass} />
            </FormField>
            <FormField label="Выделенная строка (акцент)" htmlFor="heroHighlight" hint="Отображается оранжевым">
              <input id="heroHighlight" name="heroHighlight" defaultValue={String(s.heroHighlight)} className={inputClass} />
            </FormField>
            <FormField label="Подзаголовок" htmlFor="heroSubtitle">
              <textarea id="heroSubtitle" name="heroSubtitle" defaultValue={String(s.heroSubtitle)} className={textareaClass} style={{ minHeight: 80 }} />
            </FormField>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-base font-bold mb-4 pb-2 border-b border-graphite/10 dark:border-white/10">
            Статистика (hero и О компании)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Лет на рынке" htmlFor="statsYears">
              <input id="statsYears" name="statsYears" defaultValue={String(s.statsYears)} className={inputClass} />
            </FormField>
            <FormField label="Выполненных заказов" htmlFor="statsOrders">
              <input id="statsOrders" name="statsOrders" defaultValue={String(s.statsOrders)} className={inputClass} />
            </FormField>
            <FormField label="Площадь цеха (м²)" htmlFor="statsArea">
              <input id="statsArea" name="statsArea" defaultValue={String(s.statsArea)} className={inputClass} />
            </FormField>
            <FormField label="Специалистов" htmlFor="statsTeam">
              <input id="statsTeam" name="statsTeam" defaultValue={String(s.statsTeam)} className={inputClass} />
            </FormField>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-base font-bold mb-2 pb-2 border-b border-graphite/10 dark:border-white/10">
            Преимущества (О компании)
          </h2>
          <p className="text-xs text-muted mb-3">
            Каждая строка — одно преимущество. Формат: <code className="font-mono bg-graphite/10 dark:bg-white/10 px-1">Заголовок|Описание</code>
          </p>
          <textarea
            id="features"
            name="features"
            defaultValue={featuresText}
            className={textareaClass}
            style={{ minHeight: 140, fontFamily: 'monospace', fontSize: 13 }}
            placeholder={"Собственное производство|Цех 800 м² — без субподрядчиков\nШесть направлений|POS, оборудование, реклама…"}
          />
        </section>

        <SaveButton />
      </form>
    </AdminShell>
  );
}
