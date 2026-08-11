const NS = 'http://www.w3.org/2000/svg';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const MARKERS = [
  ['dg', 'rgba(120,200,240,0.85)'],
  ['dgai', 'rgba(176,123,255,0.9)'],
  ['dgok', 'rgba(110,242,192,0.9)'],
  ['dgbad', 'rgba(255,95,112,0.95)'],
];

function defs() {
  const m = MARKERS.map(([id, c]) => `
    <marker id="${id}-a" viewBox="0 0 10 8" refX="9" refY="4" markerWidth="7" markerHeight="6" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="${c}"/>
    </marker>`).join('');
  return `<defs>${m}
    <filter id="dg-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="dg-sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgba(90,180,235,0.16)"/><stop offset="1" stop-color="rgba(90,180,235,0)"/>
    </linearGradient>
  </defs>`;
}

const markerFor = (cls = '') => cls.includes('ai') ? 'dgai' : cls.includes('ok') ? 'dgok' : cls.includes('bad') ? 'dgbad' : 'dg';

function box(x, y, w, h, title, sub, cls = '', opts = {}) {
  const r = opts.r ?? 6;
  const tSize = opts.tSize ?? 15;
  const sSize = opts.sSize ?? 11;
  const cx = x + w / 2;
  let inner = '';
  const lines = wrap(title, Math.max(6, Math.floor(w / (tSize * 0.56))));
  const subLines = sub ? wrap(sub, Math.max(8, Math.floor(w / (sSize * 0.55)))) : [];
  const total = lines.length * (tSize + 2) + (subLines.length ? subLines.length * (sSize + 1) + 4 : 0);
  let ty = y + h / 2 - total / 2 + tSize * 0.85;
  for (const ln of lines) {
    inner += `<text class="dg-t" x="${cx}" y="${ty.toFixed(1)}" font-size="${tSize}" text-anchor="middle">${esc(ln)}</text>`;
    ty += tSize + 2;
  }
  if (subLines.length) ty += 3;
  for (const ln of subLines) {
    inner += `<text class="dg-s" x="${cx}" y="${ty.toFixed(1)}" font-size="${sSize}" text-anchor="middle">${esc(ln)}</text>`;
    ty += sSize + 1;
  }
  return `<g><rect class="dg-box ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" stroke-width="1.4"/>
    <rect x="${x}" y="${y}" width="${w}" height="${Math.min(h / 2, 18)}" rx="${r}" fill="url(#dg-sheen)"/>${inner}</g>`;
}

