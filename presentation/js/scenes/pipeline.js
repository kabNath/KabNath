import * as K from '../kit.js';
const { THREE, C } = K;

export function pipelineOverview() {
  const c = K.stage({ cam: [0, 22, 54], look: [0, 13, 0], fov: 48, fogNear: 60, fogFar: 230 });
  K.lights(c, { accent: 14 });
  K.starfield(c, 400, 400);
  K.grid(c, { size: 150, div: 30, opacity: 0.14 });
  const phases = [
    'P0 REQUIREMENTS', 'P1 SYSTEM DESIGN', 'P2 DATA', 'P3 DIGITAL TWIN', 'P4 AI MODELS',
    'P5 AGENTIC AI', 'P6 MULTI-AGENT LEARNING', 'P7 SIMULATION', 'P8 SAFETY VALIDATION',
    'P9 HARDWARE-IN-THE-LOOP', 'P10 FIELD TEST', 'P11 PILOT', 'P12 CONTINUAL LEARNING', 'P13 AUTONOMOUS OPERATION',
  ];
  const cols = [C.ice, C.ice, C.cyan, C.mint, C.violet, C.violet, C.violet, C.nv, C.red, C.amber, C.amber, C.mint, C.cyan, C.mint];
  const pts = [];
  phases.forEach((p, i) => {
    const u = i / (phases.length - 1);
    const a = u * Math.PI * 2.1;
    const x = Math.cos(a) * 22, z = Math.sin(a) * 12, y = 3 + u * 22;
    pts.push(new THREE.Vector3(x, y, z));
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.1, 0.3, 22), new THREE.MeshStandardMaterial({
      color: 0x0b1a2b, emissive: cols[i], emissiveIntensity: 0.45, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.85,
    }));
    disc.position.set(x, y, z);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.05, 6, 40), K.glow(cols[i], 0.85));
    ring.rotation.x = Math.PI / 2; ring.position.set(x, y, z);
    c.add(disc, ring, K.label(p, { at: [x, y + 1.5, z], size: 0.95, color: '#e6f5ff' }));
  });
  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.09, 6, false), K.glow(C.cyan, 0.4));
  c.add(tube, K.packets(c, curve, { count: 14, color: C.cyan, size: 0.24, speed: 0.06 }));
  const back = new THREE.CatmullRomCurve3([pts[13], new THREE.Vector3(0, 30, -22), new THREE.Vector3(0, 14, -26), pts[2]]);
  c.add(new THREE.Mesh(new THREE.TubeGeometry(back, 60, 0.07, 6, false), K.glow(C.mint, 0.35)));
  c.add(K.packets(c, back, { count: 8, color: C.mint, size: 0.2, speed: 0.09 }));
  c.add(K.label('P13 → P2  ·  FIELD DATA RETURNS TO THE PLATFORM', { at: [0, 32, -24], size: 1.35, color: '#8ff5d0' }));
  c.drift({ radius: 58, height: 26, speed: 0.024 });
  return c;
}

export function p0Requirements() {
  const c = K.stage({ cam: [0, 12, 34], look: [0, 8, 0], fov: 44, fogNear: 40, fogFar: 150 });
  K.lights(c, { accent: 12 });
  K.terrain(c, { w: 120, h: 120, amp: 2.6, seed: 3, y: -0.5 });
  const cards = [
    ['MISSION', ['restore comms in a disaster zone', 'find and locate survivors', 'map damage within 1 hour']],
    ['CONSTRAINTS', ['no ground infrastructure', 'airspace class + NOTAM limits', '20–60 min endurance per UAV']],
    ['SUCCESS CRITERIA', ['first link < 10 min', '> 90% priority coverage in 1 h', '< 0.1 interventions / UAV-hour']],
    ['NON-GOALS', ['not a weapons system', 'not a replacement for responders', 'not fully unsupervised at day one']],
  ];
  cards.forEach((cd, i) => {
    const x = (i % 2) * 15 - 7.5, y = 12 - Math.floor(i / 2) * 7;
    c.add(K.panel(cd[1], { title: cd[0], size: 5.4, at: [x, y, 0], border: i === 3 ? 'rgba(255,95,112,0.5)' : 'rgba(53,224,255,0.5)', titleColor: i === 3 ? '#ff9aa6' : '#35e0ff' }));
  });
  c.add(K.label('PHASE 0 — WRITE DOWN WHAT “DONE” MEANS', { at: [0, 18, 0], size: 1.35, color: '#eaf7ff' }));
  c.add(K.label('every later phase is traceable to a line on these cards', { at: [0, 2.6, 8], size: 0.95, color: '#8fb6d4', border: 'none' }));
  c.drift({ radius: 36, height: 13, speed: 0.02 });
  return c;
}

