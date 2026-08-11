import * as K from '../kit.js';
const { THREE, C } = K;

export function testPyramid() {
  const c = K.stage({ cam: [0, 18, 46], look: [0, 9, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14 });
  K.grid(c, { size: 120, div: 24, opacity: 0.16 });
  const levels = [
    ['1  SOFTWARE UNIT TESTS', C.cyan, 'seconds · thousands per commit'],
    ['2  AI MODEL TESTS', 0x4fc8ff, 'accuracy · calibration · OOD'],
    ['3  SIMULATION', C.mint, 'nominal scenarios end-to-end'],
    ['4  MASSIVE SIMULATION', 0x7fe0d0, '10⁴–10⁶ randomised missions'],
    ['5  SCENARIO RANDOMISATION', C.nv, 'adversarial + rare events'],
    ['6  HARDWARE-IN-THE-LOOP', C.amber, 'real firmware, simulated world'],
    ['7  CONTROLLED FIELD TEST', 0xffd08a, 'one aircraft, bounded volume'],
    ['8  PILOT DEPLOYMENT', C.violet, 'real users, full monitoring'],
    ['9  OPERATIONAL DEPLOYMENT', 0xd7a8ff, 'continuous assurance'],
  ];
  levels.forEach((l, i) => {
    const w = 30 - i * 2.9;
    const y = i * 2.1;
    const box = new THREE.Mesh(new THREE.BoxGeometry(w, 1.7, w * 0.42), new THREE.MeshStandardMaterial({
      color: 0x0b1a2b, emissive: l[1], emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.7,
    }));
    box.position.y = y;
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(l[1], 0.9));
    e.position.y = y;
    c.add(box, e);
    c.add(K.label(l[0], { at: [0, y + 0.1, w * 0.24], size: 0.85, color: '#e6f5ff', border: 'none', bg: 'none' }));
    c.add(K.label(l[2], { at: [w / 2 + 7.5, y, 0], size: 0.7, color: '#8fb6d4', border: 'none', bg: 'none' }));
  });
  K.spine(c, { from: [-19, 0, 0], to: [-19, 18, 0], color: C.cyan, w: 0.09, count: 10, speed: 0.14 });
  c.add(K.label('COST OF FAILURE ▲', { at: [-19, 19.6, 0], size: 1, color: '#ff9aa6' }));
  c.add(K.label('NUMBER OF TESTS ▼', { at: [-19, -1.8, 0], size: 1, color: '#a8f0ff' }));
  const u = K.uav({ at: [0, 21.5, 0], scale: 1.3 }); c.add(u); K.animateRotors(c, [u]);
  c.add(K.label('NOTHING FLIES OVER PEOPLE UNTIL LEVEL 8', { at: [0, 24, 0], size: 1.3, color: '#eaf7ff' }));
  c.drift({ radius: 48, height: 19, speed: 0.022 });
  return c;
}

