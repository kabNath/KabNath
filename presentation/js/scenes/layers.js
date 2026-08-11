import * as K from '../kit.js';
const { THREE, C } = K;

export function l1PhysicalWorld() {
  const c = K.stage({ cam: [0, 30, 62], look: [0, 3, -2], fov: 48, fogNear: 70, fogFar: 240 });
  K.lights(c, { key: 0.85, keyColor: 0xcfe4ff, accent: 14, accentPos: [0, 14, 0] });
  K.terrain(c, { w: 190, h: 190, amp: 3.4, seed: 7, y: -0.6, color: 0x0b1725 });
  K.city(c, { count: 150, spread: 56, maxH: 14, seed: 11, damaged: 0.22 });
  K.vehicles(c, { count: 24, spread: 56 });
  for (let i = 0; i < 6; i++) {
    const h = K.human(0x9fd8ff, 1.4);
    h.position.set(-14 + i * 4, 0, 30);
    c.add(h);
  }
  const farm = new THREE.Group();
  farm.position.set(-52, 0.1, 18);
  for (let i = 0; i < 5; i++) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(9, 5.4), K.glow(0x7fbf3a, 0.22));
    f.rotation.x = -Math.PI / 2;
    f.position.set(0, 0, i * 6 - 12);
    farm.add(f);
    const rows = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(9, 5.4, 6, 3)), K.lineMat(0x9ad60f, 0.3));
    rows.rotation.x = -Math.PI / 2; rows.position.copy(f.position);
    farm.add(rows);
  }
  c.add(farm, K.label('FARMLAND', { at: [-52, 3.4, 18], size: 1.5, color: '#cbe89a' }));

  const ind = new THREE.Group();
  ind.position.set(48, 0, -8);
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 6 + i, 14), K.solid(0x223448, { metalness: 0.7 }));
    t.position.set((i % 2) * 6 - 3, (6 + i) / 2, Math.floor(i / 2) * 7 - 3);
    ind.add(t);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.07, 6, 20), K.glow(C.amber, 0.6));
    ring.rotation.x = Math.PI / 2; ring.position.set(t.position.x, 6 + i, t.position.z);
    ind.add(ring);
  }
  c.add(ind, K.label('INDUSTRIAL SITE', { at: [48, 11, -8], size: 1.5, color: '#ffd9a8' }));

  const sea = new THREE.Mesh(new THREE.PlaneGeometry(200, 60), new THREE.MeshStandardMaterial({
    color: 0x061a2e, metalness: 0.9, roughness: 0.25, emissive: 0x04121f, transparent: true, opacity: 0.9,
  }));
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, -1.4, -84);
  const swell = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.PlaneGeometry(200, 60, 40, 12)), K.lineMat(0x2f7fb8, 0.2));
  swell.rotation.x = -Math.PI / 2; swell.position.set(0, -1.3, -84);
  c.add(sea, swell);
  c.tick((t) => { swell.position.z = -84 + Math.sin(t * 0.4) * 1.2; });
  const ship = new THREE.Mesh(new THREE.BoxGeometry(8, 1.6, 2.6), K.solid(0x2a4258, { metalness: 0.8 }));
  ship.position.set(-30, -0.4, -76);
  c.add(ship, K.label('MARITIME', { at: [-30, 3, -76], size: 1.5, color: '#a8dcf0' }));
  c.tick((t) => { ship.position.x = -30 + Math.sin(t * 0.12) * 26; });

  const zone = new THREE.Mesh(new THREE.CircleGeometry(20, 40), K.glow(C.red, 0.1));
  zone.rotation.x = -Math.PI / 2; zone.position.set(16, 0.06, 14);
  c.add(zone, K.label('DISASTER ZONE', { at: [16, 4, 14], size: 1.6, color: '#ff9aa6' }));
  c.add(K.label('CITY · ROADS · VEHICLES · HUMANS · INFRASTRUCTURE', { at: [0, 20, 26], size: 1.7, color: '#e6f5ff' }));
  c.drift({ radius: 68, height: 32, speed: 0.022, bob: 0.8 });
  return c;
}

export function l2Sensing() {
  const c = K.stage({ cam: [26, 18, 40], look: [0, 8, 0], fov: 44, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 16, accentPos: [0, 16, 0] });
  K.grid(c, { size: 120, div: 24, opacity: 0.22 });
  K.city(c, { count: 80, spread: 44, maxH: 9, seed: 15, roads: true });
  const u = K.uav({ at: [0, 18, 0], scale: 2.4 });
  c.add(u);
  K.animateRotors(c, [u]);
  c.tick((t) => { u.position.x = Math.sin(t * 0.25) * 8; u.position.z = Math.cos(t * 0.2) * 5; u.position.y = 18 + Math.sin(t) * 0.3; });

  const fan = K.lidarFan(c, { rays: 54, r: 12, drop: 17, color: C.mint, speed: 1.6 });
  const fr = K.frustum(c, { w: 9, h: 6, d: 17, color: 0xffd08a });
  const radar = K.scanCone(c, { h: 17, r: 8, color: 0xff8fb0, opacity: 0.07 });
  const rf = K.scanCone(c, { h: 17, r: 13, color: C.violet, opacity: 0.045, phase: 2 });
  c.tick(() => {
    for (const o of [fan, fr, radar, rf]) o.position.copy(u.position);
    fr.position.x += 1.2;
  });
  c.add(fan, fr, radar, rf);

  const sat = K.satellite({ at: [-22, 32, -10], scale: 1.2 });
  c.add(sat);
  const swath = new THREE.Mesh(new THREE.BoxGeometry(10, 32, 2.4), K.glow(C.ice, 0.06));
  swath.position.set(-22, 16, -10);
  c.add(swath);
  const foot = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.4), K.glow(C.ice, 0.4));
  foot.rotation.x = -Math.PI / 2; foot.position.set(-22, 0.1, -10);
  c.add(foot);
  c.tick((t) => {
    const z = -10 + Math.sin(t * 0.2) * 18;
    sat.position.z = z; swath.position.z = z; foot.position.z = z;
  });

  const iot = [];
  const rr = K.rng(6);
  for (let i = 0; i < 14; i++) {
    const p = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), K.glow(C.cyan, 0.9));
    p.position.set((rr() - 0.5) * 44, 0.6 + rr() * 3, (rr() - 0.5) * 44);
    c.add(p); iot.push(p);
  }
  c.tick((t) => iot.forEach((p, i) => { p.scale.setScalar(1 + 0.3 * Math.sin(t * 3 + i)); }));
  const rb = K.groundRobot({ at: [14, 0, 12], scale: 1.5 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 4; });

  const tags = [
    ['LiDAR  ·  point cloud', [10, 12, 8], '#8ff5d0'],
    ['RGB / IR camera  ·  frames', [12, 16, -6], '#ffd9a8'],
    ['RADAR  ·  range-doppler', [-10, 13, 9], '#ffb0c4'],
    ['RF SENSING  ·  spectrum', [-13, 9, -8], '#dcc4ff'],
    ['SATELLITE  ·  multispectral swath', [-22, 36, -10], '#cfe9ff'],
    ['IoT / IMU / GNSS', [18, 5, -14], '#a8f0ff'],
  ];
  tags.forEach(([t, at, col]) => c.add(K.label(t, { at, size: 1.25, color: col })));
  c.drift({ radius: 48, height: 20, speed: 0.028 });
  return c;
}

