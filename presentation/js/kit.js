import * as THREE from './lib/three.module.min.js';

export { THREE };

export const C = {
  cyan: 0x35e0ff,
  ice: 0x9fd8ff,
  mint: 0x6ef2c0,
  violet: 0xb07bff,
  amber: 0xffb347,
  red: 0xff5f70,
  nv: 0x9ad60f,
  steel: 0x2c4a6b,
  deep: 0x081120,
  night: 0x04070d,
  white: 0xeaf6ff,
};

export function rng(seed = 1) {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const _p = new THREE.Vector3();
const V = (x, y, z) => new THREE.Vector3(x, y, z);
export { V as vec };

/* ------------------------------------------------------------------ stage */

export function stage(opts = {}) {
  const scene = new THREE.Scene();
  const bg = opts.bg ?? C.night;
  scene.background = new THREE.Color(bg);
  if (opts.fog !== false) {
    scene.fog = new THREE.Fog(opts.fogColor ?? bg, opts.fogNear ?? 40, opts.fogFar ?? 220);
  }
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 40, 16 / 9, 0.1, 6000);
  camera.position.set(...(opts.cam ?? [0, 16, 44]));
  const target = new THREE.Vector3(...(opts.look ?? [0, 2, 0]));
  camera.lookAt(target);

  const ticks = [];
  let driftFn = null;
  const orbit = { radius: camera.position.length(), height: camera.position.y, speed: 0, phase: 0, bob: 0.6 };
  const authoredDist = camera.position.distanceTo(target);
  const authoredDir = camera.position.clone().sub(target).normalize();

  const ctx = {
    scene,
    camera,
    target,
    orbit,
    add(...objs) { objs.forEach((o) => o && scene.add(o)); return objs[0]; },
    tick(fn) { ticks.push(fn); return fn; },
    drift(cfg = {}) {
      orbit.radius = cfg.radius ?? Math.hypot(camera.position.x - target.x, camera.position.z - target.z);
      orbit.height = cfg.height ?? camera.position.y;
      orbit.speed = cfg.speed ?? 0.045;
      orbit.phase = cfg.phase ?? Math.atan2(camera.position.x - target.x, camera.position.z - target.z);
      orbit.bob = cfg.bob ?? 0.6;
      driftFn = (t) => {
        const a = orbit.phase + orbit.speed * t;
        camera.position.set(
          target.x + Math.sin(a) * orbit.radius,
          orbit.height + Math.sin(t * 0.24) * orbit.bob,
          target.z + Math.cos(a) * orbit.radius,
        );
      };
      return ctx;
    },
    dolly(cfg = {}) {
      const from = new THREE.Vector3(...cfg.from);
      const to = new THREE.Vector3(...cfg.to);
      const sp = cfg.speed ?? 0.08;
      ctx.noAutofit = true;
      driftFn = (t) => {
        const k = (Math.sin(t * sp) + 1) / 2;
        camera.position.lerpVectors(from, to, k);
      };
      return ctx;
    },
    autofit(cfg = {}) {
      if (ctx.noAutofit) return ctx;
      const box = new THREE.Box3();
      const tmp = new THREE.Box3();
      const visit = (o) => {
        if (!o.visible || o.userData?.noFit) return;
        if (o.geometry || o.isInstancedMesh) {
          o.updateWorldMatrix(true, false);
          if (o.isInstancedMesh) {
            if (!o.boundingBox) o.computeBoundingBox();
            if (o.boundingBox) { tmp.copy(o.boundingBox).applyMatrix4(o.matrixWorld); box.union(tmp); }
          } else if (o.geometry) {
            if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
            if (o.geometry.boundingBox) { tmp.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld); box.union(tmp); }
          }
        }
        for (const ch of o.children) visit(ch);
      };
      for (const ch of scene.children) visit(ch);
      if (box.isEmpty()) return ctx;
      const sph = box.getBoundingSphere(new THREE.Sphere());
      if (!(sph.radius > 0.01)) return ctx;
      const margin = cfg.margin ?? 1.12;
      const vFov = (camera.fov * Math.PI) / 180;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (camera.aspect || 1.6));
      const want = Math.max(sph.radius / Math.sin(vFov / 2), sph.radius / Math.sin(hFov / 2)) * margin;
      const dist = THREE.MathUtils.clamp(want, authoredDist * (cfg.min ?? 0.55), authoredDist * (cfg.max ?? 1.3));
      const dir = authoredDir.clone();
      target.copy(sph.center);
      camera.position.copy(sph.center).add(dir.multiplyScalar(dist));
      const halfH = dist * Math.tan(vFov / 2);
      if (cfg.shiftY) target.y -= halfH * cfg.shiftY;
      if (cfg.shiftX) target.x -= halfH * camera.aspect * cfg.shiftX;
      orbit.radius = Math.hypot(camera.position.x - target.x, camera.position.z - target.z);
      orbit.height = camera.position.y;
      orbit.phase = Math.atan2(camera.position.x - target.x, camera.position.z - target.z);
      camera.near = Math.max(0.1, dist * 0.02);
      camera.far = dist * 6 + sph.radius * 4;
      camera.updateProjectionMatrix();
      if (scene.fog) {
        scene.fog.near = Math.max(1, dist - sph.radius * 1.1);
        scene.fog.far = dist + sph.radius * 3.4;
      }
      ctx.sizeLabels(cfg);
      return ctx;
    },
    sizeLabels(cfg = {}) {
      const minFrac = cfg.minLabel ?? 0.026;
      const maxFrac = cfg.maxLabel ?? 0.085;
      const maxUp = cfg.maxUpscale ?? 3.6;
      const halfTan = Math.tan((camera.fov * Math.PI) / 360);
      scene.traverse((o) => {
        if (!o.isSprite || o.userData.autoScale === false) return;
        if (!o.userData.baseScale) o.userData.baseScale = o.scale.clone();
        const base = o.userData.baseScale;
        o.getWorldPosition(_p);
        const d = Math.max(1, _p.distanceTo(camera.position));
        const view = 2 * d * halfTan;
        const frac = base.y / view;
        let k = 1;
        if (frac < minFrac) k = Math.min(maxUp, minFrac / frac);
        else if (frac > maxFrac) k = maxFrac / frac;
        o.scale.set(base.x * k, base.y * k, 1);
      });
      return ctx;
    },
    update(t, dt) {
      if (driftFn) driftFn(t);
      for (let i = 0; i < ticks.length; i++) ticks[i](t, dt);
      camera.lookAt(target);
    },
  };
  return ctx;
}

export function lights(ctx, opts = {}) {
  const key = new THREE.DirectionalLight(opts.keyColor ?? 0xbfe4ff, opts.key ?? 1.15);
  key.position.set(...(opts.keyPos ?? [26, 40, 22]));
  const rim = new THREE.DirectionalLight(opts.rimColor ?? 0x2f7bd6, opts.rim ?? 0.9);
  rim.position.set(...(opts.rimPos ?? [-30, 12, -26]));
  const hemi = new THREE.HemisphereLight(opts.skyColor ?? 0x2b5f96, opts.groundColor ?? 0x050a12, opts.hemi ?? 0.7);
  ctx.add(key, rim, hemi);
  if (opts.accent !== false) {
    const p = new THREE.PointLight(opts.accentColor ?? C.cyan, opts.accent ?? 26, 90, 2);
    p.position.set(...(opts.accentPos ?? [0, 16, 0]));
    ctx.add(p);
  }
  return ctx;
}

/* ------------------------------------------------------------- materials */

