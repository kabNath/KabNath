import * as K from '../kit.js';
const { THREE, C } = K;

export function titleEarthToEdge() {
  const c = K.stage({ cam: [0, 12, 54], look: [0, 13, 0], fov: 48, fogNear: 90, fogFar: 520 });
  K.lights(c, { key: 1.3, keyPos: [40, 50, 60], rim: 0.95, accentPos: [0, 14, 10], accent: 34 });
  K.starfield(c, 1100, 900);

  K.earth(c, { radius: 34, at: [0, -38, -8], spin: 0.02, citySize: 3.2, atmoStrength: 1.3 });
  const shell = K.orbitShell(c, { radius: 44, planes: 2, per: 6, inc: 58, speed: 0.11, simple: true, satSize: 0.5 });
  shell.group.position.set(0, -38, -8);

  const sat1 = K.satellite({ at: [-17, 31, -6], scale: 1.15 });
  const sat2 = K.satellite({ at: [13, 27, 4], scale: 0.95 });
  c.add(sat1, sat2);
  c.tick((t, dt) => {
    sat1.rotation.y += dt * 0.2;
    sat2.position.x = 13 + Math.sin(t * 0.18) * 4;
  });
  K.link(c, sat1.position, sat2.position, {
    style: 'beam', color: 0xffffff, width: 0.05, opacity: 0.45, count: 5, speed: 0.55, size: 0.13,
  });

  const cityG = new THREE.Group();
  cityG.position.set(0, -3.2, 4);
  c.add(cityG);
  const cityCtx = { add: (...o) => cityG.add(...o), tick: c.tick };
  K.city(cityCtx, { count: 110, spread: 36, maxH: 10, seed: 12, lightColor: 0x7fe2ff, emissive: 0x0d2440 });
  K.vehicles(cityCtx, { count: 18, spread: 36 });
  cityG.add(K.groundStation({ at: [-17, 0, 12], scale: 1.05 }));
  for (let i = 0; i < 3; i++) cityG.add(K.cellTower({ at: [(i - 1) * 13, 0, -13 + i * 5], h: 7, cov: 7 }));
  for (let i = 0; i < 6; i++) cityG.add(K.human(0x9fd8ff, 1.3).translateX(-7 + i * 3).translateZ(19));
  const rb = K.groundRobot({ at: [9, -3.2, 20], scale: 1.3 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });

  const uavs = K.swarm(c, { count: 9, altitude: 13, spread: 34, mesh: true, meshRange: 18, scale: 1.35, altSpread: 3 });

  K.link(c, sat1.position, [-17, -2.8, 12], { style: 'beam', color: C.ice, width: 0.14, opacity: 0.35, count: 4, speed: 0.26, size: 0.3 });
  K.link(c, sat2.position, [4, 13, 2], { style: 'dashed', color: C.ice, count: 3, speed: 0.3, opacity: 0.8 });
  K.link(c, [-6, 13, -2], [-13, 1, -13], { style: 'beam', color: C.mint, width: 0.1, opacity: 0.45, count: 3, speed: 0.36 });
  K.link(c, [8, 13, 4], [9, -1.6, 20], { style: 'dashed', color: C.amber, count: 3, speed: 0.32, opacity: 0.75 });
  void uavs;

  c.add(K.label('SPACE  ·  LEO + NTN', { at: [14, 34, -4], size: 2.2, color: '#cfe9ff' }));
  c.add(K.label('AIR  ·  UAV SWARM', { at: [20, 19, 6], size: 2.2, color: '#a8f0ff' }));
  c.add(K.label('GROUND  ·  CITY · EDGE · ROBOTS', { at: [16, 2.6, 22], size: 2.0, color: '#8ff5d0' }));
  c.drift({ speed: 0.026, bob: 0.7 });
  return c;
}