export function l3Agents() {
  const c = K.stage({ cam: [0, 14, 44], look: [0, 6, 0], fov: 44, fogNear: 50, fogFar: 180 });
  K.lights(c);
  K.grid(c, { size: 130, div: 26, opacity: 0.28 });
  const sat = K.satellite({ at: [-26, 22, -8], scale: 1.1 });
  c.add(sat);
  c.tick((t, dt) => { sat.rotation.y += dt * 0.2; });
  K.swarm(c, { count: 8, altitude: 13, spread: 30, mesh: true, meshRange: 18, scale: 1.15 });
  const solo = K.uav({ at: [-10, 6, 12], scale: 1.9 });
  c.add(solo); K.animateRotors(c, [solo]);
  const rb = K.groundRobot({ at: [10, 0, 14], scale: 1.7 });
  const rb2 = K.groundRobot({ at: [18, 0, 8], scale: 1.4, trim: C.amber });
  c.add(rb, rb2);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3.4; rb2.userData.lidar.rotation.y += dt * 2.6; });
  const av = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 2), K.solid(0x24405c, { metalness: 0.8, emissive: 0x0a1c2c }));
  av.position.set(24, 0.8, 18);
  const avr = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 12), K.glow(C.mint, 0.9));
  avr.position.set(24, 1.7, 18);
  c.add(av, avr);
  c.tick((t) => { av.position.x = 24 - ((t * 3) % 44); avr.position.x = av.position.x; });
  const rack = K.serverRack({ at: [30, 0, -6], trim: C.nv, units: 8 });
  c.add(rack);

  const specs = [
    ['SATELLITE', ['orbit 500–600 km', 'multispectral + SAR', 'NTN backhaul'], [-26, 30, -8]],
    ['UAV SWARM', ['20–60 min endurance', 'aerial base station', 'onboard 100–275 TOPS'], [0, 22, 0]],
    ['UGV / ROBOT', ['LiDAR + arm payload', 'hours of endurance', 'close-range work'], [14, 8, 12]],
    ['AUTONOMOUS VEHICLE', ['logistics + relay', 'mobile edge node'], [26, 6, 18]],
    ['EDGE NODE', ['GPU inference', 'local model store'], [30, 7, -6]],
  ];
  specs.forEach(([t, lines, at]) => {
    c.add(K.label(t, { at, size: 1.35, color: '#e6f5ff' }));
    c.add(K.panel(lines, { size: 2.4, at: [at[0], at[1] - 2.6, at[2]], border: 'rgba(90,200,255,0.3)' }));
  });
  c.drift({ radius: 48, height: 16, speed: 0.026 });
  return c;
}

export function l4Comms() {
  const c = K.stage({ cam: [0, 26, 56], look: [0, 14, 0], fov: 46, fogNear: 70, fogFar: 240 });
  K.lights(c, { accent: 18, accentPos: [0, 20, 0] });
  K.starfield(c, 500, 500);
  K.grid(c, { size: 150, div: 30, opacity: 0.22 });
  K.city(c, { count: 70, spread: 60, maxH: 8, seed: 23, roads: true });

  const sat1 = K.satellite({ at: [-26, 48, -12], scale: 1.2 });
  const sat2 = K.satellite({ at: [22, 46, 10], scale: 1.0 });
  c.add(sat1, sat2);
  c.tick((t) => { sat1.position.x = -26 + Math.sin(t * 0.15) * 8; sat2.position.x = 22 + Math.sin(t * 0.13 + 1) * 8; });

  const uavs = K.swarm(c, { count: 6, altitude: 22, spread: 34, mesh: true, meshRange: 26, scale: 1.2, meshColor: C.cyan });
  const gs = K.groundStation({ at: [-34, 0, 16], scale: 1.3 });
  c.add(gs);
  const towers = [-14, 6, 24].map((x, i) => {
    const tw = K.cellTower({ at: [x, 0, -14 + i * 10], h: 9, cov: 11 });
    c.add(tw);
    return tw;
  });
  const ris = K.risPanel(c, { nx: 10, ny: 7, cell: 0.62, at: [16, 11, -24], rot: [0, -0.7, 0], scale: 1.4 });
  c.add(ris);
  c.add(K.label('RIS  ·  passive beam steering', { at: [16, 16, -24], size: 1.3, color: '#dcc4ff' }));
  for (let i = 0; i < 6; i++) c.add(K.human(0x9fd8ff, 1.3).translateX(-6 + i * 4).translateZ(24));

  const L = [
    { a: [-26, 48, -12], b: [-34, 3, 16], t: 'SAT→GROUND  Ka feeder', st: 'beam', col: C.ice, w: 0.16 },
    { a: [22, 46, 10], b: [4, 22, 4], t: 'SAT→UAV  NTN Ku', st: 'dashed', col: C.ice },
    { a: [-8, 22, -4], b: [10, 22, 8], t: 'UAV↔UAV  mesh', st: 'beam', col: C.cyan, w: 0.1 },
    { a: [4, 22, 4], b: [-14, 9, -14], t: 'UAV→TOWER  fronthaul', st: 'beam', col: C.mint, w: 0.11 },
    { a: [6, 9, -4], b: [16, 11, -24], t: 'TOWER→RIS', st: 'dashed', col: C.violet },
    { a: [16, 11, -24], b: [0, 1.6, 24], t: 'RIS→USERS  reflected', st: 'beam', col: C.violet, w: 0.09 },
    { a: [24, 9, 6], b: [0, 1.6, 24], t: '5G/6G access', st: 'beam', col: C.amber, w: 0.09 },
  ];
  L.forEach((l, i) => K.link(c, l.a, l.b, {
    style: l.st, color: l.col, width: l.w ?? 0.09, opacity: l.st === 'beam' ? 0.42 : 0.8,
    count: 4, speed: 0.28 + i * 0.02, size: 0.2, label: l.t, labelSize: 1.15, labelLift: 1.4,
  }));
  void towers;
  const fso = K.link(c, [-26, 48, -12], [22, 46, 10], {
    style: 'beam', color: 0xffffff, width: 0.05, opacity: 0.5, count: 6, speed: 0.6, size: 0.14,
    label: 'OPTICAL ISL  (FSO)', labelSize: 1.2,
  });
  void fso;
  c.drift({ radius: 62, height: 28, speed: 0.025, bob: 1 });
  return c;
}

