#!/usr/bin/env node
/**
 * Portfolio importer.
 *
 *   npm run import-portfolio -- "D:\Сайт\Фото_для_портфолио"
 *
 * Source folder convention:
 *   <SOURCE>/
 *     <Category 1>/                              (= portfolio category)
 *       <Project A>/                             (= project; gallery = all images here)
 *         photo-1.jpg
 *         photo-2.jpg
 *       <Project B>/
 *         only-one.jpg
 *       loose-photo.jpg                          (= single-photo project)
 *     <Category 2>/
 *       ...
 *
 * The script:
 *   - re-creates public/images/portfolio/ from scratch each run (clean slate)
 *   - converts every image to WebP, max long edge 1920, quality 82
 *   - generates lib/portfolio.generated.ts with stable slugs/IDs
 *   - keeps slugs/IDs stable across runs (deterministic, derived from name)
 *   - preserves originals (only reads them)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ─── CONFIG ──────────────────────────────────────────────────────────
const SRC = process.argv[2] ?? process.env.PORTFOLIO_SRC;
const OUT_DIR = path.join(projectRoot, 'public', 'images', 'portfolio');
const GEN_FILE = path.join(projectRoot, 'lib', 'portfolio.generated.ts');
const PUBLIC_URL_PREFIX = '/images/portfolio';
const MAX_EDGE = 1920;
const QUALITY = 82;
const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif', '.avif']);
const HIDDEN_PREFIX = ['.', '_', '~'];

if (!SRC) {
  console.error('Usage: npm run import-portfolio -- "<source-folder>"');
  process.exit(1);
}

// ─── HELPERS ─────────────────────────────────────────────────────────

/** ISO-9-ish Cyrillic → Latin. Lossy but stable. */
const RU_MAP = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
  'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
  'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts',
  'ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
};
function transliterate(str) {
  return str.toLowerCase().split('').map((c) => RU_MAP[c] ?? c).join('');
}
function slugify(str) {
  return transliterate(str.trim())
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'untitled';
}

/** Display-friendly: capitalize first letter, lowercase the rest. */
function sentenceCase(s) {
  s = s.trim();
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase('ru-RU') + s.slice(1).toLocaleLowerCase('ru-RU');
}

/** Strip extension and sluggify, used for filename → readable title fallback. */
function titleFromFilename(name) {
  const base = path.basename(name, path.extname(name));
  return sentenceCase(base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim());
}

/** Deterministic hash → small positive int. */
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function isHidden(name) {
  return HIDDEN_PREFIX.some((p) => name.startsWith(p));
}

async function rmDir(p) {
  await fs.rm(p, { recursive: true, force: true });
}
async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function listEntries(dir) {
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    return items
      .filter((d) => !isHidden(d.name))
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  } catch {
    return [];
  }
}

// ─── PIPELINE ────────────────────────────────────────────────────────

/** Optimize one source image → WebP. Returns final on-disk size. */
async function optimizeOne(srcPath, dstPath) {
  const pipeline = sharp(srcPath, { failOn: 'none' })
    .rotate() // respect EXIF orientation
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 5 });

  await ensureDir(path.dirname(dstPath));
  const info = await pipeline.toFile(dstPath);
  return info.size;
}

/** Process a single image file as a one-photo project. */
async function importLooseFile(categoryName, categorySlug, fileEntry, catSrcDir) {
  const srcPath = path.join(catSrcDir, fileEntry.name);
  const ext = path.extname(fileEntry.name).toLowerCase();
  if (!IMG_EXT.has(ext)) return null;

  const slug = slugify(path.basename(fileEntry.name, ext));
  const title = titleFromFilename(fileEntry.name);
  const id = fnv1a(`${categorySlug}/${slug}`);

  const outRelDir = path.posix.join(categorySlug, slug);
  const dstAbs = path.join(OUT_DIR, categorySlug, slug, `${slug}.webp`);
  const srcSize = (await fs.stat(srcPath)).size;
  const outSize = await optimizeOne(srcPath, dstAbs);

  const publicPath = `${PUBLIC_URL_PREFIX}/${outRelDir}/${slug}.webp`;
  return {
    work: {
      id,
      slug,
      title,
      category: categoryName,
      categorySlug,
      coverImage: publicPath,
      images: [publicPath],
    },
    srcSize,
    outSize,
    imagesCount: 1,
  };
}

