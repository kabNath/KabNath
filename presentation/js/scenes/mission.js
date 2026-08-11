import * as K from '../kit.js';
const { THREE, C } = K;

export function missionOverview() {
  const c = K.stage({ cam: [0, 28, 58], look: [0, 12, 0], fov: 50, fogNear: 60, fogFar: 230, bg: 0x06070d });
  K.lights(c, { key: 0.8, keyColor: 0xd8e8ff, accent: 14 });
  K.grid(c, { size: 150, div: 30, opacity: 0.16 });
  K.city(c, { count: 110, spread: 58, maxH: 12, seed: 201, damaged: 0.4, lightColor: 0x9a5a44 });
  const phases = [
    ['T+0  EVENT', C.red], ['T+2m  DETECT', C.ice], ['T+5m  LAUNCH', C.cyan],
    ['T+9m  LINK UP', C.mint], ['T+20m  MAP', 0x7fe0d0], ['T+40m  OPTIMISE', C.violet],
    ['T+60m  RESTORED', C.mint], ['AFTER  LEARN', C.amber],
  ];
  const pts = phases.map((p, i) => {
    const u = i / (phases.length - 1);
    const x = -34 + u * 68;
    const y = 20 + Math.sin(u * Math.PI) * 9;
    const pos = new THREE.Vector3(x, y, -6);
    const node = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.07, 6, 32), K.glow(p[1], 0.9));
    node.rotation.x = Math.PI / 2; node.position.copy(pos);
    c.add(node, K.label(p[0], { at: [x, y + 2, -6], size: 1.05, color: '#e6f5ff' }));
    return pos;
  });
  const curve = new THREE.CatmullRomCurve3(pts);
  c.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, 0.1, 6, false), K.glow(C.cyan, 0.4)));
  c.add(K.packets(c, curve, { count: 10, color: C.cyan, size: 0.26, speed: 0.08 }));
  K.swarm(c, { count: 8, altitude: 13, spread: 44, mesh: true, meshRange: 22, scale: 1.2 });
  const sat = K.satellite({ at: [-28, 40, -18], scale: 1.1 }); c.add(sat);
  c.tick((t) => { sat.position.x = -28 + Math.sin(t * 0.14) * 20; });
  c.add(K.label('EARTHQUAKE — TELECOMMUNICATION RESTORATION', { at: [0, 36, -6], size: 1.9, color: '#eaf7ff' }));
  c.add(K.label('17 steps, one mission, fully instrumented', { at: [0, 33.4, -6], size: 1.1, color: '#9fc4dd', border: 'none' }));
  c.drift({ radius: 62, height: 30, speed: 0.02 });
  return c;
}

const S = {
  quake: 1, towers: 2, detect: 3, agent: 4, launch: 5, mesh: 6, map: 7, twin: 8,
  priority: 9, optimise: 10, robots: 11, operators: 12, adapt: 13, restored: 14,
  end: 15, store: 16, learn: 17,
};