function wrap(text, max) {
  const words = String(text).split(/\s+/);
  const out = [];
  let cur = '';
  for (const w of words) {
    if (!cur.length) cur = w;
    else if ((cur + ' ' + w).length <= max) cur += ' ' + w;
    else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out;
}

function edge(x1, y1, x2, y2, cls = '', label = '', bend = 0) {
  const mk = markerFor(cls);
  let d;
  if (bend) {
    const mx = (x1 + x2) / 2 + bend;
    d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  } else {
    d = `M${x1},${y1} L${x2},${y2}`;
  }
  let out = `<path class="dg-edge ${cls}" d="${d}" stroke-width="1.5" marker-end="url(#${mk}-a)"/>`;
  if (label) {
    const lx = (x1 + x2) / 2 + (bend ? bend * 0.6 : 0);
    const ly = (y1 + y2) / 2 - 5;
    out += `<text class="dg-s" x="${lx}" y="${ly}" font-size="10" text-anchor="middle">${esc(label)}</text>`;
  }
  return out;
}

function heading(text, x, y, anchor = 'start') {
  return `<text class="dg-h" x="${x}" y="${y}" font-size="10.5" text-anchor="${anchor}">${esc(text)}</text>`;
}

/* ------------------------------------------------------------- builders */

function chain(spec) {
  const items = spec.items;
  const W = 1000;
  const gapX = spec.gap ?? 26;
  const bw = (W - 40 - gapX * (items.length - 1)) / items.length;
  const bh = spec.bh ?? 74;
  const top = spec.title ? 34 : 14;
  const H = top + bh + (spec.note ? 34 : 18);
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  items.forEach((it, i) => {
    const x = 20 + i * (bw + gapX);
    s += box(x, top, bw, bh, it.t, it.s, it.cls ?? '', { tSize: spec.tSize ?? 14 });
    if (i < items.length - 1) s += edge(x + bw + 3, top + bh / 2, x + bw + gapX - 4, top + bh / 2, it.ecls ?? '', it.e ?? '');
  });
  if (spec.note) s += `<text class="dg-s" x="20" y="${H - 10}" font-size="10.5">${esc(spec.note)}</text>`;
  return { body: s, W, H };
}

function stack(spec) {
  const items = spec.items;
  const W = 1000;
  const bh = spec.bh ?? 40;
  const gap = spec.gap ?? 12;
  const left = spec.sideL ? 150 : 20;
  const right = spec.sideR ? 150 : 20;
  const bw = W - left - right;
  const top = spec.title ? 32 : 12;
  const H = top + items.length * (bh + gap) + 6;
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  items.forEach((it, i) => {
    const y = top + i * (bh + gap);
    s += box(left, y, bw, bh, it.t, it.s, it.cls ?? '', { tSize: 13.5, sSize: 10.5 });
    if (i < items.length - 1) s += edge(left + bw / 2, y + bh + 1, left + bw / 2, y + bh + gap - 3, it.ecls ?? '', '');
    if (it.l) s += `<text class="dg-s" x="${left - 12}" y="${y + bh / 2 + 4}" font-size="10.5" text-anchor="end">${esc(it.l)}</text>`;
    if (it.r) s += `<text class="dg-s" x="${left + bw + 12}" y="${y + bh / 2 + 4}" font-size="10.5">${esc(it.r)}</text>`;
  });
  return { body: s, W, H };
}

function graph(spec) {
  const W = spec.w ?? 1000;
  const H = spec.h ?? 460;
  const nodes = {};
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  for (const g of spec.groups ?? []) {
    s += `<rect class="dg-lane" x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="8" stroke-width="1" stroke-dasharray="4 4"/>`;
    s += `<text class="dg-h" x="${g.x + 10}" y="${g.y + 17}" font-size="10">${esc(g.t)}</text>`;
  }
  for (const n of spec.nodes) {
    const w = n.w ?? 150, h = n.h ?? 52;
    nodes[n.id] = { x: n.x, y: n.y, w, h, cx: n.x + w / 2, cy: n.y + h / 2 };
  }
  for (const e of spec.edges ?? []) {
    const a = nodes[e.a], b = nodes[e.b];
    if (!a || !b) continue;
    let x1 = a.cx, y1 = a.cy, x2 = b.cx, y2 = b.cy;
    const dx = b.cx - a.cx, dy = b.cy - a.cy;
    if (Math.abs(dy) > Math.abs(dx)) {
      y1 = dy > 0 ? a.y + a.h + 1 : a.y - 1;
      y2 = dy > 0 ? b.y - 4 : b.y + b.h + 4;
      x1 = a.cx; x2 = b.cx;
    } else {
      x1 = dx > 0 ? a.x + a.w + 1 : a.x - 1;
      x2 = dx > 0 ? b.x - 4 : b.x + b.w + 4;
      y1 = a.cy; y2 = b.cy;
    }
    s += edge(x1, y1, x2, y2, e.cls ?? '', e.t ?? '', e.bend ?? 0);
  }
  for (const n of spec.nodes) {
    s += box(n.x, n.y, n.w ?? 150, n.h ?? 52, n.t, n.s, n.cls ?? '', { tSize: n.tSize ?? 13, sSize: 10 });
  }
  for (const t of spec.texts ?? []) {
    s += `<text class="${t.cls ?? 'dg-s'}" x="${t.x}" y="${t.y}" font-size="${t.size ?? 10.5}" text-anchor="${t.anchor ?? 'start'}">${esc(t.t)}</text>`;
  }
  return { body: s, W, H };
}

function pyramid(spec) {
  const items = spec.items;
  const W = 1000;
  const bh = spec.bh ?? 36;
  const gap = 8;
  const top = spec.title ? 32 : 12;
  const H = top + items.length * (bh + gap) + 10;
  const maxW = spec.maxW ?? 720;
  const minW = spec.minW ?? 250;
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  items.forEach((it, i) => {
    const k = i / Math.max(1, items.length - 1);
    const bw = maxW - (maxW - minW) * (1 - k);
    const x = 40 + (maxW - bw) / 2;
    const y = top + i * (bh + gap);
    s += box(x, y, bw, bh, it.t, '', it.cls ?? '', { tSize: 12.5 });
    s += `<text class="dg-s" x="${30}" y="${y + bh / 2 + 4}" font-size="10" text-anchor="end">${esc(it.l ?? '')}</text>`;
    s += `<text class="dg-s" x="${40 + maxW + 22}" y="${y + bh / 2 + 4}" font-size="10.5">${esc(it.r ?? '')}</text>`;
    if (i < items.length - 1) s += edge(40 + maxW / 2, y + bh + 1, 40 + maxW / 2, y + bh + gap - 2, it.ecls ?? '', '');
  });
  return { body: s, W, H };
}

function loop(spec) {
  const items = spec.items;
  const W = 1000, H = spec.h ?? 420;
  const cx = W / 2, cy = H / 2 + 6;
  const R = spec.r ?? Math.min(H * 0.38, 168);
  const bw = spec.bw ?? 152, bh = spec.bh ?? 46;
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(120,200,240,0.18)" stroke-width="1.2" stroke-dasharray="5 5"/>`;
  const n = items.length;
  const pts = items.map((_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: cx + Math.cos(a) * R * (spec.ellipse ?? 1.72), y: cy + Math.sin(a) * R, a };
  });
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const push = 1.06;
    const bx = cx + (mid.x - cx) * push, by = cy + (mid.y - cy) * push;
    s += `<path class="dg-edge ${items[i].ecls ?? ''}" d="M${p.x},${p.y} Q${bx},${by} ${q.x},${q.y}" stroke-width="1.5" marker-end="url(#${markerFor(items[i].ecls)}-a)"/>`;
  }
  items.forEach((it, i) => {
    s += box(pts[i].x - bw / 2, pts[i].y - bh / 2, bw, bh, it.t, it.s, it.cls ?? '', { tSize: 12.5, sSize: 9.5 });
  });
  if (spec.center) {
    s += `<text class="dg-h" x="${cx}" y="${cy - 4}" font-size="13" text-anchor="middle">${esc(spec.center)}</text>`;
    if (spec.centerSub) s += `<text class="dg-s" x="${cx}" y="${cy + 14}" font-size="10.5" text-anchor="middle">${esc(spec.centerSub)}</text>`;
  }
  return { body: s, W, H };
}