export function platformStack() {
  const c = K.stage({ cam: [22, 15, 40], look: [0, 8, 0], fov: 42, fogNear: 60, fogFar: 200 });
  K.lights(c, { accentPos: [0, 12, 0], accent: 22 });
  K.starfield(c, 500, 400);
  const layers = [
    ['PHYSICAL WORLD & AGENTS', C.ice],
    ['SENSING & COMMUNICATION', C.cyan],
    ['EDGE + CLOUD COMPUTE', 0x4fc8ff],
    ['DIGITAL TWIN', C.mint],
    ['DATA + RAG KNOWLEDGE', 0x7fe0d0],
    ['AI MODELS', C.violet],
    ['AGENTIC AI + PHYSICAL AI', C.violet],
    ['CONTINUAL LEARNING LOOP', C.amber],
  ];
  layers.forEach((l, i) => {
    K.slab(c, {
      w: 20 - i * 0.35, d: 11 - i * 0.2, h: 0.3, at: [0, i * 2.3, 0], color: l[1],
      title: l[0], titleSize: 0.72, opacity: 0.5,
    });
  });
  K.spine(c, { from: [0, -1, 0], to: [0, 18.5, 0], color: C.cyan, count: 12, down: true, downColor: C.mint });
  c.add(K.label('ONE PLATFORM — NOT A MODEL', { at: [0, 21.6, 0], size: 1.5, color: '#eaf7ff' }));
  c.add(K.label('sensors → knowledge → decisions → actuation → new data', { at: [0, -3.2, 0], size: 1.05, color: '#8fb6d4', border: 'none' }));
  c.drift({ radius: 46, height: 16, speed: 0.05 });
  return c;
}

export function assetLineup() {
  const c = K.stage({ cam: [0, 9, 40], look: [0, 4, 0], fov: 40, fogNear: 50, fogFar: 160 });
  K.lights(c);
  K.grid(c, { size: 120, div: 30, opacity: 0.35 });
  const spots = [-24, -12, 0, 12, 24];
  const sat = K.satellite({ at: [spots[0], 8, 0], scale: 1.25 });
  c.add(sat);
  c.tick((t, dt) => { sat.rotation.y += dt * 0.25; });
  const u = K.uav({ at: [spots[1], 7.5, 0], scale: 2.1 });
  c.add(u);
  K.animateRotors(c, [u]);
  c.tick((t) => { u.position.y = 7.5 + Math.sin(t * 1.1) * 0.35; });
  const rb = K.groundRobot({ at: [spots[2], 0, 0], scale: 2.1 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
  const gs = K.groundStation({ at: [spots[3], 0, 0], scale: 1.3 });
  c.add(gs);
  const rack = K.serverRack({ at: [spots[4], 0, 0], units: 10, trim: C.nv });
  c.add(rack);
  const names = ['SATELLITE / NTN', 'UAV / AERIAL AGENT', 'UGV / GROUND ROBOT', 'GROUND STATION', 'EDGE + GPU COMPUTE'];
  const cols = ['#cfe9ff', '#a8f0ff', '#8ff5d0', '#ffd9a8', '#d8f59a'];
  spots.forEach((x, i) => {
    c.add(K.label(names[i], { at: [x, i === 0 ? 12.5 : (i === 1 ? 11 : 7.2), 0], size: 1.05, color: cols[i] }));
    const pad = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.1, 40), K.glow(0x35e0ff, 0.3));
    pad.rotation.x = -Math.PI / 2; pad.position.set(x, 0.02, 0);
    c.add(pad);
  });
  const legend = K.panel([
    'solid beam  = high-rate data link',
    'dashed line = control / telemetry',
    '*violet orb  = autonomous AI agent',
    'cyan spine  = platform data bus',
    'mint arrow  = learning / model update',
  ], { title: 'visual grammar', size: 4.4, at: [0, 5.2, -16] });
  c.add(legend);
  c.drift({ radius: 41, height: 10, speed: 0.03, bob: 0.4 });
  return c;
}