export function p1SystemDesign() {
  const c = K.stage({ cam: [30, 20, 40], look: [0, 11, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14 });
  K.grid(c, { size: 120, div: 24, opacity: 0.2 });
  const blocks = [
    ['SENSING', -16, 4, C.cyan], ['COMMS', 0, 4, 0x7fd8ff], ['EDGE', 16, 4, C.nv],
    ['TWIN', -16, 11, C.mint], ['DATA + RAG', 0, 11, 0x7fe0d0], ['MODELS', 16, 11, C.violet],
    ['AGENTS', -8, 18, 0xd7a8ff], ['ORCHESTRATION', 8, 18, C.amber],
    ['HUMAN + SAFETY', 0, 25, C.red],
  ];
  const map = {};
  blocks.forEach(([t, x, y, col]) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(9, 3, 4), new THREE.MeshStandardMaterial({
      color: 0x0a1524, emissive: col, emissiveIntensity: 0.22, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.35,
    }));
    box.position.set(x, y, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), K.lineMat(col, 0.9));
    e.position.copy(box.position);
    c.add(box, e, K.label(t, { at: [x, y, 2.1], size: 0.85, color: '#e6f5ff', border: 'none', bg: 'none' }));
    map[t] = new THREE.Vector3(x, y, 0);
  });
  const edges = [
    ['SENSING', 'EDGE'], ['SENSING', 'TWIN'], ['COMMS', 'EDGE'], ['EDGE', 'DATA + RAG'],
    ['TWIN', 'MODELS'], ['DATA + RAG', 'MODELS'], ['MODELS', 'AGENTS'], ['AGENTS', 'ORCHESTRATION'],
    ['ORCHESTRATION', 'HUMAN + SAFETY'], ['AGENTS', 'HUMAN + SAFETY'], ['ORCHESTRATION', 'COMMS'],
  ];
  edges.forEach(([a, b], i) => K.link(c, map[a], map[b], {
    style: i % 3 === 0 ? 'beam' : 'dashed', color: C.cyan, width: 0.05, opacity: 0.45, count: 2, speed: 0.4, size: 0.14,
  }));
  c.add(K.label('PHASE 1 — INTERFACES BEFORE IMPLEMENTATIONS', { at: [0, 30, 0], size: 1.35, color: '#eaf7ff' }));
  c.add(K.panel([
    'each edge = a versioned contract',
    'message schema + rate + latency class',
    'failure semantics written down',
    '*if the contract is unclear, the phase is not done',
  ], { title: 'design output', size: 5.4, at: [-2, 6, 14], border: 'rgba(53,224,255,0.5)' }));
  c.drift({ radius: 50, height: 22, speed: 0.022 });
  return c;
}

export function p2Data() {
  const c = K.stage({ cam: [0, 16, 42], look: [0, 9, 0], fov: 44, fogNear: 50, fogFar: 180 });
  K.lights(c, { accent: 14 });
  K.grid(c, { size: 120, div: 24, opacity: 0.18 });
  const realG = new THREE.Group(); realG.position.set(-18, 0, 0); c.add(realG);
  K.city({ add: (...o) => realG.add(...o), tick: c.tick }, { count: 55, spread: 26, maxH: 8, seed: 101 });
  const u = K.uav({ at: [0, 11, 0], scale: 1.4 }); realG.add(u); K.animateRotors(c, [u]);
  c.tick((t) => { u.position.x = Math.sin(t * 0.4) * 8; });
  realG.add(K.label('REAL-WORLD COLLECTION', { at: [0, 16, 0], size: 1.25, color: '#ffe0b0' }));
  const simG = new THREE.Group(); simG.position.set(18, 0, 0); c.add(simG);
  K.city({ add: (...o) => simG.add(...o), tick: c.tick }, { count: 55, spread: 26, maxH: 8, seed: 101, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b });
  K.swarm({ add: (...o) => simG.add(...o), tick: c.tick }, { count: 5, altitude: 10, spread: 22, mesh: true, scale: 1.1, meshColor: C.mint });
  simG.add(K.label('SIMULATION / SYNTHETIC', { at: [0, 16, 0], size: 1.25, color: '#8ff5d0' }));
  const vault = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.6, 4, 28), new THREE.MeshStandardMaterial({
    color: 0x0c1a2a, emissive: C.cyan, emissiveIntensity: 0.3, metalness: 0.7, roughness: 0.3, transparent: true, opacity: 0.8,
  }));
  vault.position.set(0, 2.4, 16);
  const vE = new THREE.LineSegments(new THREE.EdgesGeometry(vault.geometry), K.lineMat(C.cyan, 0.7));
  vE.position.copy(vault.position);
  c.add(vault, vE, K.label('DATA PLATFORM  ·  labelled · versioned · replayable', { at: [0, 5.6, 16], size: 1.15, color: '#a8f0ff' }));
  K.link(c, [-18, 9, 0], [0, 4, 14], { style: 'beam', color: 0xffd08a, width: 0.11, opacity: 0.45, count: 4, speed: 0.4 });
  K.link(c, [18, 9, 0], [0, 4, 14], { style: 'beam', color: C.mint, width: 0.11, opacity: 0.45, count: 4, speed: 0.4 });
  const kinds = ['sensor', 'satellite', 'RF / CSI', 'telemetry', 'operator labels', 'synthetic'];
  kinds.forEach((k, i) => c.add(K.label(k, { at: [-7 + i * 2.9, 9.4, 16], size: 0.66, color: '#cfe6f7', border: 'none' })));
  c.add(K.label('PHASE 2 — DATA IS THE PRODUCT OF THIS PHASE', { at: [0, 21, 6], size: 1.35, color: '#eaf7ff' }));
  c.drift({ radius: 46, height: 18, speed: 0.02 });
  return c;
}

