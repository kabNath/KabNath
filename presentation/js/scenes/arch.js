import * as K from '../kit.js';
const { THREE, C } = K;

export function simStack() {
  const c = K.stage({ cam: [34, 22, 44], look: [0, 13, 0], fov: 46, fogNear: 60, fogFar: 220 });
  K.lights(c, { accent: 16, accentColor: C.nv, accentPos: [0, 16, 0] });
  K.starfield(c, 350, 400);
  const steps = [
    ['GIS  ·  authoritative geography', C.ice],
    ['OpenStreetMap / GeoJSON  ·  vectors', 0x7fd8ff],
    ['TERRAIN + BUILDINGS  ·  meshes, USD', C.cyan],
    ['TRAFFIC (SUMO)  ·  agents on roads', C.amber],
    ['WEATHER + RADIO  ·  wind, rain, path loss', 0x7fe0d0],
    ['DIGITAL TWIN  ·  one synchronised scene', C.mint],
    ['OMNIVERSE / ISAAC SIM  ·  physics + sensors', C.nv],
    ['ISAAC LAB  ·  massively parallel RL', 0xb8e33f],
    ['ROS 2  ·  middleware, same API as real', 0x9fd8ff],
    ['PX4 + SITL  ·  real flight code in the loop', C.cyan],
    ['HITL  ·  real autopilot, simulated world', C.amber],
    ['REAL UAV  ·  the only test that counts', C.mint],
  ];
  steps.forEach((s, i) => {
    const y = i * 2.4;
    const w = 26 - i * 0.9;
    K.slab(c, { w, d: 9, h: 0.26, at: [i * 1.1 - 6, y, 0], color: s[1], title: s[0], titleSize: 0.7, opacity: 0.5 });
  });
  K.spine(c, { from: [-8, -1, 5.6], to: [7, 28, 5.6], color: C.nv, w: 0.1, count: 14, speed: 0.14 });
  const real = K.uav({ at: [7, 30.5, 0], scale: 1.5 });
  c.add(real); K.animateRotors(c, [real]);
  const gap = K.label('SIM → REAL GAP  ·  measured, not assumed', { at: [7, 33.5, 0], size: 1.25, color: '#d8f59a' });
  c.add(gap);
  c.tick((t) => { gap.material.opacity = 0.65 + 0.35 * Math.sin(t * 1.8); });
  c.add(K.panel([
    'QGIS  →  geospatial preparation',
    'SUMO  →  traffic microsimulation',
    'STK  →  orbits, passes, link windows',
    'Isaac Sim  →  robotics + sensor physics',
    'Isaac Lab  →  parallel policy training',
    'Sionna RT  →  ray-traced radio channels',
    'PX4 / ROS 2  →  the same code as flight',
    '*CUDA  →  everything above, faster',
  ], { title: 'tool responsibilities', size: 8, at: [-22, 16, 6], border: 'rgba(154,214,15,0.45)', titleColor: '#d8f59a' }));
  c.drift({ radius: 56, height: 24, speed: 0.024 });
  return c;
}