export function safetyArch() {
  const c = K.stage({ cam: [0, 16, 44], look: [0, 10, 0], fov: 46, fogNear: 50, fogFar: 180, bg: 0x08060b });
  K.lights(c, { key: 0.8, keyColor: 0xffd8d0, accent: 16, accentColor: C.red, accentPos: [0, 12, 0] });
  K.grid(c, { size: 120, div: 24, opacity: 0.18, c1: 0x4a2a3a, c2: 0x241820, floorColor: 0x090509 });
  const u = K.uav({ at: [0, 12, 0], scale: 2.2 }); c.add(u); K.animateRotors(c, [u]);
  c.tick((t) => { u.position.y = 12 + Math.sin(t) * 0.3; u.rotation.z = Math.sin(t * 0.7) * 0.05; });
  const faults = [
    'GPS UNAVAILABLE', 'COMMUNICATION LOST', 'SENSOR FAILURE', 'BATTERY DEGRADATION',
    'COLLISION RISK', 'WEATHER DETERIORATION', 'MODEL UNCERTAINTY', 'CYBER ATTACK',
    'SATELLITE OUTAGE', 'UAV FAILURE',
  ];
  faults.forEach((f, i) => {
    const a = (i / faults.length) * Math.PI * 2;
    const p = [Math.cos(a) * 17, 12 + Math.sin(a * 2) * 3.4, Math.sin(a) * 9];
    const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), K.mutable(K.glow(C.red, 0.9)));
    node.position.set(...p);
    c.add(node, K.label(f, { at: [p[0], p[1] + 1.5, p[2]], size: 0.75, color: '#ff9aa6', border: 'rgba(255,95,112,0.5)' }));
    K.link(c, p, [0, 12, 0], { style: 'dashed', color: C.red, count: 2, speed: 0.6, opacity: 0.4, marchSpeed: 2.6 });
    c.tick((t) => { node.material.opacity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.4 + i)); });
  });
  const shield = new THREE.Mesh(new THREE.SphereGeometry(5.4, 26, 18), K.glow(C.mint, 0.05));
  shield.position.set(0, 12, 0);
  const shieldE = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(5.4, 14, 10)), K.lineMat(C.mint, 0.25));
  shieldE.position.set(0, 12, 0);
  c.add(shield, shieldE);
  const chain = ['DETECT', 'ASSESS', 'SAFE POLICY', 'REDUNDANCY', 'RECOVER', 'ESCALATE'];
  chain.forEach((s, i) => {
    const x = (i - (chain.length - 1) / 2) * 6.4;
    const box = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.8, 2), new THREE.MeshStandardMaterial({
      color: 0x1a0e16, emissive: i === 5 ? C.amber : C.mint, emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.85,
    }));
    box.position.set(x, 1.4, 12);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(i === 5 ? C.amber : C.mint, 0.9));
    e.position.copy(box.position);
    c.add(box, e, K.label(s, { at: [x, 1.4, 13.1], size: 0.7, color: '#eaf7ff', border: 'none', bg: 'none' }));
    if (i < chain.length - 1) K.arrow(c, [x + 2.8, 1.4, 12], [x + 3.5, 1.4, 12], { color: C.mint, w: 0.07 });
  });
  K.link(c, [0, 7, 0], [-16, 2.4, 12], { style: 'beam', color: C.red, width: 0.09, opacity: 0.45, count: 3, speed: 0.6 });
  c.add(K.label('SAFETY PLANE  ·  independent of the AI it supervises', { at: [0, 20.6, 0], size: 1.4, color: '#ffd9d0' }));
  c.drift({ radius: 48, height: 18, speed: 0.022 });
  return c;
}

export function safetyLadder() {
  const c = K.stage({ cam: [0, 12, 40], look: [0, 7, 0], fov: 44, fogNear: 45, fogFar: 160 });
  K.lights(c, { accent: 12 });
  K.grid(c, { size: 120, div: 24, opacity: 0.18 });
  const modes = [
    ['NOMINAL', 'learned policy, full autonomy', C.mint, -21, 12],
    ['DEGRADED', 'reduced envelope, simpler policy', C.amber, -7, 9],
    ['SAFE', 'classical fallback controller', 0xffd08a, 7, 6],
    ['EMERGENCY', 'RTH or immediate landing', C.red, 21, 2.4],
  ];
  modes.forEach(([t, s, col, x, y], i) => {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(11, 0.4, 9), new THREE.MeshStandardMaterial({
      color: 0x0b1a2b, emissive: col, emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.8,
    }));
    pad.position.set(x, 0.2, 0);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.07, 6, 44), K.glow(col, 0.7));
    ring.rotation.x = Math.PI / 2; ring.position.set(x, 0.5, 0);
    c.add(pad, ring);
    const u = K.uav({ at: [x, y, 0], scale: 1.5, trim: col, led: col });
    c.add(u); K.animateRotors(c, [u], i === 3 ? 12 : 30);
    if (i === 3) {
      c.tick((t) => { u.position.y = 0.9 + Math.max(0, 1.5 * (1 - ((t * 0.25) % 1))); });
      const beacon = new THREE.Mesh(new THREE.ConeGeometry(3.4, 6, 20, 1, true), K.glow(C.red, 0.06));
      beacon.position.set(x, 3, 0); beacon.rotation.x = Math.PI;
      c.add(beacon);
    } else {
      c.tick((t) => { u.position.y = y + Math.sin(t * (1 + i * 0.3)) * 0.3; });
    }
    c.add(K.label(t, { at: [x, y + 3.2, 0], size: 1.25, color: '#eaf7ff' }));
    c.add(K.label(s, { at: [x, 2.4, 0], size: 0.72, color: '#8fb6d4', border: 'none' }));
    if (i < 3) K.arrow(c, [x + 6, 4, 0], [x + 8.6, 4, 0], { color: C.red, w: 0.09, label: ['trigger', 'trigger', 'trigger'][i], labelSize: 0.62 });
  });
  c.add(K.panel([
    'transitions are one-way under fault',
    'return to NOMINAL requires clean state + timer',
    'each mode has an independent monitor',
    '*human override reachable from every mode',
  ], { title: 'degradation ladder', size: 6.2, at: [0, 15.6, -8], border: 'rgba(255,95,112,0.5)', titleColor: '#ff9aa6' }));
  c.drift({ radius: 44, height: 13, speed: 0.02 });
  return c;
}