const matCache = new Map();
function cached(key, make) {
  let m = matCache.get(key);
  if (!m) {
    m = make();
    m.userData.shared = true;
    matCache.set(key, m);
  }
  return m;
}
export function glow(color = C.cyan, opacity = 0.9) {
  return cached(`g${color}|${opacity}`, () => new THREE.MeshBasicMaterial({
    color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
}
export function lineMat(color = C.cyan, opacity = 0.6) {
  return cached(`l${color}|${opacity}`, () => new THREE.LineBasicMaterial({
    color, transparent: true, opacity, depthWrite: false,
  }));
}
export function mutable(mat) {
  const m = mat.clone();
  m.userData = {};
  return m;
}
export function solid(color = 0x16304c, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: opts.metalness ?? 0.55,
    roughness: opts.roughness ?? 0.42,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    flatShading: !!opts.flat,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
}

/* ----------------------------------------------------------------- text */

const labelCache = new Map();
export function label(text, opts = {}) {
  const font = opts.font ?? 40;
  const color = opts.color ?? '#d8f0ff';
  const border = opts.border ?? 'rgba(90,200,255,0.55)';
  const bg = opts.bg ?? 'rgba(4,10,20,0.74)';
  const mono = opts.mono !== false;
  const key = `${text}|${font}|${color}|${border}|${bg}|${mono}`;
  let tex = labelCache.get(key);
  if (!tex) {
    const pad = Math.round(font * 0.42);
    const cv = document.createElement('canvas');
    const g = cv.getContext('2d');
    const family = mono ? '600 ' + font + 'px ui-monospace, Menlo, monospace' : '600 ' + font + 'px Inter, system-ui, sans-serif';
    g.font = family;
    const w = Math.ceil(g.measureText(text).width) + pad * 2;
    const h = Math.ceil(font * 1.5) + pad;
    cv.width = w; cv.height = h;
    const g2 = cv.getContext('2d');
    g2.font = family;
    g2.textBaseline = 'middle';
    if (bg !== 'none') {
      g2.fillStyle = bg;
      roundRect(g2, 1, 1, w - 2, h - 2, 7);
      g2.fill();
    }
    if (border !== 'none') {
      g2.strokeStyle = border; g2.lineWidth = 2;
      roundRect(g2, 1.5, 1.5, w - 3, h - 3, 7);
      g2.stroke();
    }
    g2.fillStyle = color;
    g2.shadowColor = color; g2.shadowBlur = font * 0.35;
    g2.fillText(text, pad, h / 2 + 1);
    tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = 4;
    tex.userData.shared = true;
    labelCache.set(key, tex);
  }
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, depthWrite: false, depthTest: opts.depthTest !== false, opacity: opts.opacity ?? 1,
  }));
  const hh = opts.size ?? 1.5;
  sp.scale.set(hh * (tex.image.width / tex.image.height), hh, 1);
  if (opts.at) sp.position.set(...opts.at);
  sp.renderOrder = 8;
  return sp;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export function panel(lines, opts = {}) {
  const w = opts.w ?? 512;
  const lh = opts.lh ?? 40;
  const title = opts.title;
  const cv = document.createElement('canvas');
  const pad = 22;
  const h = pad * 2 + (title ? 52 : 0) + lines.length * lh;
  cv.width = w; cv.height = Math.max(h, 64);
  const g = cv.getContext('2d');
  g.fillStyle = opts.bg ?? 'rgba(6,16,28,0.82)';
  roundRect(g, 2, 2, cv.width - 4, cv.height - 4, 12); g.fill();
  g.strokeStyle = opts.border ?? 'rgba(53,224,255,0.5)'; g.lineWidth = 2.5;
  roundRect(g, 3, 3, cv.width - 6, cv.height - 6, 12); g.stroke();
  let y = pad + 26;
  if (title) {
    g.font = '600 30px ui-monospace, Menlo, monospace';
    g.fillStyle = opts.titleColor ?? '#35e0ff';
    g.shadowColor = opts.titleColor ?? '#35e0ff'; g.shadowBlur = 14;
    g.fillText(title.toUpperCase(), pad, y);
    g.shadowBlur = 0;
    g.strokeStyle = 'rgba(53,224,255,0.28)'; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(pad, y + 16); g.lineTo(cv.width - pad, y + 16); g.stroke();
    y += 52;
  }
  g.font = '400 26px Inter, system-ui, sans-serif';
  for (const ln of lines) {
    const accent = ln.startsWith('*');
    g.fillStyle = accent ? (opts.accentColor ?? '#6ef2c0') : (opts.color ?? '#cfe6f7');
    g.fillText(accent ? ln.slice(1) : ln, pad, y);
    y += lh;
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.anisotropy = 4;
  const hh = opts.size ?? 4;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(hh * (cv.width / cv.height), hh),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: opts.opacity ?? 0.96 }),
  );
  mesh.renderOrder = 7;
  if (opts.at) mesh.position.set(...opts.at);
  if (opts.rot) mesh.rotation.set(...opts.rot);
  if (opts.billboard) mesh.userData.billboard = true;
  return mesh;
}

export function gauge(ctx, opts = {}) {
  const cv = document.createElement('canvas');
  cv.width = 300; cv.height = 300;
  const g = cv.getContext('2d');
  const draw = (v) => {
    g.clearRect(0, 0, 300, 300);
    g.strokeStyle = 'rgba(90,160,210,0.25)'; g.lineWidth = 16;
    g.beginPath(); g.arc(150, 150, 110, Math.PI * 0.75, Math.PI * 2.25); g.stroke();
    g.strokeStyle = opts.color ?? '#6ef2c0'; g.shadowColor = opts.color ?? '#6ef2c0'; g.shadowBlur = 22;
    g.beginPath(); g.arc(150, 150, 110, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * v); g.stroke();
    g.shadowBlur = 0;
    g.fillStyle = '#eaf7ff'; g.textAlign = 'center';
    g.font = '600 62px ui-monospace, monospace';
    g.fillText(Math.round(v * (opts.max ?? 100)) + (opts.unit ?? '%'), 150, 168);
    g.font = '500 24px ui-monospace, monospace'; g.fillStyle = '#8ba7c2';
    g.fillText((opts.label ?? '').toUpperCase(), 150, 212);
    tex.needsUpdate = true;
  };
  const tex = new THREE.CanvasTexture(cv);
  const size = opts.size ?? 3;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  if (opts.at) mesh.position.set(...opts.at);
  if (opts.rot) mesh.rotation.set(...opts.rot);
  const base = opts.value ?? 0.7;
  draw(base);
  ctx.tick((t) => draw(THREE.MathUtils.clamp(base + Math.sin(t * (opts.speed ?? 0.7) + (opts.phase ?? 0)) * (opts.swing ?? 0.06), 0, 1)));
  return mesh;
}

/* ------------------------------------------------------------ environment */

export function grid(ctx, opts = {}) {
  const size = opts.size ?? 200;
  const div = opts.div ?? 40;
  const g = new THREE.GridHelper(size, div, opts.c1 ?? 0x1d4870, opts.c2 ?? 0x0f2740);
  g.material.transparent = true;
  g.material.opacity = opts.opacity ?? 0.5;
  g.position.y = opts.y ?? 0;
  g.userData.noFit = true;
  ctx.add(g);
  if (opts.floor !== false) {
    const f = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 1.6, size * 1.6),
      new THREE.MeshStandardMaterial({ color: opts.floorColor ?? 0x060b14, roughness: 0.9, metalness: 0.2 }),
    );
    f.rotation.x = -Math.PI / 2;
    f.position.y = (opts.y ?? 0) - 0.06;
    f.userData.noFit = true;
    ctx.add(f);
  }
  return g;
}