export function p3DigitalTwinBuild() {
  const c = K.stage({ cam: [0, 20, 46], look: [0, 8, 0], fov: 48, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14, accentColor: C.mint });
  const stages = [
    ['GIS + OSM', -30], ['TERRAIN', -15], ['BUILDINGS', 0], ['TRAFFIC + WEATHER', 15], ['AGENTS + NETWORK', 30],
  ];
  stages.forEach(([t, x], i) => {
    const g = new THREE.Group();
    g.position.set(x, 0, 0);
    c.add(g);
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), K.glow(C.mint, 0.05));
    pad.rotation.x = -Math.PI / 2; pad.position.y = 0.02;
    g.add(pad);
    const gctx = { add: (...o) => g.add(...o), tick: c.tick };
    if (i === 0) {
      const grid = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.PlaneGeometry(12, 12, 8, 8)), K.lineMat(C.ice, 0.5));
      grid.rotation.x = -Math.PI / 2; grid.position.y = 0.1;
      g.add(grid);
    }
    if (i >= 1) K.terrain(gctx, { w: 12, h: 12, seg: 24, amp: 1.2, seed: 4, y: 0 });
    if (i >= 2) K.city(gctx, { count: 30, spread: 10, maxH: 5, seed: 111, roads: false, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b });
    if (i >= 3) {
      K.vehicles(gctx, { count: 8, spread: 10, color: C.mint });
      const cloud = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 10), K.glow(0x6f8fa8, 0.12));
      cloud.position.set(2, 7, -2); g.add(cloud);
    }
    if (i >= 4) {
      K.swarm(gctx, { count: 4, altitude: 6, spread: 9, mesh: true, scale: 0.7, meshColor: C.mint });
      g.add(K.cellTower({ at: [-4, 0, 4], h: 5, cov: 5 }));
    }
    g.add(K.label(t, { at: [0, 11, 0], size: 1.15, color: '#8ff5d0' }));
    if (i < stages.length - 1) K.arrow(c, [x + 6.6, 3, 0], [x + 8.4, 3, 0], { color: C.mint, w: 0.09 });
  });
  c.add(K.label('PHASE 3 — BUILD THE TWIN LAYER BY LAYER, VALIDATE EACH', { at: [0, 16, 8], size: 1.4, color: '#eaf7ff' }));
  c.dolly({ from: [-26, 18, 40], to: [26, 20, 40], speed: 0.05 });
  return c;
}

export function p4ModelDev() {
  const c = K.stage({ cam: [0, 14, 38], look: [0, 8, 0], fov: 44, fogNear: 45, fogFar: 170 });
  K.lights(c, { accent: 16, accentColor: C.nv });
  K.grid(c, { size: 110, div: 22, opacity: 0.18 });
  const pod = K.gpuPod(c, { rows: 2, cols: 5, trim: C.nv });
  pod.position.set(0, 0, 4);
  c.add(pod);
  c.add(K.label('GPU TRAINING CLUSTER  ·  CUDA · PyTorch · TensorRT export', { at: [0, 7.4, 4], size: 1.15, color: '#d8f59a' }));
  const curves = ['perception mAP', 'trajectory ADE', 'channel NMSE', 'policy return'];
  curves.forEach((t, i) => {
    const cv = document.createElement('canvas');
    cv.width = 340; cv.height = 190;
    const g = cv.getContext('2d');
    const tex = new THREE.CanvasTexture(cv);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 4.1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    mesh.position.set((i - 1.5) * 8.2, 16, -4);
    c.add(mesh);
    const pts = [];
    for (let x = 0; x < 60; x++) pts.push(Math.pow(x / 60, 0.55) * (0.75 + 0.2 * Math.sin(x * 0.7 + i)));
    let ph = 0;
    c.tick((t2, dt) => {
      ph += dt * 6;
      g.clearRect(0, 0, 340, 190);
      g.fillStyle = 'rgba(6,16,28,0.82)'; g.fillRect(0, 0, 340, 190);
      g.strokeStyle = 'rgba(90,180,235,0.25)'; g.lineWidth = 1;
      for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(20, 20 + k * 38); g.lineTo(325, 20 + k * 38); g.stroke(); }
      g.strokeStyle = ['#35e0ff', '#6ef2c0', '#b07bff', '#ffb347'][i];
      g.shadowColor = g.strokeStyle; g.shadowBlur = 10; g.lineWidth = 2.4;
      g.beginPath();
      const n = Math.min(60, Math.floor(ph % 90));
      for (let x = 0; x < n; x++) {
        const px = 20 + (x / 60) * 305, py = 170 - pts[x] * 145;
        x ? g.lineTo(px, py) : g.moveTo(px, py);
      }
      g.stroke(); g.shadowBlur = 0;
      g.fillStyle = '#cfe6f7'; g.font = '600 20px ui-monospace, monospace';
      g.fillText(t.toUpperCase(), 20, 18);
      tex.needsUpdate = true;
    });
  });
  const u = K.uav({ at: [-14, 6, 14], scale: 1.2 }); c.add(u); K.animateRotors(c, [u]);
  const rb = K.groundRobot({ at: [14, 0, 14], scale: 1.3 }); c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
  K.link(c, [0, 4, 8], [-14, 6, 14], { style: 'beam', color: C.mint, width: 0.08, opacity: 0.45, count: 3, speed: 0.45, label: 'deploy candidate' });
  K.link(c, [14, 0.8, 14], [0, 4, 8], { style: 'dashed', color: C.cyan, count: 3, speed: 0.45, opacity: 0.6, label: 'experience' });
  c.add(K.label('PHASE 4 — TRAIN PERCEPTION, PREDICTION, PLANNING, COMMS, ALLOCATION', { at: [0, 21.6, -4], size: 1.3, color: '#eaf7ff' }));
  c.drift({ radius: 42, height: 15, speed: 0.02 });
  return c;
}