function matrix(spec) {
  const cols = spec.cols;
  const W = 1000;
  const gap = 14;
  const cw = (W - 40 - gap * (cols.length - 1)) / cols.length;
  const top = spec.title ? 34 : 14;
  const rows = Math.max(...cols.map((c) => c.items.length));
  const ih = spec.ih ?? 30;
  const H = top + 30 + rows * (ih + 6) + 14;
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  cols.forEach((c, i) => {
    const x = 20 + i * (cw + gap);
    s += `<rect class="dg-lane" x="${x}" y="${top}" width="${cw}" height="${H - top - 12}" rx="8" stroke-width="1"/>`;
    s += `<text class="dg-h" x="${x + cw / 2}" y="${top + 20}" font-size="10.5" text-anchor="middle">${esc(c.t)}</text>`;
    c.items.forEach((it, j) => {
      const y = top + 32 + j * (ih + 6);
      s += box(x + 8, y, cw - 16, ih, it.t ?? it, it.s, it.cls ?? c.cls ?? '', { tSize: 11.5, sSize: 9, r: 4 });
    });
  });
  return { body: s, W, H };
}

function timeline(spec) {
  const items = spec.items;
  const W = 1000;
  const top = spec.title ? 34 : 14;
  const H = top + 168;
  const y0 = top + 74;
  let s = '';
  if (spec.title) s += heading(spec.title, 20, 20);
  s += `<line class="dg-edge" x1="24" y1="${y0}" x2="${W - 18}" y2="${y0}" stroke-width="1.6" marker-end="url(#dg-a)"/>`;
  const step = (W - 70) / items.length;
  items.forEach((it, i) => {
    const x = 34 + i * step;
    const up = i % 2 === 0;
    const by = up ? y0 - 66 : y0 + 16;
    s += `<line class="dg-edge soft" x1="${x + step * 0.42}" y1="${y0}" x2="${x + step * 0.42}" y2="${up ? by + 48 : by}" stroke-width="1"/>`;
    s += `<circle cx="${x + step * 0.42}" cy="${y0}" r="4.5" fill="rgba(53,224,255,0.95)" filter="url(#dg-glow)"/>`;
    s += box(x, by, step * 0.84, 48, it.t, it.s, it.cls ?? '', { tSize: 11.5, sSize: 9.5, r: 5 });
    s += `<text class="dg-s" x="${x + step * 0.42}" y="${up ? y0 + 16 : y0 - 8}" font-size="9.5" text-anchor="middle">${esc(it.k ?? '')}</text>`;
  });
  return { body: s, W, H };
}

const BUILDERS = { chain, stack, graph, pyramid, loop, matrix, timeline };

export function renderDiagram(spec) {
  const b = BUILDERS[spec.type];
  if (!b) return '';
  const { body, W, H } = b(spec);
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="${NS}" role="img" aria-label="${esc(spec.title ?? spec.type)}">${defs()}${body}</svg>`;
}