export function starfield(ctx, count = 900, radius = 900) {
  const pos = new Float32Array(count * 3);
  const r = rng(11);
  for (let i = 0; i < count; i++) {
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    const d = radius * (0.6 + r() * 0.4);
    pos[i * 3] = d * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = d * Math.cos(ph);
    pos[i * 3 + 2] = d * Math.sin(ph) * Math.sin(th);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0xbfd9ff, size: 2.1, sizeAttenuation: false, transparent: true, opacity: 0.8, depthWrite: false,
  }));
  pts.userData.noFit = true;
  ctx.add(pts);
  ctx.tick((t) => { pts.rotation.y = t * 0.004; });
  return pts;
}

export function terrain(ctx, opts = {}) {
  const w = opts.w ?? 160, h = opts.h ?? 160, seg = opts.seg ?? 70;
  const geo = new THREE.PlaneGeometry(w, h, seg, seg);
  const p = geo.attributes.position;
  const amp = opts.amp ?? 6;
  const r = rng(opts.seed ?? 5);
  const o1 = r() * 10, o2 = r() * 10;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    const d = Math.hypot(x, y) / (w * 0.5);
    let z = Math.sin(x * 0.07 + o1) * Math.cos(y * 0.055 + o2) * amp
      + Math.sin(x * 0.021 + y * 0.017) * amp * 0.7
      + Math.sin(x * 0.19) * Math.cos(y * 0.16) * amp * 0.18;
    if (opts.basin) z *= THREE.MathUtils.clamp(d * 1.6 - 0.15, 0, 1);
    p.setZ(i, z);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, solid(opts.color ?? 0x0d1c2b, {
    flat: true, roughness: 0.95, metalness: 0.1, emissive: opts.emissive ?? 0x040a12,
  }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = opts.y ?? 0;
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat(opts.wire ?? 0x2b6d9c, opts.wireOpacity ?? 0.16));
  wire.rotation.x = -Math.PI / 2;
  wire.position.y = (opts.y ?? 0) + 0.04;
  mesh.userData.noFit = opts.fit !== true;
  wire.userData.noFit = opts.fit !== true;
  ctx.add(mesh, wire);
  return { mesh, wire, geo };
}

export function city(ctx, opts = {}) {
  const count = opts.count ?? 190;
  const spread = opts.spread ?? 70;
  const maxH = opts.maxH ?? 16;
  const r = rng(opts.seed ?? 3);
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = solid(opts.color ?? 0x101f31, { metalness: 0.5, roughness: 0.55, emissive: opts.emissive ?? 0x071426 });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const roofGeo = new THREE.BoxGeometry(1, 1, 1);
  const roof = new THREE.InstancedMesh(roofGeo, glow(opts.lightColor ?? 0x4fc8ff, 0.55), count);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const damaged = opts.damaged ?? 0;
  const heights = [];
  for (let i = 0; i < count; i++) {
    const gx = Math.round((r() - 0.5) * spread / 6) * 6 + (r() - 0.5) * 1.6;
    const gz = Math.round((r() - 0.5) * spread / 6) * 6 + (r() - 0.5) * 1.6;
    const isDown = r() < damaged;
    const hh = (1.6 + r() * r() * maxH) * (isDown ? 0.32 : 1);
    const bw = 2.2 + r() * 2.4, bd = 2.2 + r() * 2.4;
    pos.set(gx, hh / 2 + (opts.y ?? 0), gz);
    q.setFromEuler(new THREE.Euler(isDown ? (r() - 0.5) * 0.5 : 0, r() * Math.PI, isDown ? (r() - 0.5) * 0.5 : 0));
    s.set(bw, hh, bd);
    m.compose(pos, q, s);
    mesh.setMatrixAt(i, m);
    heights.push({ x: gx, z: gz, h: hh, down: isDown });
    const rp = pos.clone(); rp.y = hh + (opts.y ?? 0) + 0.14;
    m.compose(rp, q, new THREE.Vector3(bw * 0.34, 0.22, bd * 0.34));
    roof.setMatrixAt(i, m);
    roof.setColorAt(i, new THREE.Color(isDown ? 0x50201c : (r() < 0.24 ? 0xffd7a0 : (opts.lightColor ?? 0x63d5ff))));
  }
  mesh.instanceMatrix.needsUpdate = true;
  roof.instanceMatrix.needsUpdate = true;
  if (roof.instanceColor) roof.instanceColor.needsUpdate = true;
  ctx.add(mesh, roof);

  if (opts.roads !== false) {
    const roadMat = glow(opts.roadColor ?? 0x1f6f9c, 0.28);
    const n = Math.round(spread / 12);
    for (let i = -n; i <= n; i++) {
      const a = new THREE.Mesh(new THREE.PlaneGeometry(spread * 1.05, 1.5), roadMat);
      a.rotation.x = -Math.PI / 2; a.position.set(0, (opts.y ?? 0) + 0.03, i * 12);
      const b = new THREE.Mesh(new THREE.PlaneGeometry(1.5, spread * 1.05), roadMat);
      b.rotation.x = -Math.PI / 2; b.position.set(i * 12, (opts.y ?? 0) + 0.03, 0);
      ctx.add(a, b);
    }
  }
  return { mesh, roof, buildings: heights };
}

export function vehicles(ctx, opts = {}) {
  const count = opts.count ?? 26;
  const spread = opts.spread ?? 70;
  const r = rng(opts.seed ?? 9);
  const geo = new THREE.BoxGeometry(1.7, 0.6, 0.9);
  const mesh = new THREE.InstancedMesh(geo, glow(opts.color ?? 0xffce7a, 0.8), count);
  const lanes = [];
  const n = Math.round(spread / 12);
  for (let i = 0; i < count; i++) {
    const axis = r() < 0.5;
    const lane = (Math.round((r() * 2 - 1) * n)) * 12;
    lanes.push({ axis, lane, u: r() * spread - spread / 2, sp: (0.5 + r() * 1.1) * (r() < 0.5 ? 1 : -1) });
  }
  const m = new THREE.Matrix4();
  ctx.tick((t, dt) => {
    for (let i = 0; i < count; i++) {
      const L = lanes[i];
      L.u += L.sp * dt * 6;
      if (L.u > spread / 2) L.u = -spread / 2;
      if (L.u < -spread / 2) L.u = spread / 2;
      const p = L.axis ? new THREE.Vector3(L.u, (opts.y ?? 0) + 0.4, L.lane) : new THREE.Vector3(L.lane, (opts.y ?? 0) + 0.4, L.u);
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, L.axis ? 0 : Math.PI / 2, 0));
      m.compose(p, q, new THREE.Vector3(1, 1, 1));
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  ctx.add(mesh);
  return mesh;
}

export function human(color = 0x9fd8ff, scale = 1) {
  const g = new THREE.Group();
  const m = solid(color, { emissive: color, emissiveIntensity: 0.5, metalness: 0.2, roughness: 0.6 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.6, 4, 8), m);
  body.position.y = 0.72;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), m);
  head.position.y = 1.28;
  g.add(body, head);
  g.scale.setScalar(scale);
  return g;
}

/* ---------------------------------------------------------------- assets */

