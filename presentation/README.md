# The Autonomous Air–Space–Ground AI Infrastructure — live 3D presentation

A complete, presentation-ready technical deck about an autonomous physical-AI
infrastructure that connects **satellites, UAV swarms, ground robots, edge
computing, cloud, digital twins, RAG knowledge, agentic AI, physical AI,
federated learning and multi-agent reinforcement learning** into one continuously
learning system.

This is not a slide export — it is a **live WebGL application**. Every major
slide renders a real-time animated 3D scene (orbiting satellites, flying swarms,
scanning LiDAR, packet flows, synchronised digital twins), built procedurally
with Three.js. No build step, no external assets, no network dependency.

| | |
|---|---|
| Slides | **94**, organised in 8 acts |
| Animated 3D scenes | **65** distinct scene modules |
| Technical diagrams | **45** generated SVG diagrams |
| Architecture | 15 layers, each with its own slide, 3D scene and diagram |
| Development pipeline | 14 phases (P0 requirements → P13 autonomous operation) |
| Validation | 9-level testing pyramid + failure/safety architecture |
| End-to-end mission | 17-step earthquake telecom-restoration scenario, one evolving 3D scene |
| Use cases | 10 domains, each PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT |

## Run it

**Easiest — single file:** open
[`dist/autonomous-air-space-ground-ai-infrastructure.html`](dist/autonomous-air-space-ground-ai-infrastructure.html)
directly in a browser (double-click). Everything — all 94 slides, 65 scenes,
styles and Three.js — is inlined into that one ~1 MB document; it needs no
server and no network. Rebuild it with `node tools/build-single-file.mjs`.

**Development version** (separate modules, plus `scene.html` and the docs):

```bash
cd presentation
python3 -m http.server 8899
# open http://localhost:8899
```

WebGL 2 required. Three.js (r170) is vendored in `js/lib/` — the deck runs fully
offline either way.

## Presenting

| Key | Action |
|---|---|
| `→` `Space` `PgDn` / `←` `PgUp` | next / previous slide |
| `Home` / `End` | first / last slide |
| `G` | overview grid of all 94 slides |
| `N` | per-slide production notes (VISUAL · 3D SCENE · COMPONENTS · DATA FLOW · ANIMATION · TEXT · TECHNICAL MESSAGE) |
| `P` | pause / resume all 3D animation |
| `F` | fullscreen |
| number + `Enter` | jump to slide |
| `#42` in the URL | deep link to a slide |

Useful URLs:

- `index.html#12` — deep link to slide 12.
- `scene.html?s=finalMaster` — render any single 3D scene full-window (for
  review, screenshots or video capture). `?s=mission&step=13` passes scene options.
- `index.html?audit=1` — headless self-test: builds every slide, renders every
  scene, reports errors as JSON (used in development).

## Structure

```
presentation/
├── index.html               deck shell
├── scene.html               single-scene preview harness
├── css/deck.css             design system (dark aerospace, semantic colours)
├── js/
│   ├── kit.js               3D toolkit: stage/camera/autofit, lights, assets,
│   │                        links/packets, labels, panels, gauges
│   ├── diagram.js           SVG diagram generator (chain/stack/graph/pyramid/loop/matrix/timeline)
│   ├── deck.js              navigation, rendering loop, overview, notes, audit
│   ├── slides.js            assembles the 8 acts
│   ├── content/*.js         all slide content + per-slide production specs
│   ├── scenes/*.js          65 animated 3D scene modules
│   └── lib/three.module.min.js   vendored Three.js r170 (MIT)
├── docs/
│   ├── SLIDE_SPECS.md       full slide-by-slide specification (auto-generated)
│   ├── DECK_OUTLINE.md      table of contents + scene inventory (auto-generated)
│   ├── PRODUCTION_3D.md     cameras, lighting, materials, asset hierarchy
│   └── ANIMATION_DIRECTION.md  what animates, rates, reveal choreography
├── dist/
│   └── autonomous-air-space-ground-ai-infrastructure.html
│                            single-file offline build (double-click to present)
└── tools/
    ├── export-docs.mjs      regenerates the auto-generated docs from deck data
    └── build-single-file.mjs rebuilds the single-file dist
```

## Design rules the deck follows

- **Visual-first** — every architecture layer, pipeline phase and workflow has its
  own unique 3D scene; the 5-second test drives every composition.
- **Semantic colour** — cyan = data, mint = learning/twin, violet = agentic AI,
  amber = human/orchestration, red = safety, ice = space, green = GPU compute.
  Identical meaning on all 94 slides.
- **One idea per slide** — TOP title · CENTER large visual · LEFT concept/inputs ·
  RIGHT outputs/decisions · BOTTOM technologies/metrics/interfaces.
- **Animation explains, never decorates** — packets show direction, pulses show
  liveness, blinking is reserved for faults.
- **Numbers over adjectives** — every layer and phase carries measurable targets
  and exit criteria.

## Extending

1. Add or edit a slide: `js/content/*.js` (plain data — title, columns, diagram
   spec, scene name, per-slide spec).
2. Add a 3D scene: export a function from `js/scenes/*.js` that returns a
   `kit.stage()` context; register it in `js/scenes/index.js`. `autofit()` frames
   it automatically.
3. Regenerate docs: `node tools/export-docs.mjs`.
4. Self-test: open `index.html?audit=1` — it must report zero errors.
