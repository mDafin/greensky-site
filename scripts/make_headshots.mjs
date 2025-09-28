// scripts/make_headshots.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = path.resolve("public/people");
const SIZES = [480, 800, 1200];

function kebab(str) {
  return String(str)
    .trim()
    .replace(/\.[^.]+$/, "")           // strip extension
    .replace(/[_\s]+/g, "-")           // underscores/spaces -> hyphen
    .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) // CamelCase -> -camel-case
    .replace(/-+/g, "-")               // collapse ---
    .replace(/^-|-$/g, "")             // trim leading/trailing -
    .toLowerCase();
}

function isAlreadySized(name) {
  // e.g. foo-480.jpg, person-1200.webp, etc.
  return /-\d{3,4}\.(jpg|jpeg|png|webp)$/i.test(name);
}

function isImage(name) {
  return /\.(jpe?g|png)$/i.test(name);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  await ensureDir(INPUT_DIR);
  const files = await fs.readdir(INPUT_DIR);

  const originals = files.filter((f) => isImage(f) && !isAlreadySized(f));

  if (originals.length === 0) {
    console.log("No originals found in public/people (or everything is already sized).");
    return;
  }

  for (const file of originals) {
    const abs = path.join(INPUT_DIR, file);
    const base = kebab(file); // normalized base name (no extension)
    const jpgBase = path.join(INPUT_DIR, base); // we’ll append -480.jpg, etc.

    try {
      const src = sharp(abs).rotate(); // auto-orient
      const meta = await src.metadata();

      if (!meta.width || !meta.height) {
        console.warn(`⚠️  Skipping ${file}: could not read dimensions`);
        continue;
      }

      console.log(`\n📸 Source: ${file}  (${meta.width}x${meta.height})`);
      for (const w of SIZES) {
        // Skip if source width is smaller than target
        if (meta.width < w) {
          console.log(`   ↳ skip ${w}px (source smaller)`);
          continue;
        }

        const jpgOut = `${jpgBase}-${w}.jpg`;
        const webpOut = `${jpgBase}-${w}.webp`;

        // JPG
        try {
          await sharp(abs).rotate().resize({ width: w }).jpeg({
            quality: 82,
            mozjpeg: true,
          }).toFile(jpgOut);
          console.log(`   ✓ ${path.basename(jpgOut)}`);
        } catch (e) {
          console.error(`   ✗ Failed JPG ${w}px:`, e.message);
        }

        // WebP
        try {
          await sharp(abs).rotate().resize({ width: w }).webp({
            quality: 80,
            effort: 4,
          }).toFile(webpOut);
          console.log(`   ✓ ${path.basename(webpOut)}`);
        } catch (e) {
          console.error(`   ✗ Failed WebP ${w}px:`, e.message);
        }
      }
    } catch (e) {
      console.error(`❌ Error on ${file}:`, e.message);
    }
  }

  console.log("\n✅ Done.");
}

main().catch((e) => {
  console.error("Uncaught error:", e);
  process.exit(1);
});