export function toolConstellation() {
  const c = K.stage({ cam: [0, 14, 42], look: [0, 8, 0], fov: 44, fogNear: 50, fogFar: 180 });
  K.lights(c, { accent: 14 });
  K.starfield(c, 500, 400);
  K.holoRing(c, { r: 16, color: C.nv, rings: 3, at: [0, 0.2, 0], fill: 0.03 });
  const groups = [
    ['SIMULATION', ['Omniverse', 'Isaac Sim', 'Isaac Lab', 'SUMO', 'STK', 'QGIS'], C.nv, 0],
    ['ROBOTICS', ['ROS 2', 'PX4', 'MAVLink'], C.cyan, 1],
    ['AI', ['PyTorch', 'CUDA', 'LLM/VLM', 'RL', 'MARL', 'FL', 'RAG'], C.violet, 2],
    ['COMMS', ['5G', '6G', 'NTN', 'Sionna', 'O-RAN'], 0x7fd8ff, 3],
    ['INFRA', ['Kubernetes', 'GPU cluster', 'Edge', 'Cloud'], C.amber, 4],
    ['DATA', ['GIS', 'telemetry', 'sensors', 'satellite'], C.mint, 5],
  ];
  groups.forEach(([t, items, col, idx]) => {
    const a = (idx / groups.length) * Math.PI * 2;
    const cx = Math.cos(a) * 13, cz = Math.sin(a) * 13;
    const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), new THREE.MeshStandardMaterial({
      color: col, emissive: col, emissiveIntensity: 1, metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0.6,
    }));
    hub.position.set(cx, 7, cz);
    c.add(hub, K.label(t, { at: [cx, 9.2, cz], size: 1.15, color: '#e6f5ff' }));
    items.forEach((it, j) => {
      const aa = a + (j - (items.length - 1) / 2) * 0.19;
      const rr = 19 + (j % 2) * 3.4;
      const p = new THREE.Vector3(Math.cos(aa) * rr, 6 + (j % 3) * 1.6, Math.sin(aa) * rr);
      const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), K.glow(col, 0.9));
      node.position.copy(p);
      c.add(node, K.label(it, { at: [p.x, p.y + 1.1, p.z], size: 0.66, color: '#cfe6f7', border: 'none' }));
      c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([hub.position, p]), K.lineMat(col, 0.3)));
    });
    K.link(c, [0, 7, 0], [cx, 7, cz], { style: 'beam', color: col, width: 0.06, opacity: 0.35, count: 2, speed: 0.3, size: 0.16 });
  });
  const core = K.agentOrb(c, { at: [0, 7, 0], r: 1.8, color: C.cyan, color2: C.mint, label: 'PLATFORM', labelSize: 1.1 });
  c.add(core);
  c.drift({ radius: 44, height: 16, speed: 0.03 });
  return c;
}

export function aiStack() {
  const c = K.stage({ cam: [26, 20, 40], look: [0, 14, 0], fov: 46, fogNear: 55, fogFar: 200 });
  K.lights(c, { accent: 18, accentColor: C.violet, accentPos: [0, 18, 0] });
  K.starfield(c, 350, 350);
  const tiers = [
    ['RAW DATA', 'sensors · video · LiDAR · RF · satellite', C.cyan],
    ['DATA ENGINEERING', 'clean · align · label · version', 0x4fc8ff],
    ['FEATURE / EMBEDDING', 'multimodal encoders', 0x7fe0d0],
    ['RAG · VECTOR DB · KNOWLEDGE GRAPH', 'grounding + citations', C.mint],
    ['FOUNDATION MODELS', 'shared backbones', 0xc79bff],
    ['SPECIALISED MODELS', 'perception · prediction · channel', C.violet],
    ['AGENTS', 'objective · memory · tools · reasoning', 0xd7a8ff],
    ['MULTI-AGENT ORCHESTRATION', 'negotiate · allocate · resolve', 0xe0c9ff],
    ['PHYSICAL AI', 'plan → control → actuate', C.amber],
    ['ROBOT / UAV / SATELLITE ACTION', 'effect in the physical world', C.mint],
  ];
  tiers.forEach((t, i) => {
    const y = i * 2.9;
    K.slab(c, { w: 30 - i * 0.6, d: 10, h: 0.3, at: [0, y, 0], color: t[2], title: t[0], titleSize: 0.78, opacity: 0.48 });
    c.add(K.label(t[1], { at: [-15.6 + i * 0.3, y + 0.2, 5.4], size: 0.68, color: '#93b3cf', border: 'none', bg: 'none' }));
    if (i < tiers.length - 1) {
      K.arrow(c, [11, y + 0.6, 0], [11, y + 2.4, 0], { color: t[2], w: 0.1, opacity: 0.85 });
    }
  });
  K.spine(c, { from: [-11, 0, 0], to: [-11, 27, 0], color: C.violet, w: 0.1, count: 14, speed: 0.16, down: true, downColor: C.cyan });
  const u = K.uav({ at: [0, 30.5, 0], scale: 1.4 });
  c.add(u); K.animateRotors(c, [u]);
  c.add(K.label('ACTION IN THE PHYSICAL WORLD', { at: [0, 33, 0], size: 1.3, color: '#8ff5d0' }));
  c.add(K.label('FEEDBACK: outcome → data → better models', { at: [-14, 14, -6], size: 1.0, color: '#a8f0ff' }));
  c.drift({ radius: 48, height: 22, speed: 0.024 });
  return c;
}

