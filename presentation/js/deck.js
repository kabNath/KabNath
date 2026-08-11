import { THREE, disposeScene } from './kit.js';
import { SCENES } from './scenes/index.js';
import { renderDiagram } from './diagram.js';
import { SLIDES, ACTS } from './slides.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ------------------------------------------------------------------ build */

const deck = $('#deck');
const nodes = [];

function chips(list, cls = '') {
  return `<div class="chips">${list.map((t) => `<span class="chip ${cls}">${t}</span>`).join('')}</div>`;
}

function cardHTML(card) {
  const cls = `card ${card.tone ?? ''}`;
  let body = '';
  if (card.text) body += `<p>${card.text}</p>`;
  if (card.items) body += `<ul>${card.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  if (card.kv) body += `<dl class="kv">${card.kv.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  if (card.flow) body += `<div class="flow-note">${card.flow}</div>`;
  if (card.chips) body += chips(card.chips, card.chipTone ?? '');
  return `<div class="${cls}">${card.h ? `<h4>${card.h}</h4>` : ''}${body}</div>`;
}

function buildSlide(s, i) {
  const sec = el('section', `slide layout-${s.layout ?? 'standard'}${s.titleSlide ? ' title-slide' : ''}`);
  sec.dataset.index = i;
  if (s.diagram && !s.scene) sec.classList.add('diagram-only');
  else if (s.diagram && s.diagramLead) sec.classList.add('diagram-lead');

  if (s.layout === 'hero') {
    const stage = el('div', 's-stage');
    stage.appendChild(el('div', 'stage-gl'));
    const ovHost = stage.querySelector('.stage-gl');
    const ov = el('div', 'hero-overlay', `
      ${s.kicker ? `<div class="s-kicker">${s.kicker}</div>` : ''}
      <h1 class="hero-title">${s.title}</h1>
      ${s.sub ? `<p class="hero-sub">${s.sub}</p>` : ''}`);
    stage.appendChild(ov);
    if (s.strip) stage.appendChild(el('div', 'hero-strip', chips(s.strip)));
    if (s.stageTag) ovHost.appendChild(el('div', 'stage-tag', s.stageTag));
    if (s.caption) ovHost.appendChild(el('div', 'stage-caption', s.caption));
    sec.appendChild(stage);
    deck.appendChild(sec);
    nodes.push(sec);
    return sec;
  }

  sec.appendChild(el('div', 's-head', `
    <div>
      ${s.kicker ? `<div class="s-kicker">${s.kicker}</div>` : ''}
      <h2 class="s-title">${s.title}</h2>
      ${s.sub ? `<div class="s-sub">${s.sub}</div>` : ''}
    </div>
    ${s.badge ? `<div class="s-head-right"><span class="s-badge">${s.badge}</span></div>` : ''}`));

  const stage = el('div', 's-stage');
  stage.appendChild(el('div', 'stage-gl'));
  if (s.diagram) {
    const d = el('div', 'stage-diagram');
    d.dataset.pending = '1';
    stage.appendChild(d);
  }
  const gl = stage.querySelector('.stage-gl');
  if (s.stageTag) gl.appendChild(el('div', 'stage-tag', s.stageTag));
  if (s.caption) gl.appendChild(el('div', 'stage-caption', s.caption));
  sec.appendChild(stage);

  if (s.layout !== 'full') {
    const L = el('div', 's-col left');
    (s.left ?? []).forEach((cd) => L.insertAdjacentHTML('beforeend', cardHTML(cd)));
    sec.appendChild(L);
    if (s.layout !== 'wide') {
      const R = el('div', 's-col right');
      (s.right ?? []).forEach((cd) => R.insertAdjacentHTML('beforeend', cardHTML(cd)));
      sec.appendChild(R);
    }
  }

  const foot = el('div', 's-foot');
  const blocks = [];
  if (s.strip) blocks.push(`<div class="foot-block"><h5>PLATFORM SCOPE</h5>${chips(s.strip)}</div>`);
  if (s.tech) blocks.push(`<div class="foot-block"><h5>KEY TECHNOLOGIES</h5>${chips(s.tech)}</div>`);
  if (s.interfaces) blocks.push(`<div class="foot-block"><h5>INTERFACES</h5>${chips(s.interfaces, 'v')}</div>`);
  if (s.metrics) {
    blocks.push(`<div class="foot-block"><h5>${s.metricsLabel ?? 'PERFORMANCE METRICS'}</h5><div class="metrics">${
      s.metrics.map(([v, k]) => `<span class="metric"><b>${v}</b><span>${k}</span></span>`).join('')}</div></div>`);
  }
  if (s.note) blocks.push(`<div class="foot-block"><h5>TECHNICAL MESSAGE</h5><p style="font-size:11px;line-height:1.45;color:#a9c6de;margin:0">${s.note}</p></div>`);
  foot.innerHTML = blocks.join('');
  if (blocks.length) sec.appendChild(foot);

  deck.appendChild(sec);
  nodes.push(sec);
  return sec;
}

SLIDES.forEach(buildSlide);

/* ---------------------------------------------------------------- renderer */

const NOFIT = location.search.includes('nofit');
const canvas = $('#gl');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
} catch (e) {
  renderer = null;
}

