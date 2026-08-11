/**
 * Generates docs/SLIDE_SPECS.md and docs/DECK_OUTLINE.md from the deck data,
 * so the written specification can never drift from what the deck renders.
 *
 *   node tools/export-docs.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLIDES, ACTS } from '../js/slides.js';

const here = dirname(fileURLToPath(import.meta.url));
const docs = resolve(here, '../docs');
mkdirSync(docs, { recursive: true });

const strip = (s) => String(s ?? '')
  .replace(/<br\s*\/?>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

const actOf = (i) => {
  let a = ACTS[0];
  for (const x of ACTS) if (i >= x.from) a = x;
  return a;
};

const bullets = (v) => (Array.isArray(v) ? v.map((x) => `- ${strip(x)}`).join('\n') : strip(v));

function cards(list, heading) {
  if (!list?.length) return '';
  let out = `\n**${heading}**\n`;
  for (const c of list) {
    out += `\n- *${strip(c.h ?? '')}*`;
    if (c.text) out += ` — ${strip(c.text)}`;
    out += '\n';
    if (c.items) out += c.items.map((i) => `  - ${strip(i)}`).join('\n') + '\n';
    if (c.kv) out += c.kv.map(([k, v]) => `  - \`${strip(k)}\` ${strip(v)}`).join('\n') + '\n';
    if (c.chips) out += `  - ${c.chips.map(strip).join(' · ')}\n`;
    if (c.flow) out += `  - flow: ${strip(c.flow)}\n`;
  }
  return out;
}

function diagramSummary(d) {
  if (!d) return '';
  const lines = [`\n**TECHNICAL DIAGRAM** (\`${d.type}\`${d.title ? ` — ${strip(d.title)}` : ''})\n`];
  if (d.items) lines.push(d.items.map((i) => `- ${strip(i.t)}${i.s ? ` — ${strip(i.s)}` : ''}`).join('\n'));
  if (d.cols) lines.push(d.cols.map((c) => `- **${strip(c.t)}**: ${c.items.map((i) => strip(i.t ?? i)).join(' · ')}`).join('\n'));
  if (d.nodes) {
    lines.push(d.nodes.map((n) => `- \`${n.id}\` ${strip(n.t)}${n.s ? ` — ${strip(n.s)}` : ''}`).join('\n'));
    if (d.edges) {
      lines.push('\nEdges: ' + d.edges.map((e) => `${e.a}→${e.b}${e.t ? ` (${strip(e.t)})` : ''}`).join(', '));
    }
  }
  if (d.note) lines.push(`\nNote: ${strip(d.note)}`);
  return lines.join('\n') + '\n';
}

/* ----------------------------------------------------------- SLIDE_SPECS */

let md = `# Slide specification — The Autonomous Air–Space–Ground AI Infrastructure

Auto-generated from the deck source (\`js/content/*.js\`) by \`tools/export-docs.mjs\`.
Do not edit by hand: change the slide data and re-run the exporter.

- **Slides:** ${SLIDES.length}
- **Distinct animated 3D scenes:** ${new Set(SLIDES.filter((s) => s.scene).map((s) => s.scene)).size}
- **Technical diagrams:** ${SLIDES.filter((s) => s.diagram).length}
- **Acts:** ${ACTS.length}

Every slide below is specified with **VISUAL · 3D SCENE · COMPONENTS · DATA FLOW ·
ANIMATION · TEXT · TECHNICAL MESSAGE**, followed by the on-slide content
(columns, technologies, interfaces, metrics) exactly as the deck renders it.

---

`;

let currentAct = null;
SLIDES.forEach((s, i) => {
  const act = actOf(i);
  if (act !== currentAct) {
    currentAct = act;
    md += `\n## ${act.t}\n\n`;
  }
  const sp = s.spec ?? {};
  md += `### Slide ${i + 1} — ${strip(s.title)}\n\n`;
  md += `- **Kicker:** ${strip(s.kicker) || '—'}\n`;
  md += `- **Layout:** \`${s.layout ?? 'standard'}\`${s.diagram ? (s.scene ? ' (3D + diagram)' : ' (diagram only)') : ''}\n`;
  if (s.scene) md += `- **Scene module:** \`${s.scene}\`${s.sceneOpts ? ` \`${JSON.stringify(s.sceneOpts)}\`` : ''}\n`;
  if (s.sub) md += `- **Subtitle:** ${strip(s.sub)}\n`;
  if (s.caption) md += `- **Stage caption:** ${strip(s.caption)}\n`;
  md += '\n';

  const spec = [
    ['VISUAL', sp.visual],
    ['3D SCENE', sp.scene3d],
    ['COMPONENTS', sp.components],
    ['DATA FLOW', sp.dataflow],
    ['ANIMATION', sp.animation],
    ['TEXT', sp.text],
    ['TECHNICAL MESSAGE', sp.message ?? s.note],
    ['PRODUCTION', sp.production],
  ].filter(([, v]) => v);
  for (const [k, v] of spec) md += `**${k}**\n${bullets(v)}\n\n`;

  md += cards(s.left, 'LEFT COLUMN — concept / inputs');
  md += cards(s.right, 'RIGHT COLUMN — outputs / decisions');
  md += diagramSummary(s.diagram);
  if (s.tech) md += `\n**KEY TECHNOLOGIES:** ${s.tech.map(strip).join(' · ')}\n`;
  if (s.interfaces) md += `\n**INTERFACES:** ${s.interfaces.map(strip).join(' · ')}\n`;
  if (s.metrics) md += `\n**METRICS:** ${s.metrics.map(([v, k]) => `${strip(v)} ${strip(k)}`).join(' · ')}\n`;
  if (s.note && sp.message) md += `\n**NOTE:** ${strip(s.note)}\n`;
  md += '\n---\n\n';
});

writeFileSync(resolve(docs, 'SLIDE_SPECS.md'), md);

/* ---------------------------------------------------------- DECK_OUTLINE */

let out = `# Deck outline — ${SLIDES.length} slides

| # | Act | Slide | Scene | Diagram |
|---|-----|-------|-------|---------|
`;
SLIDES.forEach((s, i) => {
  out += `| ${i + 1} | ${actOf(i).t.replace(/\|/g, '')} | ${strip(s.title)} | ${s.scene ? `\`${s.scene}\`` : '—'} | ${s.diagram ? s.diagram.type : '—'} |\n`;
});
out += `\n## Scene inventory\n\n`;
const byScene = new Map();
SLIDES.forEach((s, i) => {
  if (!s.scene) return;
  if (!byScene.has(s.scene)) byScene.set(s.scene, []);
  byScene.get(s.scene).push(i + 1);
});
out += `${byScene.size} distinct animated 3D scene modules:\n\n`;
for (const [k, v] of [...byScene.entries()].sort()) {
  out += `- \`${k}\` — slide${v.length > 1 ? 's' : ''} ${v.join(', ')}\n`;
}
writeFileSync(resolve(docs, 'DECK_OUTLINE.md'), out);

console.log(`wrote docs/SLIDE_SPECS.md (${md.length} chars) and docs/DECK_OUTLINE.md`);
console.log(`slides=${SLIDES.length} scenes=${byScene.size} diagrams=${SLIDES.filter((s) => s.diagram).length}`);