export function uav(opts = {}) {
  const g = new THREE.Group();
  const bodyMat = solid(opts.color ?? 0x1b2f45, { metalness: 0.8, roughness: 0.3, emissive: 0x05121f });
  const trimMat = glow(opts.trim ?? C.cyan, 0.95);
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.42, 1.5), bodyMat);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), bodyMat);
  shell.position.y = 0.16; shell.scale.set(1, 0.7, 1);
  g.add(body, shell);
  const rotors = [];
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const x = Math.cos(a) * 1.32, z = Math.sin(a) * 1.32;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.13, 0.2), bodyMat);
    arm.position.set(x / 2, 0.02, z / 2);
    arm.rotation.y = -a;
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.3, 10), bodyMat);
    motor.position.set(x, 0.16, z);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.72, 20), glow(opts.trim ?? C.cyan, 0.13));
    disc.rotation.x = -Math.PI / 2; disc.position.set(x, 0.34, z);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.03, 0.1), glow(0xcfeeff, 0.55));
    blade.position.set(x, 0.34, z);
    g.add(arm, motor, disc, blade);
    rotors.push(blade);
  }
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), glow(opts.led ?? C.mint, 1));
  led.position.set(0, -0.06, 0.82);
  const gimbal = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), solid(0x0b1a2a, { metalness: 0.9, roughness: 0.2 }));
  gimbal.position.set(0, -0.32, 0.24);
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.14, 10), glow(0x7fd8ff, 0.9));
  lens.rotation.x = Math.PI / 2; lens.position.set(0, -0.36, 0.44);
  g.add(led, gimbal, lens);
  if (opts.antenna !== false) {
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 6), trimMat);
    ant.position.set(0, 0.75, -0.3);
    g.add(ant);
  }
  g.userData.rotors = rotors;
  g.userData.gimbal = gimbal;
  g.scale.setScalar(opts.scale ?? 1);
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function animateRotors(ctx, list, speed = 34) {
  const arr = Array.isArray(list) ? list : [list];
  ctx.tick((t, dt) => {
    for (const u of arr) {
      const rs = u.userData?.rotors;
      if (!rs) continue;
      for (let i = 0; i < rs.length; i++) rs[i].rotation.y += dt * speed * (i % 2 ? 1 : -1);
    }
  });
}

export function satellite(opts = {}) {
  const g = new THREE.Group();
  const bus = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.4), solid(0x24384f, { metalness: 0.85, roughness: 0.28, emissive: 0x081522 }));
  g.add(bus);
  const panelMat = solid(0x123a68, { metalness: 0.5, roughness: 0.25, emissive: 0x0d2a4d, emissiveIntensity: 1.4 });
  for (const s of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.06, 1.15), panelMat);
    p.position.set(s * 2.5, 0, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), solid(0x2c4a6b));
    arm.rotation.z = Math.PI / 2; arm.position.set(s * 1.1, 0, 0);
    const gridL = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 0.07, 1.15)), lineMat(0x59a9e0, 0.5));
    gridL.position.copy(p.position);
    g.add(p, arm, gridL);
  }
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.4), solid(0xdfe9f5, { metalness: 0.4, roughness: 0.5, side: THREE.DoubleSide }));
  dish.rotation.x = Math.PI; dish.position.set(0, -0.62, 0.2);
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), glow(C.cyan, 0.9));
  feed.position.set(0, -0.92, 0.2);
  const opt = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.5, 10), solid(0x11202f, { metalness: 0.9 }));
  opt.rotation.z = Math.PI / 2; opt.position.set(0, 0.3, 0.85);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), glow(C.mint, 1));
  beacon.position.set(0, 0.62, 0);
  g.add(dish, feed, opt, beacon);
  g.scale.setScalar(opts.scale ?? 1);
  if (opts.at) g.position.set(...opts.at);
  g.userData.dish = dish;
  return g;
}

export function groundRobot(opts = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 1.15), solid(opts.color ?? 0x21384f, { metalness: 0.75, roughness: 0.35, emissive: 0x061320 }));
  body.position.y = 0.55;
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.16, 0.9), solid(0x16283b));
  deck.position.y = 0.88;
  g.add(body, deck);
  const wheelMat = solid(0x0b1420, { metalness: 0.4, roughness: 0.85 });
  const wheels = [];
  for (const sx of [-0.62, 0.62]) {
    for (const sz of [-0.62, 0.62]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 14), wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(sx * 1.15, 0.32, sz);
      g.add(w); wheels.push(w);
    }
  }
  const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.26, 14), solid(0x0d1b28, { metalness: 0.9 }));
  lidar.position.y = 1.1;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.035, 6, 20), glow(opts.trim ?? C.mint, 0.95));
  ring.rotation.x = Math.PI / 2; ring.position.y = 1.1;
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), solid(0x2c4a6b));
  mast.position.set(-0.6, 1.3, 0);
  g.add(lidar, ring, mast);
  g.userData.lidar = lidar;
  g.userData.wheels = wheels;
  g.scale.setScalar(opts.scale ?? 1);
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function groundStation(opts = {}) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.9, 0.5, 16), solid(0x162536));
  base.position.y = 0.25;
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 1.2, 12), solid(0x1e3b52));
  pedestal.position.y = 1.05;
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2.6),
    solid(0xe8f2fb, { metalness: 0.35, roughness: 0.45, side: THREE.DoubleSide }),
  );
  dish.position.y = 1.8;
  dish.rotation.x = -Math.PI * 0.72;
  const rim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(1.52, 22, 4, 0, Math.PI * 2, 0, Math.PI / 2.6)), lineMat(C.cyan, 0.35));
  rim.position.copy(dish.position); rim.rotation.copy(dish.rotation);
  g.add(base, pedestal, dish, rim);
  g.userData.dish = dish;
  g.scale.setScalar(opts.scale ?? 1);
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function cellTower(opts = {}) {
  const g = new THREE.Group();
  const h = opts.h ?? 7;
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.3, h, 8), solid(0x2b4460, { metalness: 0.7 }));
  mast.position.y = h / 2;
  g.add(mast);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.3, 0.5), solid(0xcfdcea, { metalness: 0.3 }));
    p.position.set(Math.cos(a) * 0.6, h - 0.8, Math.sin(a) * 0.6);
    p.lookAt(Math.cos(a) * 6, h - 0.8, Math.sin(a) * 6);
    g.add(p);
  }
  const dead = opts.dead;
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), glow(dead ? C.red : C.mint, 1));
  light.position.y = h + 0.2;
  g.add(light);
  if (!dead && opts.coverage !== false) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(opts.cov ?? 9, h * 0.9, 22, 1, true), glow(C.cyan, 0.055));
    cone.position.y = h * 0.55; cone.rotation.x = Math.PI;
    g.add(cone);
  }
  if (opts.at) g.position.set(...opts.at);
  g.scale.setScalar(opts.scale ?? 1);
  return g;
}

export function risPanel(ctx, opts = {}) {
  const g = new THREE.Group();
  const nx = opts.nx ?? 8, ny = opts.ny ?? 6, cell = opts.cell ?? 0.42;
  const geo = new THREE.PlaneGeometry(cell * 0.86, cell * 0.86);
  const mesh = new THREE.InstancedMesh(geo, glow(opts.color ?? 0xb07bff, 0.85), nx * ny);
  const m = new THREE.Matrix4();
  const cells = [];
  let i = 0;
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) {
      const px = (x - (nx - 1) / 2) * cell, py = (y - (ny - 1) / 2) * cell;
      cells.push({ px, py, ph: (x + y) * 0.6 });
      m.compose(new THREE.Vector3(px, py, 0), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
      mesh.setMatrixAt(i++, m);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(nx * cell + 0.3, ny * cell + 0.3, 0.1), solid(0x1a2436, { metalness: 0.8 }));
  frame.position.z = -0.1;
  g.add(mesh, frame);
  const col = new THREE.Color();
  ctx.tick((t) => {
    for (let k = 0; k < cells.length; k++) {
      const v = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.2 + cells[k].ph));
      col.setRGB(0.55 * v, 0.3 * v, v);
      mesh.setColorAt(k, col);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });
  if (opts.at) g.position.set(...opts.at);
  if (opts.rot) g.rotation.set(...opts.rot);
  g.scale.setScalar(opts.scale ?? 1);
  return g;
}