export function mlopsLoop() {
  const c = K.stage({ cam: [0, 40, 38], look: [0, 6, 0], fov: 48, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14, accentColor: C.nv });
  K.grid(c, { size: 130, div: 26, opacity: 0.16 });
  const steps = [
    ['DATA', C.cyan], ['TRAIN', C.nv], ['VALIDATE', 0x7fe0d0], ['REGISTER', C.mint],
    ['SIMULATE', C.violet], ['CERTIFY', C.amber], ['DEPLOY', 0xffd08a], ['MONITOR', 0x7fd8ff],
    ['COLLECT', 0x4fc8ff], ['RETRAIN', C.nv],
  ];
  const R = 19;
  const pts = steps.map((s, i) => {
    const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 6, Math.sin(a) * R * 0.85);
    const box = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 2.4), new THREE.MeshStandardMaterial({
      color: 0x0a1524, emissive: s[1], emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.85,
    }));
    box.position.copy(p);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(s[1], 0.9));
    e.position.copy(p);
    c.add(box, e, K.label(s[0], { at: [p.x, p.y + 1.8, p.z], size: 0.88, color: '#e6f5ff' }));
    return p;
  });
  for (let i = 0; i < pts.length; i++) {
    K.link(c, pts[i], pts[(i + 1) % pts.length], { style: 'beam', color: steps[i][1], width: 0.075, opacity: 0.45, count: 2, speed: 0.4, size: 0.2, side: 0.05 });
  }
  const versions = ['v12.4', 'v13.0', 'v13.1', 'v14.2 ←live'];
  versions.forEach((v, i) => {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), K.glow(i === 3 ? C.mint : 0x3f5f7f, i === 3 ? 0.8 : 0.35));
    cube.position.set(-6 + i * 4, 15, 0);
    c.add(cube, K.label(v, { at: [-6 + i * 4, 17, 0], size: 0.75, color: i === 3 ? '#8ff5d0' : '#8fb6d4', border: 'none' }));
    c.tick((t, dt) => { cube.rotation.y += dt * (i === 3 ? 0.8 : 0.2); });
  });
  c.add(K.label('MODEL REGISTRY  ·  signed, versioned, revertible', { at: [0, 19, 0], size: 1.15, color: '#a8f0ff' }));
  K.arrow(c, [7, 15, 0], [-7.5, 15, 0], { color: C.red, w: 0.09, label: 'ROLLBACK  <  60 s', labelSize: 0.85, labelOffset: [0, -1.6, 0], pulse: true });
  c.add(K.panel([
    'every deploy is a canary first',
    'certification artefacts stored with the model',
    'fleet health watched per model version',
    'automatic rollback on KPI regression',
    '*no manual copies of weights, ever',
  ], { title: 'MLOps / RobotOps rules', size: 6.4, at: [0, 6, 22], border: 'rgba(154,214,15,0.5)', titleColor: '#d8f59a' }));
  c.drift({ speed: 0.02 });
  return c;
}