export function agentGraph3D() {
  const c = K.stage({ cam: [0, 18, 44], look: [0, 12, 0], fov: 46, fogNear: 55, fogFar: 190 });
  K.lights(c, { accent: 18, accentColor: C.violet, accentPos: [0, 20, 0] });
  K.starfield(c, 400, 350);
  const levels = [
    [['MISSION AGENT', C.violet]],
    [['MISSION PLANNER', 0xd7a8ff]],
    [['NAV', 0x9fd8ff], ['COMMS', C.cyan], ['ENERGY', C.amber], ['RESOURCE', 0xffd08a], ['KNOWLEDGE', 0xc79bff]],
    [['PERCEPTION', C.mint], ['DIGITAL TWIN', 0x7fe0d0], ['SAFETY', C.red]],
    [['FLEET MANAGER', 0xe0c9ff]],
  ];
  const yTop = 26, dy = 4.6;
  const nodes = [];
  levels.forEach((lvl, li) => {
    const y = yTop - li * dy;
    lvl.forEach((n, i) => {
      const x = (i - (lvl.length - 1) / 2) * 8.2;
      const orb = K.agentOrb(c, { at: [x, y, 0], r: li === 0 ? 1.2 : 0.8, color: n[1], label: n[0], labelSize: 0.72, phase: li + i });
      c.add(orb);
      nodes.push({ x, y, li, i, col: n[1] });
    });
  });
  for (let li = 0; li < levels.length - 1; li++) {
    const from = nodes.filter((n) => n.li === li);
    const to = nodes.filter((n) => n.li === li + 1);
    from.forEach((a) => to.forEach((b) => {
      K.link(c, [a.x, a.y - 1.1, 0], [b.x, b.y + 1.1, 0], {
        style: 'dashed', color: b.col, count: 2, speed: 0.55, opacity: 0.45, marchSpeed: 2.2,
      });
    }));
  }
  const bus = new THREE.Mesh(new THREE.BoxGeometry(40, 0.12, 3), K.glow(C.violet, 0.25));
  bus.position.set(0, yTop - 2.3, -6);
  c.add(bus, K.label('ORCHESTRATION LAYER  ·  message bus + shared blackboard', { at: [0, yTop - 1.2, -6], size: 0.95, color: '#e8ddff' }));
  const fleet = nodes.find((n) => n.li === 4);
  const assets = [K.uav({ at: [-8, 3.2, 8], scale: 1.2 }), K.groundRobot({ at: [0, 0, 9], scale: 1.2 }), K.satellite({ at: [9, 4, 8], scale: 0.8 })];
  c.add(...assets);
  K.animateRotors(c, [assets[0]]);
  c.tick((t, dt) => { assets[1].userData.lidar.rotation.y += dt * 3; assets[2].rotation.y += dt * 0.3; });
  assets.forEach((a, i) => K.link(c, [fleet.x, fleet.y - 1.1, 0], a.position, {
    style: 'beam', color: [C.cyan, C.mint, C.ice][i], width: 0.08, opacity: 0.45, count: 3, speed: 0.45, size: 0.18,
  }));
  c.add(K.label('UAV / ROBOT / SATELLITE', { at: [0, -1.6, 9], size: 1.05, color: '#cfe6f7' }));
  c.drift({ radius: 48, height: 20, speed: 0.02 });
  return c;
}