export function brokenWorld() {
  const c = K.stage({ cam: [0, 18, 52], look: [0, 5, 0], fov: 44, fogColor: 0x0a0608, fogNear: 40, fogFar: 150, bg: 0x07060a });
  K.lights(c, { key: 0.5, keyColor: 0xff9d7a, rim: 0.4, rimColor: 0x6a2230, hemi: 0.35, accentColor: C.red, accent: 16, accentPos: [6, 8, 0] });
  K.grid(c, { size: 150, div: 30, c1: 0x4a2230, c2: 0x241018, opacity: 0.4, floorColor: 0x0a0509 });
  K.city(c, { count: 170, spread: 70, maxH: 15, seed: 8, damaged: 0.45, lightColor: 0x8a3a2c, emissive: 0x140806 });

  const r = K.rng(4);
  for (let i = 0; i < 16; i++) {
    const x = (r() - 0.5) * 66, z = (r() - 0.5) * 66;
    const fire = new THREE.Mesh(new THREE.ConeGeometry(0.9 + r(), 3 + r() * 3, 8), K.glow(0xff7a3c, 0.5));
    fire.position.set(x, 1.5, z);
    c.add(fire);
    const smoke = new THREE.Mesh(new THREE.SphereGeometry(2.2 + r() * 1.6, 10, 8), K.glow(0x40323a, 0.16));
    smoke.position.set(x, 6 + r() * 3, z);
    c.add(smoke);
    c.tick((t) => {
      fire.scale.y = 1 + Math.sin(t * 5 + i) * 0.22;
      smoke.position.y = 6 + r0(i) + Math.sin(t * 0.5 + i) * 1.2;
    });
  }
  function r0(i) { return (i % 4) * 0.8; }

  for (let i = 0; i < 3; i++) {
    const tw = K.cellTower({ at: [(i - 1) * 24, 0, -22 + i * 12], h: 8, dead: true, coverage: false });
    c.add(tw);
    const x = K.label('✕  NO SERVICE', { at: [(i - 1) * 24, 10.4, -22 + i * 12], size: 1.25, color: '#ff8d99', border: 'rgba(255,95,112,0.6)' });
    c.add(x);
    c.tick((t) => { x.material.opacity = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.4 + i)); });
  }
  const dark = new THREE.Mesh(new THREE.CircleGeometry(40, 48), K.glow(0x2a0d16, 0.5));
  dark.rotation.x = -Math.PI / 2; dark.position.y = 0.03;
  c.add(dark);
  c.add(K.panel([
    'cellular backhaul  DOWN',
    'power grid  PARTIAL',
    'roads  BLOCKED',
    'situational awareness  NONE',
    '*response window  MINUTES',
  ], { title: 'zero-infrastructure zone', size: 6, at: [0, 13, 26], border: 'rgba(255,95,112,0.55)', titleColor: '#ff8d99', accentColor: '#ffb347' }));
  c.drift({ radius: 55, height: 19, speed: 0.024 });
  return c;
}

export function domainTiles() {
  const c = K.stage({ cam: [0, 26, 46], look: [0, 2, 0], fov: 46, fogNear: 60, fogFar: 190 });
  K.lights(c, { accentPos: [0, 20, 0], accent: 18 });
  K.starfield(c, 400, 320);
  const domains = [
    ['DISASTER', 0xff6a5e], ['REMOTE AREAS', 0x7fd8ff], ['TELECOM OUTAGE', 0x35e0ff],
    ['AGRICULTURE', 0x9ad60f], ['LOGISTICS', 0xffb347], ['INSPECTION', 0x7fe0d0],
    ['SEARCH & RESCUE', 0xff9db0], ['INDUSTRIAL', 0xb07bff], ['SMART CITY', 0x6fd8ff],
    ['MARITIME', 0x3fa9c9], ['SPACE OPS', 0xdfe9f5],
  ];
  const R = 22;
  domains.forEach((d, i) => {
    const a = (i / domains.length) * Math.PI * 2;
    const x = Math.cos(a) * R, z = Math.sin(a) * R;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.3, 7.4), new THREE.MeshStandardMaterial({
      color: 0x0c1a2a, emissive: d[1], emissiveIntensity: 0.18, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.8,
    }));
    tile.position.set(x, 0, z);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(tile.geometry), K.lineMat(d[1], 0.8));
    edge.position.copy(tile.position);
    c.add(tile, edge);
    const rr = K.rng(i + 2);
    for (let j = 0; j < 7; j++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6 + rr() * 2.4, 0.7), K.glow(d[1], 0.55));
      b.position.set(x + (rr() - 0.5) * 5.4, 0.3 + b.geometry.parameters.height / 2, z + (rr() - 0.5) * 5.4);
      c.add(b);
    }
    const l = K.label(d[0], { at: [x, 4.6, z], size: 1.15, color: '#e6f5ff' });
    c.add(l);
    l.userData.billboard = false;
    const pin = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), K.glow(d[1], 1));
    pin.position.set(x, 3.4, z);
    c.add(pin);
    c.tick((t) => { pin.position.y = 3.4 + Math.sin(t * 1.6 + i) * 0.24; });
  });
  const core = K.agentOrb(c, { at: [0, 5, 0], r: 2.4, color: C.cyan, color2: C.mint, label: 'ONE INFRASTRUCTURE' , labelSize:1.3});
  c.add(core);
  domains.forEach((d, i) => {
    const a = (i / domains.length) * Math.PI * 2;
    K.link(c, [0, 5, 0], [Math.cos(a) * R, 1.6, Math.sin(a) * R], {
      style: 'beam', color: d[1], width: 0.05, opacity: 0.32, count: 2, speed: 0.22, size: 0.16,
    });
  });
  c.drift({ radius: 50, height: 28, speed: 0.035 });
  return c;
}