/** Process a project folder (= gallery). */
async function importProjectFolder(categoryName, categorySlug, projectEntry, catSrcDir) {
  const projectSrcDir = path.join(catSrcDir, projectEntry.name);
  const projectSlug = slugify(projectEntry.name);
  const projectTitle = sentenceCase(projectEntry.name);
  const id = fnv1a(`${categorySlug}/${projectSlug}`);

  const items = await listEntries(projectSrcDir);
  const imageFiles = items.filter((d) => d.isFile() && IMG_EXT.has(path.extname(d.name).toLowerCase()));
  if (imageFiles.length === 0) return null;

  const dstBase = path.join(OUT_DIR, categorySlug, projectSlug);
  await ensureDir(dstBase);

  const images = [];
  let srcSize = 0;
  let outSize = 0;
  const usedNames = new Set();

  for (const file of imageFiles) {
    const srcPath = path.join(projectSrcDir, file.name);
    const baseSlug = slugify(path.basename(file.name, path.extname(file.name)));
    // Deduplicate slugs within a project
    let candidate = baseSlug;
    let n = 2;
    while (usedNames.has(candidate)) candidate = `${baseSlug}-${n++}`;
    usedNames.add(candidate);
    const dstAbs = path.join(dstBase, `${candidate}.webp`);
    srcSize += (await fs.stat(srcPath)).size;
    outSize += await optimizeOne(srcPath, dstAbs);
    images.push(`${PUBLIC_URL_PREFIX}/${categorySlug}/${projectSlug}/${candidate}.webp`);
  }

  return {
    work: {
      id,
      slug: projectSlug,
      title: projectTitle,
      category: categoryName,
      categorySlug,
      coverImage: images[0],
      images,
    },
    srcSize,
    outSize,
    imagesCount: images.length,
  };
}

// ─── MAIN ────────────────────────────────────────────────────────────

