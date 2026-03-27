import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'projects');
mkdirSync(outDir, { recursive: true });

const projects = [
  { slug: 't4-platform', url: 'https://t4-platform.vercel.app' },
  { slug: 'rail360', url: 'https://rail360.vercel.app' },
  { slug: 'rail-ecosystem', url: 'https://rail-ecosystem.vercel.app' },
  { slug: 't4-deslocamento', url: 'https://t4-deslocamento.vercel.app' },
  { slug: 'blackbelt', url: 'https://blackbeltv2.vercel.app/' },
  { slug: 'aura', url: 'https://aura-assistent.vercel.app/chat' },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const project of projects) {
  try {
    console.log(`Capturing ${project.slug}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));
    const path = join(outDir, `${project.slug}.png`);
    await page.screenshot({ path, type: 'png' });
    await page.close();
    console.log(`  ✓ ${project.slug}.png saved`);
  } catch (err) {
    console.log(`  ✗ ${project.slug} failed: ${err.message}`);
  }
}

await browser.close();
console.log('\nDone! Screenshots saved to public/projects/');