export function silos() {
  const c = K.stage({ cam: [0, 14, 44], look: [0, 4, 0], fov: 42 });
  K.lights(c, { key: 0.8, accent: 10 });
  K.grid(c, { size: 130, div: 26, opacity: 0.3 });
  const groups = [
    { t: 'SPACE PROGRAM', x: -17, col: 0x8fb6d4, build: (g) => { const s = K.satellite({ scale: 0.9 }); s.position.y = 7; g.add(s); } },
    { t: 'DRONE PROGRAM', x: 0, col: 0x8fb6d4, build: (g) => { const u = K.uav({ scale: 1.5 }); u.position.y = 6; g.add(u); } },
    { t: 'ROBOTICS PROGRAM', x: 17, col: 0x8fb6d4, build: (g) => { const r = K.groundRobot({ scale: 1.5 }); g.add(r); } },
  ];
  groups.forEach((gr) => {
    const g = new THREE.Group();
    g.position.x = gr.x;
    gr.build(g);
    const island = new THREE.Mesh(new THREE.CylinderGeometry(7, 6, 0.6, 26), K.solid(0x16293c, { emissive: 0x14283c, emissiveIntensity: 0.9 }));
    island.position.y = -0.3;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(7, 0.06, 6, 40), K.glow(gr.col, 0.6));
    ring.rotation.x = Math.PI / 2;
    g.add(island, ring);
    g.add(K.label(gr.t, { at: [0, 11.5, 0], size: 1.15, color: '#b8cfe2' }));
    g.add(K.label('own stack · own data · own ops', { at: [0, -1.6, 0], size: 0.8, color: '#6d8aa6', border: 'none' }));
    c.add(g);
  });
  for (const [a, b] of [[-17, 0], [0, 17]]) {
    const pts = [new THREE.Vector3(a + 7.2, 3, 0), new THREE.Vector3((a + b) / 2 - 1.6, 4.2, 0)];
    const pts2 = [new THREE.Vector3((a + b) / 2 + 1.6, 4.2, 0), new THREE.Vector3(b - 7.2, 3, 0)];
    c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), K.lineMat(C.red, 0.55)));
    c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), K.lineMat(C.red, 0.55)));
    const brk = K.label('✕', { at: [(a + b) / 2, 4.6, 0], size: 1.5, color: '#ff8d99', border: 'none', bg: 'none' });
    c.add(brk);
  }
  c.add(K.panel([
    'no shared world model',
    'no shared knowledge base',
    'no cross-domain planning',
    'no joint learning',
    '*integration cost grows with every silo',
  ], { title: 'the failure mode', size: 5.4, at: [0, 4.6, 18], border: 'rgba(255,95,112,0.5)', titleColor: '#ff8d99' }));
  c.drift({ radius: 46, height: 15, speed: 0.03 });
  return c;
}