export function l5Edge() {
  const c = K.stage({ cam: [0, 12, 34], look: [0, 8, 0], fov: 42, fogNear: 40, fogFar: 150 });
  K.lights(c, { accent: 16, accentColor: C.nv, accentPos: [0, 12, 0] });
  K.grid(c, { size: 90, div: 18, opacity: 0.2 });
  const boards = [
    ['CAMERA / LiDAR INTERFACE', C.cyan],
    ['CPU  ·  flight & ROS 2 nodes', 0x7fd8ff],
    ['GPU  ·  TensorRT inference', C.nv],
    ['NPU / DLA  ·  fixed-function', C.mint],
    ['RADIO  ·  5G modem + mesh', C.violet],
  ];
  boards.forEach((b, i) => {
    const y = 3 + i * 2.4;
    const plate = new THREE.Mesh(new THREE.BoxGeometry(11, 0.22, 7), new THREE.MeshStandardMaterial({
      color: 0x0b1a26, emissive: b[1], emissiveIntensity: 0.18, metalness: 0.7, roughness: 0.35, transparent: true, opacity: 0.8,
    }));
    plate.position.y = y;
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(plate.geometry), K.lineMat(b[1], 0.8));
    edge.position.y = y;
    c.add(plate, edge);
    const rr = K.rng(i + 3);
    for (let j = 0; j < 9; j++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.7 + rr(), 0.3, 0.7 + rr()), K.glow(b[1], 0.55));
      chip.position.set((rr() - 0.5) * 9, y + 0.28, (rr() - 0.5) * 5.4);
      c.add(chip);
    }
    c.add(K.label(b[0], { at: [7.6, y + 0.5, 3.6], size: 0.95, color: '#e6f5ff' }));
  });
  K.spine(c, { from: [-5.4, 2.4, 0], to: [-5.4, 14, 0], color: C.nv, w: 0.1, count: 10, speed: 0.22, down: true, downColor: C.cyan });
  const u = K.uav({ at: [0, 17.5, 0], scale: 1.4 });
  c.add(u); K.animateRotors(c, [u]);
  c.add(K.label('ONBOARD COMPUTE MODULE (exploded)', { at: [0, 19.6, 0], size: 1.3, color: '#d8f59a' }));

  const ladder = [
    ['ONBOARD', '1–20 ms', 0.95, C.nv],
    ['EDGE SERVER', '10–50 ms', 0.6, C.cyan],
    ['REGIONAL CLOUD', '50–200 ms', 0.3, C.violet],
    ['VIA SATELLITE', '200–700 ms', 0.15, C.ice],
  ];
  ladder.forEach((l, i) => {
    const h = 1 + l[2] * 8;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.6, h, 1.6), K.glow(l[3], 0.5));
    bar.position.set(14 + i * 2.6, h / 2, -2);
    c.add(bar);
    c.add(K.label(l[1], { at: [14 + i * 2.6, h + 0.9, -2], size: 0.72, color: '#cfe6f7', border: 'none', bg: 'none' }));
  });
  c.add(K.label('CLOSED-LOOP BUDGET', { at: [18, 11, -2], size: 1.05, color: '#a8f0ff' }));
  c.add(K.panel([
    'perception + control  ONBOARD',
    'fleet fusion + twin  EDGE',
    'training + LLM reasoning  CLOUD',
    '*if the link dies, the loop must not',
  ], { title: 'placement rule', size: 3.4, at: [-13, 8, 4], border: 'rgba(154,214,15,0.45)', titleColor: '#d8f59a' }));
  c.drift({ radius: 36, height: 13, speed: 0.03 });
  return c;
}

export function l6DigitalTwin() {
  const c = K.stage({ cam: [0, 26, 58], look: [0, 6, 0], fov: 48, fogNear: 70, fogFar: 220 });
  K.lights(c, { accent: 14 });
  const real = new THREE.Group();
  real.position.x = -26;
  c.add(real);
  const realCtx = { add: (...o) => real.add(...o), tick: c.tick };
  K.grid(realCtx, { size: 60, div: 12, opacity: 0.28, c1: 0x2b4d6b, c2: 0x16283a });
  K.city(realCtx, { count: 95, spread: 44, maxH: 12, seed: 31, lightColor: 0xffd39a, emissive: 0x0d1626 });
  K.vehicles(realCtx, { count: 14, spread: 44 });
  const ru = K.uav({ at: [6, 12, 4], scale: 1.6 });
  real.add(ru); K.animateRotors(c, [ru]);
  c.tick((t) => { ru.position.x = Math.sin(t * 0.3) * 12; ru.position.z = Math.cos(t * 0.24) * 9; });
  real.add(K.label('PHYSICAL WORLD  ·  TAIPEI', { at: [0, 22, 0], size: 2, color: '#ffe0b0' }));

  const twin = new THREE.Group();
  twin.position.x = 26;
  c.add(twin);
  const twinCtx = { add: (...o) => twin.add(...o), tick: c.tick };
  K.grid(twinCtx, { size: 60, div: 12, opacity: 0.32, c1: 0x2c7f6a, c2: 0x143a30, floorColor: 0x04120e });
  K.city(twinCtx, { count: 95, spread: 44, maxH: 12, seed: 31, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b });
  K.vehicles(twinCtx, { count: 14, spread: 44, color: C.mint });
  const tu = K.uav({ at: [6, 12, 4], scale: 1.6, trim: C.mint, led: C.mint });
  twin.add(tu); K.animateRotors(c, [tu]);
  c.tick((t) => { tu.position.copy(ru.position); tu.rotation.copy(ru.rotation); });
  twin.add(K.label('DIGITAL TWIN  ·  SYNCHRONISED', { at: [0, 22, 0], size: 2, color: '#8ff5d0' }));
  const wire = new THREE.Mesh(new THREE.BoxGeometry(46, 26, 46), K.glow(C.mint, 0.03));
  wire.position.y = 13;
  const wireEdge = new THREE.LineSegments(new THREE.EdgesGeometry(wire.geometry), K.lineMat(C.mint, 0.35));
  wireEdge.position.y = 13;
  twin.add(wire, wireEdge);

  K.arrow(c, [-8, 16, 0], [8, 16, 0], { color: C.cyan, w: 0.16, label: 'TELEMETRY · POSE · SENSORS · NETWORK STATE', labelSize: 1.2, labelOffset: [0, 1.6, 0], pulse: true });
  K.arrow(c, [8, 9, 0], [-8, 9, 0], { color: C.violet, w: 0.16, label: 'OPTIMISED POLICY · PREDICTED RISK · PLAN', labelSize: 1.2, labelOffset: [0, -2.2, 0], pulse: true, phase: 1.6 });
  const clock = K.label('Δt SYNC  <  200 ms', { at: [0, 22.5, 0], size: 1.5, color: '#eaf7ff' });
  c.add(clock);
  c.tick((t) => { clock.material.opacity = 0.6 + 0.4 * Math.sin(t * 2); });
  c.drift({ radius: 64, height: 28, speed: 0.02, bob: 0.8 });
  return c;
}