export function serverRack(opts = {}) {
  const g = new THREE.Group();
  const h = opts.h ?? 4.4;
  const shell = new THREE.Mesh(new THREE.BoxGeometry(2.1, h, 1.5), solid(0x101a28, { metalness: 0.8, roughness: 0.35 }));
  shell.position.y = h / 2;
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(shell.geometry), lineMat(opts.trim ?? C.cyan, 0.4));
  edges.position.y = h / 2;
  g.add(shell, edges);
  const n = opts.units ?? 9;
  for (let i = 0; i < n; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.7, h / n * 0.5, 0.06), glow(i % 3 === 0 ? C.mint : (opts.trim ?? C.cyan), 0.7));
    bar.position.set(0, (i + 0.6) * (h / n), 0.78);
    g.add(bar);
  }
  if (opts.at) g.position.set(...opts.at);
  g.scale.setScalar(opts.scale ?? 1);
  return g;
}

export function gpuPod(ctx, opts = {}) {
  const g = new THREE.Group();
  const rows = opts.rows ?? 3, cols = opts.cols ?? 4;
  for (let r0 = 0; r0 < rows; r0++) {
    for (let c0 = 0; c0 < cols; c0++) {
      const rk = serverRack({ h: 4, units: 8, trim: opts.trim ?? C.nv });
      rk.position.set((c0 - (cols - 1) / 2) * 3.1, 0, (r0 - (rows - 1) / 2) * 4.4);
      g.add(rk);
    }
  }
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(cols * 3.4, rows * 4.8), glow(opts.trim ?? C.nv, 0.06));
  halo.rotation.x = -Math.PI / 2; halo.position.y = 0.02;
  g.add(halo);
  if (opts.at) g.position.set(...opts.at);
  return g;
}

/* ------------------------------------------------------------------ earth */

const ATMO_VS = `varying vec3 vN; varying vec3 vP;
void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`;
const ATMO_FS = `uniform vec3 uColor; uniform float uPower; uniform float uStrength;
varying vec3 vN; varying vec3 vP;
void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), uPower);
gl_FragColor = vec4(uColor, f * uStrength); }`;

export function earth(ctx, opts = {}) {
  const R = opts.radius ?? 30;
  const g = new THREE.Group();
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(R, 64, 48),
    solid(opts.color ?? 0x071a2e, { metalness: 0.35, roughness: 0.85, emissive: 0x030c18, emissiveIntensity: 1 }),
  );
  g.add(globe);
  const gratic = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(R * 1.002, 36, 18)),
    lineMat(opts.gridColor ?? 0x2f7fb8, opts.gridOpacity ?? 0.17),
  );
  g.add(gratic);

  const cities = [
    [25.03, 121.56], [35.68, 139.69], [37.57, 126.98], [1.35, 103.82], [22.32, 114.17],
    [31.23, 121.47], [39.9, 116.4], [28.61, 77.21], [19.08, 72.88], [-6.2, 106.85],
    [51.51, -0.13], [48.86, 2.35], [52.52, 13.4], [55.75, 37.62], [41.01, 28.98],
    [40.71, -74.01], [34.05, -118.24], [41.88, -87.63], [19.43, -99.13], [-23.55, -46.63],
    [-34.6, -58.38], [30.04, 31.24], [-1.29, 36.82], [-26.2, 28.04], [6.52, 3.38],
    [-33.87, 151.21], [-36.85, 174.76], [25.2, 55.27], [13.75, 100.5], [14.6, 120.98],
    [3.14, 101.69], [21.03, 105.85], [23.13, 113.26], [24.15, 120.68], [22.63, 120.3],
    [59.33, 18.07], [45.42, -75.7], [49.28, -123.12], [-12.05, -77.04], [4.71, -74.07],
  ];
  const cp = new Float32Array(cities.length * 3);
  cities.forEach(([la, lo], i) => {
    const v = latLon(la, lo, R * 1.01);
    cp[i * 3] = v.x; cp[i * 3 + 1] = v.y; cp[i * 3 + 2] = v.z;
  });
  const cgeo = new THREE.BufferGeometry();
  cgeo.setAttribute('position', new THREE.BufferAttribute(cp, 3));
  const cityPts = new THREE.Points(cgeo, new THREE.PointsMaterial({
    color: opts.cityColor ?? 0xffd39a, size: opts.citySize ?? 3.4, sizeAttenuation: false,
    transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  g.add(cityPts);

  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.055, 48, 32),
    new THREE.ShaderMaterial({
      vertexShader: ATMO_VS, fragmentShader: ATMO_FS,
      uniforms: {
        uColor: { value: new THREE.Color(opts.atmoColor ?? 0x4aa8ff) },
        uPower: { value: opts.atmoPower ?? 2.6 },
        uStrength: { value: opts.atmoStrength ?? 1.05 },
      },
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
    }),
  );
  g.add(atmo);
  if (opts.at) g.position.set(...opts.at);
  g.userData.noFit = true;
  if (opts.spin !== false) ctx.tick((t, dt) => { globe.rotation.y += dt * (opts.spin ?? 0.02); gratic.rotation.y = globe.rotation.y; cityPts.rotation.y = globe.rotation.y; });
  ctx.add(g);
  return { group: g, globe, radius: R, latLon: (la, lo, alt = 0) => latLon(la, lo, R + alt) };
}

export function latLon(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const th = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

export function orbitShell(ctx, opts = {}) {
  const R = opts.radius ?? 40;
  const planes = opts.planes ?? 4;
  const per = opts.per ?? 6;
  const group = new THREE.Group();
  const sats = [];
  for (let p = 0; p < planes; p++) {
    const inc = (opts.inc ?? 55) * (Math.PI / 180);
    const raan = (p / planes) * Math.PI;
    const holder = new THREE.Group();
    holder.rotation.set(inc, raan, 0);
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, R, R, 0, Math.PI * 2).getPoints(96).map((v) => new THREE.Vector3(v.x, 0, v.y))),
      lineMat(opts.ringColor ?? 0x3d8fc4, opts.ringOpacity ?? 0.22),
    );
    holder.add(ring);
    for (let i = 0; i < per; i++) {
      const s = opts.simple
        ? new THREE.Mesh(new THREE.OctahedronGeometry(opts.satSize ?? 0.7, 0), glow(C.ice, 0.95))
        : satellite({ scale: opts.satScale ?? 0.5 });
      const a0 = (i / per) * Math.PI * 2 + p * 0.4;
      s.userData.a0 = a0;
      holder.add(s);
      sats.push({ obj: s, a0, holder });
    }
    group.add(holder);
  }
  if (opts.fit !== true) group.userData.noFit = true;
  ctx.add(group);
  const speed = opts.speed ?? 0.12;
  ctx.tick((t) => {
    for (const s of sats) {
      const a = s.a0 + t * speed;
      s.obj.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
      s.obj.rotation.y = -a;
    }
  });
  return { group, sats };
}

/* -------------------------------------------------------------- links */

export function curve(a, b, sag = 0.28, side = 0) {
  const A = a.isVector3 ? a : new THREE.Vector3(...a);
  const B = b.isVector3 ? b : new THREE.Vector3(...b);
  const mid = A.clone().add(B).multiplyScalar(0.5);
  const d = A.distanceTo(B);
  mid.y += d * sag;
  if (side) {
    const dir = B.clone().sub(A).normalize();
    const perp = new THREE.Vector3(0, 1, 0).cross(dir).normalize();
    mid.add(perp.multiplyScalar(d * side));
  }
  return new THREE.QuadraticBezierCurve3(A, mid, B);
}

