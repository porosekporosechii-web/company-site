import sharp from 'sharp';
import { readdir, stat, writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const ROOT = 'public/images/portfolio';
const QUALITY = 78;
const SKIP_BELOW_KB = 120;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else if (e.name.endsWith('.webp')) files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
let saved = 0;
let skipped = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  if (before < SKIP_BELOW_KB * 1024) { skipped++; continue; }

  const input = await readFile(file);
  const buf = await sharp(input)
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  const after = buf.length;
  if (after < before) {
    await writeFile(file, buf);
    saved += before - after;
    console.log(`✓ ${file.replace(ROOT + '/', '')}  ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
  } else {
    skipped++;
  }
}

console.log(`\nСохранено: ${Math.round(saved/1024)}KB  Пропущено: ${skipped}`);