let current = -1;
let active = null;
let paused = false;
let clock = new THREE.Clock();
let elapsed = 0;

function fitCanvas() {
  if (!renderer || !active) return;
  const host = nodes[current]?.querySelector('.stage-gl');
  if (!host) return;
  const r = host.getBoundingClientRect();
  if (r.width < 8 || r.height < 8) return;
  canvas.style.left = `${r.left}px`;
  canvas.style.top = `${r.top}px`;
  canvas.style.width = `${r.width}px`;
  canvas.style.height = `${r.height}px`;
  renderer.setSize(r.width, r.height, false);
  active.camera.aspect = r.width / r.height;
  active.camera.updateProjectionMatrix();
}

function mountScene(i) {
  if (!renderer) return;
  if (active) {
    disposeScene(active.scene);
    active = null;
    canvas.classList.remove('live');
  }
  const def = SLIDES[i];
  if (!def.scene) return;
  const factory = SCENES[def.scene];
  if (!factory) {
    console.warn('missing scene', def.scene);
    return;
  }
  try {
    active = factory(def.sceneOpts ?? {});
  } catch (err) {
    console.error('scene failed', def.scene, err);
    active = null;
    return;
  }
  elapsed = def.sceneOpts?.t0 ?? 1.6;
  fitCanvas();
  warmup(active, elapsed);
  if (!NOFIT) { try { active.autofit?.({ margin: def.fitMargin ?? 1.08, shiftY: def.fitShift ?? 0 }); } catch (e) { console.error('autofit', def.scene, e); } }
  requestAnimationFrame(() => {
    if (!active) return;
    fitCanvas();
    if (!NOFIT) { try { active.autofit?.({ margin: def.fitMargin ?? 1.08, shiftY: def.fitShift ?? 0 }); } catch (e) { /* keep first fit */ } }
    canvas.classList.add('live');
  });
}

function warmup(ctx, t) {
  for (let k = 0; k < 4; k++) {
    try { ctx.update(t - 0.6 + k * 0.2, 0.2); } catch (e) { console.error('warmup', e); return; }
  }
}

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.06);
  if (!renderer || !active || paused || document.hidden) return;
  elapsed += dt;
  try {
    active.update(elapsed, dt);
    renderer.render(active.scene, active.camera);
  } catch (err) {
    console.error('render error', err);
    active = null;
  }
}
requestAnimationFrame(frame);

/* -------------------------------------------------------------- navigation */

function actOf(i) {
  let a = ACTS[0];
  for (const x of ACTS) if (i >= x.from) a = x;
  return a;
}

