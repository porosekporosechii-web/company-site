#!/usr/bin/env node
/**
 * Compress all site images for web:
 * 1. public/images/portfolio/ — re-encode .webp at quality 78, max 1600px
 * 2. public/retail/           — re-encode .jpg at quality 82 (mozjpeg), max 1600px
 * 3. public/*.png             — optimize PNG banners (lossless squeeze)
 */

import sharp from 'sharp';
import { readdir, stat, writeFile, readFile } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = process.cwd();
const WEBP_QUALITY  = 78;
const JPG_QUALITY   = 82;
const MAX_EDGE      = 1600;
const SKIP_KB       = 80;   // skip files already under this size

let totalSaved = 0;
let skipped = 0;
let processed = 0;

async function walk(dir, exts) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full, exts));
    else if (exts.includes(extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function compressWebp(file) {
  const before = (await stat(file)).size;
  if (before < SKIP_KB * 1024) { skipped++; return; }

  const input = await readFile(file);
  const meta  = await sharp(input).metadata();
  const needsResize = (meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE;

  let pipeline = sharp(input);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  }
  const buf = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

  if (buf.length < before) {
    await writeFile(file, buf);
    const saved = before - buf.length;
    totalSaved += saved;
    processed++;
    const short = file.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  ✓  ${short.padEnd(70)}  ${(before/1024).toFixed(0).padStart(5)}KB → ${(buf.length/1024).toFixed(0).padStart(5)}KB  (-${Math.round(saved/before*100)}%)`);
  } else {
    skipped++;
  }
}

async function compressJpg(file) {
  const before = (await stat(file)).size;
  if (before < SKIP_KB * 1024) { skipped++; return; }

  const input = await readFile(file);
  const meta  = await sharp(input).metadata();
  const needsResize = (meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE;

  let pipeline = sharp(input).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  }
  const buf = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();

  if (buf.length < before) {
    await writeFile(file, buf);
    const saved = before - buf.length;
    totalSaved += saved;
    processed++;
    const short = file.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  ✓  ${short.padEnd(70)}  ${(before/1024).toFixed(0).padStart(5)}KB → ${(buf.length/1024).toFixed(0).padStart(5)}KB  (-${Math.round(saved/before*100)}%)`);
  } else {
    skipped++;
  }
}

async function compressPng(file) {
  const before = (await stat(file)).size;
  if (before < SKIP_KB * 1024) { skipped++; return; }

  const input = await readFile(file);
  const meta  = await sharp(input).metadata();
  const needsResize = (meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE;

  let pipeline = sharp(input);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  }
  const buf = await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer();

  if (buf.length < before) {
    await writeFile(file, buf);
    const saved = before - buf.length;
    totalSaved += saved;
    processed++;
    const short = file.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    console.log(`  ✓  ${short.padEnd(70)}  ${(before/1024).toFixed(0).padStart(5)}KB → ${(buf.length/1024).toFixed(0).padStart(5)}KB  (-${Math.round(saved/before*100)}%)`);
  } else {
    skipped++;
  }
}

console.log('=== Compressing portfolio WebP files ===');
const webpFiles = await walk(join(ROOT, 'public/images/portfolio'), ['.webp']);
for (const f of webpFiles) await compressWebp(f);

console.log('\n=== Compressing retail JPG files ===');
const jpgFiles = await walk(join(ROOT, 'public/retail'), ['.jpg', '.jpeg']);
for (const f of jpgFiles) await compressJpg(f);

console.log('\n=== Compressing banner PNG files ===');
const pngFiles = (await readdir(join(ROOT, 'public'), { withFileTypes: true }))
  .filter(e => e.isFile() && e.name.endsWith('.png'))
  .map(e => join(ROOT, 'public', e.name));
for (const f of pngFiles) await compressPng(f);

console.log(`\n✓ Done. Processed: ${processed}  Skipped: ${skipped}  Saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