async function main() {
  try {
    await fs.access(SRC);
  } catch {
    console.error(`Source not found: ${SRC}`);
    process.exit(1);
  }

  console.log(`Source:  ${SRC}`);
  console.log(`Output:  ${path.relative(projectRoot, OUT_DIR)}/`);
  console.log(`Data:    ${path.relative(projectRoot, GEN_FILE)}`);
  console.log('');

  // Clean slate for output (data file gets overwritten at the end either way)
  await rmDir(OUT_DIR);
  await ensureDir(OUT_DIR);

  const allWorks = [];
  const categoriesMap = new Map(); // categorySlug → { name, slug, count }
  let totalSrcBytes = 0;
  let totalOutBytes = 0;
  let totalImages = 0;
  const errors = [];

  const catEntries = (await listEntries(SRC)).filter((d) => d.isDirectory());
  for (const catEntry of catEntries) {
    const categoryName = sentenceCase(catEntry.name);
    const categorySlug = slugify(catEntry.name);
    const catSrcDir = path.join(SRC, catEntry.name);

    let categoryWorkCount = 0;
    console.log(`▸ ${categoryName}`);

    const inside = await listEntries(catSrcDir);

    // 1. Subfolders → multi-photo projects
    for (const projEntry of inside.filter((d) => d.isDirectory())) {
      try {
        const res = await importProjectFolder(categoryName, categorySlug, projEntry, catSrcDir);
        if (!res) continue;
        allWorks.push(res.work);
        totalSrcBytes += res.srcSize;
        totalOutBytes += res.outSize;
        totalImages += res.imagesCount;
        categoryWorkCount++;
        console.log(
          `    📁 ${res.work.title.padEnd(46)}  ${res.imagesCount} фото  ${(res.srcSize / 1024 / 1024).toFixed(1)}MB → ${(res.outSize / 1024 / 1024).toFixed(1)}MB`,
        );
      } catch (e) {
        errors.push({ path: path.join(catSrcDir, projEntry.name), err: e.message });
        console.log(`    ✗ ${projEntry.name}  ${e.message}`);
      }
    }

    // 2. Loose files → single-photo projects
    for (const fileEntry of inside.filter((d) => d.isFile())) {
      const ext = path.extname(fileEntry.name).toLowerCase();
      if (!IMG_EXT.has(ext)) continue;
      try {
        const res = await importLooseFile(categoryName, categorySlug, fileEntry, catSrcDir);
        if (!res) continue;
        allWorks.push(res.work);
        totalSrcBytes += res.srcSize;
        totalOutBytes += res.outSize;
        totalImages += res.imagesCount;
        categoryWorkCount++;
        console.log(
          `    🖼  ${res.work.title.padEnd(46)}  1 фото   ${(res.srcSize / 1024).toFixed(0)}KB → ${(res.outSize / 1024).toFixed(0)}KB`,
        );
      } catch (e) {
        errors.push({ path: path.join(catSrcDir, fileEntry.name), err: e.message });
        console.log(`    ✗ ${fileEntry.name}  ${e.message}`);
      }
    }

    if (categoryWorkCount > 0) {
      categoriesMap.set(categorySlug, {
        name: categoryName,
        slug: categorySlug,
        count: categoryWorkCount,
      });
    }
  }

  // Sort works: by category order (as encountered), then by title
  allWorks.sort((a, b) => {
    if (a.categorySlug !== b.categorySlug) return a.categorySlug.localeCompare(b.categorySlug);
    return a.title.localeCompare(b.title, 'ru');
  });

  const categories = Array.from(categoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  // ─── WRITE GENERATED FILE ──────────────────────────────────────────
  const header = `// AUTO-GENERATED by \`npm run import-portfolio\` — do not edit by hand.
// Source folder:  ${SRC.replace(/\\/g, '\\\\')}
// Generated at:   ${new Date().toISOString()}

export interface PortfolioSpec { [key: string]: string }

export interface PortfolioWork {
  id: number;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  coverImage: string;
  images: string[];
  description?: string;
  specs?: PortfolioSpec;
}

export interface PortfolioCategory {
  name: string;
  slug: string;
  count: number;
}
`;

  const worksLiteral = JSON.stringify(allWorks, null, 2);
  const catsLiteral  = JSON.stringify(categories, null, 2);

  const body = `${header}
export const portfolioWorks: PortfolioWork[] = ${worksLiteral};

export const portfolioCategories: PortfolioCategory[] = ${catsLiteral};
`;

  await ensureDir(path.dirname(GEN_FILE));
  await fs.writeFile(GEN_FILE, body, 'utf8');

  // ─── SUMMARY ───────────────────────────────────────────────────────
  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Categories:  ${categories.length}`);
  console.log(`Projects:    ${allWorks.length}`);
  console.log(`Images:      ${totalImages}`);
  console.log(`Source:      ${(totalSrcBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimized:   ${(totalOutBytes / 1024 / 1024).toFixed(1)} MB` +
              `  (-${Math.round((1 - totalOutBytes / totalSrcBytes) * 100)}%)`);
  console.log(`Errors:      ${errors.length}`);
  if (errors.length) {
    console.log('');
    errors.forEach((e) => console.log(`  ✗  ${e.path}\n     ${e.err}`));
  }
  console.log(`Wrote:       ${path.relative(projectRoot, GEN_FILE)}`);
  console.log(`Wrote:       ${path.relative(projectRoot, OUT_DIR)}/   (${totalImages} WebP files)`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