export function mission(opts = {}) {
  const step = opts.step ?? 1;
  const on = (k) => step >= S[k];
  const warm = step <= 3;
  const c = K.stage({
    cam: [0, 26, 56], look: [0, 9, 0], fov: 48,
    bg: warm ? 0x08060a : 0x04070d,
    fogColor: warm ? 0x0a0608 : 0x04070d, fogNear: 55, fogFar: 220,
  });
  K.lights(c, {
    key: warm ? 0.6 : 0.9, keyColor: warm ? 0xff9d7a : 0xcfe4ff,
    accent: 14, accentColor: on('restored') ? C.mint : (warm ? C.red : C.cyan), accentPos: [0, 16, 0],
  });
  K.starfield(c, 400, 500);
  K.grid(c, { size: 140, div: 28, opacity: 0.18, c1: warm ? 0x4a2230 : 0x1d4870, c2: warm ? 0x241018 : 0x0f2740 });
  K.city(c, {
    count: 140, spread: 58, maxH: 14, seed: 211, damaged: 0.4,
    lightColor: on('restored') ? 0x63d5ff : 0x9a5a44, emissive: warm ? 0x140806 : 0x071426,
  });
  if (on('restored')) K.vehicles(c, { count: 16, spread: 58 });

  if (step === S.quake) {
    const rr = K.rng(5);
    for (let i = 0; i < 14; i++) {
      const x = (rr() - 0.5) * 54, z = (rr() - 0.5) * 54;
      const fire = new THREE.Mesh(new THREE.ConeGeometry(1 + rr(), 3 + rr() * 3, 8), K.glow(0xff7a3c, 0.5));
      fire.position.set(x, 1.6, z);
      c.add(fire);
      c.tick((t) => { fire.scale.y = 1 + Math.sin(t * 5 + i) * 0.25; });
    }
    const wave = new THREE.Mesh(new THREE.RingGeometry(4, 5, 60), K.mutable(K.glow(C.red, 0.7)));
    wave.rotation.x = -Math.PI / 2; wave.position.y = 0.4;
    c.add(wave);
    c.tick((t) => {
      const k = (t * 0.35) % 1;
      wave.scale.setScalar(1 + k * 8);
      wave.material.opacity = 0.7 * (1 - k);
    });
    c.add(K.label('T+0  ·  M7.2 EARTHQUAKE', { at: [0, 22, 8], size: 2, color: '#ff9aa6' }));
  }

  const towers = [];
  for (let i = 0; i < 4; i++) {
    const dead = !on('restored');
    const tw = K.cellTower({ at: [(i - 1.5) * 16, 0, -18 + i * 7], h: 9, dead, coverage: !dead, cov: 11 });
    c.add(tw); towers.push(tw);
    if (on('towers') && dead) {
      const l = K.label('✕ NO SERVICE', { at: [(i - 1.5) * 16, 11, -18 + i * 7], size: 1.05, color: '#ff8d99', border: 'rgba(255,95,112,0.6)' });
      c.add(l);
      c.tick((t) => { l.material.opacity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.6 + i)); });
    }
  }

  const sat = K.satellite({ at: [-26, 46, -16], scale: 1.3 });
  c.add(sat);
  c.tick((t) => { sat.position.x = -26 + Math.sin(t * 0.12) * 14; });
  if (on('detect')) {
    const swath = new THREE.Mesh(new THREE.ConeGeometry(16, 46, 26, 1, true), K.glow(C.ice, 0.05));
    swath.position.set(-16, 23, -8); swath.rotation.x = Math.PI;
    const foot = new THREE.Mesh(new THREE.RingGeometry(15, 16, 60), K.glow(C.ice, 0.5));
    foot.rotation.x = -Math.PI / 2; foot.position.set(-16, 0.2, -8);
    c.add(swath, foot);
    c.add(K.label('SATELLITE DETECTION  ·  change map in 90 s', { at: [-16, 26, -8], size: 1.3, color: '#cfe9ff' }));
    K.link(c, [-26, 46, -16], [-34, 2, 22], { style: 'beam', color: C.ice, width: 0.12, opacity: 0.4, count: 4, speed: 0.3 });
  }
  const gs = K.groundStation({ at: [-34, 0, 22], scale: 1.2 });
  c.add(gs);

  let agentOrb = null;
  if (on('agent')) {
    agentOrb = K.agentOrb(c, { at: [0, 34, 6], r: 2, color: C.violet, color2: C.cyan, label: 'MISSION AGENT', labelSize: 1.15 });
    c.add(agentOrb);
    if (step === S.agent) {
      c.add(K.panel([
        'trigger: satellite change map + RAN alarms',
        'classify: mass-casualty comms outage',
        'retrieve: playbook 4b · NOTAM · terrain',
        'plan: 8 UAV relay lattice + 2 UGV search',
        '*request human approval: GRANTED',
      ], { title: 'agent reasoning trace', size: 7, at: [0, 22, 24], border: 'rgba(176,123,255,0.6)', titleColor: '#d7a8ff' }));
    }
  }

  let uavs = [];
  if (on('launch')) {
    const alt = step === S.launch ? 6 : 20;
    uavs = K.swarm(c, {
      count: step >= S.adapt ? 9 : 8, altitude: alt, spread: 50,
      mesh: on('mesh'), meshRange: 26, scale: 1.4, altSpread: step === S.launch ? 2 : 6,
      formation: step === S.launch ? 'line' : undefined, pitch: 5,
    });
    if (step === S.launch) {
      c.add(K.label('LAUNCH  ·  8 UAVs from the staging area', { at: [0, 12, 22], size: 1.5, color: '#a8f0ff' }));
      uavs.forEach((u, i) => {
        const plume = new THREE.Mesh(new THREE.ConeGeometry(0.8, 3, 10, 1, true), K.glow(C.cyan, 0.12));
        c.add(plume);
        c.tick(() => { plume.position.set(u.position.x, u.position.y - 2, u.position.z); });
        void i;
      });
    }
  }

  if (on('mesh')) {
    uavs.forEach((u, i) => {
      const cone = K.scanCone(c, { h: 20, r: 12, color: on('restored') ? C.mint : C.cyan, opacity: 0.05, phase: i });
      c.add(cone);
      c.tick(() => cone.position.copy(u.position));
    });
    K.link(c, [-26, 46, -16], [0, 20, 0], { style: 'dashed', color: C.ice, count: 3, speed: 0.3, opacity: 0.7, label: 'NTN backhaul' });
    K.link(c, [0, 20, 0], [-34, 4, 22], { style: 'beam', color: C.mint, width: 0.1, opacity: 0.4, count: 4, speed: 0.35, label: 'gateway' });
    for (let i = 0; i < 10; i++) {
      const h = K.human(0x9fd8ff, 1.3);
      h.position.set(-16 + i * 3.6, 0, 26);
      c.add(h);
      if (on('mesh')) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.4, 0.24), K.glow(C.mint, 0.8));
        bar.position.set(h.position.x, 2.8, 26);
        c.add(bar);
      }
    }
    c.add(K.label('TEMPORARY NETWORK  ·  UAVs as aerial base stations', { at: [0, 27, 20], size: 1.4, color: '#8ff5d0' }));
  }

  if (on('map')) {
    uavs.slice(0, 4).forEach((u, i) => {
      const fan = K.lidarFan(c, { rays: 34, r: 12, drop: 19, color: C.mint, speed: 1.4 + i * 0.2 });
      c.add(fan);
      c.tick(() => fan.position.copy(u.position));
    });
    const scanned = new THREE.Mesh(new THREE.PlaneGeometry(58, 58, 20, 20), new THREE.MeshBasicMaterial({
      color: C.mint, wireframe: true, transparent: true, opacity: 0.14,
    }));
    scanned.rotation.x = -Math.PI / 2; scanned.position.y = 0.5;
    c.add(scanned);
  }

  if (on('twin')) {
    const twin = new THREE.Group();
    twin.position.set(-58, 4, 26);
    c.add(twin);
    K.city({ add: (...o) => twin.add(...o), tick: c.tick }, {
      count: 70, spread: 26, maxH: 8, seed: 211, damaged: 0.4, color: 0x08221c, lightColor: C.mint, emissive: 0x06231b, roads: false,
    });
    const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(28, 14, 28)), K.lineMat(C.mint, 0.45));
    box.position.y = 7; twin.add(box);
    twin.add(K.label('DIGITAL TWIN UPDATED', { at: [0, 17, 0], size: 1.6, color: '#8ff5d0' }));
    K.link(c, [-20, 12, 14], [-58, 12, 26], { style: 'beam', color: C.mint, width: 0.1, opacity: 0.4, count: 4, speed: 0.32, sag: 0.1 });
  }

  if (on('priority')) {
    const zones = [[10, 12, 1.0, 'PRIORITY 1  hospital'], [-14, -6, 0.7, 'PRIORITY 2  shelter'], [22, -14, 0.45, 'PRIORITY 3  district']];
    zones.forEach(([x, z, w, t], i) => {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(7 + w * 4, 40), K.mutable(K.glow(w > 0.8 ? C.red : w > 0.6 ? C.amber : C.cyan, 0.16)));
      disc.rotation.x = -Math.PI / 2; disc.position.set(x, 0.3, z);
      c.add(disc, K.label(t, { at: [x, 6 + i, z], size: 1.15, color: w > 0.8 ? '#ff9aa6' : '#ffd9a8' }));
      c.tick((t2) => { disc.material.opacity = 0.1 + 0.12 * (0.5 + 0.5 * Math.sin(t2 * 1.6 + i)); });
    });
  }

  if (on('optimise')) {
    const relay = K.uav({ at: [26, 15, -22], scale: 1.5, trim: C.violet, led: C.violet });
    c.add(relay, K.label('DEDICATED RELAY UAV  ·  covers the shadowed canyon', { at: [26, 19, -22], size: 1.1, color: '#dcc4ff' }));
    K.animateRotors(c, [relay]);
    c.tick((t) => { relay.position.y = 15 + Math.sin(t * 1.1) * 0.4; });
    K.link(c, [26, 15, -22], [10, 1.6, 12], { style: 'beam', color: C.violet, width: 0.09, opacity: 0.45, count: 3, speed: 0.4 });
    ['throughput', 'coverage', 'fairness'].forEach((g, i) => c.add(K.gauge(c, {
      at: [-16 + i * 8, 30, 22], size: 4.4, value: [0.86, 0.92, 0.78][i], color: ['#35e0ff', '#6ef2c0', '#ffb347'][i], label: g, phase: i,
    })));
  }

  if (on('robots')) {
    for (let i = 0; i < 3; i++) {
      const rb = K.groundRobot({ at: [-10 + i * 12, 0, 16 - i * 5], scale: 1.5 });
      c.add(rb);
      c.tick((t, dt) => {
        rb.userData.lidar.rotation.y += dt * 3.4;
        rb.position.x = -10 + i * 12 + Math.sin(t * 0.3 + i) * 6;
      });
      const fan = K.lidarFan(c, { rays: 26, r: 6, drop: 1.4, color: C.mint, speed: 2 });
      c.add(fan);
      c.tick(() => fan.position.set(rb.position.x, 2.4, rb.position.z));
    }
    const found = K.label('⚑ SURVIVOR SIGNAL  ·  thermal + RF beacon', { at: [4, 8, 18], size: 1.35, color: '#ffd9a8', border: 'rgba(255,179,71,0.7)' });
    c.add(found);
    c.tick((t) => { found.material.opacity = 0.5 + 0.5 * Math.sin(t * 3); });
  }

  if (on('operators')) {
    const walls = [
      ['mission status', ['coverage 92%', 'assets 9/9 nominal', 'twin age 140 ms']],
      ['human decisions', ['approve restricted-zone entry', 'confirm priority order', 'authorise night operations']],
    ];
    walls.forEach((w, i) => c.add(K.panel(w[1], {
      title: w[0], size: 6, at: [i ? 30 : -30, 30, 12], border: 'rgba(255,179,71,0.55)', titleColor: '#ffd08a',
    })));
  }

  if (step === S.adapt) {
    const failed = uavs[uavs.length - 1];
    const l = K.label('UAV-06 FAULT  →  reallocated in 1.4 s', { size: 1.3, color: '#ff9aa6', border: 'rgba(255,95,112,0.7)' });
    c.add(l);
    c.tick((t) => {
      failed.position.y = Math.max(1.5, 20 - ((t * 3) % 20));
      failed.rotation.z = Math.sin(t * 6) * 0.3;
      l.position.set(failed.position.x, failed.position.y + 3, failed.position.z);
    });
    if (agentOrb) K.link(c, agentOrb.position, [0, 20, 0], { style: 'dashed', color: C.violet, count: 3, speed: 0.7, opacity: 0.7, label: 'replan' });
  }

  if (on('restored')) {
    const cov = new THREE.Mesh(new THREE.CircleGeometry(38, 60), K.mutable(K.glow(C.mint, 0.08)));
    cov.rotation.x = -Math.PI / 2; cov.position.y = 0.15;
    c.add(cov);
    c.tick((t) => { cov.material.opacity = 0.06 + 0.04 * Math.sin(t * 1.2); });
    if (step === S.restored) c.add(K.label('COVERAGE RESTORED  ·  92% of priority grid', { at: [0, 34, 16], size: 1.8, color: '#8ff5d0' }));
  }

  if (step === S.end) {
    uavs.forEach((u, i) => {
      c.tick(() => { u.position.lerp(new THREE.Vector3(-30 + i * 2, 4, 30), 0.004); });
    });
    c.add(K.label('MISSION COMPLETE  ·  recover and reset', { at: [0, 30, 18], size: 1.7, color: '#a8f0ff' }));
  }

  if (on('store')) {
    const vault = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.6, 5, 28), new THREE.MeshStandardMaterial({
      color: 0x0c1a2a, emissive: C.cyan, emissiveIntensity: 0.3, metalness: 0.7, roughness: 0.3, transparent: true, opacity: 0.85,
    }));
    vault.position.set(46, 3, 24);
    c.add(vault, K.label('MISSION ARCHIVE  ·  bit-exact replay', { at: [46, 8, 24], size: 1.3, color: '#a8f0ff' }));
    K.link(c, [10, 18, 8], [46, 6, 24], { style: 'beam', color: C.cyan, width: 0.11, opacity: 0.4, count: 5, speed: 0.36, sag: 0.12 });
  }

  if (on('learn')) {
    const pod = K.gpuPod(c, { rows: 2, cols: 3, trim: C.nv });
    pod.position.set(62, 2, -6);
    c.add(pod, K.label('RETRAIN → RE-VALIDATE → ROLL OUT', { at: [62, 12, -6], size: 1.5, color: '#d8f59a' }));
    K.link(c, [46, 6, 24], [62, 6, -4], { style: 'beam', color: C.nv, width: 0.11, opacity: 0.45, count: 4, speed: 0.4 });
    K.link(c, [62, 8, -6], [0, 22, 0], { style: 'beam', color: C.mint, width: 0.12, opacity: 0.35, count: 5, speed: 0.28, sag: 0.16, label: 'better policy to the fleet' });
  }
  c.drift({ radius: 62, height: 28, speed: 0.02, bob: 0.7 });
  return c;
}