export function integrated() {
  const c = K.stage({ cam: [0, 16, 46], look: [0, 6, 0], fov: 42 });
  K.lights(c, { accentPos: [0, 14, 0], accent: 24 });
  K.grid(c, { size: 130, div: 26, opacity: 0.3 });
  const sat = K.satellite({ at: [-20, 18, -6], scale: 1.0 });
  c.add(sat);
  c.tick((t, dt) => { sat.rotation.y += dt * 0.2; });
  const uavs = K.swarm(c, { count: 6, altitude: 11, spread: 26, mesh: true, meshRange: 20, scale: 1.3 });
  const rb1 = K.groundRobot({ at: [16, 0, 6], scale: 1.4 });
  const rb2 = K.groundRobot({ at: [21, 0, -4], scale: 1.4 });
  c.add(rb1, rb2);
  c.tick((t, dt) => { rb1.userData.lidar.rotation.y += dt * 3; rb2.userData.lidar.rotation.y += dt * 2.4; });
  const gs = K.groundStation({ at: [-18, 0, 12], scale: 1.1 });
  const rack = K.serverRack({ at: [4, 0, 16], trim: C.nv });
  c.add(gs, rack);
  K.link(c, [-20, 18, -6], [-18, 3, 12], { style: 'beam', color: C.cyan, width: 0.12, opacity: 0.4, count: 4, speed: 0.3, label: 'NTN feeder' });
  K.link(c, [-20, 18, -6], [0, 11, 0], { style: 'dashed', color: C.ice, count: 3, speed: 0.25, label: 'sat↔UAV' });
  K.link(c, [0, 11, 0], [16, 1.6, 6], { style: 'beam', color: C.mint, width: 0.09, opacity: 0.45, count: 3, speed: 0.34, label: 'UAV↔robot' });
  K.link(c, [-18, 3, 12], [4, 3, 16], { style: 'beam', color: C.nv, width: 0.09, opacity: 0.4, count: 4, speed: 0.4, label: 'edge fabric' });
  const brain = K.agentOrb(c, { at: [0, 24, 8], r: 1.8, color: C.violet, label: 'SHARED AUTONOMY LAYER', labelSize: 1.1 });
  c.add(brain);
  for (const p of [[-20, 18, -6], [0, 11, 0], [16, 1.6, 6], [4, 3, 16]]) {
    K.link(c, [0, 24, 8], p, { style: 'dashed', color: C.violet, count: 2, speed: 0.4, opacity: 0.5, packets: true });
  }
  c.add(K.label('ONE WORLD MODEL · ONE KNOWLEDGE BASE · ONE LEARNING LOOP', { at: [0, 30, 8], size: 1.5, color: '#e8ddff' }));
  c.drift({ radius: 48, height: 17, speed: 0.03 });
  return c;
}