function go(i, opts = {}) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  if (i === current) return;
  if (current >= 0) nodes[current].classList.remove('active');
  current = i;
  const s = SLIDES[i];
  const node = nodes[i];
  node.classList.add('active');

  const dg = node.querySelector('.stage-diagram');
  if (dg && dg.dataset.pending) {
    dg.innerHTML = renderDiagram(s.diagram);
    delete dg.dataset.pending;
  }

  $('#tb-act').textContent = actOf(i).t;
  $('#tb-name').textContent = (s.title || '').replace(/<[^>]+>/g, '');
  $('#tb-index').textContent = i + 1;
  $('#track-fill').style.width = `${((i + 1) / SLIDES.length) * 100}%`;
  document.querySelectorAll('.ov-item').forEach((n, k) => n.classList.toggle('current', k === i));
  if (!$('#notes').hidden) renderNotes();
  if (!opts.silent) location.hash = `#${i + 1}`;
  mountScene(i);
}

function renderNotes() {
  const s = SLIDES[current];
  const spec = s.spec ?? {};
  const order = [
    ['VISUAL', spec.visual], ['3D SCENE', spec.scene3d], ['COMPONENTS', spec.components],
    ['DATA FLOW', spec.dataflow], ['ANIMATION', spec.animation], ['TEXT', spec.text],
    ['TECHNICAL MESSAGE', spec.message ?? s.note], ['PRODUCTION', spec.production],
  ];
  $('#notes-body').innerHTML = `
    <section><h6>SLIDE ${current + 1} / ${SLIDES.length} — ${actOf(current).t}</h6>
    <p style="color:#eaf7ff;font-weight:600">${(s.title || '').replace(/<[^>]+>/g, '')}</p></section>
    ${order.filter(([, v]) => v).map(([k, v]) => `<section><h6>${k}</h6>${
      Array.isArray(v) ? `<ul>${v.map((x) => `<li>${x}</li>`).join('')}</ul>` : `<p>${v}</p>`
    }</section>`).join('')}
    ${s.scene ? `<section><h6>SCENE MODULE</h6><p><code>${s.scene}</code>${s.sceneOpts ? ` <code>${JSON.stringify(s.sceneOpts)}</code>` : ''}</p></section>` : ''}`;
}

function buildOverview() {
  const body = $('#ov-body');
  body.innerHTML = '';
  ACTS.forEach((a, ai) => {
    const to = ai + 1 < ACTS.length ? ACTS[ai + 1].from : SLIDES.length;
    body.appendChild(el('div', 'ov-act', `${a.t} · slides ${a.from + 1}–${to}`));
    const g = el('div', 'ov-grid');
    for (let i = a.from; i < to; i++) {
      const b = el('button', 'ov-item', `<i>${String(i + 1).padStart(2, '0')} · ${SLIDES[i].kicker ?? ''}</i><b>${(SLIDES[i].title || '').replace(/<[^>]+>/g, '')}</b>`);
      b.addEventListener('click', () => { toggle('overview', false); go(i); });
      g.appendChild(b);
    }
    body.appendChild(g);
  });
}

function toggle(what, force) {
  const map = { overview: '#overview', notes: '#notes', help: '#help' };
  const n = $(map[what]);
  const show = force != null ? force : n.hidden;
  n.hidden = !show;
  document.querySelectorAll(`[data-action="${what}"]`).forEach((b) => b.classList.toggle('on', show && b.closest('#topbar')));
  if (what === 'notes' && show) renderNotes();
  if (what === 'overview' && show) document.querySelectorAll('.ov-item').forEach((x, k) => x.classList.toggle('current', k === current));
  requestAnimationFrame(fitCanvas);
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-action]');
  if (!b) return;
  const a = b.dataset.action;
  if (a === 'next') go(current + 1);
  else if (a === 'prev') go(current - 1);
  else if (a === 'anim') {
    paused = !paused;
    b.classList.toggle('on', paused);
    b.textContent = paused ? 'PLAY' : 'PAUSE';
  } else toggle(a);
});

$('#track').addEventListener('click', (e) => {
  const r = $('#track').getBoundingClientRect();
  go(Math.round(((e.clientX - r.left) / r.width) * (SLIDES.length - 1)));
});