/* ------------------------------------------------------------- use cases */

export function useCase(opts = {}) {
  const v = opts.variant ?? 'disaster';
  const c = K.stage({ cam: [0, 20, 48], look: [0, 7, 0], fov: 48, fogNear: 50, fogFar: 200 });
  K.lights(c, { accent: 14 });
  const label = (t, at, col = '#e6f5ff', size = 1.35) => c.add(K.label(t, { at, size, color: col }));

  if (v === 'disaster') {
    K.grid(c, { size: 130, div: 26, opacity: 0.18, c1: 0x4a2230, c2: 0x241018 });
    K.city(c, { count: 120, spread: 54, maxH: 13, seed: 221, damaged: 0.45, lightColor: 0x9a5a44 });
    K.swarm(c, { count: 8, altitude: 18, spread: 44, mesh: true, meshRange: 24, scale: 1.3 });
    for (let i = 0; i < 3; i++) {
      const rb = K.groundRobot({ at: [-12 + i * 12, 0, 18], scale: 1.4 });
      c.add(rb);
      c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; });
    }
    const sat = K.satellite({ at: [-22, 40, -14], scale: 1.1 }); c.add(sat);
    K.link(c, [-22, 40, -14], [0, 18, 0], { style: 'dashed', color: C.ice, count: 3, speed: 0.3, opacity: 0.7 });
    label('DISASTER RESPONSE  ·  comms + mapping + search', [0, 30, 14], '#ff9aa6', 1.7);
  } else if (v === 'telecom') {
    K.grid(c, { size: 130, div: 26, opacity: 0.2 });
    K.city(c, { count: 100, spread: 54, maxH: 11, seed: 231 });
    for (let i = 0; i < 3; i++) c.add(K.cellTower({ at: [(i - 1) * 20, 0, -12 + i * 8], h: 9, dead: i === 1, coverage: i !== 1, cov: 12 }));
    const abs = K.uav({ at: [-20, 20, 4], scale: 2.4, trim: C.mint }); c.add(abs); K.animateRotors(c, [abs]);
    c.tick((t) => { abs.position.x = -20 + Math.sin(t * 0.2) * 4; });
    const cov = new THREE.Mesh(new THREE.ConeGeometry(18, 20, 30, 1, true), K.glow(C.mint, 0.07));
    cov.position.set(-20, 10, 4); cov.rotation.x = Math.PI;
    c.add(cov);
    for (let i = 0; i < 10; i++) c.add(K.human(0x9fd8ff, 1.3).translateX(-30 + i * 3).translateZ(20));
    label('TELECOMMUNICATIONS  ·  coverage where the network died', [0, 30, 14], '#8ff5d0', 1.7);
    label('AERIAL BASE STATION', [-20, 25, 4], '#8ff5d0', 1.1);
  } else if (v === 'agriculture') {
    K.terrain(c, { w: 160, h: 160, amp: 1.8, seed: 31, color: 0x101c14, wire: 0x3f7f3a });
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const health = ((i * 4 + j) % 7) / 7;
        const plot = new THREE.Mesh(new THREE.PlaneGeometry(15, 13), K.glow(health > 0.6 ? 0x9ad60f : health > 0.3 ? 0xffb347 : 0xff6a5e, 0.2));
        plot.rotation.x = -Math.PI / 2;
        plot.position.set((i - 2) * 16, 0.2, (j - 1.5) * 14);
        c.add(plot);
        const rows = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(15, 13, 8, 5)), K.lineMat(0x9ad60f, 0.25));
        rows.rotation.x = -Math.PI / 2; rows.position.copy(plot.position);
        c.add(rows);
      }
    }
    const u = K.uav({ at: [0, 10, 0], scale: 2 }); c.add(u); K.animateRotors(c, [u]);
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-32, 10, -20), new THREE.Vector3(32, 10, -20), new THREE.Vector3(32, 10, -7),
      new THREE.Vector3(-32, 10, -7), new THREE.Vector3(-32, 10, 7), new THREE.Vector3(32, 10, 7),
      new THREE.Vector3(32, 10, 20), new THREE.Vector3(-32, 10, 20),
    ]);
    K.trail(c, { curve: path, color: 0x9ad60f, marker: u, speed: 0.05, opacity: 0.4 });
    const acone = K.scanCone(c, { h: 10, r: 7, color: 0x9ad60f, opacity: 0.09 });
    c.add(acone);
    c.tick(() => acone.position.copy(u.position));
    const rb = K.groundRobot({ at: [10, 0, 24], scale: 1.6, trim: 0x9ad60f }); c.add(rb);
    c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 2.6; rb.position.x = 10 + Math.sin(t * 0.2) * 18; });
    const sat = K.satellite({ at: [-24, 38, -20], scale: 1.1 }); c.add(sat);
    label('AGRICULTURE  ·  multispectral health → targeted action', [0, 26, 26], '#cbe89a', 1.7);
  } else if (v === 'logistics') {
    K.grid(c, { size: 130, div: 26, opacity: 0.2 });
    const hub = new THREE.Mesh(new THREE.BoxGeometry(22, 8, 14), K.solid(0x16283b, { metalness: 0.7, emissive: 0x08131f }));
    hub.position.set(-26, 4, 6);
    c.add(hub, K.label('FULFILMENT HUB', { at: [-26, 10.6, 6], size: 1.2, color: '#ffd9a8' }));
    const rr = K.rng(8);
    for (let i = 0; i < 26; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), K.glow(C.amber, 0.4));
      b.position.set(-26 + (rr() - 0.5) * 18, 8.9 + Math.floor(i / 9) * 1.7, 6 + (rr() - 0.5) * 10);
      c.add(b);
    }
    K.city(c, { count: 70, spread: 50, maxH: 9, seed: 241 });
    for (let i = 0; i < 4; i++) {
      const u = K.uav({ at: [0, 14, 0], scale: 1.3 }); c.add(u); K.animateRotors(c, [u]);
      const cv = K.curve(new THREE.Vector3(-24, 10, 6), new THREE.Vector3(10 + i * 9, 2, 18 - i * 11), 0.35);
      K.trail(c, { curve: cv, color: C.amber, marker: u, speed: 0.07 + i * 0.01, opacity: 0.3 });
      const pad = new THREE.Mesh(new THREE.RingGeometry(2, 2.4, 30), K.glow(C.amber, 0.6));
      pad.rotation.x = -Math.PI / 2; pad.position.set(10 + i * 9, 0.2, 18 - i * 11);
      c.add(pad);
    }
    const av = new THREE.Mesh(new THREE.BoxGeometry(6, 2.4, 2.8), K.solid(0x24405c, { metalness: 0.8 }));
    av.position.set(0, 1.4, 26);
    c.add(av, K.label('AUTONOMOUS VAN', { at: [0, 4.4, 26], size: 1, color: '#cfe6f7' }));
    c.tick((t) => { av.position.x = -20 + ((t * 6) % 46); });
    label('LOGISTICS  ·  hub → last mile, air and ground', [0, 26, 16], '#ffd9a8', 1.7);
  } else if (v === 'inspection') {
    K.terrain(c, { w: 170, h: 170, amp: 4, seed: 37, color: 0x0c1720 });
    const pylons = [];
    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * 22;
      const g = new THREE.Group(); g.position.set(x, 0, 0);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.8, 18, 8), K.solid(0x2b4460, { metalness: 0.7 }));
      mast.position.y = 9; g.add(mast);
      for (const yy of [13, 16]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 0.4), K.solid(0x2b4460));
        arm.position.y = yy; g.add(arm);
      }
      c.add(g); pylons.push(x);
    }
    for (let i = 0; i < pylons.length - 1; i++) {
      for (const [yy, off] of [[13, -3.6], [13, 3.6], [16, -3.6], [16, 3.6]]) {
        const cv = K.curve(new THREE.Vector3(pylons[i] + 0.2, yy, off), new THREE.Vector3(pylons[i + 1] - 0.2, yy, off), -0.06);
        c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cv.getPoints(24)), K.lineMat(0x7fd8ff, 0.5)));
      }
    }
    const u = K.uav({ at: [-40, 15, 6], scale: 1.8 }); c.add(u); K.animateRotors(c, [u]);
    const inspPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-46, 15, 7), new THREE.Vector3(0, 17, 7), new THREE.Vector3(46, 15, 7),
      new THREE.Vector3(46, 15, -7), new THREE.Vector3(0, 17, -7), new THREE.Vector3(-46, 15, -7),
    ], true);
    K.trail(c, { curve: inspPath, color: C.mint, marker: u, speed: 0.045, opacity: 0.4 });
    const fr = K.frustum(c, { w: 6, h: 4, d: 6, color: 0xffd08a });
    c.add(fr);
    c.tick(() => fr.position.copy(u.position));
    const defect = K.label('⚠ HOTSPOT  ·  insulator crack, span 3', { at: [22, 20, 4], size: 1.15, color: '#ffd9a8', border: 'rgba(255,179,71,0.7)' });
    c.add(defect);
    c.tick((t) => { defect.material.opacity = 0.5 + 0.5 * Math.sin(t * 2.6); });
    label('INFRASTRUCTURE INSPECTION  ·  autonomous corridor survey', [0, 30, 18], '#a8f0ff', 1.7);
  } else if (v === 'sar') {
    K.terrain(c, { w: 190, h: 190, amp: 13, seed: 41, color: 0x0b1520, basin: false });
    const uavs = K.swarm(c, { count: 6, altitude: 22, spread: 60, mesh: true, meshRange: 30, scale: 1.4 });
    uavs.forEach((u, i) => {
      const cone = K.scanCone(c, { h: 18, r: 10, color: i % 2 ? 0xff8fb0 : C.mint, opacity: 0.06, phase: i });
      c.add(cone);
      c.tick(() => cone.position.copy(u.position));
    });
    const hits = [[-18, 14], [22, -10], [4, 26]];
    hits.forEach(([x, z], i) => {
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), K.mutable(K.glow(C.amber, 0.9)));
      m.position.set(x, 6, z);
      c.add(m, K.label(i === 0 ? '⚑ THERMAL + PHONE PING' : '⚑ THERMAL SIGNATURE', { at: [x, 9, z], size: 1.05, color: '#ffd9a8' }));
      c.tick((t) => { m.position.y = 6 + Math.sin(t * 2 + i) * 0.6; m.material.opacity = 0.5 + 0.5 * Math.sin(t * 3 + i); });
    });
    const rb = K.groundRobot({ at: [-14, 0, 18], scale: 1.6 }); c.add(rb);
    c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; rb.position.z = 18 - ((t * 1.2) % 10); });
    label('SEARCH & RESCUE  ·  thermal + RF + terrain reasoning', [0, 38, 20], '#ffd9a8', 1.7);
  } else if (v === 'smartcity') {
    K.grid(c, { size: 130, div: 26, opacity: 0.22 });
    K.city(c, { count: 130, spread: 56, maxH: 14, seed: 251 });
    K.vehicles(c, { count: 28, spread: 56 });
    const rr = K.rng(15);
    for (let i = 0; i < 22; i++) {
      const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), K.glow(C.cyan, 0.9));
      s.position.set((rr() - 0.5) * 50, 1.4 + rr() * 4, (rr() - 0.5) * 50);
      c.add(s);
      c.tick((t) => { s.scale.setScalar(1 + 0.3 * Math.sin(t * 3 + i)); });
    }
    K.swarm(c, { count: 4, altitude: 20, spread: 44, mesh: true, scale: 1.2 });
    for (let i = 0; i < 4; i++) c.add(K.cellTower({ at: [(i - 1.5) * 16, 0, -20 + i * 8], h: 9, cov: 10 }));
    label('SMART CITY  ·  traffic, energy, safety as one control problem', [0, 30, 18], '#a8f0ff', 1.6);
  } else if (v === 'maritime') {
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(220, 220, 60, 60), new THREE.MeshStandardMaterial({
      color: 0x061a2e, metalness: 0.9, roughness: 0.25, emissive: 0x04121f,
    }));
    sea.rotation.x = -Math.PI / 2;
    const swell = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.PlaneGeometry(220, 220, 44, 44)), K.lineMat(0x2f7fb8, 0.16));
    swell.rotation.x = -Math.PI / 2; swell.position.y = 0.1;
    c.add(sea, swell);
    c.tick((t) => { swell.position.z = Math.sin(t * 0.3) * 2; });
    const ships = [[-30, 10, 1], [16, -18, -1], [40, 22, 1]];
    ships.forEach(([x, z, dir], i) => {
      const s = new THREE.Mesh(new THREE.BoxGeometry(10, 2.4, 3.4), K.solid(0x2a4258, { metalness: 0.8 }));
      s.position.set(x, 1.2, z);
      const tower = new THREE.Mesh(new THREE.BoxGeometry(2, 2.6, 2.6), K.solid(0x35526b));
      tower.position.set(x - 2, 3.4, z);
      c.add(s, tower);
      c.tick((t) => { s.position.x = x + Math.sin(t * 0.08 * dir) * 26; tower.position.x = s.position.x - 2; });
      c.add(K.label(i === 1 ? '⚠ AIS DARK VESSEL' : `VESSEL ${i + 1}`, { at: [x, 7, z], size: 1.05, color: i === 1 ? '#ff9aa6' : '#cfe6f7' }));
    });
    const u = K.uav({ at: [0, 16, 6], scale: 1.8 }); c.add(u); K.animateRotors(c, [u]);
    c.tick((t) => { u.position.set(Math.sin(t * 0.2) * 30, 16, Math.cos(t * 0.18) * 20); });
    const cone = K.scanCone(c, { h: 16, r: 12, color: C.cyan, opacity: 0.05 }); c.add(cone);
    c.tick(() => cone.position.copy(u.position));
    const sat = K.satellite({ at: [-26, 46, -18], scale: 1.3 }); c.add(sat);
    K.link(c, [-26, 46, -18], [16, 4, -18], { style: 'dashed', color: C.ice, count: 3, speed: 0.3, opacity: 0.6, label: 'SAR detection' });
    label('MARITIME MONITORING  ·  SAR + AIS fusion, dark-vessel detection', [0, 30, 24], '#a8dcf0', 1.55);
  } else if (v === 'industrial') {
    K.grid(c, { size: 120, div: 24, opacity: 0.2 });
    for (let i = 0; i < 6; i++) {
      const tk = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.8, 9, 20), K.solid(0x223448, { metalness: 0.8 }));
      tk.position.set((i % 3 - 1) * 16, 4.5, Math.floor(i / 3) * 16 - 8);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.1, 6, 30), K.glow(i === 4 ? C.red : C.amber, 0.7));
      ring.rotation.x = Math.PI / 2; ring.position.set(tk.position.x, 9.2, tk.position.z);
      c.add(tk, ring);
      if (i === 4) {
        const alarm = K.label('⚠ THERMAL ANOMALY', { at: [tk.position.x, 13, tk.position.z], size: 1.1, color: '#ff9aa6' });
        c.add(alarm);
        c.tick((t) => { alarm.material.opacity = 0.4 + 0.6 * Math.sin(t * 3); });
      }
    }
    for (let i = 0; i < 4; i++) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 44, 12), K.solid(0x2b4460, { metalness: 0.85 }));
      pipe.rotation.z = Math.PI / 2; pipe.position.set(0, 2 + i * 1.4, -18 + i * 12);
      c.add(pipe);
    }
    const u = K.uav({ at: [0, 14, 0], scale: 1.6 }); c.add(u); K.animateRotors(c, [u]);
    c.tick((t) => { u.position.set(Math.sin(t * 0.3) * 18, 14, Math.cos(t * 0.25) * 12); });
    const rb = K.groundRobot({ at: [-12, 0, 14], scale: 1.6 }); c.add(rb);
    c.tick((t, dt) => { rb.userData.lidar.rotation.y += dt * 3; rb.position.x = -12 + Math.sin(t * 0.25) * 14; });
    label('INDUSTRIAL AUTOMATION  ·  continuous autonomous inspection', [0, 26, 20], '#ffd9a8', 1.6);
  } else if (v === 'defense') {
    K.terrain(c, { w: 200, h: 200, amp: 6, seed: 47, color: 0x0a1218 });
    for (let i = -8; i <= 8; i++) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3, 6), K.solid(0x2b4460));
      post.position.set(i * 8, 1.5, 0);
      c.add(post);
      if (i < 8) {
        const wire = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 8, 2.6, 0), new THREE.Vector3((i + 1) * 8, 2.6, 0),
        ]), K.lineMat(C.amber, 0.4));
        c.add(wire);
      }
      if (i % 4 === 0) {
        const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), K.glow(C.amber, 0.9));
        s.position.set(i * 8, 3.4, 0);
        c.add(s);
        c.tick((t) => { s.scale.setScalar(1 + 0.3 * Math.sin(t * 2.4 + i)); });
      }
    }
    c.add(K.label('UNATTENDED GROUND SENSORS', { at: [0, 6, 4], size: 1.1, color: '#ffd9a8' }));
    const uavs = K.swarm(c, { count: 5, altitude: 26, spread: 70, mesh: true, meshRange: 40, scale: 1.5 });
    uavs.forEach((u, i) => {
      const cone = K.scanCone(c, { h: 24, r: 14, color: C.cyan, opacity: 0.045, phase: i });
      c.add(cone);
      c.tick(() => cone.position.copy(u.position));
    });
    const track = K.label('⚑ TRACK 214  ·  classified, human decision required', { at: [18, 12, -18], size: 1.2, color: '#ff9aa6', border: 'rgba(255,95,112,0.6)' });
    c.add(track);
    c.tick((t) => { track.material.opacity = 0.5 + 0.5 * Math.sin(t * 2.2); });
    const sat = K.satellite({ at: [-28, 52, -22], scale: 1.3 }); c.add(sat);
    K.link(c, [-28, 52, -22], [0, 26, 0], { style: 'dashed', color: C.ice, count: 3, speed: 0.3, opacity: 0.6 });
    label('DEFENCE / SECURITY  ·  persistent ISR, human-authorised action', [0, 40, 22], '#ffd9a8', 1.55);
  }
  c.drift({ radius: 52, height: 22, speed: 0.02, bob: 0.6 });
  return c;
}