export function agentAnatomy() {
  const c = K.stage({ cam: [0, 8, 30], look: [0, 7, 0], fov: 42, fogNear: 35, fogFar: 130 });
  K.lights(c, { accent: 22, accentColor: C.violet, accentPos: [0, 8, 0] });
  K.starfield(c, 300, 250);
  const core = K.agentOrb(c, { at: [0, 7, 0], r: 2.2, color: C.violet, color2: C.cyan, label: 'AGENT', labelSize: 1.1 });
  c.add(core);
  const parts = [
    ['OBJECTIVE', 'measurable goal + success test', 0xd7a8ff],
    ['STATE', 'current belief about the world', C.cyan],
    ['MEMORY', 'episodic + long-term (RAG)', C.mint],
    ['TOOLS', 'models · solvers · twin · APIs', C.nv],
    ['REASONING', 'plan → critique → replan', 0xc79bff],
    ['COMMUNICATION', 'messages + contracts', 0x7fd8ff],
    ['ACTION', 'bounded, logged, revocable', C.amber],
  ];
  parts.forEach((p, i) => {
    const a = (i / parts.length) * Math.PI * 2 - Math.PI / 2;
    const R = 9.4;
    const pos = [Math.cos(a) * R, 7 + Math.sin(a * 2) * 1.6, Math.sin(a) * R * 0.55];
    const node = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.5, 1.4), new THREE.MeshStandardMaterial({
      color: 0x140f28, emissive: p[2], emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.8,
    }));
    node.position.set(...pos);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(node.geometry), K.lineMat(p[2], 0.9));
    e.position.copy(node.position);
    c.add(node, e);
    c.add(K.label(p[0], { at: [pos[0], pos[1] + 1.4, pos[2]], size: 0.8, color: '#f0eaff' }));
    c.add(K.label(p[1], { at: [pos[0], pos[1] - 1.4, pos[2]], size: 0.58, color: '#a9a0c8', border: 'none', bg: 'none' }));
    K.link(c, [0, 7, 0], pos, { style: 'beam', color: p[2], width: 0.055, opacity: 0.4, count: 2, speed: 0.4, size: 0.14, both: true });
    c.tick((t) => { node.position.y = pos[1] + Math.sin(t * 0.9 + i) * 0.25; e.position.y = node.position.y; });
  });
  c.add(K.label('EVERY AGENT IS THE SAME SEVEN THINGS', { at: [0, 14.6, 0], size: 1.3, color: '#e8ddff' }));
  c.drift({ radius: 31, height: 9, speed: 0.035 });
  return c;
}

export function ragPipeline() {
  const c = K.stage({ cam: [0, 12, 42], look: [0, 8, 0], fov: 44, fogNear: 50, fogFar: 180 });
  K.lights(c, { accent: 14, accentColor: C.mint });
  K.grid(c, { size: 120, div: 24, opacity: 0.16 });
  const chain = K.chainStations(c, [
    { title: 'CORPUS', sub: 'docs·maps·history', color: C.ice },
    { title: 'EMBED', sub: 'multimodal encoder', color: C.mint },
    { title: 'VECTOR DB', sub: 'ANN index', color: C.cyan },
    { title: 'RETRIEVER', sub: 'hybrid search', color: 0x7fe0d0 },
    { title: 'RERANKER', sub: 'cross-encoder', color: C.nv },
    { title: 'LLM / VLM', sub: 'grounded generation', color: C.violet },
    { title: 'AGENT', sub: 'decides + cites', color: 0xd7a8ff },
  ], { gap: 6.6, y: 8, bw: 4.8, bh: 2.8, bd: 2.4, labelSize: 0.62, linkColor: C.mint });
  void chain;
  const kg = K.knowledgeGraph(c, { nodes: 22, r: 4, at: [3, 17, -4], spin: 0.12 });
  c.add(kg, K.label('KNOWLEDGE GRAPH  ·  relations + constraints', { at: [3, 22, -4], size: 0.95, color: '#8ff5d0' }));
  K.link(c, [3, 14, -4], [3.2, 9.6, 0], { style: 'dashed', color: C.mint, count: 2, speed: 0.5, opacity: 0.6 });
  const cloud = K.dataCloud(c, { count: 500, r: 4, clusters: 5, at: [-9.4, 14.5, -3], size: 0.13 });
  c.add(cloud);
  const dec = K.panel([
    'answer: “sector 4 unsafe below 40 m”',
    'sources: NOTAM 12/4 · manual §7 · mission 214',
    'confidence 0.93 · uncertainty flagged: none',
    '*action: replan altitude, notify operator',
  ], { title: 'mission decision', size: 5.4, at: [16, 3, 8], border: 'rgba(176,123,255,0.5)', titleColor: '#d7a8ff' });
  c.add(dec);
  c.add(K.label('THE MODEL DOES NOT RELY ON PRETRAINED MEMORY', { at: [0, 14, 8], size: 1.3, color: '#eaf7ff' }));
  c.drift({ radius: 46, height: 14, speed: 0.02 });
  return c;
}