export function p5AgenticBuild() {
  const c = K.stage({ cam: [0, 12, 34], look: [0, 8, 0], fov: 44, fogNear: 40, fogFar: 150 });
  K.lights(c, { accent: 18, accentColor: C.violet });
  K.starfield(c, 300, 250);
  K.holoRing(c, { r: 11, color: C.violet, rings: 3, at: [0, 0.2, 0] });
  const bays = [
    ['OBJECTIVE + POLICY', -12], ['TOOLS + MEMORY', 0], ['GUARDRAILS + LOGGING', 12],
  ];
  bays.forEach(([t, x]) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(9, 8, 6), K.glow(C.violet, 0.02));
    frame.position.set(x, 5, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(frame.geometry), K.lineMat(C.violet, 0.5));
    e.position.copy(frame.position);
    c.add(frame, e, K.label(t, { at: [x, 10, 0], size: 0.85, color: '#e0c9ff' }));
  });
  const stages = [-12, 0, 12];
  stages.forEach((x, i) => {
    const orb = K.agentOrb(c, { at: [x, 5, 0], r: 0.7 + i * 0.35, color: C.violet, color2: C.cyan, phase: i });
    c.add(orb);
    if (i < 2) K.arrow(c, [x + 4.8, 5, 0], [x + 7.2, 5, 0], { color: C.violet, w: 0.1, pulse: true, phase: i });
  });
  const done = K.agentOrb(c, { at: [0, 15, -6], r: 1.5, color: 0xd7a8ff, color2: C.mint, label: 'CERTIFIED AGENT', labelSize: 0.95 });
  c.add(done);
  K.arrow(c, [12, 7, 0], [1, 14, -5], { color: C.mint, w: 0.1 });
  c.add(K.panel([
    'objective + success test',
    'tools registered with schemas',
    'memory scoped + retention set',
    'guardrails: rate, envelope, veto',
    '*every action logged with rationale',
  ], { title: 'agent build checklist', size: 5.6, at: [0, 4, 13], border: 'rgba(176,123,255,0.5)', titleColor: '#d7a8ff' }));
  c.add(K.label('PHASE 5 — AGENTS ARE BUILT, REVIEWED AND SIGNED LIKE SOFTWARE', { at: [0, 19.6, -6], size: 1.25, color: '#eaf7ff' }));
  c.drift({ radius: 36, height: 13, speed: 0.026 });
  return c;
}

export function p6MultiAgentLearning() {
  const c = K.stage({ cam: [0, 26, 52], look: [0, 8, 0], fov: 50, fogNear: 60, fogFar: 210 });
  K.lights(c, { accent: 14, accentColor: C.violet });
  K.grid(c, { size: 150, div: 30, opacity: 0.16 });
  const arenas = [[-28, -8], [0, -8], [28, -8], [-14, 18], [14, 18]];
  arenas.forEach(([x, z], i) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); c.add(g);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(11, 40), K.glow(i % 2 ? C.violet : C.cyan, 0.05));
    disc.rotation.x = -Math.PI / 2; disc.position.y = 0.05;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(11, 0.07, 6, 50), K.glow(i % 2 ? C.violet : C.cyan, 0.5));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.1;
    g.add(disc, ring);
    const gctx = { add: (...o) => g.add(...o), tick: c.tick };
    K.city(gctx, { count: 22, spread: 14, maxH: 5, seed: 120 + i, roads: false });
    K.swarm(gctx, { count: 5, altitude: 8, spread: 16, mesh: true, meshRange: 12, scale: 0.85, seed: 40 + i, meshColor: i % 2 ? C.violet : C.cyan });
    g.add(K.label(`ENV ${i + 1}  ·  seed ${1000 + i * 37}`, { at: [0, 13, 0], size: 0.9, color: '#cfe6f7' }));
  });
  const brain = K.agentOrb(c, { at: [0, 26, 4], r: 2.4, color: C.violet, color2: C.mint, label: 'SHARED POLICY / CRITIC', labelSize: 1.05 });
  c.add(brain);
  arenas.forEach(([x, z]) => {
    K.link(c, [x, 9, z], [0, 26, 4], { style: 'dashed', color: C.violet, count: 2, speed: 0.55, opacity: 0.4 });
    K.link(c, [0, 26, 4], [x, 8, z], { style: 'beam', color: C.mint, width: 0.055, opacity: 0.28, count: 2, speed: 0.4, size: 0.15 });
  });
  c.add(K.panel([
    'centralised training, decentralised execution',
    'shared critic · per-agent actors',
    'domain randomisation across seeds',
    'federated variant: gradients only',
    '*emergent behaviour is reviewed, not assumed',
  ], { title: 'MARL setup', size: 6, at: [0, 6, 30], border: 'rgba(176,123,255,0.5)', titleColor: '#d7a8ff' }));
  c.add(K.label('PHASE 6 — MANY ENVIRONMENTS, ONE IMPROVING POLICY', { at: [0, 31, 4], size: 1.35, color: '#eaf7ff' }));
  c.drift({ radius: 58, height: 28, speed: 0.02 });
  return c;
}