export function l7Data() {
  const c = K.stage({ cam: [0, 16, 42], look: [0, 9, 0], fov: 44, fogNear: 50, fogFar: 170 });
  K.lights(c, { accent: 14 });
  K.grid(c, { size: 110, div: 22, opacity: 0.2 });
  const sources = [
    ['TELEMETRY', C.cyan], ['VIDEO', 0xffd08a], ['LiDAR', C.mint], ['RF / SPECTRUM', C.violet],
    ['SATELLITE', C.ice], ['GIS / MAPS', 0x7fe0d0], ['SIMULATION', C.nv],
  ];
  sources.forEach((s, i) => {
    const x = (i - (sources.length - 1) / 2) * 6.2;
    const box = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.5, 3), new THREE.MeshStandardMaterial({
      color: 0x0c1a2a, emissive: s[1], emissiveIntensity: 0.25, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.85,
    }));
    box.position.set(x, 19, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(s[1], 0.85));
    e.position.copy(box.position);
    c.add(box, e, K.label(s[0], { at: [x, 21.2, 0], size: 0.82, color: '#e6f5ff' }));
    K.link(c, [x, 18.2, 0], [x * 0.35, 12.5, 0], { style: 'beam', color: s[1], width: 0.07, opacity: 0.4, count: 3, speed: 0.5, size: 0.16 });
  });
  const tiers = [
    ['INGEST  ·  streaming bus', C.cyan, 12],
    ['RAW / BRONZE  ·  immutable', 0x4fc8ff, 9],
    ['CURATED / SILVER  ·  aligned + calibrated', C.mint, 6],
    ['FEATURE / GOLD  ·  training-ready + embeddings', 0x7fe0d0, 3],
  ];
  tiers.forEach((t) => K.slab(c, { w: 26, d: 10, h: 0.4, at: [0, t[2], 0], color: t[1], title: t[0], titleSize: 0.78, opacity: 0.55 }));
  const consumers = ['AI TRAINING', 'DIGITAL TWIN', 'RAG INDEX', 'OPERATOR ANALYTICS'];
  consumers.forEach((t, i) => {
    const x = (i - 1.5) * 8;
    K.link(c, [x * 0.5, 2.6, 0], [x, -1.5, 12], { style: 'dashed', color: C.mint, count: 3, speed: 0.4, opacity: 0.7 });
    c.add(K.label(t, { at: [x, -1.5, 13.5], size: 0.9, color: '#8ff5d0' }));
  });
  c.add(K.panel([
    'schema on read for exploration',
    'schema on write for training sets',
    'every record: time, pose, sensor, mission',
    '*replay any mission bit-exact',
  ], { title: 'contract', size: 3.6, at: [19, 12, 6], border: 'rgba(110,242,192,0.4)', titleColor: '#8ff5d0' }));
  c.drift({ radius: 46, height: 18, speed: 0.026 });
  return c;
}