export function link(ctx, a, b, opts = {}) {
  const cv = opts.curve ?? curve(a, b, opts.sag ?? 0, opts.side ?? 0);
  const g = new THREE.Group();
  const color = opts.color ?? C.cyan;
  if (opts.style === 'dashed') {
    const pts = cv.getPoints(opts.seg ?? 60);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineDashedMaterial({
      color, dashSize: opts.dash ?? 0.7, gapSize: opts.gap ?? 0.55,
      transparent: true, opacity: opts.opacity ?? 0.85, depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    g.add(line);
    if (opts.march !== false) ctx.tick((t) => { mat.dashOffset = -t * (opts.marchSpeed ?? 1.6); });
  } else if (opts.style === 'beam') {
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(cv, opts.seg ?? 44, opts.width ?? 0.075, 6, false),
      glow(color, opts.opacity ?? 0.5),
    );
    g.add(tube);
    const core = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cv.getPoints(48)), lineMat(0xffffff, 0.35));
    g.add(core);
  } else {
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cv.getPoints(opts.seg ?? 50)), lineMat(color, opts.opacity ?? 0.55));
    g.add(line);
  }
  if (opts.packets !== false) {
    g.add(packets(ctx, cv, {
      color: opts.packetColor ?? color, count: opts.count ?? 4,
      size: opts.size ?? 0.22, speed: opts.speed ?? 0.3, both: opts.both,
    }));
  }
  if (opts.label) {
    const p = cv.getPoint(opts.labelAt ?? 0.5);
    const l = label(opts.label, { size: opts.labelSize ?? 1.05, color: opts.labelColor ?? '#cfeaff', border: 'none', bg: 'rgba(4,10,20,0.6)' });
    l.position.copy(p).add(new THREE.Vector3(0, opts.labelLift ?? 1.1, 0));
    g.add(l);
  }
  ctx.add(g);
  g.userData.curve = cv;
  return g;
}

export function packets(ctx, cv, opts = {}) {
  const count = opts.count ?? 5;
  const geo = new THREE.SphereGeometry(opts.size ?? 0.22, 8, 6);
  const mesh = new THREE.InstancedMesh(geo, glow(opts.color ?? C.cyan, 1), count * (opts.both ? 2 : 1));
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  const sp = opts.speed ?? 0.3;
  ctx.tick((t) => {
    let i = 0;
    for (let k = 0; k < count; k++) {
      const u = ((t * sp + k / count) % 1);
      m.compose(cv.getPoint(u), q, s);
      mesh.setMatrixAt(i++, m);
    }
    if (opts.both) {
      for (let k = 0; k < count; k++) {
        const u = 1 - ((t * sp * 0.8 + k / count + 0.37) % 1);
        m.compose(cv.getPoint(u), q, s.clone().multiplyScalar(0.8));
        mesh.setMatrixAt(i++, m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  return mesh;
}

export function arrow(ctx, from, to, opts = {}) {
  const A = from.isVector3 ? from : new THREE.Vector3(...from);
  const B = to.isVector3 ? to : new THREE.Vector3(...to);
  const dir = B.clone().sub(A);
  const len = dir.length();
  const g = new THREE.Group();
  const color = opts.color ?? C.cyan;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(opts.w ?? 0.09, opts.w ?? 0.09, Math.max(len - 0.9, 0.1), 8), glow(color, opts.opacity ?? 0.75));
  const head = new THREE.Mesh(new THREE.ConeGeometry((opts.w ?? 0.09) * 3.1, 0.95, 12), glow(color, opts.opacity ?? 0.95));
  shaft.position.y = Math.max(len - 0.9, 0.1) / 2;
  head.position.y = Math.max(len - 0.9, 0.1) + 0.47;
  g.add(shaft, head);
  g.position.copy(A);
  g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  if (opts.label) {
    const l = label(opts.label, { size: opts.labelSize ?? 1, border: 'none', bg: 'rgba(4,10,20,0.62)', color: opts.labelColor ?? '#cfeaff' });
    l.position.copy(A.clone().lerp(B, 0.5)).add(new THREE.Vector3(...(opts.labelOffset ?? [0, 0.9, 0])));
    ctx.add(l);
  }
  if (opts.pulse) {
    shaft.material = mutable(shaft.material);
    head.material = mutable(head.material);
    const base = opts.opacity ?? 0.8;
    ctx.tick((t) => {
      const v = base * (0.6 + 0.4 * Math.sin(t * 2.4 + (opts.phase ?? 0)));
      shaft.material.opacity = v; head.material.opacity = v;
    });
  }
  ctx.add(g);
  return g;
}

export function scanCone(ctx, opts = {}) {
  const g = new THREE.Group();
  const h = opts.h ?? 12, r = opts.r ?? 5;
  const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, opts.seg ?? 24, 1, true), glow(opts.color ?? C.cyan, opts.opacity ?? 0.1));
  cone.position.y = -h / 2;
  cone.rotation.x = Math.PI;
  const foot = new THREE.Mesh(new THREE.RingGeometry(r * 0.88, r, 40), mutable(glow(opts.color ?? C.cyan, 0.35)));
  foot.rotation.x = -Math.PI / 2;
  foot.position.y = -h + 0.05;
  g.add(cone, foot);
  ctx.tick((t) => {
    const k = 0.86 + 0.14 * Math.sin(t * 1.7 + (opts.phase ?? 0));
    cone.scale.set(k, 1, k);
    foot.scale.set(k, k, k);
    foot.material.opacity = 0.2 + 0.25 * (0.5 + 0.5 * Math.sin(t * 1.7 + (opts.phase ?? 0)));
  });
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function lidarFan(ctx, opts = {}) {
  const rays = opts.rays ?? 46;
  const r = opts.r ?? 8, drop = opts.drop ?? 10;
  const pos = new Float32Array(rays * 6);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const lines = new THREE.LineSegments(geo, lineMat(opts.color ?? C.mint, opts.opacity ?? 0.3));
  const g = new THREE.Group();
  g.add(lines);
  const hitGeo = new THREE.BufferGeometry();
  const hp = new Float32Array(rays * 3);
  hitGeo.setAttribute('position', new THREE.BufferAttribute(hp, 3));
  const hits = new THREE.Points(hitGeo, new THREE.PointsMaterial({
    color: opts.color ?? C.mint, size: 3, sizeAttenuation: false, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  g.add(hits);
  ctx.tick((t) => {
    const spin = t * (opts.speed ?? 1.4);
    for (let i = 0; i < rays; i++) {
      const a = spin + (i / rays) * Math.PI * 2;
      const rr = r * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + spin * 0.6)));
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      pos[i * 6] = 0; pos[i * 6 + 1] = 0; pos[i * 6 + 2] = 0;
      pos[i * 6 + 3] = x; pos[i * 6 + 4] = -drop; pos[i * 6 + 5] = z;
      hp[i * 3] = x; hp[i * 3 + 1] = -drop; hp[i * 3 + 2] = z;
    }
    geo.attributes.position.needsUpdate = true;
    hitGeo.attributes.position.needsUpdate = true;
  });
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function frustum(ctx, opts = {}) {
  const w = opts.w ?? 5, h = opts.h ?? 3.2, d = opts.d ?? 10;
  const geo = new THREE.BufferGeometry();
  const verts = new Float32Array([
    0, 0, 0, -w / 2, -d, -h / 2, 0, 0, 0, w / 2, -d, -h / 2,
    0, 0, 0, w / 2, -d, h / 2, 0, 0, 0, -w / 2, -d, h / 2,
    -w / 2, -d, -h / 2, w / 2, -d, -h / 2, w / 2, -d, -h / 2, w / 2, -d, h / 2,
    w / 2, -d, h / 2, -w / 2, -d, h / 2, -w / 2, -d, h / 2, -w / 2, -d, -h / 2,
  ]);
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  const g = new THREE.Group();
  g.add(new THREE.LineSegments(geo, lineMat(opts.color ?? 0xffd08a, 0.55)));
  const img = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glow(opts.color ?? 0xffd08a, 0.12));
  img.rotation.x = -Math.PI / 2; img.position.y = -d;
  g.add(img);
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.16), glow(0xffffff, 0.6));
  scan.rotation.x = -Math.PI / 2; scan.position.y = -d + 0.02;
  g.add(scan);
  ctx.tick((t) => { scan.position.z = Math.sin(t * 1.5 + (opts.phase ?? 0)) * h / 2; });
  if (opts.at) g.position.set(...opts.at);
  if (opts.rot) g.rotation.set(...opts.rot);
  return g;
}

/* ------------------------------------------------------------- ai visuals */

export function agentOrb(ctx, opts = {}) {
  const g = new THREE.Group();
  const color = opts.color ?? C.violet;
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(opts.r ?? 0.85, 1), new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: 1.3, metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0.55,
  }));
  const cage = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry((opts.r ?? 0.85) * 1.28, 1)), lineMat(color, 0.65));
  const ring = new THREE.Mesh(new THREE.TorusGeometry((opts.r ?? 0.85) * 1.85, 0.035, 6, 40), glow(color, 0.8));
  ring.rotation.x = Math.PI / 2.1;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry((opts.r ?? 0.85) * 1.55, 0.028, 6, 36), glow(opts.color2 ?? C.cyan, 0.6));
  ring2.rotation.set(Math.PI / 3, Math.PI / 5, 0);
  g.add(core, cage, ring, ring2);
  if (opts.label) {
    const l = label(opts.label, { size: opts.labelSize ?? 0.85, color: opts.labelInk ?? '#e8ddff', border: `rgba(176,123,255,0.5)` });
    l.position.y = (opts.r ?? 0.85) * 2.5;
    g.add(l);
  }
  if (opts.at) g.position.set(...opts.at);
  ctx.tick((t, dt) => {
    cage.rotation.y += dt * 0.5; cage.rotation.x += dt * 0.16;
    ring.rotation.z += dt * 0.7; ring2.rotation.y += dt * 0.5;
    const p = 1 + 0.05 * Math.sin(t * 2.2 + (opts.phase ?? 0));
    core.scale.setScalar(p);
  });
  g.userData.color = color;
  return g;
}