export function p7Simulation() {
  const c = K.stage({ cam: [0, 30, 56], look: [0, 4, 0], fov: 52, fogNear: 60, fogFar: 230 });
  K.lights(c, { accent: 12 });
  K.grid(c, { size: 170, div: 34, opacity: 0.14 });
  const N = 7;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = (i - (N - 1) / 2) * 13, z = (j - (N - 1) / 2) * 13;
      const g = new THREE.Group(); g.position.set(x, 0, z); c.add(g);
      const pad = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), K.glow((i + j) % 3 === 0 ? C.violet : C.cyan, 0.035));
      pad.rotation.x = -Math.PI / 2; pad.position.y = 0.02;
      g.add(pad);
      const rr = K.rng(i * 13 + j + 1);
      for (let k = 0; k < 9; k++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6 + rr() * 3.4, 0.9), K.glow(0x4fc8ff, 0.4));
        b.position.set((rr() - 0.5) * 8, b.geometry.parameters.height / 2, (rr() - 0.5) * 8);
        g.add(b);
      }
      for (let k = 0; k < 3; k++) {
        const d = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), K.glow(C.mint, 0.9));
        const a0 = rr() * 6.28, rad = 2 + rr() * 3;
        g.add(d);
        c.tick((t) => { d.position.set(Math.cos(a0 + t * (0.4 + rr() * 0.2)) * rad, 3 + Math.sin(t + a0) * 0.6, Math.sin(a0 + t * 0.5) * rad); });
      }
    }
  }
  c.add(K.label('49 OF 10,000+ PARALLEL ENVIRONMENTS', { at: [0, 22, 0], size: 2.2, color: '#eaf7ff' }));
  c.add(K.panel([
    'randomised: weather · wind · sensor noise',
    'randomised: layout · obstacles · users',
    'randomised: link quality · failures',
    'metrics aggregated per scenario family',
    '*millions of missions before one real flight',
  ], { title: 'massive simulation', size: 6.4, at: [0, 8, 34], border: 'rgba(53,224,255,0.5)' }));
  c.drift({ radius: 62, height: 34, speed: 0.018 });
  return c;
}

export function p8SafetyValidation() {
  const c = K.stage({ cam: [0, 18, 46], look: [0, 9, 0], fov: 46, fogNear: 50, fogFar: 190, bg: 0x0a0509 });
  K.lights(c, { key: 0.7, keyColor: 0xffd0c0, accent: 14, accentColor: C.red });
  K.grid(c, { size: 130, div: 26, opacity: 0.2, c1: 0x50283a, c2: 0x241820, floorColor: 0x090509 });
  K.city(c, { count: 60, spread: 46, maxH: 9, seed: 131, lightColor: 0xff9d7a, emissive: 0x140a08 });
  const uavs = K.swarm(c, { count: 6, altitude: 14, spread: 32, mesh: true, meshRange: 20, scale: 1.3, meshColor: C.red });
  const faults = [
    ['GPS DENIED', 0], ['LINK LOST', 1], ['SENSOR FAILURE', 2], ['BATTERY FAULT', 3], ['WIND GUST 15 m/s', 4], ['ADVERSARIAL INPUT', 5],
  ];
  faults.forEach(([t, i]) => {
    const u = uavs[i % uavs.length];
    const l = K.label(`⚠ ${t}`, { size: 1.05, color: '#ff9aa6', border: 'rgba(255,95,112,0.7)' });
    c.add(l);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.07, 6, 36), K.mutable(K.glow(C.red, 0.8)));
    ring.rotation.x = Math.PI / 2;
    c.add(ring);
    c.tick((t2) => {
      l.position.set(u.position.x, u.position.y + 3.2, u.position.z);
      ring.position.copy(u.position);
      const k = 0.5 + 0.5 * Math.sin(t2 * 3 + i);
      ring.material.opacity = 0.25 + 0.55 * k;
      ring.scale.setScalar(1 + k * 0.25);
      l.material.opacity = 0.5 + 0.5 * k;
    });
  });
  c.add(K.panel([
    'inject → observe → require safe outcome',
    'GPS denial → visual-inertial fallback',
    'link loss → autonomous RTH inside geofence',
    'sensor fault → degraded but stable policy',
    'adversarial input → anomaly detector + veto',
    '*a scenario is only “passed” with evidence',
  ], { title: 'fault injection campaign', size: 7, at: [0, 8, 26], border: 'rgba(255,95,112,0.6)', titleColor: '#ff9aa6' }));
  c.add(K.label('PHASE 8 — BREAK IT ON PURPOSE, IN SIMULATION FIRST', { at: [0, 26, 0], size: 1.4, color: '#ffd9d0' }));
  c.drift({ radius: 50, height: 20, speed: 0.022 });
  return c;
}