export function l8RAG() {
  const c = K.stage({ cam: [0, 14, 40], look: [0, 9, 0], fov: 44, fogNear: 45, fogFar: 170 });
  K.lights(c, { accent: 14, accentColor: C.mint });
  K.grid(c, { size: 100, div: 20, opacity: 0.18 });
  const docs = ['REGULATIONS', 'MANUALS', 'MISSION HISTORY', 'MAPS / GIS', 'SATELLITE PRODUCTS', 'SENSOR SUMMARIES'];
  docs.forEach((d, i) => {
    const a = (i / docs.length) * Math.PI * 2;
    const x = Math.cos(a) * 15, z = Math.sin(a) * 8 - 6;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.4), K.glow(0x9fd8ff, 0.18));
    p.position.set(x, 17 + Math.sin(i) * 1.4, z);
    p.lookAt(0, 12, 6);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(p.geometry), K.lineMat(C.ice, 0.6));
    e.position.copy(p.position); e.rotation.copy(p.rotation);
    c.add(p, e, K.label(d, { at: [x, 20 + Math.sin(i) * 1.4, z], size: 0.8, color: '#cfe9ff' }));
    K.link(c, [x, 16, z], [0, 12.6, 0], { style: 'dashed', color: C.ice, count: 2, speed: 0.45, opacity: 0.55 });
    c.tick((t) => { p.position.y = 17 + Math.sin(i + t * 0.6) * 1.4; });
  });
  const emb = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 5), new THREE.MeshStandardMaterial({
    color: 0x0d2436, emissive: C.mint, emissiveIntensity: 0.4, metalness: 0.7, roughness: 0.3, transparent: true, opacity: 0.75,
  }));
  emb.position.y = 11;
  const embE = new THREE.LineSegments(new THREE.EdgesGeometry(emb.geometry), K.lineMat(C.mint, 0.9));
  embE.position.y = 11;
  c.add(emb, embE, K.label('EMBEDDING MODEL', { at: [0, 13.4, 0], size: 1.05, color: '#8ff5d0' }));
  c.tick((t, dt) => { emb.rotation.y += dt * 0.5; embE.rotation.y = emb.rotation.y; });

  const cloud = K.dataCloud(c, { count: 900, r: 7, clusters: 6, at: [-11, 4.5, 0], size: 0.16, colors: [C.cyan, C.mint, C.violet, 0x7fe0d0, C.ice, C.amber] });
  c.add(cloud, K.label('VECTOR DATABASE  ·  ANN index', { at: [-11, 10.6, 0], size: 1.05, color: '#a8f0ff' }));
  const kg = K.knowledgeGraph(c, { nodes: 30, r: 6, at: [12, 4.5, 0], spin: 0.1 });
  c.add(kg, K.label('KNOWLEDGE GRAPH  ·  entities + relations', { at: [12, 10.6, 0], size: 1.05, color: '#8ff5d0' }));
  K.link(c, [0, 9.6, 0], [-11, 8, 0], { style: 'beam', color: C.mint, width: 0.08, opacity: 0.45, count: 3, speed: 0.4 });
  K.link(c, [0, 9.6, 0], [12, 8, 0], { style: 'beam', color: C.mint, width: 0.08, opacity: 0.45, count: 3, speed: 0.4 });
  const q = K.agentOrb(c, { at: [0, 2, 15], r: 1.1, color: C.violet, label: 'AGENT QUERY', labelSize: 0.9 });
  c.add(q);
  K.link(c, [0, 2, 15], [-11, 3, 5], { style: 'dashed', color: C.violet, count: 3, speed: 0.5, opacity: 0.7 });
  K.link(c, [0, 2, 15], [12, 3, 5], { style: 'dashed', color: C.violet, count: 3, speed: 0.5, opacity: 0.7 });
  c.add(K.label('GROUNDED ANSWER  →  MISSION DECISION', { at: [0, -0.6, 15], size: 1.15, color: '#e8ddff' }));
  c.drift({ radius: 44, height: 15, speed: 0.024 });
  return c;
}

export function l9Models() {
  const c = K.stage({ cam: [0, 13, 40], look: [0, 8, 0], fov: 44, fogNear: 45, fogFar: 160 });
  K.lights(c, { accent: 16, accentColor: C.violet });
  K.grid(c, { size: 110, div: 22, opacity: 0.18 });
  const models = [
    ['COMPUTER VISION', 'detect · segment · track', C.cyan],
    ['VISION-LANGUAGE', 'describe · ground · query', C.violet],
    ['LLM REASONER', 'plan · explain · tool-use', 0xc79bff],
    ['MULTIMODAL FUSION', 'image + LiDAR + RF + text', C.mint],
    ['FORECASTING', 'weather · demand · energy', C.amber],
    ['ANOMALY', 'sensor + network + behaviour', 0xff8fb0],
    ['TRAJECTORY', 'ego + others · 5 s horizon', 0x7fd8ff],
    ['CHANNEL PREDICTION', 'CSI · path loss · blockage', 0x7fe0d0],
  ];
  models.forEach((m, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = (col - 1.5) * 9.4, y = 12 - row * 6.6;
    const box = new THREE.Mesh(new THREE.BoxGeometry(7.4, 4, 3.4), new THREE.MeshStandardMaterial({
      color: 0x120f26, emissive: m[2], emissiveIntensity: 0.3, metalness: 0.5, roughness: 0.35, transparent: true, opacity: 0.72,
    }));
    box.position.set(x, y, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(m[2], 0.9));
    e.position.copy(box.position);
    c.add(box, e);
    c.add(K.label(m[0], { at: [x, y + 1.1, 1.75], size: 0.78, color: '#f0eaff', border: 'none', bg: 'none' }));
    c.add(K.label(m[1], { at: [x, y - 0.6, 1.75], size: 0.6, color: '#a9a0c8', border: 'none', bg: 'none' }));
    const rr = K.rng(i + 5);
    for (let j = 0; j < 5; j++) {
      const lay = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.4 * rr() + 0.6, 2.4), K.glow(m[2], 0.4));
      lay.position.set(x - 2.6 + j * 1.3, y - 0.2, -1.2);
      c.add(lay);
      c.tick((t) => { lay.scale.y = 1 + 0.25 * Math.sin(t * 2 + j + i); });
    }
    c.tick((t, dt) => { box.rotation.y = Math.sin(t * 0.2 + i) * 0.05; e.rotation.y = box.rotation.y; });
  });
  const found = K.slab(c, { w: 40, d: 8, h: 0.4, at: [0, 1, 0], color: 0xc79bff, title: 'FOUNDATION MODELS  ·  pretrained backbones, fine-tuned per domain', titleSize: 0.8, opacity: 0.55 });
  void found;
  for (let i = 0; i < 8; i++) {
    const x = (i % 4 - 1.5) * 9.4;
    const y = 12 - Math.floor(i / 4) * 6.6;
    K.link(c, [x, 1.4, 0], [x, y - 2.2, 0], { style: 'beam', color: C.violet, width: 0.06, opacity: 0.3, count: 2, speed: 0.4, size: 0.14 });
  }
  c.add(K.label('MODEL PORTFOLIO — SPECIALISED HEADS ON SHARED BACKBONES', { at: [0, 19, 0], size: 1.4, color: '#e8ddff' }));
  c.drift({ radius: 44, height: 14, speed: 0.022 });
  return c;
}