export function holoRing(ctx, opts = {}) {
  const g = new THREE.Group();
  const r = opts.r ?? 6;
  for (let i = 0; i < (opts.rings ?? 3); i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r * (1 - i * 0.13), 0.02, 5, 80), glow(opts.color ?? C.cyan, 0.28 - i * 0.06));
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    ctx.tick((t, dt) => { ring.rotation.z += dt * (0.12 + i * 0.05) * (i % 2 ? -1 : 1); });
  }
  const disc = new THREE.Mesh(new THREE.CircleGeometry(r, 60), glow(opts.color ?? C.cyan, opts.fill ?? 0.045));
  disc.rotation.x = -Math.PI / 2;
  g.add(disc);
  if (opts.at) g.position.set(...opts.at);
  return g;
}

export function dataCloud(ctx, opts = {}) {
  const n = opts.count ?? 700;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const r = rng(opts.seed ?? 21);
  const R = opts.r ?? 6;
  const clusters = opts.clusters ?? 5;
  const centers = [];
  for (let i = 0; i < clusters; i++) {
    centers.push(new THREE.Vector3((r() - 0.5) * R * 1.5, (r() - 0.5) * R * 0.9, (r() - 0.5) * R * 1.5));
  }
  const palette = (opts.colors ?? [C.cyan, C.mint, C.violet, C.amber]).map((c) => new THREE.Color(c));
  for (let i = 0; i < n; i++) {
    const ci = i % clusters;
    const c = centers[ci];
    pos[i * 3] = c.x + (r() - 0.5) * R * 0.55;
    pos[i * 3 + 1] = c.y + (r() - 0.5) * R * 0.4;
    pos[i * 3 + 2] = c.z + (r() - 0.5) * R * 0.55;
    const cc = palette[ci % palette.length];
    col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: opts.size ?? 0.13, vertexColors: true, transparent: true, opacity: 0.9,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  const g = new THREE.Group();
  g.add(pts);
  if (opts.at) g.position.set(...opts.at);
  ctx.tick((t, dt) => { pts.rotation.y += dt * (opts.spin ?? 0.1); });
  return g;
}

export function knowledgeGraph(ctx, opts = {}) {
  const n = opts.nodes ?? 26;
  const R = opts.r ?? 5;
  const r = rng(opts.seed ?? 33);
  const g = new THREE.Group();
  const pts = [];
  const nodeGeo = new THREE.OctahedronGeometry(opts.nodeSize ?? 0.2, 0);
  const im = new THREE.InstancedMesh(nodeGeo, glow(opts.color ?? C.mint, 0.95), n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1);
    const rr = R * (0.55 + 0.45 * r());
    const p = new THREE.Vector3(rr * Math.sin(ph) * Math.cos(th), rr * Math.cos(ph) * 0.65, rr * Math.sin(ph) * Math.sin(th));
    pts.push(p);
    m.compose(p, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
    im.setMatrixAt(i, m);
  }
  g.add(im);
  const seg = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (pts[i].distanceTo(pts[j]) < R * 0.62) seg.push(pts[i], pts[j]);
    }
  }
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), lineMat(opts.edgeColor ?? 0x3fa9c9, 0.22)));
  if (opts.at) g.position.set(...opts.at);
  ctx.tick((t, dt) => { g.rotation.y += dt * (opts.spin ?? 0.08); });
  return g;
}

export function slab(ctx, opts = {}) {
  const w = opts.w ?? 14, d = opts.d ?? 7, h = opts.h ?? 0.28;
  const color = opts.color ?? C.cyan;
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({
    color: opts.fill ?? 0x0d1c2e, metalness: 0.6, roughness: 0.35, transparent: true, opacity: opts.opacity ?? 0.62,
    emissive: color, emissiveIntensity: 0.12,
  }));
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), lineMat(color, 0.75));
  const under = new THREE.Mesh(new THREE.PlaneGeometry(w, d), glow(color, 0.07));
  under.rotation.x = -Math.PI / 2; under.position.y = -h / 2 - 0.01;
  g.add(body, edge, under);
  if (opts.title) {
    const l = label(opts.title, { size: opts.titleSize ?? 0.95, color: opts.ink ?? '#dff2ff', border: `rgba(90,200,255,0.45)` });
    l.position.set(-w / 2 + l.scale.x / 2 + 0.35, h / 2 + 0.65, d / 2 - 0.5);
    g.add(l);
  }
  if (opts.at) g.position.set(...opts.at);
  ctx.add(g);
  return g;
}

export function spine(ctx, opts = {}) {
  const from = new THREE.Vector3(...(opts.from ?? [0, 0, 0]));
  const to = new THREE.Vector3(...(opts.to ?? [0, 20, 0]));
  const cv = new THREE.LineCurve3(from, to);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(cv, 2, opts.w ?? 0.11, 8, false), glow(opts.color ?? C.cyan, 0.35));
  ctx.add(tube);
  ctx.add(packets(ctx, cv, { count: opts.count ?? 10, color: opts.color ?? C.cyan, size: opts.size ?? 0.2, speed: opts.speed ?? 0.16 }));
  if (opts.down) ctx.add(packets(ctx, new THREE.LineCurve3(to, from), { count: opts.count ?? 8, color: opts.downColor ?? C.mint, size: opts.size ?? 0.17, speed: (opts.speed ?? 0.16) * 0.8 }));
  return tube;
}

