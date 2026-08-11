# Production specification — 3D assets, cameras, lighting, materials

This document is the production-ready visual specification behind the deck. The
live WebGL deck already implements all of it; this file exists so the same look
can be reproduced in Blender, Omniverse, Isaac Sim, Unreal or a render farm for
video output, and so an artist can extend the deck without inventing new rules.

Everything here maps 1:1 to the code:

| Concept | Implementation |
|---|---|
| scene rig, camera, framing, fog | `js/kit.js` → `stage()`, `lights()`, `autofit()` |
| reusable 3D assets | `js/kit.js` → `uav()`, `satellite()`, `groundRobot()`, … |
| per-slide scene composition | `js/scenes/*.js` (65 scene modules) |
| 2D technical diagrams | `js/diagram.js` (SVG generator) |
| slide content + per-slide spec | `js/content/*.js` |

---

## 1. Colour system (semantic, never decorative)

| Role | Hex | Used for |
|---|---|---|
| Data / communication | `#35e0ff` cyan | links, packets, sensing volumes, data spines |
| Learning / digital twin | `#6ef2c0` mint | model updates, twin geometry, "good" states |
| Generative / agentic AI | `#b07bff` violet | agent orbs, reasoning, RIS, policy flows |
| Human / energy / orchestration | `#ffb347` amber | operators, task boards, energy, control plane |
| Failure / safety / risk | `#ff5f70` red | faults, vetoes, degraded assets, outage zones |
| Space segment | `#9fd8ff` ice | satellites, orbits, NTN links |
| Accelerated compute | `#9ad60f` NVIDIA green | GPU racks, simulation stack, edge inference |
| Ink / background | `#dceaf7` / `#04070d` | type / deep space background |

Rules

- One colour per meaning, on all 94 slides. A cyan line is always data.
- Emissive + additive blending for anything that "carries" information.
- Physical hardware is desaturated steel/navy so the glowing information reads on top.
- Never use colour as decoration: if a new colour appears, it must mean something new.

## 2. Camera and framing

- Perspective camera, FOV 40–52° (42–46° typical). Wider only for full-bleed
  establishing shots.
- Every scene authors an intent camera (`cam`, `look`), then the deck runs
  `autofit()` which:
  1. computes the bounding sphere of all **content** objects (ambient objects such
     as starfields, grids, terrain and the Earth are tagged `userData.noFit`);
  2. keeps the authored viewing direction, and solves the distance so the sphere
     fits both the vertical and horizontal FOV with a margin (default 1.08);
  3. clamps the result to 0.55–1.3× the authored distance so authored intent is
     preserved;
  4. re-derives `near`/`far` and fog from the content sphere;
  5. rescales text sprites so every label lands between 2.6% and 8.5% of the
     viewport height (legibility at any distance).
- Motion: a slow orbit around the look-at point (0.018–0.035 rad/s) with a small
  vertical bob, or a lateral dolly for interior scenes (`l14Human`, `p3DigitalTwinBuild`).
- Ring/loop compositions are shot from 25–45° elevation so the ellipse reads as a
  ring rather than a line.

## 3. Lighting rig

Three-part rig plus one accent, identical in every scene (`lights()`):

| Light | Default | Purpose |
|---|---|---|
| Key directional | `#bfe4ff`, 1.15, from (26, 40, 22) | shape and material read |
| Rim directional | `#2f7bd6`, 0.9, from (−30, 12, −26) | separates hardware from background |
| Hemisphere | sky `#2b5f96` / ground `#050a12`, 0.7 | fills shadow sides without flattening |
| Accent point | scene colour, 26 W, at the subject | makes the "active" element the brightest thing |

Disaster and fault scenes swap the key to warm `#ff9d7a` at 0.5–0.7 and add a red
accent; mission-control interiors drop the key to 0.55 and rely on screen glow.

Tone mapping: ACES filmic, exposure 1.16, sRGB output.

## 4. Asset library (object hierarchy)

All assets are procedural — no external meshes, no textures except generated canvases.

```
uav()                      satellite()                groundRobot()
├─ body box (1.5×0.42)     ├─ bus box (1.2×1.0×1.4)   ├─ chassis + deck
├─ canopy hemisphere       ├─ 2 × solar panel (3.4 m)  ├─ 4 wheels
├─ 4 × arm + motor         ├─ panel edge lines         ├─ spinning LiDAR drum + ring
├─ 4 × rotor disc + blade  ├─ dish + feed              └─ mast
├─ LED beacon              ├─ optical terminal
├─ gimbal + lens           └─ beacon
└─ antenna
```