export function l10Agentic() {
  const c = K.stage({ cam: [0, 36, 44], look: [0, 14, 0], fov: 46, fogNear: 60, fogFar: 200 });
  K.lights(c, { accent: 20, accentColor: C.violet, accentPos: [0, 22, 0] });
  K.grid(c, { size: 130, div: 26, opacity: 0.2 });
  K.city(c, { count: 46, spread: 44, maxH: 7, seed: 44 });
  K.swarm(c, { count: 9, altitude: 10, spread: 32, mesh: true, meshRange: 20, scale: 1.2 });
  const rb = K.groundRobot({ at: [16, 0, 14], scale: 1.4 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });

  const agents = [
    ['MISSION PLANNER', 0xd7a8ff], ['NAVIGATION', 0x9fd8ff], ['COMMUNICATION', C.cyan],
    ['PERCEPTION', C.mint], ['RESOURCE ALLOC', C.amber], ['FLEET MANAGER', 0xffd08a],
    ['SAFETY', C.red], ['ENERGY', 0xffb347], ['DIGITAL TWIN', 0x7fe0d0], ['KNOWLEDGE', 0xc79bff],
  ];
  const R = 19;
  const orbs = agents.map((a, i) => {
    const th = (i / agents.length) * Math.PI * 2;
    const o = K.agentOrb(c, {
      at: [Math.cos(th) * R, 26 + Math.sin(i * 1.7) * 1.2, Math.sin(th) * R * 0.85],
      r: 0.85, color: a[1], label: a[0], labelSize: 0.72, phase: i,
    });
    c.add(o);
    return o;
  });
  const bus = new THREE.Mesh(new THREE.TorusGeometry(R * 0.72, 0.06, 6, 90), K.glow(C.violet, 0.5));
  bus.rotation.x = Math.PI / 2; bus.position.y = 26;
  bus.scale.set(1, 0.85, 1);
  c.add(bus, K.label('ORCHESTRATION BUS  ·  shared blackboard + message passing', { at: [0, 33, 0], size: 1.35, color: '#e8ddff' }));
  for (let i = 0; i < orbs.length; i++) {
    const a = orbs[i].position, b = orbs[(i + 3) % orbs.length].position;
    K.link(c, a, b, { style: 'dashed', color: C.violet, count: 2, speed: 0.55, opacity: 0.35, marchSpeed: 2.4 });
  }
  [[0, -6, 10, 4], [1, 8, 10, -6], [3, -12, 10, -8]].forEach(([i, x, y, z]) => {
    K.link(c, orbs[i].position, [x, y, z], { style: 'beam', color: orbs[i].userData.color, width: 0.07, opacity: 0.4, count: 3, speed: 0.4, size: 0.18 });
  });
  K.link(c, orbs[6].position, [16, 1.6, 14], { style: 'beam', color: C.red, width: 0.07, opacity: 0.45, count: 3, speed: 0.5, size: 0.18, label: 'SAFETY VETO' });
  c.drift({ speed: 0.024, bob: 0.8 });
  return c;
}

export function l11PhysicalAI() {
  const c = K.stage({ cam: [0, 24, 36], look: [0, 9, 0], fov: 46, fogNear: 45, fogFar: 170 });
  K.lights(c, { accent: 16 });
  K.grid(c, { size: 90, div: 18, opacity: 0.25, c1: 0x2b6d9c, c2: 0x11283c });
  const rr = K.rng(12);
  for (let i = 0; i < 16; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.6 + rr() * 2, 1 + rr() * 5, 1.6 + rr() * 2), K.solid(0x1b3a55, { emissive: 0x123a52, emissiveIntensity: 0.9 }));
    b.position.set((rr() - 0.5) * 40, b.geometry.parameters.height / 2, (rr() - 0.5) * 40);
    c.add(b);
  }
  const rb = K.groundRobot({ at: [-5, 0, 6], scale: 1.9 });
  c.add(rb);
  c.tick((t, dt) => {
    rb.userData.lidar.rotation.y += dt * 4;
    rb.position.x = -5 + Math.sin(t * 0.35) * 6;
    rb.rotation.y = Math.cos(t * 0.35) * 0.4;
  });
  const u = K.uav({ at: [7, 9, -4], scale: 1.6 });
  c.add(u); K.animateRotors(c, [u]);
  c.tick((t) => { u.position.set(7 + Math.sin(t * 0.5) * 5, 9 + Math.sin(t * 1.2) * 0.4, -4 + Math.cos(t * 0.45) * 5); });
  const fan = K.lidarFan(c, { rays: 40, r: 7, drop: 1.1, color: C.mint, speed: 2.2 });
  c.add(fan);
  c.tick(() => { fan.position.set(rb.position.x, 2.2, rb.position.z); });

  const stations = ['PERCEPTION', 'UNDERSTANDING', 'REASONING', 'PLANNING', 'CONTROL', 'ACTION'];
  const cols = [C.cyan, 0x7fe0d0, C.violet, 0xc79bff, C.amber, C.mint];
  const R = 15;
  const pts = stations.map((s, i) => {
    const a = -Math.PI / 2 + (i / stations.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 16, Math.sin(a) * R * 0.8);
    const node = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.3, 24), new THREE.MeshStandardMaterial({
      color: 0x0c1b2c, emissive: cols[i], emissiveIntensity: 0.4, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.8,
    }));
    node.position.copy(p);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.05, 6, 40), K.glow(cols[i], 0.9));
    ring.rotation.x = Math.PI / 2; ring.position.copy(p);
    c.add(node, ring, K.label(s, { at: [p.x, p.y + 1.6, p.z], size: 0.9, color: '#e6f5ff' }));
    return p;
  });
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    K.link(c, a, b, { style: 'beam', color: cols[i], width: 0.08, opacity: 0.5, count: 3, speed: 0.42, size: 0.2, side: 0.06 });
  }
  K.link(c, pts[0], [-5, 2.6, 6], { style: 'dashed', color: C.cyan, count: 3, speed: 0.5, opacity: 0.6, label: 'observe' });
  K.link(c, pts[5], [7, 9, -4], { style: 'beam', color: C.mint, width: 0.08, opacity: 0.5, count: 3, speed: 0.5, label: 'act' });
  c.add(K.label('THE LOOP RUNS ON THE ROBOT, NOT IN A SLIDE', { at: [0, 3, 26], size: 1.6, color: '#eaf7ff' }));
  c.drift({ radius: 46, height: 17, speed: 0.026 });
  return c;
}