export function earthToEdgeStack() {
  const c = K.stage({ cam: [30, 26, 54], look: [0, 24, 0], fov: 48, fogNear: 80, fogFar: 260 });
  K.lights(c, { accentPos: [0, 30, 0], accent: 26 });
  K.starfield(c, 900, 600);

  const tiers = [
    { y: 56, t: 'SPACE SEGMENT', s: 'GEO relay · mission ops' },
    { y: 46, t: 'LEO CONSTELLATION', s: 'imaging · NTN backhaul' },
    { y: 34, t: 'HAPS / UPPER AIR', s: 'persistent relay' },
    { y: 25, t: 'UAV SWARM', s: 'aerial base stations · sensing' },
    { y: 16, t: '6G / NTN ACCESS', s: 'mesh · relays · optical' },
    { y: 9, t: 'GROUND STATIONS & TOWERS', s: 'gateway · fronthaul' },
    { y: 3, t: 'CITIES · IoT · ROBOTS · HUMANS', s: 'the physical world' },
  ];
  tiers.forEach((tr, i) => {
    const w = 46 - i * 1.2;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, 26), K.glow(i < 2 ? C.ice : i < 5 ? C.cyan : C.mint, 0.045));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = tr.y;
    const ring = new THREE.Mesh(new THREE.RingGeometry(w * 0.42, w * 0.43, 60), K.glow(i < 2 ? C.ice : i < 5 ? C.cyan : C.mint, 0.4));
    ring.rotation.x = -Math.PI / 2; ring.position.y = tr.y;
    c.add(plane, ring);
    c.add(K.label(tr.t, { at: [-26, tr.y + 1.6, 12], size: 1.5, color: '#e6f5ff' }));
    c.add(K.label(tr.s, { at: [-26, tr.y - 0.9, 12], size: 1.0, color: '#8fb6d4', border: 'none', bg: 'none' }));
  });

  const sat1 = K.satellite({ at: [-12, 56, -4], scale: 1.1 });
  const sat2 = K.satellite({ at: [8, 46, 4], scale: 0.9 });
  const sat3 = K.satellite({ at: [-6, 46, -8], scale: 0.9 });
  c.add(sat1, sat2, sat3);
  c.tick((t) => {
    sat2.position.x = Math.sin(t * 0.25) * 14;
    sat3.position.x = Math.sin(t * 0.25 + 2.2) * 14;
  });
  const haps = K.uav({ at: [4, 34, -2], scale: 2.6, trim: C.ice });
  c.add(haps);
  K.animateRotors(c, [haps], 18);
  const uavs = K.swarm(c, { count: 7, altitude: 25, spread: 26, mesh: true, meshRange: 18, scale: 1.2 });
  for (let i = 0; i < 3; i++) c.add(K.cellTower({ at: [(i - 1) * 13, 3, -6 + i * 5], h: 6, cov: 7 }));
  const gs = K.groundStation({ at: [-14, 3, 8], scale: 1.0 });
  c.add(gs);
  const cityG = new THREE.Group();
  cityG.position.y = 3;
  c.add(cityG);
  K.city({ add: (...o) => cityG.add(...o), tick: c.tick }, { count: 90, spread: 34, maxH: 8, seed: 21, roads: true });
  for (let i = 0; i < 5; i++) {
    const h = K.human(0x9fd8ff, 1.2);
    h.position.set((i - 2) * 3.2, 3, 15);
    c.add(h);
  }
  const rb = K.groundRobot({ at: [7, 3, 13], scale: 1.2 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });

  K.spine(c, { from: [0, 3, 0], to: [0, 58, 0], color: C.cyan, w: 0.16, count: 16, speed: 0.1, down: true, downColor: C.mint });
  const pairs = [[[-12, 56, -4], [8, 46, 4]], [[8, 46, 4], [4, 34, -2]], [[4, 34, -2], [0, 25, 0]], [[-6, 46, -8], [-14, 6, 8]], [[0, 25, 0], [-13, 9, -6]], [[0, 25, 0], [7, 4.5, 13]]];
  pairs.forEach(([a, b], i) => K.link(c, a, b, {
    style: i % 2 ? 'dashed' : 'beam', color: i % 3 === 0 ? C.ice : C.cyan, width: 0.09, opacity: 0.4, count: 3, speed: 0.26,
  }));
  c.add(K.label('DATA UP  ▲   COMMANDS & MODELS DOWN  ▼', { at: [16, 32, 10], size: 1.5, color: '#a8f0ff' }));
  c.drift({ radius: 62, height: 30, speed: 0.028, bob: 1.4 });
  return c;
}

export function kpiWall(opts = {}) {
  const c = K.stage({ cam: [0, 8, 30], look: [0, 7, 0], fov: 42, fogNear: 40, fogFar: 140 });
  K.lights(c, { accent: 14 });
  K.grid(c, { size: 90, div: 18, opacity: 0.25 });
  const items = opts.gauges ?? [
    { label: 'coverage', value: 0.94, color: '#6ef2c0' },
    { label: 'link uptime', value: 0.87, color: '#35e0ff' },
    { label: 'autonomy', value: 0.78, color: '#b07bff' },
    { label: 'energy', value: 0.66, color: '#ffb347' },
  ];
  items.forEach((g, i) => {
    c.add(K.gauge(c, {
      at: [(i - (items.length - 1) / 2) * 6.4, 9, 0], size: 5, value: g.value, color: g.color,
      label: g.label, phase: i * 1.3, swing: 0.05,
    }));
  });
  const cityG = new THREE.Group();
  c.add(cityG);
  K.city({ add: (...o) => cityG.add(...o), tick: c.tick }, { count: 70, spread: 40, maxH: 6, seed: 33 });
  K.swarm(c, { count: 5, altitude: 5, spread: 26, mesh: true, scale: 0.8 });
  c.add(K.label(opts.caption ?? 'CONTINUOUS TELEMETRY → PLATFORM KPI', { at: [0, 3.4, 12], size: 1.1, color: '#a8f0ff' }));
  c.drift({ radius: 31, height: 9, speed: 0.02, bob: 0.3 });
  return c;
}