export function p9HITL() {
  const c = K.stage({ cam: [0, 10, 30], look: [0, 6, 0], fov: 46, fogNear: 35, fogFar: 130 });
  K.lights(c, { accent: 14, accentColor: C.amber });
  K.grid(c, { size: 80, div: 16, opacity: 0.22 });
  const bench = new THREE.Mesh(new THREE.BoxGeometry(11, 0.4, 6), K.solid(0x101c2a, { metalness: 0.7 }));
  bench.position.set(-9, 3, 0);
  c.add(bench);
  const board = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.18, 2.8), K.solid(0x0d2a1a, { metalness: 0.5, emissive: 0x07301c }));
  board.position.set(-9, 3.3, 0);
  const bE = new THREE.LineSegments(new THREE.EdgesGeometry(board.geometry), K.lineMat(C.mint, 0.8));
  bE.position.copy(board.position);
  c.add(board, bE);
  const rr = K.rng(9);
  for (let i = 0; i < 14; i++) {
    const chip = new THREE.Mesh(new THREE.BoxGeometry(0.3 + rr() * 0.5, 0.16, 0.3 + rr() * 0.5), K.glow(i % 4 ? C.mint : C.amber, 0.7));
    chip.position.set(-9 + (rr() - 0.5) * 3.6, 3.48, (rr() - 0.5) * 2.2);
    c.add(chip);
  }
  c.add(K.label('REAL AUTOPILOT + REAL COMPUTE', { at: [-9, 5.4, 0], size: 1.05, color: '#8ff5d0' }));
  c.add(K.label('PX4 / Jetson · actual firmware', { at: [-9, 4.2, 2.6], size: 0.72, color: '#8fb6d4', border: 'none' }));
  const simG = new THREE.Group(); simG.position.set(10, 0, 0); c.add(simG);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), K.glow(C.cyan, 0.05));
  screen.position.set(10, 7, -2);
  const sE = new THREE.LineSegments(new THREE.EdgesGeometry(screen.geometry), K.lineMat(C.cyan, 0.7));
  sE.position.copy(screen.position);
  c.add(screen, sE);
  const inner = new THREE.Group(); inner.position.set(10, 4.2, -1.6); c.add(inner);
  K.city({ add: (...o) => inner.add(...o), tick: c.tick }, { count: 26, spread: 9, maxH: 3, seed: 141, roads: false, lightColor: C.mint, emissive: 0x06231b });
  const su = K.uav({ at: [0, 3, 0], scale: 0.6 }); inner.add(su); K.animateRotors(c, [su]);
  c.tick((t) => { su.position.set(Math.sin(t * 0.6) * 3, 3 + Math.sin(t * 1.4) * 0.2, Math.cos(t * 0.6) * 2); });
  c.add(K.label('SIMULATED WORLD (Isaac Sim + Sionna channel)', { at: [10, 11.4, -2], size: 1.05, color: '#a8f0ff' }));
  K.link(c, [-6.6, 3.4, 0], [4, 5, -1.6], { style: 'beam', color: C.amber, width: 0.1, opacity: 0.5, count: 4, speed: 0.5, label: 'sensor injection' });
  K.link(c, [4, 3, -1.6], [-6.6, 2.6, 0], { style: 'dashed', color: C.mint, count: 3, speed: 0.5, opacity: 0.7, label: 'actuator commands' });
  c.add(K.panel([
    'same binaries as flight',
    'same timing, same bus, same faults',
    'simulated sensors + simulated RF',
    '*catches integration bugs a pure sim cannot',
  ], { title: 'hardware-in-the-loop', size: 5.4, at: [0, 1.6, 10], border: 'rgba(255,179,71,0.5)', titleColor: '#ffd08a' }));
  c.drift({ radius: 32, height: 11, speed: 0.024 });
  return c;
}