export function l12Learning() {
  const c = K.stage({ cam: [0, 22, 52], look: [0, 8, 0], fov: 48, fogNear: 60, fogFar: 210 });
  K.lights(c, { accent: 14, accentColor: C.amber });
  K.grid(c, { size: 140, div: 28, opacity: 0.18 });
  const pod = K.gpuPod(c, { rows: 2, cols: 4, trim: C.nv });
  pod.position.set(0, 0, -18);
  c.add(pod, K.label('CENTRAL TRAINING  ·  GPU CLUSTER', { at: [0, 8, -18], size: 1.3, color: '#d8f59a' }));

  const devices = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * 22, z = Math.sin(a) * 12 + 12;
    const d = i < 4 ? K.uav({ at: [x, 7, z], scale: 1.1 }) : K.groundRobot({ at: [x, 0, z], scale: 1.1 });
    c.add(d); devices.push(d);
    if (i < 4) K.animateRotors(c, [d]);
    const chip = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.2), K.glow(C.amber, 0.7));
    chip.position.set(x, (i < 4 ? 9.4 : 3), z);
    c.add(chip, K.label(`local model θ${i + 1}`, { at: [x, (i < 4 ? 11 : 4.6), z], size: 0.72, color: '#ffe0b0' }));
    c.tick((t) => { chip.scale.setScalar(1 + 0.18 * Math.sin(t * 3 + i)); });
    K.link(c, [x, (i < 4 ? 9 : 3), z], [0, 6, -14], { style: 'dashed', color: C.amber, count: 2, speed: 0.5, opacity: 0.55 });
  }
  const agg = K.agentOrb(c, { at: [0, 12, -6], r: 1.4, color: C.amber, color2: C.mint, label: 'FEDERATED AGGREGATION', labelSize: 0.95 });
  c.add(agg);
  K.link(c, [0, 12, -6], [0, 6, -16], { style: 'beam', color: C.nv, width: 0.1, opacity: 0.45, count: 4, speed: 0.4 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    K.link(c, [0, 12, -6], [Math.cos(a) * 22, (i < 4 ? 8 : 2.6), Math.sin(a) * 12 + 12], {
      style: 'beam', color: C.mint, width: 0.055, opacity: 0.3, count: 2, speed: 0.35, size: 0.15,
    });
  }
  const arena = new THREE.Mesh(new THREE.CircleGeometry(15, 48), K.glow(C.violet, 0.045));
  arena.rotation.x = -Math.PI / 2; arena.position.set(-34, 0.05, 6);
  c.add(arena);
  const swarmG = new THREE.Group();
  swarmG.position.set(-34, 0, 6);
  c.add(swarmG);
  K.swarm({ add: (...o) => swarmG.add(...o), tick: c.tick }, { count: 7, altitude: 8, spread: 20, mesh: true, meshRange: 14, scale: 0.9, meshColor: C.violet });
  c.add(K.label('MULTI-AGENT RL ARENA', { at: [-34, 14, 6], size: 1.15, color: '#e0c9ff' }));
  c.add(K.panel([
    'RL  ·  single-agent control',
    'MARL  ·  swarm coordination',
    'FL  ·  privacy-preserving updates',
    'imitation  ·  operator demos',
    'self-supervised  ·  unlabelled sensors',
    '*continual  ·  never stop improving',
  ], { title: 'learning modes', size: 5.2, at: [30, 10, 8], border: 'rgba(255,179,71,0.45)', titleColor: '#ffd08a' }));
  c.drift({ radius: 58, height: 24, speed: 0.022 });
  return c;
}

export function l13Orchestration() {
  const c = K.stage({ cam: [0, 16, 42], look: [0, 10, 0], fov: 44, fogNear: 50, fogFar: 180 });
  K.lights(c, { accent: 14, accentColor: C.amber });
  K.grid(c, { size: 110, div: 22, opacity: 0.2 });
  const board = new THREE.Mesh(new THREE.PlaneGeometry(30, 12), K.glow(C.amber, 0.05));
  board.position.set(0, 20, -6);
  const bE = new THREE.LineSegments(new THREE.EdgesGeometry(board.geometry), K.lineMat(C.amber, 0.6));
  bE.position.copy(board.position);
  c.add(board, bE, K.label('MISSION ORCHESTRATOR  ·  task graph + resource ledger', { at: [0, 27, -6], size: 1.25, color: '#ffe0b0' }));
  const lanes = ['SURVEY', 'RELAY', 'SEARCH', 'DELIVER', 'CHARGE'];
  lanes.forEach((l, i) => {
    const y = 24.4 - i * 2.2;
    c.add(K.label(l, { at: [-13.4, y, -5.9], size: 0.7, color: '#ffd08a', border: 'none', bg: 'none' }));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-11, y, -5.9), new THREE.Vector3(14, y, -5.9)]), K.lineMat(C.amber, 0.2));
    c.add(line);
    const rr = K.rng(i + 21);
    for (let j = 0; j < 4; j++) {
      const w = 1.6 + rr() * 3;
      const card = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.2), K.glow([C.cyan, C.mint, C.violet, C.amber][j % 4], 0.4));
      card.position.set(-9 + j * 6 + rr() * 2, y, -5.85);
      c.add(card);
      c.tick((t) => { card.material.opacity = 0.28 + 0.2 * Math.sin(t * 1.5 + i + j); });
    }
  });
  const assets = [
    ['UAV-01', -14], ['UAV-02', -7], ['UAV-03', 0], ['UGV-01', 7], ['SAT-PASS', 14],
  ];
  assets.forEach(([t, x], i) => {
    const o = i < 3 ? K.uav({ at: [x, 6, 10], scale: 1.1 }) : (i === 3 ? K.groundRobot({ at: [x, 0, 10], scale: 1.1 }) : K.satellite({ at: [x, 8, 10], scale: 0.7 }));
    c.add(o);
    if (i < 3) K.animateRotors(c, [o]);
    c.add(K.label(t, { at: [x, i < 3 ? 8.4 : (i === 3 ? 3.4 : 10.6), 10], size: 0.75, color: '#cfe6f7' }));
    K.link(c, [x * 0.8, 18.4, -6], [x, i === 3 ? 2.6 : 7, 10], { style: 'dashed', color: C.amber, count: 2, speed: 0.5, opacity: 0.6 });
  });
  const ledgers = [['COMPUTE', 0.72, '#9ad60f'], ['SPECTRUM', 0.55, '#35e0ff'], ['ENERGY', 0.61, '#ffb347'], ['AIRSPACE', 0.4, '#ff8fb0']];
  ledgers.forEach((l, i) => c.add(K.gauge(c, { at: [-13 + i * 8.6, 12.5, 6], size: 3.2, value: l[1], color: l[2], label: l[0], phase: i * 1.1 })));
  c.add(K.label('ALLOCATE → EXECUTE → MEASURE → REALLOCATE', { at: [0, 1.5, 14], size: 1.2, color: '#ffe0b0' }));
  c.drift({ radius: 46, height: 17, speed: 0.02 });
  return c;
}

