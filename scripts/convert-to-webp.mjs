#!/usr/bin/env node
/**
 * Convert all .jpg files in /workspace/public/image/ to .webp using ffmpeg (libwebp).
 *
 * Quality ladder (highest -> lowest): 20, 15, 10, 8, 5   (per task spec — never below q=5)
 * For each file we try qualities in order and pick the FIRST (largest) one that
 * produces a file <= 20KB. If q=5 at the current dimension still exceeds 20KB,
 * we progressively downscale the image (longer side) and retry the SAME quality
 * ladder, so the literal quality floor (q=5) is always respected while the
 * 5KB-20KB target size is achieved. Files < 5KB at q=20 are accepted anyway
 * (we never go above q=20).
 */
import { readdir } from 'fs/promises';
import { existsSync, statSync, unlinkSync } from 'fs';
import { spawnSync } from 'child_process';
import { join } from 'path';

const IMAGE_DIR = '/workspace/public/image';
const MIN_SIZE = 5 * 1024;   // 5 KB
const MAX_SIZE = 20 * 1024;  // 20 KB
const QUALITIES = [20, 15, 10, 8, 5];
// Dimension ladder: null = original size, then progressively smaller max long-side.
const DIMENSIONS = [null, 1280, 960, 800, 640, 480];

function convertWithQuality(jpgPath, webpPath, quality, maxDim) {
  if (existsSync(webpPath)) {
    try { unlinkSync(webpPath); } catch {}
  }
  const args = ['-y', '-i', jpgPath];
  if (maxDim != null) {
    // Scale so the image fits within maxDim x maxDim, preserving aspect ratio.
    args.push('-vf', `scale=${maxDim}:${maxDim}:force_original_aspect_ratio=decrease`);
  }
  args.push('-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '6', webpPath);
  const res = spawnSync('ffmpeg', args, { stdio: 'pipe' });
  if (res.status !== 0 || !existsSync(webpPath)) {
    return null;
  }
  return statSync(webpPath).size;
}

async function main() {
  const files = await readdir(IMAGE_DIR);
  const jpgFiles = files
    .filter((f) => /\.jpg$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  console.log(`Found ${jpgFiles.length} JPG files in ${IMAGE_DIR}`);
  console.log(`Quality ladder : ${QUALITIES.join(' -> ')} (never below q=${QUALITIES[QUALITIES.length - 1]})`);
  console.log(`Dimension ladder: ${DIMENSIONS.map((d) => (d == null ? 'original' : `max${d}px`)).join(' -> ')}`);
  console.log('Target size     : 5KB - 20KB\n');

  let totalBefore = 0;
  let totalAfter = 0;
  let converted = 0;
  const outOfRange = [];
  const failed = [];

  for (const jpgFile of jpgFiles) {
    const jpgPath = join(IMAGE_DIR, jpgFile);
    const webpFile = jpgFile.replace(/\.jpg$/i, '.webp');
    const webpPath = join(IMAGE_DIR, webpFile);

    let beforeSize;
    try {
      beforeSize = statSync(jpgPath).size;
    } catch {
      console.log(`SKIP ${jpgFile}: cannot stat source`);
      continue;
    }
    totalBefore += beforeSize;

    let chosen = null; // { quality, size, maxDim }

    for (const maxDim of DIMENSIONS) {
      for (const q of QUALITIES) {
        const size = convertWithQuality(jpgPath, webpPath, q, maxDim);
        if (size === null) {
          continue; // conversion failed; try next
        }
        chosen = { quality: q, size, maxDim };
        if (size <= MAX_SIZE) {
          break; // first (largest) quality at this dimension that fits — accept
        }
      }
      if (chosen && chosen.size <= MAX_SIZE) {
        break; // found a fit at this dimension — stop resizing down
      }
      // else: q=5 at this dimension still > 20KB; shrink and retry
    }

    if (!chosen) {
      console.log(`FAIL ${jpgFile}: all conversions failed`);
      failed.push(jpgFile);
      continue;
    }

    if (chosen.size < MIN_SIZE || chosen.size > MAX_SIZE) {
      outOfRange.push({
        file: webpFile,
        sizeKB: chosen.size / 1024,
        quality: chosen.quality,
        maxDim: chosen.maxDim,
      });
    }

    totalAfter += chosen.size;
    converted++;
    const dimLabel = chosen.maxDim == null ? 'orig' : `${chosen.maxDim}px`;
    const flag = chosen.size < MIN_SIZE ? ' [under 5KB]'
              : chosen.size > MAX_SIZE ? ' [over 20KB]'
              : '';
    console.log(
      `${jpgFile.padEnd(14)} -> ${webpFile.padEnd(14)} q=${String(chosen.quality).padStart(2)} ${dimLabel.padEnd(7)} ` +
      `${(chosen.size / 1024).toFixed(2).padStart(7)}KB (was ${(beforeSize / 1024).toFixed(1)}KB)${flag}`
    );
  }

  console.log('\n=== Summary ===');
  console.log(`Files converted : ${converted} / ${jpgFiles.length}`);
  console.log(`Failed         : ${failed.length}`);
  console.log(`Total before   : ${(totalBefore / 1024 / 1024).toFixed(2)} MB (${totalBefore} bytes)`);
  console.log(`Total after    : ${(totalAfter / 1024 / 1024).toFixed(2)} MB (${totalAfter} bytes)`);
  if (totalBefore > 0) {
    const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log(`Reduction      : ${pct}%`);
  }
  if (converted > 0) {
    const avg = (totalAfter / converted / 1024).toFixed(2);
    console.log(`Avg webp size  : ${avg} KB`);
  }
  console.log(`Out of 5-20KB  : ${outOfRange.length}`);
  for (const o of outOfRange) {
    console.log(`  ${o.file}: ${o.sizeKB.toFixed(2)}KB at q=${o.quality} (${o.maxDim == null ? 'orig' : o.maxDim + 'px'})`);
  }
  if (failed.length) {
    console.log('Failed files:');
    for (const f of failed) console.log(`  ${f}`);
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