export function physicalAILoop() {
  const c = K.stage({ cam: [0, 40, 40], look: [0, 10, 0], fov: 48, fogNear: 50, fogFar: 200 });
  K.lights(c, { accent: 22, accentPos: [0, 14, 0] });
  K.starfield(c, 500, 500);
  K.grid(c, { size: 130, div: 26, opacity: 0.18 });
  const stations = [
    ['PHYSICAL WORLD', C.ice], ['SENSORS', C.cyan], ['PERCEPTION MODEL', 0x4fc8ff],
    ['WORLD MODEL', C.mint], ['REASONING', C.violet], ['PLANNING', 0xc79bff],
    ['CONTROL POLICY', C.amber], ['ACTUATOR', 0xffd08a],
  ];
  const R = 19;
  const pts = [];
  stations.forEach((s, i) => {
    const a = -Math.PI / 2 + (i / stations.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 9 + Math.sin(a * 2) * 1.2, Math.sin(a) * R * 0.9);
    pts.push(p);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 0.5, 28), new THREE.MeshStandardMaterial({
      color: 0x0b1a2b, emissive: s[1], emissiveIntensity: 0.45, metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.85,
    }));
    pillar.position.copy(p);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 6, 44), K.glow(s[1], 0.9));
    halo.rotation.x = Math.PI / 2; halo.position.copy(p);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 5, 20, 1, true), K.glow(s[1], 0.07));
    beam.position.set(p.x, p.y + 2.5, p.z);
    c.add(pillar, halo, beam);
    c.add(K.label(s[0], { at: [p.x, p.y + 2.6, p.z], size: 1.15, color: '#eaf7ff' }));
    c.tick((t) => { halo.scale.setScalar(1 + 0.08 * Math.sin(t * 2 + i)); });
  });
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    K.link(c, a, b, { style: 'beam', color: stations[i][1], width: 0.11, opacity: 0.55, count: 4, speed: 0.4, size: 0.26, side: 0.07 });
  }
  const cityG = new THREE.Group();
  c.add(cityG);
  K.city({ add: (...o) => cityG.add(...o), tick: c.tick }, { count: 40, spread: 16, maxH: 5, seed: 61, roads: false });
  const u = K.uav({ at: [0, 8, 0], scale: 1.8 });
  c.add(u); K.animateRotors(c, [u]);
  c.tick((t) => { u.position.set(Math.sin(t * 0.5) * 4, 8 + Math.sin(t * 1.2) * 0.4, Math.cos(t * 0.5) * 3); });
  const rb = K.groundRobot({ at: [4, 0, 4], scale: 1.4 });
  c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 4; });
  K.link(c, [0, 8, 0], pts[1], { style: 'dashed', color: C.cyan, count: 3, speed: 0.6, opacity: 0.55 });
  K.link(c, pts[7], [0, 8, 0], { style: 'beam', color: C.amber, width: 0.09, opacity: 0.6, count: 3, speed: 0.6 });
  c.add(K.label('THE LOOP NEVER STOPS  ·  10–100 Hz', { at: [0, 4, 30], size: 2.1, color: '#eaf7ff' }));
  c.drift({ speed: 0.022, bob: 0.6 });
  return c;
}