export function l14Human() {
  const c = K.stage({ cam: [0, 11, 30], look: [0, 7, -4], fov: 50, fogNear: 30, fogFar: 120 });
  K.lights(c, { key: 0.55, accent: 12, accentColor: 0xffd08a, accentPos: [0, 8, 6] });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), K.solid(0x080e18, { roughness: 0.85 }));
  floor.rotation.x = -Math.PI / 2;
  c.add(floor);
  K.grid(c, { size: 70, div: 14, opacity: 0.25, floor: false });
  const walls = [
    { lines: ['fleet 14 assets · 12 nominal', 'link budget 87%', 'coverage 92% priority grid'], title: 'mission status', at: [-9.5, 10, -14], size: 5.6 },
    { lines: ['UAV-07 battery 18%  → RTB', 'sector 4 map age 6 min', '*approval required: enter restricted zone'], title: 'alerts', at: [0, 10.6, -15], size: 6.2, border: 'rgba(255,179,71,0.6)', titleColor: '#ffd08a' },
    { lines: ['policy v14.2 live', 'confidence 0.91 · uncertainty low', 'explanation: 3 reasons available'], title: 'ai accountability', at: [9.5, 10, -14], size: 5.6, border: 'rgba(176,123,255,0.6)', titleColor: '#d7a8ff' },
  ];
  walls.forEach((w) => c.add(K.panel(w.lines, { title: w.title, at: w.at, size: w.size, border: w.border, titleColor: w.titleColor })));
  const table = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.8, 0.4, 40), K.solid(0x0d1826, { metalness: 0.7 }));
  table.position.set(0, 2, 2);
  c.add(table);
  const holo = new THREE.Group();
  holo.position.set(0, 2.3, 2);
  c.add(holo);
  K.city({ add: (...o) => holo.add(...o), tick: c.tick }, { count: 45, spread: 10, maxH: 3, seed: 51, lightColor: C.mint, emissive: 0x06231b, roads: false });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(5.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), K.glow(C.mint, 0.05));
  dome.position.copy(holo.position);
  c.add(dome);
  c.tick((t, dt) => { holo.rotation.y += dt * 0.15; });
  const swarmG = new THREE.Group();
  swarmG.position.set(0, 3.2, 2);
  c.add(swarmG);
  K.swarm({ add: (...o) => swarmG.add(...o), tick: c.tick }, { count: 4, altitude: 1.6, spread: 7, scale: 0.35, mesh: true, meshRange: 6, meshColor: C.mint });
  for (let i = 0; i < 3; i++) {
    const op = K.human(0xffd9a8, 1.5);
    op.position.set(-7 + i * 7, 0, 11);
    op.rotation.y = Math.PI;
    c.add(op);
    const desk = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.16, 2.2), K.solid(0x101c2a, { metalness: 0.6 }));
    desk.position.set(-7 + i * 7, 1.5, 9.4);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.9), K.glow([C.cyan, C.amber, C.violet][i], 0.22));
    screen.position.set(-7 + i * 7, 2.7, 8.6);
    screen.rotation.x = -0.22;
    c.add(desk, screen);
  }
  const badge = K.label('HUMAN-IN-THE-LOOP  ·  APPROVE · INTERVENE · OVERRIDE', { at: [0, 15.6, -6], size: 1.35, color: '#ffe0b0' });
  c.add(badge);
  c.tick((t) => { badge.material.opacity = 0.75 + 0.25 * Math.sin(t * 1.6); });
  c.dolly({ from: [-9, 10, 30], to: [9, 12, 28], speed: 0.06 });
  return c;
}

export function l15Deployment() {
  const c = K.stage({ cam: [0, 42, 76], look: [0, 4, -4], fov: 50, fogNear: 90, fogFar: 320 });
  K.lights(c, { accent: 16 });
  K.starfield(c, 600, 700);
  K.terrain(c, { w: 260, h: 260, amp: 5, seed: 19, y: -1, color: 0x091622 });
  const regions = [
    ['REGION A  ·  urban', -58, 10, 0x35e0ff],
    ['REGION B  ·  coastal', 0, -34, 0x7fe0d0],
    ['REGION C  ·  mountain', 56, 14, 0xffb347],
    ['REGION D  ·  industrial', -10, 44, 0xb07bff],
  ];
  regions.forEach(([t, x, z, col], i) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    c.add(g);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(20, 0.12, 6, 60), K.glow(col, 0.5));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.4;
    g.add(ring);
    const gctx = { add: (...o) => g.add(...o), tick: c.tick };
    K.city(gctx, { count: 45, spread: 26, maxH: 7, seed: 60 + i, roads: false, lightColor: col });
    K.swarm(gctx, { count: 5, altitude: 12, spread: 22, mesh: true, meshRange: 16, scale: 1.0, meshColor: col, seed: 30 + i });
    const rb = K.groundRobot({ at: [6, 0, 6], scale: 1.2 });
    g.add(rb);
    c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
    g.add(K.cellTower({ at: [-8, 0, -6], h: 8, cov: 10 }));
    g.add(K.label(t, { at: [0, 20, 0], size: 2.4, color: '#e6f5ff' }));
  });
  const shell = K.orbitShell(c, { radius: 78, planes: 2, per: 5, inc: 62, speed: 0.09, simple: true, satSize: 1.1 });
  shell.group.position.y = 18;
  for (let i = 0; i < 4; i++) {
    const a = regions[i];
    const sat = K.satellite({ at: [a[1] * 0.55, 52, a[2] * 0.55], scale: 1.5 });
    c.add(sat);
    c.tick((t, dt) => { sat.rotation.y += dt * 0.12; });
    K.link(c, sat.position, [a[1], 14, a[2]], { style: 'beam', color: C.ice, width: 0.14, opacity: 0.26, count: 4, speed: 0.25, size: 0.34 });
  }
  for (let i = 0; i < regions.length; i++) {
    const a = regions[i], b = regions[(i + 1) % regions.length];
    K.link(c, [a[1], 12, a[2]], [b[1], 12, b[2]], { style: 'dashed', color: C.cyan, count: 3, speed: 0.2, opacity: 0.4, sag: 0.12 });
  }
  const noc = K.agentOrb(c, { at: [0, 70, 20], r: 3.4, color: C.violet, label: 'GLOBAL AUTONOMY CONTROL', labelSize: 2.4 });
  c.add(noc);
  regions.forEach((a) => K.link(c, [0, 70, 20], [a[1], 20, a[2]], { style: 'dashed', color: C.violet, count: 2, speed: 0.3, opacity: 0.32 }));
  c.drift({ speed: 0.018, bob: 1.6 });
  return c;
}