export function p10FieldTest() {
  const c = K.stage({ cam: [0, 16, 44], look: [0, 6, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { key: 1.1, keyColor: 0xdfeeff, accent: 10 });
  K.terrain(c, { w: 150, h: 150, amp: 2.2, seed: 17, y: -0.4, color: 0x0e1d20 });
  const fence = new THREE.Mesh(new THREE.CylinderGeometry(22, 22, 14, 44, 1, true), K.glow(C.amber, 0.055));
  fence.position.y = 7;
  const fenceTop = new THREE.Mesh(new THREE.TorusGeometry(22, 0.09, 6, 60), K.glow(C.amber, 0.7));
  fenceTop.rotation.x = Math.PI / 2; fenceTop.position.y = 14;
  const fenceBot = new THREE.Mesh(new THREE.TorusGeometry(22, 0.09, 6, 60), K.glow(C.amber, 0.7));
  fenceBot.rotation.x = Math.PI / 2; fenceBot.position.y = 0.2;
  c.add(fence, fenceTop, fenceBot);
  c.add(K.label('GEOFENCE  ·  hard boundary enforced outside the policy', { at: [0, 16.4, 0], size: 1.25, color: '#ffd08a' }));
  const u = K.uav({ at: [0, 8, 0], scale: 2 });
  c.add(u); K.animateRotors(c, [u]);
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-14, 8, -10), new THREE.Vector3(0, 10, -14), new THREE.Vector3(14, 9, -4),
    new THREE.Vector3(10, 7, 10), new THREE.Vector3(-6, 8, 12), new THREE.Vector3(-14, 8, -10),
  ], true);
  K.trail(c, { curve: path, color: C.mint, opacity: 0.5, marker: u, speed: 0.06 });
  const gcs = new THREE.Group(); gcs.position.set(-26, 0, 18); c.add(gcs);
  const van = new THREE.Mesh(new THREE.BoxGeometry(6, 2.6, 3), K.solid(0x1d3348, { metalness: 0.7 }));
  van.position.y = 1.6; gcs.add(van);
  gcs.add(K.groundStation({ at: [4, 0, 0], scale: 0.7 }));
  gcs.add(K.human(0xffd9a8, 1.5).translateX(-1).translateZ(3));
  gcs.add(K.human(0xffd9a8, 1.5).translateX(1.4).translateZ(3.4));
  gcs.add(K.label('GROUND CONTROL  ·  safety pilot on the stick', { at: [0, 5.6, 0], size: 1.1, color: '#ffe0b0' }));
  K.link(c, [-24, 3, 18], u.position, { style: 'dashed', color: C.amber, count: 3, speed: 0.5, opacity: 0.7 });
  c.tick(() => {});
  c.add(K.panel([
    'one aircraft, bounded volume',
    'safety pilot with instant override',
    'telemetry recorded at full rate',
    'compare against the twin prediction',
    '*measure the sim-to-real gap here',
  ], { title: 'controlled field test', size: 5.8, at: [22, 8, 16], border: 'rgba(110,242,192,0.5)', titleColor: '#8ff5d0' }));
  c.drift({ radius: 48, height: 18, speed: 0.02 });
  return c;
}

export function p11Pilot() {
  const c = K.stage({ cam: [0, 26, 56], look: [0, 6, 0], fov: 48, fogNear: 60, fogFar: 220 });
  K.lights(c, { accent: 14 });
  K.terrain(c, { w: 180, h: 180, amp: 2.6, seed: 23, y: -0.6 });
  K.city(c, { count: 120, spread: 62, maxH: 13, seed: 151 });
  K.vehicles(c, { count: 18, spread: 62 });
  const uavs = K.swarm(c, { count: 4, altitude: 18, spread: 40, mesh: true, meshRange: 26, scale: 1.4 });
  void uavs;
  const rb = K.groundRobot({ at: [12, 0, 16], scale: 1.4 }); c.add(rb);
  c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
  c.add(K.cellTower({ at: [-18, 0, -12], h: 9, cov: 12 }));
  const gs = K.groundStation({ at: [-30, 0, 22], scale: 1.1 }); c.add(gs);
  const sat = K.satellite({ at: [18, 44, -14], scale: 1.1 }); c.add(sat);
  K.link(c, [18, 44, -14], [-30, 3, 22], { style: 'beam', color: C.ice, width: 0.13, opacity: 0.3, count: 4, speed: 0.24 });
  const district = new THREE.Mesh(new THREE.RingGeometry(25, 26, 60), K.glow(C.mint, 0.5));
  district.rotation.x = -Math.PI / 2; district.position.y = 0.1;
  c.add(district, K.label('PILOT DISTRICT  ·  real users, real consequences', { at: [0, 24, 0], size: 1.6, color: '#8ff5d0' }));
  c.add(K.panel([
    'limited fleet, real mission, real users',
    'full monitoring + human on call',
    'agreed abort criteria before launch',
    'daily review of every intervention',
    '*first mission where value is measured',
  ], { title: 'pilot deployment', size: 6.4, at: [0, 10, 34], border: 'rgba(110,242,192,0.5)', titleColor: '#8ff5d0' }));
  c.drift({ radius: 62, height: 28, speed: 0.02 });
  return c;
}