| Builder | Notes |
|---|---|
| `city({count, spread, maxH, damaged, seed})` | instanced boxes + instanced roof lights + road planes; `damaged` tilts and shortens a fraction of buildings |
| `terrain({w,h,amp,seed,basin})` | displaced plane, flat shaded, with a wireframe overlay |
| `earth({radius, at})` | dark globe + graticule + 40 real city-light coordinates + fresnel atmosphere shader |
| `orbitShell({radius, planes, per, inc})` | inclined orbital planes with ring guides and orbiting satellites |
| `groundStation()`, `cellTower({dead, cov})`, `risPanel({nx,ny})`, `serverRack()`, `gpuPod()` | infrastructure; `risPanel` animates per-element phase |
| `human()`, `vehicles()` | scale reference and life |
| `agentOrb({label, color})` | icosahedron core + wireframe cage + two counter-rotating rings |
| `knowledgeGraph()`, `dataCloud()` | knowledge and embedding visuals |
| `link(a, b, {style, color})` | `beam` (glowing tube + white core), `dashed` (marching dashes), plus instanced packets |
| `scanCone()`, `lidarFan()`, `frustum()` | sensing volumes: radar/RF cone, rotating LiDAR rays with hit points, camera frustum with a scan bar |
| `slab()`, `chainStations()`, `spine()`, `arrow()` | architecture primitives for layered/flow scenes |
| `label()`, `panel()`, `gauge()` | canvas-texture text sprites, holographic panels, live gauges |

## 5. Materials

| Class | Material | Parameters |
|---|---|---|
| Hardware | `MeshStandardMaterial` | metalness 0.55–0.9, roughness 0.2–0.45, dark navy base, faint emissive |
| Information (links, packets, halos) | `MeshBasicMaterial` | additive blending, `depthWrite: false`, opacity 0.05–0.95 |
| Architecture slabs | `MeshStandardMaterial` | opacity 0.42–0.7, emissive tint = layer colour, plus `EdgesGeometry` outline |
| Terrain / ground | `MeshStandardMaterial` | flat shading, roughness 0.9+, wireframe overlay at 0.16 alpha |
| Atmosphere | custom `ShaderMaterial` | fresnel `pow(1 − |N·V|, 2.6)`, additive, back side |
| Text / panels | `SpriteMaterial` / `MeshBasicMaterial` | generated canvas textures, `depthWrite: false` |

Shared materials are cached and marked `userData.shared` so scene disposal never
frees a material another scene still uses; anything animated is cloned first.

## 6. Labels and typography in 3D

- Labels are canvas textures: monospace 600 weight, 1–2 px glow, dark chip
  background at 74% alpha, 2 px border in the semantic colour.
- Label heights are specified in world units, then normalised on screen by
  `sizeLabels()` — so a label 100 m away is as readable as one 10 m away.
- Maximum 6–10 labels per scene. If a scene needs more explanation it gets a
  `panel()` (a small holographic block of text) instead of more labels.

## 7. Data-flow grammar

| Meaning | Visual |
|---|---|
| High-rate data link | solid glowing beam (tube) + travelling packet spheres |
| Control / telemetry | dashed line with marching dash offset |
| Platform bus | thick vertical spine, packets up (cyan) and down (mint) |
| Learning / model update | mint arrow or beam, slower packets |
| Safety veto | red beam, always visible, never animated away |
| Bidirectional sync | two arrows, opposite directions, pulsing out of phase |

## 8. Reproducing this in an offline renderer

1. Read `docs/SLIDE_SPECS.md` for the intent of the slide (VISUAL / 3D SCENE / …).
2. Read the corresponding scene module in `js/scenes/` for exact positions,
   counts, radii and animation rates — it is the authoritative layout.
3. Rebuild assets from §4 (all are primitive compositions; no sculpting needed).
4. Apply the lighting rig from §3 and the colour system from §1.
5. Camera: use the authored `cam`/`look` from the scene module, then frame to the
   content bounding box with a 8–12% margin (§2).
6. For video, use the animation timings in `docs/ANIMATION_DIRECTION.md`.