let numBuf = '';
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (/^[0-9]$/.test(k)) { numBuf += k; return; }
  if (k === 'Enter' && numBuf) { go(parseInt(numBuf, 10) - 1); numBuf = ''; return; }
  numBuf = '';
  if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown') { e.preventDefault(); go(current + 1); }
  else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') { e.preventDefault(); go(current - 1); }
  else if (k === 'Home') go(0);
  else if (k === 'End') go(SLIDES.length - 1);
  else if (k === 'g' || k === 'G') toggle('overview');
  else if (k === 'n' || k === 'N') toggle('notes');
  else if (k === '?') toggle('help');
  else if (k === 'p' || k === 'P') {
    paused = !paused;
    const b = document.querySelector('[data-action="anim"]');
    b.classList.toggle('on', paused);
    b.textContent = paused ? 'PLAY' : 'PAUSE';
  } else if (k === 'f' || k === 'F') {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  } else if (k === 'Escape') {
    ['overview', 'notes', 'help'].forEach((x) => toggle(x, false));
  }
});

let touchX = null;
addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
addEventListener('touchend', (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

addEventListener('resize', () => requestAnimationFrame(fitCanvas));
addEventListener('hashchange', () => {
  const n = parseInt(location.hash.replace('#', ''), 10);
  if (n && n - 1 !== current) go(n - 1, { silent: true });
});

/* -------------------------------------------------------------------- init */

if (location.search.includes('bare')) document.body.classList.add('bare');
$('#tb-total').textContent = SLIDES.length;
const ticks = $('#track-ticks');
ACTS.forEach((a) => {
  const s = el('span');
  s.style.left = `${(a.from / SLIDES.length) * 100}%`;
  s.dataset.label = a.t;
  ticks.appendChild(s);
});
buildOverview();

const start = (() => {
  const n = parseInt(location.hash.replace('#', ''), 10);
  return n ? n - 1 : 0;
})();

$('#app').hidden = false;
$('#boot-sub').textContent = renderer ? `compiled ${SLIDES.length} slides · ${Object.keys(SCENES).length} 3D scenes` : 'WebGL unavailable — text mode';
setTimeout(() => {
  go(start, { silent: true });
  $('#boot').classList.add('gone');
  setTimeout(() => { $('#boot').remove(); }, 600);
}, 260);

window.DECK = { go, SLIDES, SCENES, get current() { return current; } };

/* ------------------------------------------------------------------ audit */

function auditAll() {
  const errs = [];
  const warn = [];
  const stats = [];
  const origErr = console.error;
  console.error = (...a) => { errs.push(a.map(String).join(' ')); origErr(...a); };
  const t0 = performance.now();
  if (renderer) renderer.setSize(960, 540, false);
  SLIDES.forEach((s, i) => {
    if (s.diagram) {
      try {
        const svg = renderDiagram(s.diagram);
        if (!svg || svg.indexOf('<svg') !== 0) errs.push(`slide ${i + 1}: diagram produced no svg`);
      } catch (e) { errs.push(`slide ${i + 1} diagram: ${e.message}`); }
    }
    if (!s.scene) return;
    const f = SCENES[s.scene];
    if (!f) { errs.push(`slide ${i + 1}: missing scene ${s.scene}`); return; }
    let ctx = null;
    try {
      ctx = f(s.sceneOpts ?? {});
      ctx.camera.aspect = 16 / 9;
      ctx.camera.updateProjectionMatrix();
      warmup(ctx, 1.6);
      ctx.autofit?.({ margin: s.fitMargin ?? 1.08 });
      for (let k = 0; k < 3; k++) {
        ctx.update(k * 0.5 + 0.1, 0.016);
        if (renderer) renderer.render(ctx.scene, ctx.camera);
      }
      let objs = 0;
      ctx.scene.traverse(() => { objs++; });
      if (objs < 6) warn.push(`slide ${i + 1} (${s.scene}): only ${objs} objects`);
      const tri = renderer ? renderer.info.render.triangles : -1;
      const dist = ctx.camera.position.distanceTo(ctx.target);
      stats.push({
        n: i + 1, scene: s.scene, objs, tri,
        dist: Math.round(dist), fov: ctx.camera.fov,
        cam: ctx.camera.position.toArray().map((v) => Math.round(v)),
        look: ctx.target.toArray().map((v) => Math.round(v)),
      });
      if (tri === 0) errs.push(`slide ${i + 1} (${s.scene}): rendered 0 triangles`);
    } catch (e) {
      errs.push(`slide ${i + 1} (${s.scene}): ${e.message}`);
    } finally {
      if (ctx) disposeScene(ctx.scene);
    }
  });
  console.error = origErr;
  const info = renderer ? renderer.info : null;
  const out = {
    slides: SLIDES.length,
    scenes: Object.keys(SCENES).length,
    diagrams: SLIDES.filter((s) => s.diagram).length,
    ms: Math.round(performance.now() - t0),
    glCalls: info ? info.render.calls : null,
    errors: errs,
    warnings: warn,
    stats: location.search.includes('stats') ? stats : undefined,
  };
  document.body.innerHTML = `<pre id="audit-result">${JSON.stringify(out, null, 2)}</pre>`;
  return out;
}
if (location.search.includes('probe')) {
  setTimeout(() => {
    const r = nodes[current]?.querySelector('.stage-gl')?.getBoundingClientRect();
    const info = renderer ? renderer.info.render : {};
    const box = new THREE.Box3();
    if (active) box.setFromObject(active.scene);
    const out = {
      slide: current + 1,
      scene: SLIDES[current].scene,
      rect: r ? [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] : null,
      canvasStyle: [canvas.style.width, canvas.style.height],
      live: canvas.classList.contains('live'),
      hasActive: !!active,
      cam: active ? active.camera.position.toArray().map((v) => +v.toFixed(1)) : null,
      look: active ? active.target.toArray().map((v) => +v.toFixed(1)) : null,
      near: active ? +active.camera.near.toFixed(2) : null,
      far: active ? Math.round(active.camera.far) : null,
      fog: active?.scene.fog ? [Math.round(active.scene.fog.near), Math.round(active.scene.fog.far)] : null,
      bbox: active ? [box.min.toArray().map(Math.round), box.max.toArray().map(Math.round)] : null,
      drawn: { calls: info.calls, triangles: info.triangles },
      buffer: (() => {
        if (!renderer || !active) return null;
        try {
          renderer.render(active.scene, active.camera);
          const gl = renderer.getContext();
          const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
          const px = new Uint8Array(4 * 64 * 64);
          gl.readPixels(Math.floor(w / 2) - 32, Math.floor(h / 2) - 32, 64, 64, gl.RGBA, gl.UNSIGNED_BYTE, px);
          let mx = 0, sum = 0;
          for (let k = 0; k < px.length; k += 4) { const v = (px[k] + px[k + 1] + px[k + 2]) / 3; mx = Math.max(mx, v); sum += v; }
          return { w, h, centerMax: mx, centerAvg: +(sum / (px.length / 4)).toFixed(1) };
        } catch (e) { return String(e.message); }
      })(),
      topAt: (() => {
        const pts = [[800, 200], [800, 400], [400, 300], [1200, 300]];
        return pts.map((p) => {
          const e = document.elementFromPoint(p[0], p[1]);
          return p.join(',') + '=' + (e ? (e.id || e.className || e.tagName) : 'null');
        });
      })(),
      overlay: (() => {
        const o = nodes[current]?.querySelector('.hero-overlay');
        if (!o) return null;
        const r = o.getBoundingClientRect();
        return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)];
      })(),
      glz: getComputedStyle(canvas).zIndex + '/' + getComputedStyle(canvas).opacity + '/' + getComputedStyle(canvas).position,
    };
    document.title = 'PROBE ' + JSON.stringify(out);
    document.body.insertAdjacentHTML('afterbegin', `<pre id="probe-result" style="position:fixed;z-index:99;background:#000;color:#0f0;font:11px monospace;padding:8px;max-width:100%">${JSON.stringify(out, null, 1)}</pre>`);
  }, 1200);
}
if (location.search.includes('audit')) {
  try { auditAll(); } catch (e) {
    document.body.innerHTML = `<pre id="audit-result">{"fatal":"${String(e.message).replace(/"/g, '')}"}</pre>`;
  }
}