export function dtArchitecture() {
  const c = K.stage({ cam: [0, 20, 52], look: [0, 10, 0], fov: 48, fogNear: 60, fogFar: 210 });
  K.lights(c, { accent: 14 });
  const left = new THREE.Group(); left.position.x = -24; c.add(left);
  const lctx = { add: (...o) => left.add(...o), tick: c.tick };
  K.grid(lctx, { size: 52, div: 13, opacity: 0.26, c1: 0x2b4d6b, c2: 0x16283a });
  K.city(lctx, { count: 80, spread: 38, maxH: 11, seed: 71, lightColor: 0xffd39a });
  K.vehicles(lctx, { count: 12, spread: 38 });
  const lu = K.uav({ at: [4, 13, 2], scale: 1.5 }); left.add(lu); K.animateRotors(c, [lu]);
  left.add(K.cellTower({ at: [-12, 0, -8], h: 8, cov: 9 }));
  left.add(K.label('REAL WORLD', { at: [0, 22, 0], size: 2.1, color: '#ffe0b0' }));
  left.add(K.label('Taipei · UAV · vehicles · weather · RAN', { at: [0, 20, 0], size: 0.95, color: '#cbb08a', border: 'none', bg: 'none' }));

  const right = new THREE.Group(); right.position.x = 24; c.add(right);
  const rctx = { add: (...o) => right.add(...o), tick: c.tick };
  K.grid(rctx, { size: 52, div: 13, opacity: 0.3, c1: 0x2c7f6a, c2: 0x143a30, floorColor: 0x04120e });
  K.city(rctx, { count: 80, spread: 38, maxH: 11, seed: 71, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b });
  K.vehicles(rctx, { count: 12, spread: 38, color: C.mint });
  const ru = K.uav({ at: [4, 13, 2], scale: 1.5, trim: C.mint, led: C.mint }); right.add(ru); K.animateRotors(c, [ru]);
  right.add(K.cellTower({ at: [-12, 0, -8], h: 8, cov: 9 }));
  right.add(K.label('DIGITAL TWIN', { at: [0, 22, 0], size: 2.1, color: '#8ff5d0' }));
  right.add(K.label('same geometry · simulated sensors · modelled channel', { at: [0, 20, 0], size: 0.95, color: '#78bfa6', border: 'none', bg: 'none' }));
  c.tick((t) => {
    lu.position.set(Math.sin(t * 0.35) * 10, 13 + Math.sin(t) * 0.4, Math.cos(t * 0.3) * 8);
    ru.position.copy(lu.position);
  });
  const ghost = new THREE.Mesh(new THREE.BoxGeometry(40, 24, 40), K.glow(C.mint, 0.025));
  ghost.position.y = 12; right.add(ghost);
  right.add(new THREE.LineSegments(new THREE.EdgesGeometry(ghost.geometry), K.lineMat(C.mint, 0.3)).translateY(12));

  K.arrow(c, [-9, 17, 0], [9, 17, 0], { color: C.cyan, w: 0.18, label: '1 · TELEMETRY → TWIN', labelSize: 1.15, labelOffset: [0, 1.8, 0], pulse: true });
  K.arrow(c, [9, 11, 0], [-9, 11, 0], { color: C.violet, w: 0.18, label: '2 · TWIN → OPTIMISED POLICY', labelSize: 1.15, labelOffset: [0, 1.8, 0], pulse: true, phase: 1.2 });
  K.arrow(c, [-9, 5, 0], [-9, 11, 0], { color: C.mint, w: 0.12, label: '3 · POLICY → REAL UAV', labelSize: 1.0, labelOffset: [-4.6, 0, 0] });
  const sync = K.panel([
    'pose + IMU  50 Hz',
    'perception summary  5 Hz',
    'network KPI  1 Hz',
    'geometry delta  on change',
    '*twin age budget  < 200 ms',
  ], { title: 'synchronisation channels', size: 6, at: [0, 4.6, 16], border: 'rgba(53,224,255,0.5)' });
  c.add(sync);
  c.drift({ radius: 58, height: 22, speed: 0.02, bob: 0.6 });
  return c;
}