export function fleetWall() {
  const c = K.stage({ cam: [0, 9, 30], look: [0, 8, 0], fov: 44, fogNear: 35, fogFar: 130 });
  K.lights(c, { accent: 10 });
  K.grid(c, { size: 80, div: 16, opacity: 0.16 });
  const rows = 4, cols = 8;
  const rr = K.rng(77);
  for (let i = 0; i < rows * cols; i++) {
    const x = ((i % cols) - (cols - 1) / 2) * 3.3;
    const y = 13 - Math.floor(i / cols) * 2.6;
    const st = rr();
    const col = st > 0.85 ? C.red : st > 0.7 ? C.amber : C.mint;
    const tile = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.2), K.mutable(K.glow(col, 0.3)));
    tile.position.set(x, y, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(tile.geometry), K.lineMat(col, 0.7));
    e.position.copy(tile.position);
    c.add(tile, e);
    c.add(K.label(`${i < 24 ? 'UAV' : 'UGV'}-${String(i + 1).padStart(2, '0')}`, { at: [x, y + 0.6, 0.05], size: 0.42, color: '#dceaf7', border: 'none', bg: 'none' }));
    c.add(K.label(st > 0.85 ? 'FAULT' : st > 0.7 ? 'DEGRADED' : 'NOMINAL', { at: [x, y - 0.1, 0.05], size: 0.36, color: st > 0.85 ? '#ff9aa6' : st > 0.7 ? '#ffd08a' : '#8ff5d0', border: 'none', bg: 'none' }));
    c.add(K.label(`v14.${st > 0.5 ? 2 : 1}`, { at: [x, y - 0.72, 0.05], size: 0.34, color: '#6d8aa6', border: 'none', bg: 'none' }));
    c.tick((t) => { tile.material.opacity = 0.2 + 0.18 * (0.5 + 0.5 * Math.sin(t * 1.4 + i)); });
  }
  const gauges = [['availability', 0.94, '#6ef2c0'], ['model v14.2 adoption', 0.78, '#35e0ff'], ['open faults', 0.12, '#ff5f70'], ['energy reserve', 0.63, '#ffb347']];
  gauges.forEach((g, i) => c.add(K.gauge(c, { at: [(i - 1.5) * 6.6, 3.4, 0], size: 4, value: g[1], color: g[2], label: g[0], phase: i })));
  c.add(K.label('FLEET HEALTH & MODEL ROLLOUT WALL', { at: [0, 16.4, 0], size: 1.3, color: '#eaf7ff' }));
  c.drift({ radius: 31, height: 10, speed: 0.014, bob: 0.2 });
  return c;
}