export function masterArchitecture() {
  const c = K.stage({ cam: [46, 34, 58], look: [0, 17, 0], fov: 46, fogNear: 90, fogFar: 300 });
  K.lights(c, { accentPos: [0, 20, 0], accent: 22, key: 0.9 });
  K.starfield(c, 700, 500);
  const layers = [
    ['L1  PHYSICAL WORLD', C.ice], ['L2  SENSING', C.cyan], ['L3  PHYSICAL AGENTS', 0x7fd8ff],
    ['L4  COMMUNICATION', 0x35e0ff], ['L5  EDGE COMPUTING', 0x9ad60f], ['L6  DIGITAL TWIN', C.mint],
    ['L7  DATA PLATFORM', 0x7fe0d0], ['L8  RAG / KNOWLEDGE', 0x63e0b8], ['L9  AI MODELS', C.violet],
    ['L10 AGENTIC AI', 0xc79bff], ['L11 PHYSICAL AI', 0xd7a8ff], ['L12 LEARNING', C.amber],
    ['L13 ORCHESTRATION', 0xffd08a], ['L14 HUMAN / OPERATOR', 0xffe0b0], ['L15 DEPLOYMENT', C.mint],
  ];
  const step = 2.5;
  layers.forEach((l, i) => {
    const w = 34, d = 15;
    K.slab(c, { w, d, h: 0.26, at: [0, i * step, 0], color: l[1], title: l[0], titleSize: 0.8, opacity: 0.42, fill: 0x0a1524 });
    const glowPad = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.03, d * 1.03), K.glow(l[1], 0.03));
    glowPad.rotation.x = -Math.PI / 2;
    glowPad.position.y = i * step - 0.2;
    c.add(glowPad);
  });
  K.spine(c, { from: [-11, -1, 0], to: [-11, 37, 0], color: C.cyan, w: 0.13, count: 18, speed: 0.12 });
  K.spine(c, { from: [11, 37, 0], to: [11, -1, 0], color: C.violet, w: 0.13, count: 18, speed: 0.12 });
  c.add(K.label('SENSE ▲', { at: [-11, 38.6, 0], size: 1.4, color: '#a8f0ff' }));
  c.add(K.label('▼ ACT', { at: [11, 38.6, 0], size: 1.4, color: '#e0c9ff' }));

  const icons = [
    [0, () => { const g = new THREE.Group(); const cc = new THREE.Group(); g.add(cc); K.city({ add: (...o) => cc.add(...o), tick: c.tick }, { count: 26, spread: 9, maxH: 2.4, seed: 5, roads: false }); return g; }],
    [2, () => K.uav({ scale: 0.6 })],
    [3, () => K.satellite({ scale: 0.42 })],
    [4, () => K.serverRack({ h: 1.6, units: 5, trim: C.nv, scale: 0.7 })],
    [5, () => { const g = new THREE.Group(); const cc = new THREE.Group(); g.add(cc); K.city({ add: (...o) => cc.add(...o), tick: c.tick }, { count: 22, spread: 8, maxH: 2.2, seed: 9, roads: false, lightColor: C.mint, emissive: 0x05201a }); return g; }],
    [7, () => K.knowledgeGraph(c, { nodes: 16, r: 2.2, nodeSize: 0.13, spin: 0.12 })],
    [9, () => K.agentOrb(c, { r: 0.6, color: C.violet })],
    [10, () => K.groundRobot({ scale: 0.6 })],
    [13, () => K.human(0xffe0b0, 0.9)],
  ];
  icons.forEach(([i, make]) => {
    const o = make();
    o.position.set(11.5, i * step + 0.4, 0);
    c.add(o);
  });
  c.add(K.label('MASTER ARCHITECTURE — 15 LAYERS, ONE CONTINUOUS LOOP', { at: [0, 40.5, 0], size: 1.7, color: '#f0f8ff' }));
  c.drift({ radius: 74, height: 36, speed: 0.026, bob: 1.0 });
  return c;
}