export function commGlobal() {
  const c = K.stage({ cam: [0, 18, 58], look: [0, 14, 0], fov: 46, fogNear: 70, fogFar: 420 });
  K.lights(c, { key: 0.95, accent: 20, accentPos: [0, 16, 8] });
  K.starfield(c, 900, 800);
  K.earth(c, { radius: 38, at: [0, -42, -10], spin: 0.014, atmoStrength: 1.15 });
  const shell = K.orbitShell(c, { radius: 48, planes: 2, per: 6, inc: 56, speed: 0.12, simple: true, satSize: 0.5 });
  shell.group.position.set(0, -42, -10);

  const sat1 = K.satellite({ at: [-19, 32, -8], scale: 1.15 });
  const sat2 = K.satellite({ at: [16, 29, 6], scale: 1.0 });
  c.add(sat1, sat2);
  c.tick((t) => { sat2.position.x = 16 + Math.sin(t * 0.16) * 5; });

  const cityG = new THREE.Group();
  cityG.position.set(0, -3, 6);
  c.add(cityG);
  const cctx = { add: (...o) => cityG.add(...o), tick: c.tick };
  K.city(cctx, { count: 90, spread: 36, maxH: 9, seed: 81 });
  for (let i = 0; i < 3; i++) cityG.add(K.cellTower({ at: [(i - 1) * 14, 0, -11 + i * 7], h: 7, cov: 8 }));
  cityG.add(K.groundStation({ at: [-19, 0, 13], scale: 1.1 }));
  cityG.add(K.serverRack({ at: [16, 0, 14], trim: C.nv }));
  cityG.add(K.label('EDGE SERVERS', { at: [16, 6, 14], size: 1.2, color: '#d8f59a' }));
  for (let i = 0; i < 8; i++) cityG.add(K.human(0x9fd8ff, 1.3).translateX(-9 + i * 2.6).translateZ(20));
  K.swarm(c, { count: 8, altitude: 15, spread: 34, mesh: true, meshRange: 20, scale: 1.35 });

  const links = [
    [sat1.position, [-19, -0.6, 19], 'beam', C.ice, 'SAT→GROUND (Ka)', 0.13],
    [sat2.position, [5, 15, 3], 'dashed', C.ice, 'SAT→UAV (Ku NTN)', 0.08],
    [[-9, 15, -3], [10, 15, 7], 'beam', C.cyan, 'UAV↔UAV mesh', 0.1],
    [[3, 15, 2], [-14, 4, -11], 'beam', C.mint, 'UAV→TOWER', 0.1],
    [sat1.position, sat2.position, 'beam', 0xffffff, 'OPTICAL ISL', 0.05],
  ];
  links.forEach(([p, q, st, col, lab, w], i) => K.link(c, p, q, {
    style: st, color: col, width: w, opacity: st === 'beam' ? 0.42 : 0.85,
    count: 4, speed: 0.26 + i * 0.02, size: 0.22, label: lab, labelSize: 1.25, labelLift: 1.6,
  }));
  c.drift({ speed: 0.024, bob: 0.8 });
  return c;
}

export function federated() {
  const c = K.stage({ cam: [0, 18, 46], look: [0, 9, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 16, accentColor: C.mint });
  K.grid(c, { size: 130, div: 26, opacity: 0.18 });
  const devices = [
    ['UAV 1', 'uav', -24, 12], ['UAV 2', 'uav', -8, 20], ['UAV 3', 'uav', 8, 20],
    ['ROBOT 1', 'ugv', 24, 12], ['ROBOT 2', 'ugv', 18, -6], ['EDGE SERVER', 'edge', -18, -6],
  ];
  const nodes = devices.map(([t, kind, x, z], i) => {
    const o = kind === 'uav' ? K.uav({ at: [x, 8, z], scale: 1.2 })
      : kind === 'ugv' ? K.groundRobot({ at: [x, 0, z], scale: 1.3 })
        : K.serverRack({ at: [x, 0, z], trim: C.nv });
    c.add(o);
    if (kind === 'uav') K.animateRotors(c, [o]);
    if (kind === 'ugv') c.tick((t, dt) => { o.userData.lidar.rotation.y += dt * 3; });
    const y = kind === 'uav' ? 10.6 : 5.4;
    c.add(K.label(t, { at: [x, y + 2.6, z], size: 0.95, color: '#e6f5ff' }));
    const data = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1.7), K.glow(C.red, 0.35));
    data.position.set(x - 2.4, y, z);
    const dE = new THREE.LineSegments(new THREE.EdgesGeometry(data.geometry), K.lineMat(C.red, 0.8));
    dE.position.copy(data.position);
    c.add(data, dE, K.label('raw data STAYS', { at: [x - 2.4, y + 1.6, z], size: 0.62, color: '#ff9aa6', border: 'none', bg: 'none' }));
    const model = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), K.glow(C.mint, 0.9));
    model.position.set(x + 2.4, y, z);
    c.add(model, K.label('Δθ leaves', { at: [x + 2.4, y + 1.5, z], size: 0.62, color: '#8ff5d0', border: 'none', bg: 'none' }));
    c.tick((t) => { model.rotation.y = t * 1.2 + i; model.scale.setScalar(1 + 0.2 * Math.sin(t * 2.4 + i)); });
    return { x, z, y };
  });
  const agg = K.agentOrb(c, { at: [0, 20, 0], r: 2.2, color: C.mint, color2: C.cyan, label: 'SECURE AGGREGATION', labelSize: 1.05 });
  c.add(agg);
  nodes.forEach((n, i) => {
    K.link(c, [n.x + 2.4, n.y, n.z], [0, 20, 0], { style: 'dashed', color: C.mint, count: 2, speed: 0.5, opacity: 0.6, marchSpeed: 2 });
    K.link(c, [0, 20, 0], [n.x, n.y - 1.2, n.z], { style: 'beam', color: C.cyan, width: 0.06, opacity: 0.3, count: 2, speed: 0.34, size: 0.16 });
    void i;
  });
  const glob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshStandardMaterial({
    color: C.cyan, emissive: C.cyan, emissiveIntensity: 1.1, metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0.6,
  }));
  glob.position.set(0, 27, 0);
  c.add(glob, K.label('GLOBAL MODEL θ', { at: [0, 29.6, 0], size: 1.25, color: '#a8f0ff' }));
  c.tick((t, dt) => { glob.rotation.y += dt * 0.6; });
  K.arrow(c, [0, 22.6, 0], [0, 25.4, 0], { color: C.mint, w: 0.1, pulse: true });
  c.add(K.panel([
    'device: train on local data',
    'device → server: Δθ only (encrypted)',
    'server: secure aggregation (FedAvg)',
    'server → device: new global θ',
    '*no raw imagery, no personal data, no location traces',
  ], { title: 'protocol', size: 6.4, at: [0, 4, 22], border: 'rgba(110,242,192,0.5)', titleColor: '#8ff5d0' }));
  c.drift({ radius: 50, height: 20, speed: 0.022 });
  return c;
}