export function hardwareEcosystem() {
  const c = K.stage({ cam: [0, 16, 46], look: [0, 7, 0], fov: 48, fogNear: 50, fogFar: 190 });
  K.lights(c);
  K.grid(c, { size: 140, div: 28, opacity: 0.2 });
  const u = K.uav({ at: [-26, 10, 4], scale: 3.2 });
  c.add(u); K.animateRotors(c, [u]);
  const uavParts = [
    ['flight controller (PX4)', [-26, 6.2, 4]],
    ['GPU / SoC (Orin)', [-30.5, 12.4, 4]],
    ['camera + gimbal', [-22, 7.6, 6.4]],
    ['LiDAR', [-21, 13.4, 2]],
    ['radar + IMU + GNSS', [-31, 8.4, 6]],
    ['5G / mesh radio', [-26, 15.4, 0]],
  ];
  uavParts.forEach(([t, p], i) => {
    c.add(K.label(t, { at: p, size: 0.78, color: '#cfe9ff' }));
    c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p), new THREE.Vector3(-26, 10, 4)]), K.lineMat(C.cyan, 0.35)));
    void i;
  });
  c.add(K.label('UAV', { at: [-26, 18.6, 4], size: 1.5, color: '#a8f0ff' }));
  const rb = K.groundRobot({ at: [-6, 0, 12], scale: 2.4 }); c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
  c.add(K.label('GROUND ROBOT', { at: [-6, 6.4, 12], size: 1.2, color: '#8ff5d0' }));
  c.add(K.label('LiDAR · arm · edge GPU · hours of endurance', { at: [-6, 5, 12], size: 0.66, color: '#8fb6d4', border: 'none' }));
  const sat = K.satellite({ at: [6, 20, -6], scale: 2.2 }); c.add(sat);
  c.tick((t, dt) => { sat.rotation.y += dt * 0.2; });
  c.add(K.label('SATELLITE', { at: [6, 24.4, -6], size: 1.2, color: '#cfe9ff' }));
  c.add(K.label('payload · radios · optical terminal · power', { at: [6, 23, -6], size: 0.66, color: '#8fb6d4', border: 'none' }));
  const gs = K.groundStation({ at: [16, 0, 10], scale: 1.5 }); c.add(gs);
  c.add(K.label('GROUND STATION', { at: [16, 7.4, 10], size: 1.1, color: '#ffe0b0' }));
  const rack = K.serverRack({ at: [28, 0, 6], trim: C.nv, units: 10, h: 5 }); c.add(rack);
  c.add(K.label('EDGE SERVER', { at: [28, 6.4, 6], size: 1.1, color: '#d8f59a' }));
  const cloud = K.gpuPod(c, { rows: 2, cols: 3, trim: C.violet });
  cloud.position.set(30, 0, -14);
  c.add(cloud, K.label('CLOUD GPU CLUSTER', { at: [30, 7, -14], size: 1.1, color: '#e0c9ff' }));
  const links = [[[-26, 8, 4], [16, 4, 10]], [[-6, 2, 12], [-26, 8, 4]], [[6, 18, -6], [16, 5, 10]], [[16, 3, 10], [28, 3, 6]], [[28, 3, 6], [30, 3, -12]]];
  links.forEach(([a, b], i) => K.link(c, a, b, { style: i % 2 ? 'dashed' : 'beam', color: [C.cyan, C.mint, C.ice, C.nv, C.violet][i], width: 0.08, opacity: 0.4, count: 3, speed: 0.3 }));
  c.drift({ radius: 52, height: 18, speed: 0.02 });
  return c;
}

export function computeBands() {
  const c = K.stage({ cam: [0, 20, 44], look: [0, 14, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14 });
  K.starfield(c, 400, 400);
  const bands = [
    ['SATELLITE', 30, C.ice, 0.25, ['on-board triage', 'change detection', 'store & forward']],
    ['UAV / ONBOARD', 20, C.cyan, 0.65, ['perception', 'control policy', 'local planning']],
    ['EDGE', 9, C.nv, 0.85, ['fleet fusion', 'twin slice', 'RAG cache']],
    ['CLOUD', 2, C.violet, 1.0, ['training', 'massive sim', 'LLM reasoning']],
  ];
  bands.forEach(([t, y, col, cap, tasks]) => {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(44, 16), K.glow(col, 0.045));
    plane.rotation.x = -Math.PI / 2; plane.position.y = y;
    const ring = new THREE.Mesh(new THREE.RingGeometry(19, 19.4, 60), K.glow(col, 0.4));
    ring.rotation.x = -Math.PI / 2; ring.position.y = y;
    c.add(plane, ring);
    c.add(K.label(t, { at: [-24, y + 1.4, 0], size: 1.35, color: '#e6f5ff' }));
    const bar = new THREE.Mesh(new THREE.BoxGeometry(cap * 16, 1, 2), K.glow(col, 0.55));
    bar.position.set(-14 + (cap * 16) / 2, y + 0.9, 7);
    c.add(bar, K.label(`compute ${Math.round(cap * 100)}%`, { at: [-14 + cap * 16 + 3.4, y + 0.9, 7], size: 0.7, color: '#cfe6f7', border: 'none' }));
    tasks.forEach((task, j) => c.add(K.label(task, { at: [10, y + 1.6 - j * 1.3, -2], size: 0.68, color: '#8fb6d4', border: 'none', bg: 'none' })));
  });
  K.spine(c, { from: [0, 2, 0], to: [0, 30, 0], color: C.cyan, w: 0.1, count: 12, speed: 0.14, down: true, downColor: C.mint });
  c.add(K.label('WHERE COMPUTE LIVES  ·  latency decides, not preference', { at: [0, 34, 0], size: 1.35, color: '#eaf7ff' }));
  c.drift({ radius: 50, height: 22, speed: 0.02 });
  return c;
}