export function crossPlanes() {
  const c = K.stage({ cam: [40, 24, 44], look: [0, 12, 0], fov: 46, fogNear: 70, fogFar: 220 });
  K.lights(c, { accent: 16, accentPos: [0, 14, 0] });
  K.starfield(c, 400, 400);
  for (let i = 0; i < 8; i++) {
    K.slab(c, { w: 30, d: 13, h: 0.2, at: [0, i * 3, 0], color: 0x2e6f9e, opacity: 0.22, fill: 0x081422 });
  }
  const planes = [
    ['DATA PLANE', C.cyan, -9, 'telemetry · sensor streams · video'],
    ['CONTROL PLANE', C.amber, -3, 'commands · task allocation · policy switch'],
    ['LEARNING PLANE', C.violet, 3, 'gradients · model versions · replay'],
    ['SAFETY PLANE', C.red, 9, 'monitors · limits · overrides'],
  ];
  planes.forEach(([t, col, x, s]) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(13, 25), K.glow(col, 0.08));
    p.rotation.y = Math.PI / 2;
    p.position.set(x, 11, 0);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(p.geometry), K.lineMat(col, 0.55));
    edge.rotation.copy(p.rotation); edge.position.copy(p.position);
    c.add(p, edge);
    c.add(K.label(t, { at: [x, 24.6, 0], size: 1.2, color: '#e6f5ff' }));
    c.add(K.label(s, { at: [x, 23.1, 0], size: 0.72, color: '#8fb6d4', border: 'none', bg: 'none' }));
    K.spine(c, { from: [x, 0, 0], to: [x, 22, 0], color: col, w: 0.08, count: 9, speed: 0.16 });
  });
  c.add(K.label('EVERY LAYER IS CROSSED BY FOUR PLANES', { at: [0, 27.6, 0], size: 1.5, color: '#f0f8ff' }));
  c.drift({ radius: 58, height: 26, speed: 0.03 });
  return c;
}

export function backdrop(opts = {}) {
  const v = opts.variant ?? 'grid';
  const c = K.stage({ cam: opts.cam ?? [0, 12, 40], look: opts.look ?? [0, 5, 0], fov: 44, fogNear: 45, fogFar: 190 });
  K.lights(c, { accent: 12 });
  if (v === 'orbit') {
    K.starfield(c, 800, 700);
    K.earth(c, { radius: 30, at: [0, -26, -6], spin: 0.02 });
    const sh = K.orbitShell(c, { radius: 40, planes: 3, per: 5, inc: 50, speed: 0.12, simple: true, satSize: 0.8 });
    sh.group.position.set(0, -26, -6);
  } else if (v === 'city') {
    K.grid(c, { size: 120, div: 24, opacity: 0.3 });
    K.city(c, { count: 110, spread: 60, maxH: 10, seed: 41 });
    K.swarm(c, { count: 6, altitude: 12, spread: 34, mesh: true, scale: 1.1 });
  } else if (v === 'datacenter') {
    K.grid(c, { size: 100, div: 20, opacity: 0.25 });
    c.add(K.gpuPod(c, { rows: 3, cols: 5, trim: C.nv }));
  } else if (v === 'swarm') {
    K.grid(c, { size: 120, div: 24, opacity: 0.22 });
    K.swarm(c, { count: 14, altitude: 10, spread: 44, mesh: true, meshRange: 20, scale: 1.2 });
  } else if (v === 'agents') {
    K.starfield(c, 400, 300);
    K.holoRing(c, { r: 12, color: C.violet, rings: 3 });
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      c.add(K.agentOrb(c, { at: [Math.cos(a) * 9, 6 + Math.sin(i) * 1.2, Math.sin(a) * 9], r: 0.7, color: C.violet, phase: i }));
    }
  } else {
    K.grid(c, { size: 140, div: 28, opacity: 0.3 });
    K.starfield(c, 300, 300);
  }
  c.drift({ radius: (opts.cam ?? [0, 12, 40])[2] + 2, height: (opts.cam ?? [0, 12, 40])[1], speed: 0.02, bob: 0.4 });
  return c;
}
