/**
 * Одноразовая чистка: удаляет 9 демо-работ из сида с картинками-заглушками
 * (picsum.photos и несуществующие /works/*.jpg).
 * Запуск: npx tsx scripts/delete-demo-works.ts
 */
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const DEMO_SLUGS = [
  'pos-clothing-store',
  'pos-brand-zone',
  'retail-shelving',
  'retail-production-object',
  'retail-custom-metal',
  'outdoor-restaurant-sign',
  'led-outdoor-billboard',
  'decor-christmas-mall',
  'textile-lightbox-retail-store',
];

async function main() {
  const result = await db.work.deleteMany({ where: { slug: { in: DEMO_SLUGS } } });
  console.log(`Удалено демо-работ: ${result.count}`);
  const remaining = await db.work.count();
  console.log(`Осталось работ в базе: ${remaining}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