export function finalMaster() {
  const c = K.stage({ cam: [0, 26, 96], look: [0, 22, 0], fov: 48, fogNear: 120, fogFar: 700 });
  K.lights(c, { key: 1.0, keyPos: [60, 70, 80], accent: 24, accentPos: [0, 26, 14] });
  K.starfield(c, 1300, 1100);
  K.earth(c, { radius: 52, at: [0, -57, 0], spin: 0.012, atmoStrength: 1.3 });
  const shell = K.orbitShell(c, { radius: 64, planes: 3, per: 6, inc: 55, speed: 0.09, simple: true, satSize: 0.6 });
  shell.group.position.set(0, -57, 0);
  const sat1 = K.satellite({ at: [-24, 34, -10], scale: 1.2 });
  const sat2 = K.satellite({ at: [22, 31, 8], scale: 1.0 });
  c.add(sat1, sat2);
  c.tick((t, dt) => { sat1.rotation.y += dt * 0.15; });
  K.link(c, sat1.position, sat2.position, { style: 'beam', color: 0xffffff, width: 0.05, opacity: 0.4, count: 4, speed: 0.5, size: 0.14 });

  const cityG = new THREE.Group();
  cityG.position.set(0, -3.6, 8);
  c.add(cityG);
  const cctx = { add: (...o) => cityG.add(...o), tick: c.tick };
  K.city(cctx, { count: 140, spread: 44, maxH: 12, seed: 191 });
  K.vehicles(cctx, { count: 20, spread: 44 });
  for (let i = 0; i < 3; i++) cityG.add(K.cellTower({ at: [(i - 1) * 15, 0, -15 + i * 6], h: 7, cov: 8 }));
  cityG.add(K.groundStation({ at: [-22, 0, 15], scale: 1.1 }));
  cityG.add(K.serverRack({ at: [20, 0, 16], trim: C.nv }));
  for (let i = 0; i < 3; i++) {
    const rb = K.groundRobot({ at: [-10 + i * 10, -3.6, 22], scale: 1.3 });
    c.add(rb);
    c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
  }
  for (let i = 0; i < 7; i++) cityG.add(K.human(0x9fd8ff, 1.3).translateX(-8 + i * 2.6).translateZ(26));
  K.swarm(c, { count: 12, altitude: 16, spread: 42, mesh: true, meshRange: 20, scale: 1.45, altSpread: 4 });

  const twin = new THREE.Group();
  twin.position.set(-46, 2, 18);
  c.add(twin);
  K.city({ add: (...o) => twin.add(...o), tick: c.tick }, { count: 50, spread: 20, maxH: 7, seed: 191, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b, roads: false });
  const tbox = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(22, 13, 22)), K.lineMat(C.mint, 0.45));
  tbox.position.y = 6.5; twin.add(tbox);
  twin.add(K.label('DIGITAL TWIN', { at: [0, 15, 0], size: 2.2, color: '#8ff5d0' }));

  const dc = K.gpuPod(c, { rows: 2, cols: 3, trim: C.violet });
  dc.position.set(46, 0, 20);
  c.add(dc, K.label('CLOUD · TRAINING · REGISTRY', { at: [46, 9, 20], size: 2, color: '#e0c9ff' }));

  const agents = 7;
  for (let i = 0; i < agents; i++) {
    const a = (i / agents) * Math.PI * 2;
    const orb = K.agentOrb(c, { at: [Math.cos(a) * 15, 28, Math.sin(a) * 9], r: 1.0, color: C.violet, phase: i });
    c.add(orb);
  }
  c.add(K.label('AGENT LAYER', { at: [0, 33, 0], size: 2.1, color: '#e0c9ff' }));

  const words = ['SENSE', 'UNDERSTAND', 'REASON', 'LEARN', 'PLAN', 'ACT', 'ADAPT'];
  const cols = [C.cyan, 0x7fe0d0, C.violet, C.amber, 0xc79bff, C.mint, 0x7fd8ff];
  const R = 26;
  const pts = words.map((w, i) => {
    const a = -Math.PI / 2 + (i / words.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 44, Math.sin(a) * R * 0.4);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.1, 6, 36), K.glow(cols[i], 0.9));
    ring.rotation.x = Math.PI / 2; ring.position.copy(p);
    c.add(ring, K.label(w, { at: [p.x, p.y + 2, p.z], size: 1.7, color: '#eaf7ff' }));
    return p;
  });
  for (let i = 0; i < pts.length; i++) {
    K.link(c, pts[i], pts[(i + 1) % pts.length], { style: 'beam', color: cols[i], width: 0.11, opacity: 0.5, count: 3, speed: 0.36, size: 0.26, side: 0.04 });
  }
  K.spine(c, { from: [0, -2, 0], to: [0, 41, 0], color: C.cyan, w: 0.15, count: 16, speed: 0.11, down: true, downColor: C.mint });
  [[-46, 8, 18], [46, 6, 20]].forEach((p, i) => K.link(c, [0, 20, 6], p, {
    style: 'beam', color: i ? C.violet : C.mint, width: 0.12, opacity: 0.32, count: 4, speed: 0.24, size: 0.3, sag: 0.08,
  }));
  c.drift({ speed: 0.018, bob: 1.2 });
  return c;
}