export function p12ContinualLearning() {
  const c = K.stage({ cam: [0, 18, 46], look: [0, 11, 0], fov: 46, fogNear: 50, fogFar: 190 });
  K.lights(c, { accent: 14, accentColor: C.mint });
  K.grid(c, { size: 130, div: 26, opacity: 0.16 });
  const fieldG = new THREE.Group(); fieldG.position.set(-22, 0, 6); c.add(fieldG);
  K.city({ add: (...o) => fieldG.add(...o), tick: c.tick }, { count: 40, spread: 20, maxH: 7, seed: 161 });
  K.swarm({ add: (...o) => fieldG.add(...o), tick: c.tick }, { count: 4, altitude: 9, spread: 16, mesh: true, scale: 1.0 });
  fieldG.add(K.label('FIELD OPERATIONS', { at: [0, 15, 0], size: 1.25, color: '#a8f0ff' }));
  const stations = K.chainStations(c, [
    { title: 'INGEST', sub: 'new mission data', color: C.cyan },
    { title: 'LABEL / MINE', sub: 'hard cases first', color: 0x7fe0d0 },
    { title: 'RETRAIN', sub: 'candidate model', color: C.violet },
    { title: 'RE-VALIDATE', sub: 'sim + HITL gates', color: C.amber },
    { title: 'ROLL OUT', sub: 'canary → fleet', color: C.mint },
  ], { gap: 6.2, y: 18, bw: 4.6, bh: 2.6, bd: 2.2, labelSize: 0.6, linkColor: C.mint, at: [4, 0, -6] });
  void stations;
  K.link(c, [-22, 10, 6], [-9, 18, -6], { style: 'dashed', color: C.cyan, count: 3, speed: 0.45, opacity: 0.65, label: 'experience + failures' });
  K.link(c, [17, 18, -6], [-20, 9, 6], { style: 'beam', color: C.mint, width: 0.1, opacity: 0.4, count: 4, speed: 0.3, sag: 0.18, label: 'improved policy' });
  c.add(K.panel([
    'prioritise data the model got wrong',
    'never retrain without re-validating',
    'canary on a subset of the fleet',
    'keep the rollback one command away',
    '*the platform gets better every mission',
  ], { title: 'continual learning discipline', size: 6.2, at: [8, 6, 16], border: 'rgba(110,242,192,0.5)', titleColor: '#8ff5d0' }));
  c.add(K.label('PHASE 12 — THE LOOP THAT MAKES THIS AN INFRASTRUCTURE', { at: [0, 27, -6], size: 1.35, color: '#eaf7ff' }));
  c.drift({ radius: 50, height: 20, speed: 0.02 });
  return c;
}

export function p13AutonomousOperation() {
  const c = K.stage({ cam: [0, 44, 44], look: [0, 14, 0], fov: 48, fogNear: 60, fogFar: 220 });
  K.lights(c, { accent: 18 });
  K.starfield(c, 500, 500);
  K.grid(c, { size: 150, div: 30, opacity: 0.16 });
  K.city(c, { count: 90, spread: 56, maxH: 12, seed: 171 });
  K.vehicles(c, { count: 16, spread: 56 });
  K.swarm(c, { count: 9, altitude: 17, spread: 44, mesh: true, meshRange: 24, scale: 1.3 });
  const rb1 = K.groundRobot({ at: [14, 0, 18], scale: 1.3 });
  const rb2 = K.groundRobot({ at: [-18, 0, 14], scale: 1.3 });
  c.add(rb1, rb2);
  c.tick((t, dt) => { rb1.userData.lidar.rotation.y += dt * 3; rb2.userData.lidar.rotation.y += dt * 2.6; });
  const sat = K.satellite({ at: [-20, 46, -16], scale: 1.2 }); c.add(sat);
  c.tick((t) => { sat.position.x = -20 + Math.sin(t * 0.12) * 16; });
  const words = ['SENSE', 'LEARN', 'REASON', 'PLAN', 'ACT', 'OBSERVE', 'ADAPT'];
  const cols = [C.cyan, C.amber, C.violet, 0xc79bff, C.mint, 0x7fd8ff, 0x7fe0d0];
  const R = 20;
  const pts = words.map((w, i) => {
    const a = -Math.PI / 2 + (i / words.length) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * R, 30, Math.sin(a) * R * 0.85);
    const node = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.07, 6, 36), K.glow(cols[i], 0.9));
    node.rotation.x = Math.PI / 2; node.position.copy(p);
    c.add(node, K.label(w, { at: [p.x, p.y + 1.4, p.z], size: 1.25, color: '#eaf7ff' }));
    return p;
  });
  for (let i = 0; i < pts.length; i++) {
    K.link(c, pts[i], pts[(i + 1) % pts.length], { style: 'beam', color: cols[i], width: 0.09, opacity: 0.5, count: 3, speed: 0.42, size: 0.22, side: 0.05 });
  }
  c.add(K.label('CONTINUOUS AUTONOMOUS OPERATION', { at: [0, 36, 0], size: 1.8, color: '#eaf7ff' }));
  c.drift({ speed: 0.02, bob: 0.8 });
  return c;
}
