/**
 * Builds the single-file, double-click-to-present version of the deck:
 * every module (including Three.js) and the stylesheet inlined into one HTML
 * document that works from file:// with no server and no network.
 *
 *   node tools/build-single-file.mjs
 *   → dist/autonomous-air-space-ground-ai-infrastructure.html
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
mkdirSync(dist, { recursive: true });

const bundle = resolve(dist, '.bundle.js');
execSync(`npx -y esbuild@0.24.0 "${resolve(root, 'js/deck.js')}" --bundle --minify --format=iife --outfile="${bundle}"`, {
  stdio: 'inherit',
});

let html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'css/deck.css'), 'utf8');
const js = readFileSync(bundle, 'utf8').replace(/<\/script/g, '<\\/script');

html = html.replace('<link rel="stylesheet" href="css/deck.css" />', `<style>\n${css}\n</style>`);
html = html.replace('<script type="module" src="js/deck.js"></script>', `<script>\n${js}\n</script>`);
html = html.replace(
  /The complete slide-by-slide\s+specification is also available as text in <code>docs\/SLIDE_SPECS\.md<\/code>\./,
  'This is the single-file offline build of the deck.',
);

const out = resolve(dist, 'autonomous-air-space-ground-ai-infrastructure.html');
writeFileSync(out, html);
execSync(`rm -f "${bundle}"`);
console.log(`wrote ${out} (${(html.length / 1024).toFixed(0)} KiB)`);