export function closingRing() {
  const c = K.stage({ cam: [0, 30, 52], look: [0, 12, 0], fov: 46, fogNear: 200, fogFar: 900 });
  K.lights(c, { accent: 22, accentPos: [0, 12, 0] });
  K.starfield(c, 1000, 900);
  K.earth(c, { radius: 30, at: [0, -32, -16], spin: 0.014 });
  const words = ['SENSE', 'UNDERSTAND', 'REASON', 'LEARN', 'PLAN', 'ACT', 'ADAPT'];
  const cols = [C.cyan, 0x7fe0d0, C.violet, C.amber, 0xc79bff, C.mint, 0x7fd8ff];
  const R = 22;
  const pts = words.map((w, i) => {
    const a = -Math.PI / 2 + (i / words.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 12 + Math.sin(a) * 2, Math.sin(a) * R * 0.8);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.09, 6, 40), K.glow(cols[i], 0.95));
    ring.rotation.x = Math.PI / 2; ring.position.copy(p);
    c.add(ring, K.label(w, { at: [p.x, p.y + 2, p.z], size: 1.7, color: '#eaf7ff' }));
    c.tick((t) => { ring.scale.setScalar(1 + 0.09 * Math.sin(t * 2 + i)); });
    return p;
  });
  for (let i = 0; i < pts.length; i++) {
    K.link(c, pts[i], pts[(i + 1) % pts.length], { style: 'beam', color: cols[i], width: 0.11, opacity: 0.55, count: 4, speed: 0.4, size: 0.26, side: 0.05 });
  }
  const u = K.uav({ at: [0, 12, 0], scale: 2.2 });
  c.add(u); K.animateRotors(c, [u]);
  c.tick((t) => { u.rotation.y = t * 0.3; u.position.y = 12 + Math.sin(t) * 0.4; });
  c.drift({ speed: 0.03, bob: 0.6 });
  return c;
}