export function marlSwarm(opts = {}) {
  const c = K.stage({ cam: opts.cam ?? [0, 24, 50], look: [0, 10, 0], fov: 48, fogNear: 60, fogFar: 200 });
  K.lights(c, { accent: 16, accentColor: C.violet });
  K.grid(c, { size: 130, div: 26, opacity: 0.2 });
  K.city(c, { count: 80, spread: 52, maxH: 12, seed: 91 });
  const users = [];
  const rr = K.rng(14);
  for (let i = 0; i < 22; i++) {
    const h = K.human(0x9fd8ff, 1.1);
    h.position.set((rr() - 0.5) * 48, 0, (rr() - 0.5) * 48);
    c.add(h); users.push(h);
    const dem = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1 + rr() * 3, 6), K.glow(C.amber, 0.5));
    dem.position.set(h.position.x, dem.geometry.parameters.height / 2 + 1.6, h.position.z);
    c.add(dem);
  }
  const uavs = K.swarm(c, { count: 6, altitude: 16, spread: 40, mesh: true, meshRange: 26, scale: 1.4, meshColor: C.violet });
  uavs.forEach((u, i) => {
    const cone = K.scanCone(c, { h: 16, r: 9, color: C.cyan, opacity: 0.05, phase: i });
    c.add(cone);
    c.tick(() => cone.position.copy(u.position));
    const l = K.label(`AGENT ${i + 1}`, { size: 0.72, color: '#e0c9ff', border: 'none', bg: 'rgba(4,10,20,0.5)' });
    c.add(l);
    c.tick(() => { l.position.set(u.position.x, u.position.y + 2.2, u.position.z); });
  });
  const field = new THREE.Mesh(new THREE.PlaneGeometry(52, 52, 26, 26), new THREE.MeshBasicMaterial({
    color: C.violet, transparent: true, opacity: 0.12, wireframe: true,
  }));
  field.rotation.x = -Math.PI / 2; field.position.y = 0.4;
  c.add(field);
  const sar = [
    ['STATE', 'position · velocity · energy · CSI · demand · neighbours', C.cyan, -22],
    ['ACTION', 'trajectory · TX power · channel · altitude · association', C.amber, 0],
    ['REWARD', '+throughput +coverage −energy −latency −collision', C.mint, 22],
  ];
  sar.forEach(([t, s, col, x]) => {
    c.add(K.panel([s], { title: t, size: 4.6, at: [x, 27, -6], border: `rgba(${col === C.cyan ? '53,224,255' : col === C.amber ? '255,179,71' : '110,242,192'},0.55)`, titleColor: col === C.cyan ? '#35e0ff' : col === C.amber ? '#ffb347' : '#6ef2c0' }));
  });
  c.add(K.label('MULTI-AGENT REINFORCEMENT LEARNING  ·  CTDE', { at: [0, 32, -6], size: 1.5, color: '#e8ddff' }));
  c.drift({ radius: 54, height: 26, speed: 0.022, bob: 0.8 });
  return c;
}
