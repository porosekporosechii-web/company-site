#!/usr/bin/env node
/**
 * Image optimizer for the portfolio.
 *
 * Drop raw photos (JPG/PNG/HEIC) into ./upload/ at the repo root,
 * then run:
 *
 *   npm run images
 *
 * The script:
 *   - resizes to a max long-edge dimension (default 1920px)
 *   - writes WebP (default quality 82) — best balance of size/quality for web
 *   - optionally writes JPG fallback (--jpg)
 *   - preserves the original file name (kebab-cased, .webp extension)
 *   - drops the result into public/works/ by default
 *
 * CLI flags:
 *   --in <path>      source folder (default: ./upload)
 *   --out <path>     destination folder (default: ./public/works)
 *   --max <px>       max long edge in pixels (default: 1920)
 *   --quality <0-100> WebP quality (default: 82)
 *   --jpg            also emit a .jpg fallback at quality 85
 *   --keep           keep the original file after success (default: move into upload/_done/)
 *   --dry            print plan without writing files
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const inDir   = path.resolve(projectRoot, args.in   ?? 'upload');
const outDir  = path.resolve(projectRoot, args.out  ?? 'public/works');
const maxEdge = Number(args.max ?? 1920);
const quality = Number(args.quality ?? 82);
const emitJpg = Boolean(args.jpg);
const keep    = Boolean(args.keep);
const dry     = Boolean(args.dry);

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif', '.avif']);

/** Convert a free-form name into a clean kebab-case slug suitable for URLs. */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  try {
    await fs.access(inDir);
  } catch {
    if (dry) {
      console.log(`(dry) would create source folder: ${inDir}`);
    } else {
      await ensureDir(inDir);
      console.log(`Created source folder: ${inDir}`);
      console.log(`Drop your photos there and re-run \`npm run images\`.`);
      return;
    }
  }

  await ensureDir(outDir);
  const doneDir = path.join(inDir, '_done');
  if (!keep && !dry) await ensureDir(doneDir);

  const entries = (await fs.readdir(inDir, { withFileTypes: true }))
    .filter(d => d.isFile() && SUPPORTED.has(path.extname(d.name).toLowerCase()));

  if (entries.length === 0) {
    console.log(`No images found in ${path.relative(projectRoot, inDir)} (expected: ${[...SUPPORTED].join(', ')})`);
    return;
  }

  let total = 0;
  let saved = 0;

  for (const entry of entries) {
    const srcPath = path.join(inDir, entry.name);
    const baseName = path.basename(entry.name, path.extname(entry.name));
    const slug = slugify(baseName);
    const webpPath = path.join(outDir, `${slug}.webp`);
    const jpgPath  = path.join(outDir, `${slug}.jpg`);

    const stat = await fs.stat(srcPath);
    const srcSize = stat.size;

    let pipeline = sharp(srcPath, { failOn: 'none' }).rotate(); // honour EXIF orientation
    const meta = await sharp(srcPath).metadata();
    const needsResize = (meta.width ?? 0) > maxEdge || (meta.height ?? 0) > maxEdge;
    if (needsResize) {
      pipeline = pipeline.resize({
        width: maxEdge,
        height: maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (dry) {
      console.log(
        `(dry) ${entry.name}  ${meta.width}x${meta.height}  ${(srcSize / 1024).toFixed(0)} KB  ->  ${path.relative(projectRoot, webpPath)}`,
      );
      total += srcSize;
      continue;
    }

    // WebP — primary
    const webpBuf = await pipeline.clone().webp({ quality, effort: 5 }).toBuffer();
    await fs.writeFile(webpPath, webpBuf);
    let outSize = webpBuf.length;

    // Optional JPG fallback
    if (emitJpg) {
      const jpgBuf = await pipeline.clone().jpeg({ quality: Math.min(95, quality + 3), mozjpeg: true }).toBuffer();
      await fs.writeFile(jpgPath, jpgBuf);
      outSize += jpgBuf.length;
    }

    total += srcSize;
    saved += srcSize - outSize;

    const pct = Math.round((1 - outSize / srcSize) * 100);
    const dims = meta.width && meta.height
      ? (needsResize ? `${meta.width}x${meta.height} -> ≤${maxEdge}px` : `${meta.width}x${meta.height}`)
      : '';
    console.log(
      `  ✓  ${entry.name.padEnd(40)}  ${(srcSize / 1024).toFixed(0).padStart(5)} KB  ->  ${(outSize / 1024).toFixed(0).padStart(5)} KB  (-${String(pct).padStart(2)}%)  ${dims}`,
    );

    // Move original out of the way so re-running doesn't re-process
    if (!keep) {
      await fs.rename(srcPath, path.join(doneDir, entry.name));
    }
  }

  if (!dry) {
    console.log('');
    console.log(`Processed ${entries.length} file(s).  Total in: ${(total / 1024 / 1024).toFixed(1)} MB, saved: ${(saved / 1024 / 1024).toFixed(1)} MB.`);
    console.log(`Output: ${path.relative(projectRoot, outDir)}/`);
    if (!keep) console.log(`Originals moved to: ${path.relative(projectRoot, doneDir)}/`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