export function chainStations(ctx, items, opts = {}) {
  const gap = opts.gap ?? 6.4;
  const dirX = opts.axis !== 'y';
  const g = new THREE.Group();
  const nodes = [];
  items.forEach((it, i) => {
    const t = typeof it === 'string' ? { title: it } : it;
    const p = dirX
      ? new THREE.Vector3((i - (items.length - 1) / 2) * gap, opts.y ?? 0, 0)
      : new THREE.Vector3(0, (items.length - 1 - i) * gap * 0.55, 0);
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(opts.bw ?? 4.4, opts.bh ?? 2.6, opts.bd ?? 2.2),
      new THREE.MeshStandardMaterial({
        color: t.fill ?? 0x0e1e30, emissive: t.color ?? C.cyan, emissiveIntensity: 0.22,
        metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.7,
      }),
    );
    box.position.copy(p);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), lineMat(t.color ?? C.cyan, 0.8));
    edge.position.copy(p);
    g.add(box, edge);
    const l = label(t.title, { size: opts.labelSize ?? 0.8, color: '#e6f5ff', border: 'none', bg: 'none' });
    l.position.copy(p).add(new THREE.Vector3(0, 0, (opts.bd ?? 2.2) / 2 + 0.02));
    g.add(l);
    if (t.sub) {
      const s = label(t.sub, { size: (opts.labelSize ?? 0.8) * 0.72, color: '#8fb6d4', border: 'none', bg: 'none' });
      s.position.copy(p).add(new THREE.Vector3(0, -(opts.bh ?? 2.6) / 2 - 0.7, 0));
      g.add(s);
    }
    nodes.push({ p, t });
  });
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i].p.clone();
    const b = nodes[i + 1].p.clone();
    if (dirX) { a.x += (opts.bw ?? 4.4) / 2; b.x -= (opts.bw ?? 4.4) / 2; }
    else { a.y -= (opts.bh ?? 2.6) / 2; b.y += (opts.bh ?? 2.6) / 2; }
    const cv = new THREE.LineCurve3(a, b);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(cv, 1, 0.05, 6, false), glow(opts.linkColor ?? C.cyan, 0.5)));
    g.add(packets(ctx, cv, { count: 2, color: opts.linkColor ?? C.cyan, size: 0.15, speed: 0.5, }));
    const dir = b.clone().sub(a).normalize();
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.55, 10), glow(opts.linkColor ?? C.cyan, 0.9));
    head.position.copy(b);
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    g.add(head);
  }
  if (opts.at) g.position.set(...opts.at);
  ctx.add(g);
  g.userData.nodes = nodes;
  return g;
}

export function swarm(ctx, opts = {}) {
  const n = opts.count ?? 12;
  const r = rng(opts.seed ?? 17);
  const list = [];
  const base = uav({ scale: opts.scale ?? 1, trim: opts.trim ?? C.cyan, led: opts.led ?? C.mint });
  ctx.add(base);
  list.push(base);
  for (let i = 1; i < n; i++) {
    const c = base.clone(true);
    c.userData.rotors = [];
    c.traverse((o) => { if (o.isMesh && o.geometry?.type === 'BoxGeometry' && Math.abs(o.geometry.parameters.width - 1.34) < 0.01) c.userData.rotors.push(o); });
    ctx.add(c);
    list.push(c);
  }
  const alt = opts.altitude ?? 14;
  const spread = opts.spread ?? 34;
  const paths = list.map((u, i) => ({
    u,
    rr: spread * (0.28 + 0.72 * ((i % 4) + 1) / 4) * 0.5,
    a0: r() * Math.PI * 2,
    sp: (0.1 + r() * 0.16) * (i % 2 ? 1 : -1),
    yy: alt + (r() - 0.5) * (opts.altSpread ?? 6),
    bob: 0.4 + r() * 0.8,
    ph: r() * 6,
  }));
  const formation = opts.formation;
  ctx.tick((t, dt) => {
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i];
      if (formation === 'grid') {
        const cols = Math.ceil(Math.sqrt(paths.length));
        const gx = (i % cols) - (cols - 1) / 2, gz = Math.floor(i / cols) - (cols - 1) / 2;
        p.u.position.set(gx * (opts.pitch ?? 6) + Math.sin(t + p.ph) * 0.5, p.yy + Math.sin(t * 0.9 + p.ph) * p.bob, gz * (opts.pitch ?? 6) + Math.cos(t * 0.8 + p.ph) * 0.5);
      } else if (formation === 'line') {
        p.u.position.set((i - (paths.length - 1) / 2) * (opts.pitch ?? 6), p.yy + Math.sin(t * 1.1 + p.ph) * p.bob, Math.sin(t * 0.5 + p.ph) * 2);
      } else {
        const a = p.a0 + t * p.sp;
        p.u.position.set(Math.cos(a) * p.rr, p.yy + Math.sin(t * 0.8 + p.ph) * p.bob, Math.sin(a) * p.rr);
        p.u.rotation.y = -a + Math.PI / 2;
        p.u.rotation.z = Math.sin(t * 0.8 + p.ph) * 0.06;
      }
    }
  });
  animateRotors(ctx, list, opts.rotorSpeed ?? 30);
  if (opts.mesh) {
    const seg = [];
    const geo = new THREE.BufferGeometry();
    const maxSeg = n * 4;
    const arr = new Float32Array(maxSeg * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const lines = new THREE.LineSegments(geo, lineMat(opts.meshColor ?? C.cyan, 0.28));
    ctx.add(lines);
    ctx.tick(() => {
      let k = 0;
      for (let i = 0; i < list.length && k < maxSeg; i++) {
        for (let j = i + 1; j < list.length && k < maxSeg; j++) {
          const a = list[i].position, b = list[j].position;
          if (a.distanceTo(b) < (opts.meshRange ?? 16)) {
            arr[k * 6] = a.x; arr[k * 6 + 1] = a.y; arr[k * 6 + 2] = a.z;
            arr[k * 6 + 3] = b.x; arr[k * 6 + 4] = b.y; arr[k * 6 + 5] = b.z;
            k++;
          }
        }
      }
      for (let z = k; z < maxSeg; z++) for (let q = 0; q < 6; q++) arr[z * 6 + q] = 0;
      geo.attributes.position.needsUpdate = true;
    });
    seg.length = 0;
  }
  return list;
}

export function trail(ctx, opts = {}) {
  const cv = opts.curve;
  const pts = cv.getPoints(opts.seg ?? 90);
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(opts.color ?? C.amber, opts.opacity ?? 0.45));
  ctx.add(line);
  if (opts.marker) {
    const mk = opts.marker;
    ctx.tick((t) => {
      const u = (t * (opts.speed ?? 0.1)) % 1;
      mk.position.copy(cv.getPoint(u));
      const tan = cv.getTangent(u);
      mk.rotation.y = Math.atan2(tan.x, tan.z);
    });
  }
  return line;
}

export function billboardAll(ctx) {
  ctx.tick(() => {
    ctx.scene.traverse((o) => { if (o.userData?.billboard) o.quaternion.copy(ctx.camera.quaternion); });
  });
}

export function disposeScene(scene) {
  const seen = new Set();
  scene.traverse((o) => {
    if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      if (seen.has(m) || m.userData?.shared) continue;
      seen.add(m);
      for (const k of ['map', 'alphaMap', 'emissiveMap']) {
        if (m[k] && !m[k].userData?.shared) m[k].dispose?.();
      }
      m.dispose?.();
    }
  });
  scene.clear();
}
