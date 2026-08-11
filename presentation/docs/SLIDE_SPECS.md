# Slide specification — The Autonomous Air–Space–Ground AI Infrastructure

Auto-generated from the deck source (`js/content/*.js`) by `tools/export-docs.mjs`.
Do not edit by hand: change the slide data and re-run the exporter.

- **Slides:** 94
- **Distinct animated 3D scenes:** 65
- **Technical diagrams:** 45
- **Acts:** 8

Every slide below is specified with **VISUAL · 3D SCENE · COMPONENTS · DATA FLOW ·
ANIMATION · TEXT · TECHNICAL MESSAGE**, followed by the on-slide content
(columns, technologies, interfaces, metrics) exactly as the deck renders it.

---


## ACT 0–III · VISION & MASTER ARCHITECTURE

### Slide 1 — THE AUTONOMOUS AIR–SPACE–GROUND AI INFRASTRUCTURE

- **Kicker:** AUTONOMOUS PHYSICAL AI · SPACE + AIR + GROUND + EDGE + CLOUD
- **Layout:** `full`
- **Scene module:** `titleEarthToEdge`
- **Subtitle:** From sensing the physical world to reasoning, learning, deciding and acting autonomously.
- **Stage caption:** One system: 15 architecture layers, 14 development phases, 9 validation levels.

**VISUAL**
Cinematic Earth limb from low orbit, LEO shell above, UAV swarm and a living city below, all connected by glowing links.

**3D SCENE**
Earth (r=34) centred at (0,−38,−8) with a fresnel atmosphere shell; 2 orbital planes × 6 satellites at r=44, i=58°; two detailed satellites at 27–31 m carrying the labelled links; instanced city (110 buildings) at y=−3.2; 9-UAV mesh swarm at 13 m; gateway, 3 towers, pedestrians and a UGV.

**COMPONENTS**
- Earth + atmosphere shader
- LEO constellation
- UAV swarm with dynamic mesh links
- City with moving vehicles
- Ka-band feeder beam to gateway
- Sub-6 GHz access beams

**DATA FLOW**
Satellite → UAV → ground (downlink beams, cyan) and ground → UAV → satellite (telemetry, mint). Packets are instanced spheres marching along Bezier curves.

**ANIMATION**
- Earth spins at 0.012 rad/s
- Satellites orbit at 0.09 rad/s
- Rotors at ~30 rad/s, UAVs bob and re-form the mesh continuously
- Camera orbits the scene at 0.03 rad/s

**TEXT**
Title + subtitle only. The image must carry the message: three domains, one network.

**TECHNICAL MESSAGE**
This is infrastructure, not a demo: space, air and ground assets operate as a single addressable, learning system.

**PRODUCTION**
Camera 48° FOV, authored at (0,12,54) → (0,13,0); the deck then auto-frames it to the content bounding sphere. Key light (40,50,60) 1.05; blue rim 0.75; cyan accent point light; ACES tone map, exposure 1.16. Palette: cyan #35e0ff data, mint #6ef2c0 learning, ice #9fd8ff space.


---

### Slide 2 — This is not “an AI model for drones”

- **Kicker:** POSITIONING
- **Layout:** `standard`
- **Scene module:** `platformStack`
- **Subtitle:** It is a vertically integrated autonomy stack: the physical world is the input, the physical world is the output, and every mission makes the next mission better.
- **Stage caption:** Eight functional strata; a bidirectional data spine binds them.

**VISUAL**
Eight translucent holographic slabs stacked in perspective, pierced by a vertical data spine with packets travelling up and down.

**3D SCENE**
Slab width tapers 20 → 17.5 with altitude to force perspective; emissive edge lines colour-coded per stratum; spine at x=0 carries cyan packets up, mint packets down.

**COMPONENTS**
- Physical world & agents
- Sensing & communication
- Edge + cloud compute
- Digital twin
- Data + RAG knowledge
- AI models
- Agentic + physical AI
- Continual learning

**DATA FLOW**
Up = observations; down = commands and model updates. The loop closes at the bottom stratum.

**ANIMATION**
- Packets march up and down the spine
- Slow 0.05 rad/s camera orbit
- Edge glow breathes on the agentic layer

**TEXT**
Left column = what people usually build. Right column = what this is.

**TECHNICAL MESSAGE**
Platform thinking is the differentiator; the AI model is one replaceable component.

**PRODUCTION**
Camera (22,15,40) → (0,8,0), 42° FOV. Slabs: MeshStandard opacity 0.5, emissive intensity 0.12, edge LineBasic 0.75 alpha.


**LEFT COLUMN — concept / inputs**

- *WHAT PEOPLE USUALLY BUILD*
  - A perception model on one airframe
  - A hand-tuned flight mission
  - A dashboard with live video
  - A simulation that never touches hardware

- *WHY IT STOPS SCALING*
  - No shared world model → every new asset is a new integration
  - No knowledge layer → the fleet cannot be told why
  - No learning loop → field experience is thrown away

**RIGHT COLUMN — outputs / decisions**

- *WHAT THIS PLATFORM IS*
  - Sensing → knowledge → reasoning → actuation as one pipeline
  - Assets are interchangeable capabilities, not projects
  - Simulation is a first-class runtime, not a side tool
  - Every mission returns data, models and lessons

- *CONSEQUENCE* — Adding a new airframe, sensor, orbit or city becomes a configuration problem, not a re-engineering programme.

**KEY TECHNOLOGIES:** ROS 2 · PX4 · Isaac Sim / Isaac Lab · Omniverse · PyTorch · CUDA · Kubernetes · Vector DB · MLflow

**METRICS:** 15 architecture layers · 14 development phases · 9 validation levels · 1 continuous learning loop

**NOTE:** The unit of value is the platform, not the model. Models are replaceable parts inside it.

---

### Slide 3 — Visual grammar and asset vocabulary

- **Kicker:** HOW TO READ THIS DECK
- **Layout:** `standard`
- **Scene module:** `assetLineup`
- **Subtitle:** Every symbol, line style and colour is used consistently on all 90+ slides. Learn it once here.
- **Stage caption:** Five physical asset classes and the five link/flow types used throughout.

**VISUAL**
Five hero assets on lit landing pads in a dark hangar grid, each labelled, with a floating legend panel behind.

**3D SCENE**
Assets spaced 12 m apart on a 120 m grid; each on a glowing ring pad (r=2.6–3.1); legend rendered as a canvas-textured plane 4.4 m tall at z=-16.

**COMPONENTS**
- Satellite (solar panels, dish, optical terminal)
- Quadcopter (gimbal, LED, antenna)
- UGV (spinning LiDAR)
- Ground station dish
- GPU rack

**DATA FLOW**
None — this is the vocabulary slide. Flow semantics are stated in text and used from the next slide onward.

**ANIMATION**
- Satellite yaws at 0.25 rad/s
- UAV hovers ±0.35 m
- UGV LiDAR drum spins at 3 rad/s
- Camera dollies slowly across the lineup

**TEXT**
Two columns: asset classes and link/flow types + colour semantics.

**TECHNICAL MESSAGE**
Consistency is a design requirement, not decoration: it is what makes a 90-slide technical deck readable.

**PRODUCTION**
Camera (0,9,40) → (0,4,0). Hemisphere fill 0.7 to keep hardware silhouettes readable against the dark grid.


**LEFT COLUMN — concept / inputs**

- *ASSET CLASSES*
  - Satellite — LEO/GEO sensing + NTN backhaul
  - UAV — aerial sensing + aerial base station
  - UGV — ground robot, close-range work
  - Ground station — gateway to the terrestrial core
  - Edge / GPU — compute wherever latency demands it

**RIGHT COLUMN — outputs / decisions**

- *LINK & FLOW TYPES*
  - Solid glowing beam — high-rate data link
  - Dashed marching line — control / telemetry
  - Cyan spine — platform data bus
  - Mint arrow — learning / model update
  - Violet orb + halo — autonomous AI agent

- *COLOUR SEMANTICS*
  - `CYAN` data & communication
  - `MINT` learning & digital twin
  - `VIOLET` agentic / generative AI
  - `AMBER` human, energy, orchestration
  - `RED` failure, safety, risk

**KEY TECHNOLOGIES:** consistent iconography · consistent terminology · dark aerospace palette · one idea per slide

**NOTE:** A viewer should decode any slide in five seconds because the grammar never changes.

---

### Slide 4 — Deck map — from problem to autonomous operation

- **Kicker:** STRUCTURE
- **Layout:** `standard` (diagram only)
- **Subtitle:** Eleven acts. The narrative always moves in one direction: why → what → how it is built → how it is proven → how it operates.

**VISUAL**
Five-column structural matrix, colour-coded by act family, no 3D needed — this is the map, it must be instantly scannable.

**COMPONENTS**
- Act columns
- Slide-group cells
- Reading paths per audience

**ANIMATION**
- Static by design. If animated, reveal one column at a time from left to right.

**TEXT**
Reading paths for four audiences.

**TECHNICAL MESSAGE**
The deck is engineered as a document with a defined traversal order, not a slide pile.


**LEFT COLUMN — concept / inputs**

- *READING PATHS*
  - Investor / agency — acts I, II, IX, X, XI
  - CTO / architect — acts III, IV, V, VII
  - Researcher — acts V, VI, VII
  - Programme manager — acts VI, VII, VIII

- *IN-DECK TOOLS*
  - G grid overview
  - N per-slide production spec
  - P freeze animation for print/screenshot

**TECHNICAL DIAGRAM** (`matrix` — NARRATIVE STRUCTURE)

- **ACT I–II · WHY**: The disconnected world · 11 domains that break · Why silos fail · Global vision: Earth → Edge
- **ACT III–IV · WHAT**: Master architecture, 15 layers · Four cross-cutting planes · One slide per layer (L1–L15) · Inputs · processing · outputs
- **ACT V · ARCHITECTURES**: Simulation stack · AI stack · Agentic AI + RAG · Digital twin + comms · Federated & multi-agent RL
- **ACT VI–VII · BUILD & PROVE**: 14 development phases · 9-level testing pyramid · Failure & safety architecture · MLOps / AIOps / RobotOps
- **ACT VIII–XI · OPERATE**: Hardware ecosystem · End-to-end earthquake mission · 10 global use cases · Technology map · Final master architecture

**NOTE:** Every slide is specified: VISUAL · 3D SCENE · COMPONENTS · DATA FLOW · ANIMATION · TEXT · TECHNICAL MESSAGE.

---

### Slide 5 — When the physical world breaks, the digital world goes blind

- **Kicker:** ACT I · THE PROBLEM
- **Layout:** `standard`
- **Scene module:** `brokenWorld`
- **Subtitle:** An earthquake, a typhoon, a cable cut or simply distance: within minutes the terrestrial layer that all modern autonomy silently depends on is gone.
- **Stage caption:** Collapsed districts, dead base stations, no backhaul, no map, no situational awareness.

**VISUAL**
Night-time disaster city in red/amber: 45% of buildings collapsed or tilted, fires and drifting smoke, three dead towers flashing “NO SERVICE”.

**3D SCENE**
Instanced city, damaged=0.45, emissive roof lights recoloured to ember; 16 fire cones + smoke spheres animated; dark circular “outage” disc r=40 on the ground plane.

**COMPONENTS**
- Damaged instanced city
- Fire/smoke particle proxies
- Dead cell towers with red beacons
- Status panel: backhaul DOWN / grid PARTIAL / roads BLOCKED

**DATA FLOW**
Deliberately absent. The absence of links is the message of the slide.

**ANIMATION**
- Flames scale-pulse at 5 Hz
- Smoke drifts vertically
- “NO SERVICE” labels blink out of phase
- Camera orbits slowly at 0.024 rad/s

**TEXT**
Left: what is lost / what still works. Right: the operational gap in time bands.

**TECHNICAL MESSAGE**
Autonomy is required because the failure is simultaneous, wide-area and time-critical.

**PRODUCTION**
Warm key light 0xff9d7a at 0.5 intensity, red point light at the city centre, fog 0x0a0608 near 40 / far 150 to bury the horizon.


**LEFT COLUMN — concept / inputs**

- *WHAT IS LOST*
  - Cellular access and backhaul
  - Power, therefore edge compute
  - Road access, therefore ground crews
  - Any current map of what just happened

- *WHAT STILL WORKS*
  - Orbit — nothing on the ground can break it
  - Air — a corridor nobody has to clear
  - Batteries, GPUs and radios you can fly in

**RIGHT COLUMN — outputs / decisions**

- *THE OPERATIONAL GAP*
  - `0–2 h` no reliable comms, no picture
  - `2–12 h` manual recon, partial voice
  - `12–72 h` ad-hoc networks, still no fused map
  - `GOAL` usable network + live map in minutes

- *WHY AUTONOMY, NOT MORE PEOPLE* — The bottleneck is not willingness — it is simultaneity: hundreds of decisions per minute across kilometres of terrain, under degraded sensing and comms.

**METRICS:** <10 min target time-to-first-link · 0 assumed ground infrastructure · 100% of decisions initially manual today

**NOTE:** The problem is not a missing model. It is a missing infrastructure that can be delivered by air and space and think for itself.

---

### Slide 6 — Eleven domains, one recurring failure

- **Kicker:** ACT I · SCOPE
- **Layout:** `standard`
- **Scene module:** `domainTiles`
- **Subtitle:** Disaster response is the sharpest case, not the only one. Every domain below fails for the same reason: the physical world is bigger than the sensing, comms and decision capacity available on the ground.
- **Stage caption:** Each tile is a deployment environment; the core is the same autonomy platform.

**VISUAL**
Eleven glowing environment tiles arranged in a ring around a central agent orb labelled “ONE INFRASTRUCTURE”, each tile linked to the core by a beam.

**3D SCENE**
Tiles 7.4 × 7.4 m at radius 22, each with 7 procedural extrusions in the domain colour and a floating octahedron pin; core orb r=2.4 at 5 m.

**COMPONENTS**
- 11 domain tiles
- Central platform orb
- 11 tile→core beams with packets

**DATA FLOW**
Bidirectional: each domain contributes data and consumes autonomy from the same core.

**ANIMATION**
- Pins bob out of phase
- Beam packets flow inward
- Camera orbits the ring at 0.035 rad/s

**TEXT**
Left: the common pattern. Right: why one platform serves all eleven.

**TECHNICAL MESSAGE**
The platform is domain-agnostic; the mission layer is domain-specific.


**LEFT COLUMN — concept / inputs**

- *THE COMMON PATTERN*
  - Large area, sparse sensing
  - Intermittent or absent connectivity
  - Decisions needed faster than humans can gather context
  - High cost of being wrong

**RIGHT COLUMN — outputs / decisions**

- *WHY ONE PLATFORM*
  - Same sensing abstractions
  - Same comms and edge fabric
  - Same digital twin and knowledge layer
  - Only the mission policy and payload change

**KEY TECHNOLOGIES:** disaster · remote areas · telecom outage · agriculture · logistics · inspection · search & rescue · industrial · smart city · maritime · space ops

**NOTE:** Reuse across domains is the economic argument: one infrastructure amortised over eleven markets.

---

### Slide 7 — Three separate programmes cannot become one capability

- **Kicker:** ACT I · WHY TODAY FAILS
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `silos`
- **Subtitle:** Space, air and ground autonomy are usually procured, built and operated as independent programmes. The integration cost is then paid forever, at the worst possible moment: during the mission.

**VISUAL**
Three isolated circular islands (space / drone / robotics programme) with broken red links between them and a red ✕ at each break.

**3D SCENE**
Islands r=7 at x = −20, 0, +20 with a satellite, a UAV and a UGV; broken polylines with a gap in the middle; explanatory panel floating in front.

**COMPONENTS**
- Three programme islands
- Broken inter-programme links
- “Failure mode” panel

**DATA FLOW**
Intentionally broken — the gaps are the content.

**ANIMATION**
- Static assets, slow camera orbit
- Optional: red ✕ pulses on each break

**TEXT**
Symptoms → root cause → the fix, plus a five-stage cost chain below the 3D view.

**TECHNICAL MESSAGE**
Siloed autonomy scales quadratically in integration cost and cannot meet mission timelines.


**LEFT COLUMN — concept / inputs**

- *SYMPTOMS*
  - “The drone team owns that, the satellite team owns this”
  - Two dashboards that disagree about the same building
  - A model that cannot be deployed because no one can certify it
  - Field data that never reaches training

**RIGHT COLUMN — outputs / decisions**

- *ROOT CAUSE* — No shared representation of the world, of knowledge, or of learning. Every interface is bilateral, so cost grows with the square of the number of programmes.

- *THE FIX* — One world model, one knowledge base, one learning loop — enforced by architecture, not by meetings.

**TECHNICAL DIAGRAM** (`chain` — INTEGRATION COST OF SILOED AUTONOMY)

- Separate data models — no common world state
- Separate comms — manual relay design
- Separate planners — no joint task allocation
- Separate training — no shared experience
- Human glue — operators become the integration layer

**NOTE:** The architecture in this deck exists specifically to remove the human glue from the critical path.

---

### Slide 8 — Satellites + UAVs + ground robots + edge as one intelligent infrastructure

- **Kicker:** ACT I · THE ANSWER
- **Layout:** `standard`
- **Scene module:** `integrated`
- **Subtitle:** The same three assets, now sharing a world model, a knowledge base, a communication fabric and a learning loop, coordinated by an autonomy layer above all of them.
- **Stage caption:** NTN feeder · satellite↔UAV · UAV↔robot · edge fabric, all under one autonomy layer.

**VISUAL**
A satellite, a 6-UAV mesh swarm, two ground robots, a gateway and an edge rack, all tied to a violet “shared autonomy layer” orb above the scene.

**3D SCENE**
Sat at (−20,18,−6); swarm at 11 m with 20 m mesh range; robots at (16,0,6) and (21,0,−4); gateway (−18,0,12); rack (4,0,16); orb at (0,24,8).

**COMPONENTS**
- NTN feeder beam (cyan)
- Sat↔UAV dashed control link
- UAV↔robot beam (mint)
- Edge fabric link (NVIDIA green)
- Agent orb with dashed links to every asset

**DATA FLOW**
Sensing flows up to the autonomy layer; tasking flows back down to each asset class; peer links carry local coordination.

**ANIMATION**
- Packets flow on all five links
- Robot LiDAR spins, rotors spin
- Orb rings counter-rotate
- Camera orbit 0.03 rad/s

**TEXT**
Left: what is shared. Right: what becomes possible + the bounded-autonomy principle.

**TECHNICAL MESSAGE**
Cross-domain autonomy is an architectural property: shared world model, shared knowledge, shared learning.


**LEFT COLUMN — concept / inputs**

- *SHARED BY DESIGN*
  - World model — one geometry, one semantics, one timeline
  - Knowledge — maps, regulations, manuals, mission history
  - Comms fabric — every asset is a relay candidate
  - Learning loop — every asset contributes experience

**RIGHT COLUMN — outputs / decisions**

- *WHAT BECOMES POSSIBLE*
  - A satellite detection can task a UAV within seconds
  - A UAV can become the base station its robots need
  - A robot’s LiDAR can correct the twin the swarm plans on
  - A failure anywhere is reallocated, not escalated

- *CONTROL PRINCIPLE* — Autonomy is bounded: agents plan and act inside envelopes that humans set and can always retake.

**KEY TECHNOLOGIES:** SAGIN · 3GPP NTN · ROS 2 DDS · MAVLink · Zenoh/DDS bridging · gRPC · Kubernetes at the edge

**METRICS:** seconds detection → tasking · 3 domains under one planner · n+1 redundant comms paths

**NOTE:** Integration is achieved by shared representations, not by point-to-point connectors.

---

### Slide 9 — Earth-to-Edge: seven tiers, one vertical information column

- **Kicker:** ACT II · GLOBAL VISION
- **Layout:** `full`
- **Scene module:** `earthToEdgeStack`
- **Subtitle:** SPACE → LEO → HAPS → UAV SWARM → 6G/NTN ACCESS → GROUND STATIONS → CITIES, IoT, ROBOTS, HUMANS. Data climbs; commands and models descend.
- **Stage caption:** Vertical spine = platform bus (up: observations, down: commands + model updates). Horizontal links = peer coordination inside each tier.

**VISUAL**
Full-bleed vertical stack of seven labelled altitude tiers with real assets on each, pierced by a bright bidirectional spine.

**3D SCENE**
Tier planes at y = 3, 9, 16, 25, 34, 46, 56 with shrinking width to create perspective; satellites at 46–56 m, HAPS 34 m, swarm 25 m, towers/gateway 9 m, city + humans + robot at 3 m.

**COMPONENTS**
- Tier planes + rings
- Assets per tier
- Central spine with up/down packet streams
- Six cross-tier links alternating beam/dashed

**DATA FLOW**
Up: raw sensing → fused state → global knowledge. Down: mission intent → policies → actuator commands → model weights.

**ANIMATION**
- Satellites translate across their tier
- Spine packets: cyan up, mint down
- Swarm re-forms its mesh
- Camera orbits at 0.028 rad/s with slight bob

**TEXT**
Title, subtitle, tier labels in-scene only. No body text — the picture is the argument.

**TECHNICAL MESSAGE**
The platform is a vertical information column: any tier can sense, relay, compute or act, and the column never stops learning.

**PRODUCTION**
Camera (30,26,54) → (0,24,0), 48° FOV, fog 80/260. Tier label sprites at x=−26 so they never overlap the assets.


**KEY TECHNOLOGIES:** GEO relay · LEO imaging + NTN · HAPS · UAV aerial base stations · 5G/6G access · FSO · gateways · edge GPU · IoT

**METRICS:** 7 tiers · 2 flow directions · ms → s latency budget by tier · km → 1000s km link range span

**NOTE:** Every later slide is a zoom into one tier or one flow of this single picture.

---

### Slide 10 — What “good” means: the platform KPI envelope

- **Kicker:** ACT II · TARGETS
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `kpiWall`
- **Subtitle:** Autonomy claims are only credible with numbers attached. These are the platform-level targets every later architecture decision is judged against.

**VISUAL**
Four live holographic gauges above a small instrumented city, with a six-family KPI chain below the 3D view.

**3D SCENE**
Canvas-texture gauges (coverage, link uptime, autonomy, energy) at 9 m, redrawn every frame; 70-building city and a 5-UAV mesh below for context.

**COMPONENTS**
- 4 animated gauges
- Context city + swarm
- KPI family chain diagram

**DATA FLOW**
Telemetry → aggregation → KPI → orchestration feedback (the gauges are the feedback signal, not decoration).

**ANIMATION**
- Gauge needles oscillate ±5% around target to imply live telemetry
- Slow camera drift

**TEXT**
Four KPI cards, one headline metric strip.

**TECHNICAL MESSAGE**
Autonomy is an engineering claim with measurable acceptance thresholds.


**LEFT COLUMN — concept / inputs**

- *MISSION KPIs*
  - `<10 min` first usable link
  - `>90%` priority area covered in 1 h
  - `<2 s` detection → task assignment
  - `>95%` map freshness < 5 min

- *NETWORK KPIs*
  - `>100 Mb/s` aggregate user throughput
  - `<50 ms` edge inference RTT
  - `<1%` link outage in mission window

**RIGHT COLUMN — outputs / decisions**

- *AUTONOMY & SAFETY KPIs*
  - `<0.1/h` human interventions per UAV
  - `100%` safety-critical actions monitored
  - `<1 s` fault detection → safe policy
  - `0` uncommanded geofence exits

- *LEARNING KPIs*
  - `<15%` sim-to-real performance gap
  - `>1` policy improvement per mission batch
  - `<24 h` field data → retrained candidate

**TECHNICAL DIAGRAM** (`chain` — KPI FAMILIES AND OWNERSHIP)

- MISSION — time-to-first-link · area covered · targets found
- NETWORK — throughput · coverage · outage · handover
- AUTONOMY — interventions per hour · decision latency
- SAFETY — incidents · fallback activations · geofence breaches
- LEARNING — sim-to-real gap · model regression rate
- ECONOMICS — cost per covered km² · energy per bit

**METRICS:** <10 min time to first link · <0.1/h interventions per UAV · <15% sim-to-real gap · >90% priority coverage

**NOTE:** Each KPI family has an owning layer and an owning agent — they are wired into the orchestration layer, not just reported.

---

### Slide 11 — The complete system: 15 layers, sensing up, action down

- **Kicker:** ACT III · MASTER ARCHITECTURE
- **Layout:** `full`
- **Scene module:** `masterArchitecture`
- **Subtitle:** L1 physical world · L2 sensing · L3 physical agents · L4 communication · L5 edge · L6 digital twin · L7 data · L8 RAG/knowledge · L9 AI models · L10 agentic AI · L11 physical AI · L12 learning · L13 orchestration · L14 human · L15 deployment.
- **Stage caption:** Left spine = SENSE (observations rising). Right spine = ACT (decisions descending). Icons mark the layer where each asset class physically lives.

**VISUAL**
Fifteen stacked translucent architecture slabs in deep perspective, two counter-flowing spines, and 3D asset icons anchored to the layers where they live.

**3D SCENE**
Slabs 34 × 15 m spaced 2.5 m; left spine (x=−11) cyan upward, right spine (x=+11) violet downward; icons: city (L1), UAV (L3), satellite (L4), rack (L5), twin city (L6), knowledge graph (L8), agent orb (L10), robot (L11), human (L14).

**COMPONENTS**
- 15 labelled layer slabs
- SENSE spine
- ACT spine
- 9 anchored asset icons

**DATA FLOW**
L1→L2→…→L11 produces action; L12 learning taps every layer; L13 orchestrates across layers; L14 can intercept at any layer.

**ANIMATION**
- Packets rise on the left spine and fall on the right
- Knowledge graph and agent orb rotate
- Camera makes a slow 74 m orbit to reveal depth

**TEXT**
Only layer names in-scene; the subtitle enumerates them for readers of the printed version.

**TECHNICAL MESSAGE**
This one picture is the contract for the rest of the deck: every following slide is a zoom into one of these layers.

**PRODUCTION**
Camera (46,34,58) → (0,17,0), 46° FOV, fog 90/300. Slab opacity 0.42 so eight layers remain legible through each other.


**KEY TECHNOLOGIES:** ROS 2 · PX4 · Isaac Sim · Isaac Lab · Omniverse · 3GPP NTN · Vector DB · Knowledge Graph · VLM/LLM · MARL · Federated Learning · Kubernetes · CUDA

**METRICS:** 15 layers · 4 cross-cutting planes · 2 closed loops (control + learning) · 1 shared world model

**NOTE:** Read it as a loop, not a stack: L15 deployment feeds L1 the physical world, which is sensed again by L2 — the system never leaves the loop.

---

### Slide 12 — Four planes cut through every layer

- **Kicker:** ACT III · CROSS-CUTTING
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `crossPlanes`
- **Subtitle:** A layered diagram alone is a lie: the interesting failures are vertical. Data, control, learning and safety are separate planes with separate guarantees, and each crosses all fifteen layers.

**VISUAL**
Eight faint layer slabs pierced vertically by four coloured translucent planes, each labelled with its function.

**3D SCENE**
Planes 13 × 25 m rotated 90° about Y at x = −9, −3, +3, +9; each with its own spine of packets rising at 0.16 speed.

**COMPONENTS**
- Layer slabs (context)
- Data / control / learning / safety planes
- Per-plane packet spines

**DATA FLOW**
Each plane carries a different traffic class through the same physical assets.

**ANIMATION**
- Packets rise in each plane at different rates
- Camera orbits to show the planes cutting the stack

**TEXT**
Why separate them + the one hard rule; the diagram states each plane’s guarantee.

**TECHNICAL MESSAGE**
Separation of planes — especially safety from learning — is what makes autonomous physical AI certifiable.


**LEFT COLUMN — concept / inputs**

- *WHY SEPARATE THEM*
  - Different latency classes (ms vs minutes)
  - Different failure semantics (drop vs never drop)
  - Different certification paths
  - Different owners in the organisation

**RIGHT COLUMN — outputs / decisions**

- *THE ONE HARD RULE* — The safety plane must not share components, clocks or power domains with the learning plane. If the AI is wrong, the thing that stops it must not be wrong for the same reason.

**TECHNICAL DIAGRAM** (`graph` — PLANE RESPONSIBILITIES AND GUARANTEES)

- `d1` Sensor & telemetry transport — best-effort, high volume
- `d2` Feature & state store — append-only, replayable
- `d3` World state service — single source of geometry
- `d4` Guarantee: lineage — every value traceable to a sensor
- `c1` Mission & task commands — authenticated, ordered
- `c2` Policy selection — which controller is live
- `c3` Actuator setpoints — hard real-time on-board
- `c4` Guarantee: determinism — bounded latency, no reordering
- `l1` Experience collection — trajectories, rewards, labels
- `l2` Training & aggregation — central, federated, MARL
- `l3` Model registry & rollout — versioned, signed, revertible
- `l4` Guarantee: reproducibility — data + code + seed pinned
- `s1` Independent monitors — no shared failure mode with AI
- `s2` Envelopes & geofences — checked outside the policy
- `s3` Fallback controllers — classical, certifiable
- `s4` Guarantee: last word — safety can always override AI

Edges: d1→d2, d2→d3, c1→c2, c2→c3, l1→l2, l2→l3, s1→s2, s2→s3

**NOTE:** Layers describe structure; planes describe guarantees. Both are needed before any code is written.

---


## ACT IV · THE 15 LAYERS

### Slide 13 — Physical world — the only ground truth

- **Kicker:** LAYER 1 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l1PhysicalWorld`
- **Subtitle:** Purpose: define what the system is responsible for perceiving and changing. Everything above this layer is a model of it, and every model is wrong somewhere.
- **Stage caption:** City · roads · vehicles · humans · farmland · industrial site · maritime · disaster zone, on real terrain.

**VISUAL**
Wide aerial establishing shot: real terrain with a partially damaged city at centre, farmland west, industrial site east, sea to the north and a marked disaster zone.

**3D SCENE**
190 × 190 m displaced terrain; 150-building instanced city (22% damaged); 24 moving vehicles; 6 pedestrians; 5 crop plots; 4 industrial tanks; animated sea plane with a moving vessel.

**COMPONENTS**
- Terrain mesh + wireframe
- City + roads + vehicles
- Humans
- Farmland plots
- Industrial tanks
- Sea + ship
- Red disaster-zone disc

**DATA FLOW**
None yet — this is the source. Arrows begin at L2.

**ANIMATION**
- Vehicles drive along the grid
- Sea wireframe swells
- Ship traverses the coastline
- Slow high orbit camera

**TEXT**
Environment classes, what the platform must tolerate, and the sensing requirement passed to L2.

**TECHNICAL MESSAGE**
The physical world is the specification. Model quality is judged against it, never the reverse.

**PRODUCTION**
Camera (0,30,62) → (0,3,−2), 48° FOV, fog 70/240. Cool key 0xcfe4ff at 0.85 to keep it documentary rather than heroic.


**LEFT COLUMN — concept / inputs**

- *ENVIRONMENT CLASSES*
  - Urban: buildings, streets, crowds, cellular grid
  - Rural / agricultural: fields, irrigation, machinery
  - Industrial: plants, tanks, pipelines, restricted zones
  - Maritime: vessels, ports, sea state
  - Disaster: collapse, fire, flooding, debris

- *INPUTS*
  - None — this layer is the input to the system

**RIGHT COLUMN — outputs / decisions**

- *WHAT THE PLATFORM MUST HANDLE*
  - Geometry that changes without warning
  - Actors that do not cooperate
  - Weather that invalidates plans and links
  - Regulatory boundaries that are invisible to sensors

- *INTERFACE ▲ TO L2* — Defines the sensing requirement: resolution, revisit rate, spectral bands, accuracy and coverage needed to act safely.

**TECHNICAL DIAGRAM** (`chain` — L1 INPUT → PROCESSING → OUTPUT)

- Reality — terrain, structures, weather, people, machines
- Physical events — earthquake, blockage, outage, growth
- Observable signals — photons, RF, sound, vibration, motion
- To L2 sensing — what must be measured, at what rate

**KEY TECHNOLOGIES:** GIS / OpenStreetMap · GeoJSON · DTM / DSM · cadastral + airspace data · weather feeds · traffic feeds

**METRICS:** cm–m geometric accuracy required · s–min change detection latency · km² area of responsibility · 24/7 operating window

**NOTE:** Design rule: never let a model’s assumption about the world become invisible. Everything above must be traceable to something measurable here.

---

### Slide 14 — Sensing — turning the world into measurements

- **Kicker:** LAYER 2 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l2Sensing`
- **Subtitle:** Purpose: acquire calibrated, time-stamped, geo-referenced observations from orbit, air, ground and fixed infrastructure, with known uncertainty.
- **Stage caption:** One UAV emitting LiDAR, camera, radar and RF sensing volumes over a city, with a satellite swath sweeping across it.

**VISUAL**
Hero UAV at 18 m over a city with four visibly different sensing volumes: mint LiDAR fan, amber camera frustum with a scanning line, pink radar cone, violet RF cone. A satellite sweeps a bright swath across the ground.

**3D SCENE**
LiDAR: 54 rotating rays with hit points; camera: line frustum + scan bar; radar/RF: additive cones with breathing scale; satellite swath: 10 × 2.4 m footprint translating on Z.

**COMPONENTS**
- UAV + 4 sensing volumes
- Satellite + swath + footprint
- 14 pulsing IoT nodes
- UGV with spinning LiDAR
- Six sensor labels

**DATA FLOW**
World → sensor volumes → (implicit) onboard triage. Every volume is annotated with the data product it yields.

**ANIMATION**
- LiDAR fan rotates at 1.6 rad/s
- Camera scan bar sweeps
- Cones breathe at 1.7 Hz
- Satellite footprint sweeps ±18 m
- IoT nodes pulse asynchronously

**TEXT**
Sensor set with real specs, processing steps, and the uncertainty-carrying output contract.

**TECHNICAL MESSAGE**
Sensing is a metrology problem before it is an AI problem.

**PRODUCTION**
Camera (26,18,40) → (0,8,0). Keep the four volumes visually distinct by colour AND geometry so the slide reads in five seconds.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Photons (VIS/NIR/thermal)
  - RF energy (radar, spectrum, CSI)
  - Inertial + satellite navigation
  - Environmental scalars (wind, temp, gas)

- *SENSOR SET*
  - Camera RGB / IR, rolling-shutter aware
  - LiDAR 32–128 ch, 10–20 Hz
  - Radar mmWave, range-Doppler
  - RF spectrum + CSI probes
  - IMU + GNSS-RTK pose
  - Satellite multispectral + SAR

**RIGHT COLUMN — outputs / decisions**

- *PROCESSING*
  - Calibration and de-warping
  - Time sync to a single mission clock
  - Pose stamping (every sample geo-referenced)
  - Onboard triage: what is worth transmitting

- *OUTPUTS → INTERFACES*
  - Point clouds, frames, spectra, tracks
  - Uncertainty per measurement
  - ▼ from L1: physical signal
  - ▲ to L5 edge inference and L7 data platform

**TECHNICAL DIAGRAM** (`chain` — L2 SENSOR PIPELINE)

- Physical signal — photons · RF · inertia
- Sensor + calibration — intrinsics, extrinsics, bias
- Time & pose stamping — PTP / GNSS-PPS, IMU fusion
- Compression / triage — onboard, bandwidth-aware
- To L5 / L7 — measurement + uncertainty

**KEY TECHNOLOGIES:** ROS 2 sensor_msgs · PTP / GNSS-PPS · RTK · GStreamer / NVENC · Velodyne/Ouster SDK · SAR / multispectral products

**METRICS:** <1 ms inter-sensor time sync · <5 cm RTK pose accuracy · 10–20 Hz LiDAR frame rate · >10:1 onboard data reduction

**NOTE:** A measurement without time, pose and uncertainty is not data — it is an anecdote. This layer exists to prevent anecdotes entering the platform.

---

### Slide 15 — Physical agents — the bodies the AI operates

- **Kicker:** LAYER 3 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l3Agents`
- **Subtitle:** Purpose: provide the mobility, payload, endurance and compute envelopes that bound every plan the autonomy layer is allowed to make.
- **Stage caption:** Satellite, UAV swarm, UGVs, autonomous vehicle and edge node, each with its capability envelope.

**VISUAL**
A lit hangar apron with each agent class present and a floating spec panel beside it.

**3D SCENE**
Satellite at (−26,22,−8); 8-UAV mesh swarm at 13 m; solo UAV low for detail; two UGVs; a moving autonomous vehicle; a GPU rack. Five canvas spec panels.

**COMPONENTS**
- 5 agent classes
- Per-class spec panels
- Dynamic mesh links between swarm members

**DATA FLOW**
Implicit: commands arrive from above, telemetry leaves from below. Explicit flows appear in L4.

**ANIMATION**
- Vehicle drives across the apron and loops
- Rotors + LiDAR spin
- Satellite yaws slowly

**TEXT**
Capability-envelope matrix, inputs, processing, outputs and interfaces.

**TECHNICAL MESSAGE**
Autonomy is only as good as the bodies it commands; envelopes are published as constraints, not assumptions.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Task assignments from L13 orchestration
  - Control setpoints from L11 physical AI
  - Model updates from L12 learning

- *PROCESSING*
  - Flight / motion control (real-time, on-board)
  - Payload management and power budgeting
  - Health monitoring and self-reporting

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Physical effect in the world
  - Sensor streams (to L2)
  - Health, energy and capability telemetry

- *INTERFACES*
  - ▼ from L4/L5: commands, policies, inference
  - ▲ to L2/L7: observations and telemetry
  - Hard limits published to L13 as constraints

**TECHNICAL DIAGRAM** (`matrix` — AGENT CLASSES · CAPABILITY ENVELOPES)

- **SATELLITE**: LEO 500–600 km · revisit: hours · wide-area, low detail · NTN backhaul
- **UAV**: 20–60 min endurance · 0–500 m AGL · 1–5 kg payload · aerial base station
- **UAV SWARM**: 5–50 units · area scaling · mesh relay · graceful degradation
- **UGV / ROBOT**: hours endurance · contact-level work · heavy sensors · blocked by terrain
- **EDGE NODE**: static or vehicular · GPU inference · model cache · local autonomy anchor

**KEY TECHNOLOGIES:** PX4 / ArduPilot · MAVLink · ROS 2 control · Jetson Orin / AGX · CAN / UAVCAN · ISO 21384 (UAS) · ITU/3GPP NTN

**METRICS:** 20–60 min UAV endurance · 100–275 TOPS onboard AI compute · 5–50 agents per mission · <10 ms inner control loop

**NOTE:** The physical envelope is not a detail — it is the hard constraint set that makes an autonomy plan feasible or fiction.

---

### Slide 16 — Communication — the fabric that makes the fleet one system

- **Kicker:** LAYER 4 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l4Comms`
- **Subtitle:** Purpose: keep every agent reachable, every observation deliverable and every decision timely across space, air and ground, with graceful degradation instead of failure.
- **Stage caption:** Ka feeder · NTN Ku sat↔UAV · UAV mesh · fronthaul · 5G/6G access · optical inter-satellite link.

**VISUAL**
Global-to-local communication scene where each link type is visually distinct: solid beams for data, dashed marching lines for control, a thin white line for the optical ISL.

**3D SCENE**
Two satellites at 46–48 m translating on X; 6-UAV mesh at 22 m with 26 m mesh range; gateway; three towers with coverage cones; six ground users.

**COMPONENTS**
- 6 labelled link types
- Coverage cones
- Gateway + towers + users

**DATA FLOW**
Sat→ground feeder, sat→UAV NTN, UAV↔UAV mesh, UAV→tower fronthaul, direct 5G/6G access, satellite↔satellite optical.

**ANIMATION**
- Packets march at different rates per link class
- Satellites drift, swarm re-forms mesh

**TEXT**
Link topology graph plus inputs/processing/outputs and hard network KPIs.

**TECHNICAL MESSAGE**
Connectivity is an optimisation problem solved continuously by a learning agent, with n+1 redundancy for anything mission-critical.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Traffic demand per user / agent / task
  - Channel state (CSI), interference, blockage
  - Positions, velocities, energy budgets
  - Spectrum and regulatory constraints

- *PROCESSING*
  - Topology and relay selection
  - Beamforming and interference coordination
  - Power / bandwidth / MCS allocation
  - Handover between terrestrial and NTN

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - End-to-end reachability with SLA classes
  - Achieved rate, latency, outage per link
  - Predicted link quality for planners

- *INTERFACES*
  - ▼ from L3: platform positions and energy
  - ▲ to L5/L13: achievable rates as constraints
  - Comms agent (L10) owns the control policy

**TECHNICAL DIAGRAM** (`graph` — LINK TOPOLOGY AND ROLES)

- `leo` LEO satellite — NTN + imaging
- `leo2` LEO satellite — optical ISL peer
- `uav` UAV relay / ABS — aerial base station
- `mesh` UAV↔UAV mesh — multi-hop, self-healing
- `gw` Gateway / ground station — feeder + core uplink
- `gnb` 5G/6G gNB — terrestrial access
- `ue` Users & robots — UE / device
- `core` Core + edge UPF — routing, slicing
- `orch` Comms agent — topology + power control

Edges: leo→uav (Ku NTN), leo→gw (Ka feeder), leo→leo2 (FSO ISL), uav→mesh, mesh→gnb (fronthaul), gnb→ue, gw→core, core→orch, orch→mesh

**KEY TECHNOLOGIES:** 3GPP NTN (Rel-17/18) · 5G NR / 6G candidates · mmWave · FSO / optical ISL · O-RAN · NVIDIA Sionna · TR 38.901 channel models

**METRICS:** >100 Mb/s aggregate user throughput · <50 ms edge RTT · <1% in-mission outage · n+1 independent paths per critical flow

**NOTE:** Communication is treated as a controlled resource with a learned policy — not as plumbing that either works or does not.

---

### Slide 17 — Edge computing — putting the loop where the latency is

- **Kicker:** LAYER 5 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l5Edge`
- **Subtitle:** Purpose: execute perception, control and local decisions close to the actuator so that autonomy survives a lost link, and reserve the cloud for what genuinely needs scale.
- **Stage caption:** Exploded onboard compute module and the four-tier closed-loop latency budget.

**VISUAL**
An exploded onboard compute stack (sensor IO, CPU, GPU, NPU, radio) as glowing PCB plates with components, plus a four-bar latency ladder.

**3D SCENE**
Five 11 × 7 m plates spaced 2.4 m with 9 procedural chips each; NVIDIA-green data spine with bidirectional packets; a UAV hovering above the stack; latency bars scaled by budget.

**COMPONENTS**
- 5 compute plates
- Bidirectional spine
- Latency ladder (onboard / edge / cloud / satellite)
- “Placement rule” panel

**DATA FLOW**
Sensors → CPU/GPU/NPU → radio, with results returning down the spine to the actuator.

**ANIMATION**
- Packets flow up and down the module
- Rotors spin above
- Latency bars glow at different intensities

**TEXT**
Compute placement stack with explicit latency classes.

**TECHNICAL MESSAGE**
Latency defines architecture. Placement of compute is a safety decision, not an infrastructure preference.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Raw and pre-processed sensor streams
  - Deployed model artefacts + configs
  - Local mission context and geofences

- *PROCESSING*
  - Quantised inference (INT8/FP8) with TensorRT
  - Sensor fusion and state estimation
  - Local decision making under link loss
  - Store-and-forward when disconnected

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Detections, tracks, local maps
  - Control setpoints and mode changes
  - Compressed summaries for the platform

- *INTERFACES*
  - ▼ from L4: whatever bandwidth actually exists
  - ▲ to L6/L7: fused state and summaries
  - Degraded-mode contract with the safety plane monitors

**TECHNICAL DIAGRAM** (`stack` — COMPUTE PLACEMENT DECISION)

- Hard real-time control (IMU→motor) — must never leave the vehicle
- Perception + local planning — onboard GPU / DLA, TensorRT
- Multi-agent fusion, twin update, mapping — edge server at the gateway
- LLM reasoning, RAG, mission re-planning — regional cloud, cached results
- Training, large-scale simulation, analytics — central GPU cluster

**KEY TECHNOLOGIES:** Jetson Orin / AGX · TensorRT · CUDA · Triton · ROS 2 + DDS · K3s / KubeEdge · ONNX · gRPC

**METRICS:** 1–20 ms onboard inference · >30 FPS perception rate · 100% autonomy retained on link loss · <15 W inference power budget

**NOTE:** The rule is simple: if losing the link would break the loop, the loop belongs on the vehicle.

---

### Slide 18 — Digital twin — a runnable copy of the mission environment

- **Kicker:** LAYER 6 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l6DigitalTwin`
- **Subtitle:** Purpose: maintain a physically accurate, continuously synchronised virtual replica in which the platform can measure, predict, rehearse and validate before acting in the real world.
- **Stage caption:** Left: physical Taipei. Right: synchronised twin. Up-arrow: telemetry. Down-arrow: optimised policy.

**VISUAL**
Split screen: warm-lit physical city on the left, mint wireframe-boxed twin on the right, both containing the same UAV in the same pose. Two large arrows between them.

**3D SCENE**
Identical instanced city seed (31) rendered twice with different palettes; twin UAV copies the real UAV transform every frame; a mint bounding volume marks the simulated domain; “Δt SYNC < 200 ms” label pulses.

**COMPONENTS**
- Physical city + vehicles + UAV
- Twin city + vehicles + UAV
- Telemetry arrow (cyan)
- Policy arrow (violet)
- Sync-age indicator

**DATA FLOW**
Left→right: telemetry, pose, sensors, network state. Right→left: optimised policy, predicted risk, plan.

**ANIMATION**
- Real UAV flies a Lissajous path; twin UAV mirrors it exactly
- Both arrows pulse out of phase
- Sync label breathes at 1.6 Hz

**TEXT**
What is twinned, inputs, processing, outputs, and the twin’s accuracy budget.

**TECHNICAL MESSAGE**
A twin with a bounded synchronisation age and quantified fidelity is what makes pre-validated autonomy possible.

**PRODUCTION**
Camera (0,26,58) → (0,6,0), 48° FOV. Keep the two halves at identical scale and camera distance so the viewer reads them as the same city.


**LEFT COLUMN — concept / inputs**

- *WHAT IS TWINNED*
  - Terrain, buildings, interiors where needed
  - Every agent (UAV, UGV, satellite) with its dynamics
  - Radio environment (path loss, blockage, interference)
  - Weather, traffic, crowds, energy state
  - Users and their demand

- *INPUTS*
  - GIS + as-built models
  - Live telemetry and fused perception
  - Network measurements (CSI, RSRP, throughput)

**RIGHT COLUMN — outputs / decisions**

- *PROCESSING*
  - Geometric and semantic alignment
  - Physics: flight dynamics, contact, sensor rendering
  - Radio propagation on the twin geometry
  - Massively parallel what-if rollouts

- *OUTPUTS → INTERFACES*
  - Predicted risk, coverage, energy and time
  - Validated policies and trajectories
  - ▲ to L10–L12: environment for agents and training
  - ▼ from L5/L7: state to synchronise on

**TECHNICAL DIAGRAM** (`chain` — SYNCHRONISATION LOOP)

- Physical state — poses, sensors, network, weather
- State estimation — fuse + align to twin frame
- Twin update — geometry, semantics, channel model
- Predict / rehearse — N futures in parallel
- Policy or plan back — validated before execution

Note: Closed loop: physical → twin → prediction → policy → physical, with a bounded synchronisation age.

**KEY TECHNOLOGIES:** NVIDIA Omniverse · Isaac Sim · USD / OpenUSD · Isaac Lab · QGIS / OSM · SUMO (traffic) · Sionna RT (radio) · STK (orbits)

**METRICS:** <200 ms sync age for control-relevant state · <1 m geometric twin error · <3 dB radio model error vs measurement · 10³–10⁶ parallel rollouts per decision batch

**NOTE:** The twin is not a visualisation. It is the place where the platform is allowed to be wrong.

---

### Slide 19 — Data platform — the memory of the whole system

- **Kicker:** LAYER 7 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l7Data`
- **Subtitle:** Purpose: capture every observation, decision and outcome in a replayable, lineage-tracked form so that training, certification and forensics are all possible after the fact.
- **Stage caption:** Seven source classes → ingest → bronze → silver → gold, then out to training, twin, RAG and analytics.

**VISUAL**
Seven glowing source boxes above four labelled data-tier slabs, with beams converging downward and dashed consumer links leaving toward the viewer.

**3D SCENE**
Sources at y=19 spaced 6.2 m; tiers at y=12/9/6/3 as 26 × 10 m slabs; four consumer labels at z=13 fed by dashed links.

**COMPONENTS**
- 7 source classes
- 4 medallion tiers
- 4 consumers
- “Contract” panel

**DATA FLOW**
Sources → ingest → bronze → silver → gold → consumers, with lineage recorded at every hop.

**ANIMATION**
- Packets fall from sources into ingest
- Consumer links pull dashed packets outward
- Slow camera orbit

**TEXT**
Medallion stack with mission semantics; replay and lineage guarantees.

**TECHNICAL MESSAGE**
Data engineering is what converts flights into assets. Without lineage there is no certification story.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Telemetry, video, LiDAR, RF, spectrum
  - Satellite products and GIS layers
  - Simulation and synthetic data
  - Operator actions and annotations
  - Model decisions and their justifications

**RIGHT COLUMN — outputs / decisions**

- *PROCESSING*
  - Schema-on-write for training sets, schema-on-read for exploration
  - Deduplication, quality scoring, PII handling
  - Bit-exact mission replay
  - Automatic dataset cards and drift statistics

- *INTERFACES*
  - ▼ from L2/L5/L6: measurements + fused state
  - ▲ to L8: documents and embeddings
  - ▲ to L12: training sets and replay buffers

**TECHNICAL DIAGRAM** (`stack` — MEDALLION LAYOUT WITH MISSION SEMANTICS)

- Ingest bus — Kafka / Zenoh bridges, back-pressure aware
- Bronze — immutable raw — exactly what the sensor produced
- Silver — curated — calibrated, time-aligned, geo-referenced
- Gold — training & serving — datasets, features, embeddings, labels
- Catalogue + lineage — mission ID, asset ID, model version, consent

**KEY TECHNOLOGIES:** Kafka / Zenoh · Parquet / Delta / Iceberg · MCAP / rosbag2 · S3-compatible object store · DVC / LakeFS · Feature store · OpenLineage

**METRICS:** TB/day ingest per active fleet · 100% records with time+pose+mission ID · bit-exact replay guarantee · <24 h field data → training-ready

**NOTE:** If a mission cannot be replayed exactly, its outcome cannot be explained, certified or learned from.

---

### Slide 20 — RAG & knowledge — the AI must not guess what it can look up

- **Kicker:** LAYER 8 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l8RAG`
- **Subtitle:** Purpose: give every agent grounded access to maps, regulations, manuals, mission history and live sensor summaries, so that decisions cite evidence instead of relying on pretraining.
- **Stage caption:** Documents → embedding model → vector database + knowledge graph → grounded agent answer.

**VISUAL**
Floating document planes orbiting inward to a rotating embedding cube, which feeds a coloured vector point cloud on the left and a knowledge graph sphere on the right; an agent orb below queries both.

**3D SCENE**
Six document planes bobbing at radius 15; embedding cube 5 × 3 × 5 m rotating at 0.5 rad/s; 900-point vector cloud in 6 clusters; 30-node graph with proximity edges; query orb at z=15.

**COMPONENTS**
- 6 corpus classes
- Embedding model
- Vector DB
- Knowledge graph
- Query agent
- Grounded-answer label

**DATA FLOW**
Corpus → embeddings → indexes; agent query → retrieval from both indexes → grounded answer → mission decision.

**ANIMATION**
- Documents bob and stream into the cube
- Cube rotates
- Cloud and graph rotate at different rates
- Query links pulse both ways

**TEXT**
Knowledge sources, hybrid retrieval processing, and the citation guarantee.

**TECHNICAL MESSAGE**
Grounding is a safety feature: retrieval turns a plausible answer into a defensible one.


**LEFT COLUMN — concept / inputs**

- *KNOWLEDGE SOURCES*
  - Airspace rules, NOTAMs, local regulation
  - Vehicle and payload manuals, checklists
  - Every previous mission and its outcome
  - Maps, building footprints, floor plans
  - Satellite products and change history
  - Live sensor summaries from the current mission

**RIGHT COLUMN — outputs / decisions**

- *PROCESSING*
  - Multimodal chunking (text, image, geometry, tabular)
  - Hybrid retrieval: dense + sparse + spatial filter
  - Graph traversal for entity relations
  - Reranking, then citation-bound generation

- *INTERFACES*
  - ▼ from L7: curated corpora + embeddings
  - ▲ to L9/L10: grounded context for models and agents
  - Every answer returns sources and a confidence

**TECHNICAL DIAGRAM** (`chain` — RETRIEVAL PATH)

- Corpus — docs · maps · history · manuals
- Chunk + embed — multimodal encoders
- Vector DB + KG — ANN search + relations
- Retrieve → rerank — hybrid BM25 + dense
- Grounded answer — with citations + confidence

**KEY TECHNOLOGIES:** Vector DB (FAISS / Milvus / pgvector) · Knowledge graph (Neo4j / RDF) · CLIP-style multimodal embeddings · BM25 hybrid retrieval · Cross-encoder rerankers · LLM / VLM with tool calls

**METRICS:** >0.9 retrieval recall@10 on mission queries · <300 ms retrieval latency at the edge · 100% answers with citations · 0 ungrounded safety-critical claims

**NOTE:** The point of RAG here is accountability: an autonomous decision that cannot cite its basis cannot be approved.

---

### Slide 21 — AI models — specialised heads on shared backbones

- **Kicker:** LAYER 9 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l9Models`
- **Subtitle:** Purpose: supply the predictive capabilities the agents reason with: perception, language grounding, forecasting, anomaly detection, trajectory and wireless channel prediction.
- **Stage caption:** Eight model families sitting on a shared foundation-model substrate.

**VISUAL**
Eight translucent model blocks in two rows with internal “layer” bars pulsing, all fed from a wide foundation-model slab below.

**3D SCENE**
7.4 × 4 × 3.4 m blocks at two heights; 5 pulsing internal layer bars per block; 40 × 8 m foundation slab at y=1; violet beams from the slab to each block.

**COMPONENTS**
- 8 model families
- Foundation substrate
- Beams representing shared representations

**DATA FLOW**
Foundation backbone → specialised heads → consumers named in the diagram.

**ANIMATION**
- Internal bars breathe at different phases
- Blocks yaw ±0.05 rad
- Beam packets rise from the substrate

**TEXT**
Portfolio matrix mapping task → output → consumer, plus calibration metrics.

**TECHNICAL MESSAGE**
A portfolio of calibrated, versioned models on shared backbones is cheaper and safer than one monolithic model.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Curated multimodal datasets (L7)
  - Grounded context (L8)
  - Simulation-generated data (L6)

- *PROCESSING*
  - Pretrain or adopt foundation backbones
  - Fine-tune specialised heads per task
  - Distil + quantise for the edge
  - Calibrate uncertainty, not just accuracy

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Predictions with calibrated confidence
  - Embeddings reused across tasks
  - Explanations and saliency for operators

- *INTERFACES*
  - ▲ to L10: perception + prediction as tools
  - ▲ to L11: policies and world models
  - ▼ from L12: new weights, versioned

**TECHNICAL DIAGRAM** (`matrix` — MODEL PORTFOLIO · TASK → OUTPUT → CONSUMER)

- **PERCEPTION**: detect / segment / track · → objects, masks, tracks · → L6 twin, L10 agents
- **LANGUAGE & VLM**: ground text ↔ imagery · → answers, referring targets · → operators, L10 agents
- **PREDICTION**: trajectory / weather / demand · → distributions, horizons · → planners, L13
- **WIRELESS**: CSI, path loss, blockage · → achievable rate maps · → L4 comms agent
- **INTEGRITY**: anomaly / OOD / drift · → alarms + uncertainty · → L14 human, safety plane

**KEY TECHNOLOGIES:** PyTorch · CUDA / cuDNN · TensorRT · Transformers / ViT · VLM (open weights) · Diffusion for synthetic data · Gaussian processes for uncertainty

**METRICS:** mAP / IoU perception quality · <15% sim-to-real gap · ECE < 0.05 calibration error · INT8 edge deployment precision

**NOTE:** Models are components with versions, contracts and expiry — not the product.

---

### Slide 22 — Agentic AI — autonomous agents that plan, negotiate and act

- **Kicker:** LAYER 10 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l10Agentic`
- **Subtitle:** Purpose: convert mission intent into coordinated action through specialised agents that hold state, use tools, communicate on a shared bus and can be audited individually.
- **Stage caption:** Ten agents on an orchestration bus, tasking a UAV swarm and a ground robot below; the safety agent holds a veto.

**VISUAL**
Ten glowing agent orbs on an elliptical orchestration bus above a working city, with tasking beams descending to real assets and a red safety-veto beam.

**3D SCENE**
Orbs at radius 13 (Z compressed 0.6) at y≈24; torus bus radius 9.4 scaled 1 × 0.6; dashed agent-to-agent links skipping 3 positions; three tasking beams to the swarm; red beam from the safety agent to the UGV.

**COMPONENTS**
- 10 labelled agents
- Orchestration bus
- Agent↔agent message links
- Tasking beams
- Safety veto beam

**DATA FLOW**
Mission intent enters at the planner, decomposes to specialised agents, converges on the fleet manager, and only then reaches hardware — unless safety vetoes.

**ANIMATION**
- Orb cages and rings counter-rotate
- Messages march between agents
- Tasking beams pulse to the swarm
- Safety beam is always visible

**TEXT**
Agent anatomy (7 required properties) + coordination rules + the audit requirement.

**TECHNICAL MESSAGE**
Agentic AI is a control architecture with accountability, not a chat pattern.


**LEFT COLUMN — concept / inputs**

- *EVERY AGENT HAS*
  - Objective — a measurable goal
  - State — what it believes right now
  - Memory — episodic + long-term via RAG
  - Tools — models, solvers, twin, APIs
  - Reasoning — plan, critique, replan
  - Comms — messages on the shared bus
  - Action — bounded, logged, revocable

**RIGHT COLUMN — outputs / decisions**

- *COORDINATION*
  - Shared blackboard for world state
  - Contract-net style task bidding
  - Explicit conflict resolution order
  - Safety agent can veto any action

- *INTERFACES*
  - ▼ from L8/L9: knowledge and predictions
  - ▲ to L11: goals and constraints for control
  - ▲ to L14: explanations and approval requests

**TECHNICAL DIAGRAM** (`graph` — AGENT TOPOLOGY)

- `m` MISSION AGENT — intent, constraints, success criteria
- `p` MISSION PLANNER — decompose → task graph
- `n` NAVIGATION — routes, airspace
- `c` COMMUNICATION — topology, power
- `e` ENERGY — endurance, charging
- `r` RESOURCE ALLOC — compute, spectrum
- `k` KNOWLEDGE — RAG, regulations
- `pe` PERCEPTION — fuse, detect, verify
- `dt` DIGITAL TWIN — rehearse, predict
- `s` SAFETY — veto + fallback
- `f` FLEET MANAGER — assign, monitor, replace

Edges: m→p, p→n, p→c, p→e, p→r, p→k, n→pe, c→dt, e→s, r→f, s→f (veto)

**KEY TECHNOLOGIES:** LLM planners with tool use · contract-net / auction protocols · behaviour trees · MCTS / LP solvers · ROS 2 actions · OpenTelemetry for agent traces

**METRICS:** <2 s intent → task assignment · <0.1/h human interventions per UAV · 100% agent actions logged with rationale · 1 agent with veto authority · 10 specialised agents

**NOTE:** Agentic autonomy without an audit trail is unusable in regulated airspace. Every decision is attributable to an agent, an input and a model version.

---

### Slide 23 — Physical AI — perception to actuation, closed on hardware

- **Kicker:** LAYER 11 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l11PhysicalAI`
- **Subtitle:** Purpose: close the loop between understanding and motion: perceive, build a world model, reason, plan, control, act — repeatedly, on the vehicle, within its physical limits.
- **Stage caption:** A robot and a UAV working in a structured environment, with the six-stage loop rendered above them.

**VISUAL**
Structured obstacle environment with a moving UGV (spinning LiDAR sweeping the ground) and a UAV circling above; a six-station ring loop hovers over the scene with packets running around it.

**3D SCENE**
16 procedural obstacle boxes; UGV oscillating on X with LiDAR fan at 2.2 rad/s; UAV on a circular path at 9 m; six 2.2 m station discs at radius 15 (Z scaled 0.5) at y=20 connected by curved beams.

**COMPONENTS**
- UGV + LiDAR
- UAV
- Obstacles
- 6 loop stations
- observe / act links into the loop

**DATA FLOW**
World → perception station → around the ring → actuation station → back into the world (visualised by the observe/act links).

**ANIMATION**
- Packets circulate the ring continuously
- LiDAR sweeps
- Robot and UAV move on independent paths

**TEXT**
Loop diagram with rates + the envelope-check rule.

**TECHNICAL MESSAGE**
Autonomy is a closed loop on hardware at a guaranteed rate, with classical limits around learned components.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Calibrated sensor streams (L2)
  - Local map + twin prior (L6)
  - Goals and constraints from agents (L10)

- *PROCESSING*
  - World model update (geometry + semantics + dynamics)
  - Reasoning over feasibility and risk
  - Trajectory optimisation / learned policy
  - Low-level control with hard limits

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Actuator commands (thrust, steering, gimbal, TX power)
  - Executed trajectory and its deviation
  - Experience tuples for learning (L12)

- *INTERFACES*
  - ▼ from L10: what to achieve, never how to twitch
  - ▲ to L12: trajectories, rewards, failures
  - Safety monitors wrap the policy output

**TECHNICAL DIAGRAM** (`loop` — THE PHYSICAL AI LOOP (runs on the vehicle))

- PERCEPTION — detect, segment, track
- UNDERSTANDING — semantics + affordances
- REASONING — goals vs constraints
- PLANNING — trajectory + task order
- CONTROL POLICY — RL or MPC
- ACTUATION — motors, gimbal, radio

**KEY TECHNOLOGIES:** RL policies (PPO / SAC) · MPC · visual-inertial odometry · occupancy + ESDF mapping · Isaac Lab-trained controllers · ros2_control

**METRICS:** 10–100 Hz loop rate · <10 ms control latency · <0.5 m trajectory tracking error · 0 commands outside the envelope

**NOTE:** Physical AI is where errors have mass. Every learned output passes through a classical limit-check before it reaches an actuator.

---

### Slide 24 — Learning — the platform improves with every mission

- **Kicker:** LAYER 12 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l12Learning`
- **Subtitle:** Purpose: convert operational experience into better policies and models through reinforcement learning, multi-agent RL, federated learning, imitation and self-supervision — without shipping raw sensitive data.
- **Stage caption:** Central GPU training, federated aggregation of on-device models, and a multi-agent RL arena.

**VISUAL**
Three learning modalities in one frame: a GPU pod at the back, six fleet devices carrying local models in a ring, and a violet MARL arena to the left.

**3D SCENE**
GPU pod 2 × 4 racks at z=−18; 4 UAVs + 2 UGVs on a ring of radius 22 with pulsing “local model θᵢ” chips; amber aggregation orb at (0,12,−6); MARL arena disc r=15 with a 7-UAV violet mesh.

**COMPONENTS**
- Central training cluster
- Federated devices + local models
- Aggregation orb
- MARL arena
- “Learning modes” panel

**DATA FLOW**
Devices → dashed update links → aggregation orb → GPU cluster; mint beams carry the new global model back to every device.

**ANIMATION**
- Local-model chips pulse as they train
- Update packets flow inward, model packets flow outward
- MARL swarm re-forms its mesh continuously

**TEXT**
Six learning modes mapped to where they run + the governance rule.

**TECHNICAL MESSAGE**
Continuous improvement is an architectural feature with privacy and certification constraints built in.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Replay buffers and trajectories (L7)
  - Simulated experience at scale (L6)
  - Operator demonstrations and corrections (L14)
  - On-device gradients from the fleet

- *PROCESSING*
  - Distributed RL / MARL rollouts
  - Secure aggregation (FedAvg and variants)
  - Curriculum + domain randomisation
  - Offline evaluation before any rollout

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Candidate policies and model versions
  - Performance deltas per scenario family
  - Rejected candidates with reasons (kept)

- *INTERFACES*
  - ▼ from L6/L7: environments and data
  - ▲ to L9/L11: new weights after certification
  - Never bypasses the 9-level validation gates

**TECHNICAL DIAGRAM** (`chain` — LEARNING MODES AND WHERE THEY RUN)

- Self-supervised — unlabelled sensors → representations
- Imitation — operator demos → warm start
- RL in the twin — single-agent control
- MARL in the twin — swarm coordination
- Federated — on-device updates only
- Continual — field data → next candidate

**KEY TECHNOLOGIES:** Isaac Lab · PPO / SAC / MADDPG / QMIX · FedAvg / FedProx / secure aggregation · Ray / torchrun · differential privacy · MLflow / W&B

**METRICS:** 10³–10⁶ parallel training environments · <15% sim-to-real gap · 0 raw bytes sensitive data leaving devices (FL mode) · <24 h mission → candidate model

**NOTE:** Learning is a governed pipeline: nothing reaches an aircraft because it looked better on a chart.

---

### Slide 25 — Orchestration — allocating scarce resources under pressure

- **Kicker:** LAYER 13 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l13Orchestration`
- **Subtitle:** Purpose: decide continuously which asset does what, with which spectrum, compute, energy and airspace, and re-decide the moment reality changes.
- **Stage caption:** Task-graph board with five mission lanes above the assets executing them, and four live resource ledgers.

**VISUAL**
A mission-control task board: five swim-lanes with glowing task cards, dashed assignment links descending to real assets, and four resource gauges.

**3D SCENE**
Board plane 30 × 12 m at y=20; five lanes with four pulsing cards each; five assets (3 UAV, 1 UGV, 1 satellite pass) at y≈6; four canvas gauges at y=12.5.

**COMPONENTS**
- Task board with lanes
- Assignment links
- Assets
- Compute / spectrum / energy / airspace ledgers

**DATA FLOW**
Board → assignment links → assets; measurement returns implicitly through the gauges.

**ANIMATION**
- Cards fade in and out as tasks are (re)assigned
- Assignment links march
- Gauges oscillate with load

**TEXT**
Control-loop graph including escalation, plus utilisation metrics.

**TECHNICAL MESSAGE**
Autonomy must decide what NOT to do; that decision has to be visible and logged.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Mission objectives and priorities
  - Asset availability, health, energy
  - Achievable link rates (L4) and compute (L5)
  - Airspace and regulatory constraints

- *PROCESSING*
  - Task decomposition into a DAG
  - Constrained assignment (assets × tasks × resources)
  - Preemption and graceful degradation policies
  - Model and firmware rollout scheduling

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Per-asset task queues with deadlines
  - Resource grants (spectrum, compute, energy, airspace slots)
  - Explicit degradation decisions when demand exceeds supply

- *INTERFACES*
  - ▼ from L10: agent-level plans and bids
  - ▲ to L3: executable task queues
  - ▲ to L14: what was sacrificed and why

**TECHNICAL DIAGRAM** (`graph` — ORCHESTRATION CONTROL LOOP)

- `i` Mission intent — objectives + constraints
- `d` Task decomposition — DAG of tasks
- `a` Allocation — asset × task × resource
- `x` Execution — dispatch + monitor
- `m` Measurement — KPI vs plan
- `r` Re-allocation — preempt, replace, degrade
- `l` Resource ledgers — compute · spectrum · energy · airspace
- `e` Escalation — to human when unresolvable

Edges: i→d, d→a, a→x, x→m, m→r, r→l, l→e, r→a

**KEY TECHNOLOGIES:** Kubernetes-style scheduling concepts · MILP / CP-SAT solvers · auction protocols · network slicing · ROS 2 actions · GitOps for fleet config

**METRICS:** <2 s replan latency after a failure · >85% asset utilisation · <5% tasks missed without notice · 100% degradations logged with rationale

**NOTE:** Orchestration is where the system admits that resources are finite — explicitly, and with a record of every trade-off.

---

### Slide 26 — Human & operator — authority, not supervision theatre

- **Kicker:** LAYER 14 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l14Human`
- **Subtitle:** Purpose: give humans the smallest set of decisions that actually require judgement, with enough explanation to make them quickly, and absolute authority to intervene.
- **Stage caption:** Mission control: status wall, alert wall with an approval request, AI accountability wall, and a holographic twin table.

**VISUAL**
Interior mission-control shot: three glowing information walls, three operators at consoles, and a holographic city twin on a round table with a miniature swarm above it.

**3D SCENE**
Walls as canvas panels at z=−14/−15; table cylinder r=6.4 at y=2 with a rotating mini-city and a 4-UAV mesh; three operators with desks and coloured screens; camera dollies laterally.

**COMPONENTS**
- Mission status wall
- Alert wall (approval required)
- AI accountability wall
- Holographic twin table
- Operators + consoles

**DATA FLOW**
Platform → walls (aggregated state) → human decision → authority commands back down to the fleet.

**ANIMATION**
- Twin city rotates slowly
- Mini swarm holds formation above the table
- Alert banner pulses
- Camera dollies from −9 to +9 on X

**TEXT**
Five interaction modes and the intervention-rate target.

**TECHNICAL MESSAGE**
Human authority is a design requirement; supervision load is a KPI to minimise.

**PRODUCTION**
Warm amber key at 0.55 intensity, dark floor, three coloured console screens for depth. Keep FOV at 50° for an interior feel.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Fleet and mission state (aggregated)
  - Ranked alerts with predicted consequences
  - Agent decisions with rationale and confidence
  - Approval requests bound to policy rules

- *PROCESSING*
  - Attention management: what deserves a human
  - Explanation generation (why, alternatives, risk)
  - Authority arbitration (who may override what)

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Approvals, rejections, and constraint changes
  - Manual takeover commands
  - Corrections that become imitation-learning data

- *INTERFACES*
  - ▼ from L10/L13: decisions and escalations
  - ▲ to L3/L11: authority commands (highest priority)
  - ▲ to L12: labelled human preferences

**TECHNICAL DIAGRAM** (`chain` — HUMAN INTERACTION MODES)

- Monitor — aggregate state, not raw video
- Be alerted — ranked, deduplicated, actionable
- Approve — only where policy requires it
- Intervene — retask, pause, reroute
- Override — take manual control instantly

Note: Design target: fewer than 0.1 interventions per UAV-hour, and every intervention becomes training data.

**KEY TECHNOLOGIES:** 3D mission dashboards · WebRTC video on demand · explainability (saliency, counterfactuals) · RBAC + audit logs · digital-twin operator views

**METRICS:** <0.1/h interventions per UAV · <5 s alert → informed decision · 100% AI actions with an explanation on request · <1 s override takes effect

**NOTE:** The measure of a good autonomy UI is how few decisions it asks for — and how fast it lets a human take everything back.

---

### Slide 27 — Deployment — the infrastructure in operation

- **Kicker:** LAYER 15 / 15
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `l15Deployment`
- **Subtitle:** Purpose: run the platform continuously across multiple regions and domains, with per-region autonomy, global coordination and a single operational picture.
- **Stage caption:** Four regions running independently, linked by inter-region mesh and a satellite layer, under one global autonomy control.

**VISUAL**
High wide shot of four regional operations on real terrain, each ringed and labelled, with a LEO shell above and a global control orb linked to every region.

**3D SCENE**
260 m terrain; four region groups at (−58,10), (0,−34), (56,14), (−10,44) each with a city, 5-UAV mesh swarm, UGV, tower and 20 m ring; orbit shell r=96 at y=30; control orb at (0,56,40).

**COMPONENTS**
- 4 regional cells
- Satellite layer
- Inter-region dashed mesh
- Global control orb

**DATA FLOW**
Satellite downlinks per region, inter-region peer links, and dashed policy links from global control to each region.

**ANIMATION**
- Satellites orbit overhead
- Each region’s swarm operates independently
- Policy packets descend from global control
- Very slow 96 m camera orbit

**TEXT**
Deployment topology stack with the graceful-degradation rule.

**TECHNICAL MESSAGE**
The deployed system is hierarchical and survivable: every level can operate when the level above is unreachable.


**LEFT COLUMN — concept / inputs**

- *INPUTS*
  - Certified models and policies
  - Regional configuration and regulation
  - Mission requests from operators or triggers

- *PROCESSING*
  - Region-local autonomy with global policy
  - Cross-region asset sharing when justified
  - Continuous KPI reporting and drift detection

**RIGHT COLUMN — outputs / decisions**

- *OUTPUTS*
  - Delivered mission outcomes
  - Operational data returning to L7
  - Evidence packages for regulators

- *INTERFACES*
  - ▼ from L12/L13: models and plans
  - ▲ to L1: physical effect in the world
  - ▲ to L7/L12: field experience for the next iteration

**TECHNICAL DIAGRAM** (`stack` — DEPLOYMENT TOPOLOGY)

- Global control plane — policy, model registry, fleet-wide KPIs
- Satellite layer — wide-area sensing + NTN backhaul
- Regional autonomy cell — own edge, own twin slice, own agents
- Mission cell — swarm + robots + local network
- Asset — onboard autonomy, always able to stand alone

Note: Autonomy degrades gracefully downward: if the global plane is unreachable, regions run; if a region is unreachable, missions run; if a mission cell is lost, each asset comes home safely.

**KEY TECHNOLOGIES:** multi-region Kubernetes · GitOps fleet config · model registry + signing · OTA update with rollback · observability stack · regulatory reporting

**METRICS:** 4+ regions in parallel · >99% mission availability · <1 h global policy propagation · 0 unrecoverable assets

**NOTE:** This is the slide that closes the loop: deployment produces the physical-world change and the data that trains the next version.

---


## ACT V · DEEP ARCHITECTURES

### Slide 28 — From geospatial data to a real aircraft — one continuous stack

- **Kicker:** ACT V · SIMULATION ARCHITECTURE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `simStack`
- **Subtitle:** Every rung uses the artefacts of the rung below. The same flight code that runs in SITL runs on the aircraft, so the only thing that changes between simulation and reality is the world.
- **Stage caption:** GIS → OSM/GeoJSON → terrain+buildings → traffic → weather+radio → twin → Omniverse/Isaac Sim → Isaac Lab → ROS 2 → PX4/SITL → HITL → real UAV.

**VISUAL**
A twelve-step staircase of glowing slabs rising from data to a real hovering UAV, with a green data spine climbing alongside.

**3D SCENE**
Slabs 26 → 16 m wide, offset 1.1 m in X per rung to form a staircase; NVIDIA-green spine with packets; a real UAV hovering above the top rung with a pulsing “SIM → REAL GAP” label.

**COMPONENTS**
- 12 stack rungs
- Tool-responsibility panel
- Ascending data spine
- Real UAV at the top

**DATA FLOW**
Artefacts pass upward (geometry → physics → policies → firmware parity); corrections pass downward from the measured gap.

**ANIMATION**
- Packets climb the spine
- Gap label breathes
- Slow orbit revealing the staircase depth

**TEXT**
Why this order, tool responsibilities, and the honest treatment of the sim-to-real gap.

**TECHNICAL MESSAGE**
One continuous stack with parity at every rung is what makes simulation-trained autonomy trustworthy in the field.


**LEFT COLUMN — concept / inputs**

- *WHY THIS ORDER*
  - Geometry before physics — you cannot simulate a channel without buildings
  - Physics before learning — a policy trained on wrong dynamics is worse than none
  - Middleware parity before hardware — most “AI failures” are integration failures

- *TOOL RESPONSIBILITIES*
  - QGIS geospatial preparation
  - SUMO traffic microsimulation
  - STK orbits, passes, link windows
  - Isaac Sim robotics + sensor physics
  - Isaac Lab parallel policy training
  - Sionna RT ray-traced radio channels
  - PX4 / ROS 2 the same code as flight
  - CUDA everything above, faster

**RIGHT COLUMN — outputs / decisions**

- *WHAT MOVES DOWN THE STACK*
  - Trained policies and calibrated parameters
  - Scenario definitions that found failures
  - Fidelity corrections from real flights

- *THE HONEST PART* — The sim-to-real gap is measured at the top and fed back down as a correction, not assumed away. Every fidelity claim has a number attached.

**TECHNICAL DIAGRAM** (`stack` — SIMULATION STACK · ARTEFACT PASSED UPWARD)

- GIS (authoritative geography) — coordinate frames, elevation, land use
- OpenStreetMap / GeoJSON — roads, footprints, boundaries
- Terrain + buildings (USD) — meshes, materials, collision
- Traffic (SUMO) — vehicle and crowd flows
- Weather + radio propagation — wind, rain, path loss, blockage
- DIGITAL TWIN — one synchronised scene of record
- Omniverse / Isaac Sim — rigid-body physics + sensor rendering
- Isaac Lab — thousands of parallel RL environments
- ROS 2 — same middleware, same topics as flight
- PX4 + SITL — real autopilot firmware, simulated I/O
- HITL — real autopilot hardware, simulated world
- REAL UAV — the only test that counts

**KEY TECHNOLOGIES:** Omniverse / OpenUSD · Isaac Sim · Isaac Lab · SUMO · STK · QGIS · Sionna RT · ROS 2 · PX4 SITL · CUDA

**METRICS:** <1 m geometry error · <3 dB channel model error · 10⁴+ parallel envs · <15% sim-to-real policy gap

**NOTE:** Simulation is a production system in this architecture — versioned, validated and continuously corrected against reality.

---

### Slide 29 — How the toolchain hangs together

- **Kicker:** ACT V · TECHNOLOGY TOPOLOGY
- **Layout:** `standard`
- **Scene module:** `toolConstellation`
- **Subtitle:** Six technology families, one platform core. Nothing here is exotic: the differentiator is that they share one world model, one data platform and one deployment path.
- **Stage caption:** Simulation · robotics · AI · communications · infrastructure · data, all bound to the platform core.

**VISUAL**
Six technology hubs on a ring around a central platform orb, each hub fanning out to its tools as small nodes.

**3D SCENE**
Hubs at radius 13, tools at radius 19–22 with connecting lines; centre orb r=1.8; holographic ring floor r=16.

**COMPONENTS**
- 6 family hubs
- ~30 tool nodes
- Platform core orb

**DATA FLOW**
Beams from the core to each family hub represent the shared contracts (frames, time, registry, schema).

**ANIMATION**
- Core rings counter-rotate
- Beam packets flow outward
- Slow orbit

**TEXT**
Design choices, integration rules, and the tool-sprawl risk.

**TECHNICAL MESSAGE**
Standards-based, GPU-first, with one authority per cross-cutting concern.


**LEFT COLUMN — concept / inputs**

- *DESIGN CHOICES*
  - Standards over bespoke: ROS 2, PX4, USD, 3GPP
  - Open weights where certification allows
  - GPU-first: CUDA from PHY to policy training
  - Everything containerised and versioned

**RIGHT COLUMN — outputs / decisions**

- *INTEGRATION RULES*
  - One coordinate frame authority
  - One time authority
  - One model registry
  - One telemetry schema

- *RISK* — Tool sprawl is the main failure mode of platforms like this. Each family has one designated primary tool and an explicit exit path.

**KEY TECHNOLOGIES:** Omniverse · Isaac Sim/Lab · SUMO · STK · QGIS · ROS 2 · PX4 · PyTorch · CUDA · Sionna · Kubernetes

**NOTE:** A technology map is only useful if it also states what is NOT in the platform, and how each choice could be replaced.

---

### Slide 30 — From raw data to physical action — the AI stack

- **Kicker:** ACT V · AI ARCHITECTURE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `aiStack`
- **Subtitle:** Ten tiers, one direction of travel, and a feedback path that turns outcomes back into data. This is the slide that shows generative AI, agentic AI and physical AI as one pipeline rather than three buzzwords.
- **Stage caption:** RAW DATA → DATA ENGINEERING → EMBEDDINGS → RAG/VECTOR/KG → FOUNDATION MODELS → SPECIALISED MODELS → AGENTS → MULTI-AGENT ORCHESTRATION → PHYSICAL AI → ACTION.

**VISUAL**
Ten stacked slabs, each with a large title and a small subtitle, connected by explicit upward arrows on the right side and a bidirectional spine on the left.

**3D SCENE**
Slabs 30 → 24 m wide spaced 2.9 m; violet spine (up) with cyan return packets; a UAV above the top tier representing action.

**COMPONENTS**
- 10 tiers
- Upward arrows per tier
- Feedback spine
- Action asset

**DATA FLOW**
Raw data climbs to action; outcomes return as state (fast) and as data (slow).

**ANIMATION**
- Arrow pulses walk upward tier by tier
- Spine packets travel both ways
- Slow orbit

**TEXT**
The two return paths, and where generative / agentic / physical AI actually sit.

**TECHNICAL MESSAGE**
The stack is one pipeline: language and generative models are components inside a control system, not the product.


**LEFT COLUMN — concept / inputs**

- *ONE DIRECTION, TWO RETURNS*
  - Upward: data becomes capability
  - Return 1 (fast): outcome → state → next decision
  - Return 2 (slow): outcome → dataset → next model

**RIGHT COLUMN — outputs / decisions**

- *WHERE EACH BUZZWORD LIVES*
  - `Generative AI` tiers 4–6: grounding, explanation, synthetic data
  - `Agentic AI` tiers 7–8: goals, tools, negotiation
  - `Physical AI` tiers 9–10: motion with consequences

**TECHNICAL DIAGRAM** (`stack` — AI STACK · WHAT EACH TIER GUARANTEES)

- RAW DATA — sensors · video · LiDAR · RF · satellite
- DATA ENGINEERING — clean · align · label · version
- FEATURE / EMBEDDING — multimodal encoders
- RAG · VECTOR DB · KNOWLEDGE GRAPH — retrieval + relations
- FOUNDATION MODELS — pretrained backbones
- SPECIALISED MODELS — perception · prediction · channel
- AGENTS — objective · memory · tools · reasoning
- MULTI-AGENT ORCHESTRATION — negotiate · allocate · resolve
- PHYSICAL AI — plan → control → actuate
- ROBOT / UAV / SATELLITE ACTION — effect in the physical world

**KEY TECHNOLOGIES:** PyTorch · CUDA · vector DB · knowledge graph · VLM/LLM · RL/MARL · TensorRT · ROS 2

**METRICS:** 10 tiers · 2 feedback paths · <300 ms retrieval at the edge · <10 ms actuation loop

**NOTE:** If a tier cannot state what it guarantees to the tier above, it is not an architecture — it is a diagram.

---

### Slide 31 — Agent topology: intent in, coordinated action out

- **Kicker:** ACT V · AGENTIC AI
- **Layout:** `standard`
- **Scene module:** `agentGraph3D`
- **Subtitle:** A hierarchy with explicit authority: the mission agent owns intent, the planner decomposes it, specialist agents bid and negotiate, the safety agent can veto, and only the fleet manager talks to hardware.
- **Stage caption:** MISSION → PLANNER → {NAV, COMMS, ENERGY, RESOURCE, KNOWLEDGE} → {PERCEPTION, TWIN, SAFETY} → FLEET MANAGER → assets.

**VISUAL**
Five-level agent hierarchy of glowing orbs in 3D, dashed message links between levels, converging on a fleet manager that drives three real assets below.

**3D SCENE**
Levels at y = 26, 21.4, 16.8, 12.2, 7.6; orbs r=0.8 (1.2 for mission agent); message bus bar behind the top level; UAV, UGV and satellite at the bottom.

**COMPONENTS**
- 11 agents on 5 levels
- Message bus
- Three actuated assets

**DATA FLOW**
Intent → decomposition → specialist bids → converged plan → hardware, with a red veto edge from safety.

**ANIMATION**
- Messages march between levels at 2.2 units/s
- Orb rings counter-rotate
- Assets operate continuously

**TEXT**
Authority model, conflict resolution, message types, failure handling.

**TECHNICAL MESSAGE**
Clear authority and typed messages are what make multi-agent autonomy debuggable and certifiable.


**LEFT COLUMN — concept / inputs**

- *AUTHORITY MODEL*
  - Intent flows down, never sideways
  - Specialists bid, the planner decides
  - Safety agent has an absolute veto
  - Only the fleet manager issues hardware commands

- *CONFLICT RESOLUTION*
  - Priority order fixed at design time
  - Ties broken by predicted mission risk
  - Unresolvable conflicts escalate to a human

**RIGHT COLUMN — outputs / decisions**

- *MESSAGE TYPES*
  - `INTENT` goal + constraints + deadline
  - `BID` cost, feasibility, confidence
  - `GRANT` assignment + resource budget
  - `ALERT` anomaly, risk, deviation
  - `VETO` blocking safety decision
  - `TRACE` rationale for the audit log

- *FAILURE HANDLING* — Any agent may crash. Its last granted assignments remain valid for a bounded time, then the fleet manager conservatively degrades.

**KEY TECHNOLOGIES:** LLM tool-use planners · contract-net protocol · behaviour trees · blackboard architecture · ROS 2 actions · OpenTelemetry traces

**METRICS:** <2 s intent → assignment · 6 message types · 1 veto authority · 100% decisions traced

**NOTE:** Multi-agent systems fail through ambiguous authority, not weak models. The authority graph is therefore part of the architecture.

---

### Slide 32 — Every agent is the same seven things

- **Kicker:** ACT V · AGENT ANATOMY
- **Layout:** `standard`
- **Scene module:** `agentAnatomy`
- **Subtitle:** One template, applied ten times. That is what makes the fleet of agents reviewable: the same seven properties are specified, tested, logged and revoked for each one.
- **Stage caption:** Objective · state · memory · tools · reasoning · communication · action.

**VISUAL**
A single large agent orb at the centre with seven labelled component blocks orbiting it, each connected by a bidirectional beam.

**3D SCENE**
Central orb r=2.2; seven 3.4 × 1.5 × 1.4 m blocks on an ellipse of radius 9.4 (Z compressed 0.55) bobbing individually.

**COMPONENTS**
- Agent core
- 7 property blocks with one-line definitions

**DATA FLOW**
Bidirectional beams: the core reads state/memory/tools and writes actions/messages.

**ANIMATION**
- Blocks bob out of phase
- Beams carry packets both ways
- Core cage rotates

**TEXT**
The seven-field specification and the review gate.

**TECHNICAL MESSAGE**
Uniform agent anatomy makes a multi-agent system auditable rather than emergent.


**LEFT COLUMN — concept / inputs**

- *SPECIFICATION PER AGENT*
  - `OBJECTIVE` measurable goal + success test
  - `STATE` belief, with freshness bounds
  - `MEMORY` episodic + RAG, scoped + retained
  - `TOOLS` typed schemas, rate limits
  - `REASONING` plan → critique → replan
  - `COMMS` message types it may emit
  - `ACTION` bounded, logged, revocable

**RIGHT COLUMN — outputs / decisions**

- *WHY THIS MATTERS*
  - An agent without a success test cannot be evaluated
  - An agent without scoped memory becomes a privacy problem
  - An agent with unlimited tools becomes an unbounded risk
  - An agent without traces cannot be certified

- *REVIEW GATE* — No agent enters the fleet without all seven fields filled, a red-team review, and a revocation path.

**KEY TECHNOLOGIES:** tool schemas (JSON) · scoped memory stores · policy guardrails · rate limiting · trace logging · red-team scenarios

**METRICS:** 7 mandatory fields · 100% tool calls schema-validated · <1 s revocation propagation

**NOTE:** This template is the difference between “we use agents” and “we operate agents”.

---

### Slide 33 — Retrieval-augmented decisions, with citations

- **Kicker:** ACT V · RAG ARCHITECTURE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `ragPipeline`
- **Subtitle:** The platform does not rely on what a model happened to memorise during pretraining. Mission-critical facts — airspace rules, building layouts, past incidents, live sensor summaries — are retrieved, ranked and cited.
- **Stage caption:** CORPUS → EMBED → VECTOR DB (+ KNOWLEDGE GRAPH) → RETRIEVE → RERANK → LLM/VLM → AGENT → MISSION DECISION.

**VISUAL**
A seven-station 3D pipeline with a knowledge graph above the mid-point and a vector cloud beside it, ending in a “mission decision” panel with real citations.

**3D SCENE**
Seven 4.8 × 2.8 × 2.4 m station boxes spaced 6.6 m at y=8, linked by tubes with arrowheads and travelling packets; graph and cloud float above; decision panel to the right.

**COMPONENTS**
- 7 pipeline stations
- Knowledge graph
- Vector cloud
- Decision panel with sources

**DATA FLOW**
Corpus → embed → index; query → retrieve → rerank → generate → decide, with the graph feeding constraints into generation.

**ANIMATION**
- Packets step along the pipeline
- Graph and cloud rotate
- Decision panel remains legible as the camera drifts

**TEXT**
Why not a bigger model, plus the governance rules.

**TECHNICAL MESSAGE**
Grounded, cited retrieval is what lets an autonomous decision be reviewed after the fact.


**LEFT COLUMN — concept / inputs**

- *WHY NOT JUST A BIGGER MODEL*
  - Regulations change weekly; weights do not
  - Local knowledge is not on the public internet
  - A decision must be explainable to a regulator
  - Retrieval is cheaper than retraining

**RIGHT COLUMN — outputs / decisions**

- *GOVERNANCE*
  - Access control per corpus and per agent
  - Citation required for safety-relevant claims
  - Confidence threshold → human escalation
  - Retrieval logs kept with the mission record

**TECHNICAL DIAGRAM** (`graph` — RAG DATA PATH WITH GOVERNANCE)

- `doc` Documents — regs · manuals
- `map` Maps / GIS — geometry
- `sat` Satellite + history — products, missions
- `chunk` Chunk + tag — spatial + temporal
- `emb` Embed — multimodal encoder
- `vdb` Vector DB — ANN index
- `kg` Knowledge graph — entities + relations
- `q` Agent query — task + context
- `ret` Retriever — dense + sparse + geo
- `rr` Reranker — cross-encoder
- `llm` LLM / VLM — grounded generation
- `ag` Agent decision — action + citations
- `gov` Governance: access control · citation required · confidence threshold · human escalation

Edges: doc→chunk, map→chunk, sat→emb, chunk→emb, emb→vdb, emb→kg, q→ret, ret→rr, rr→llm, llm→ag, vdb→ret, kg→llm

**KEY TECHNOLOGIES:** FAISS / Milvus / pgvector · Neo4j / RDF · CLIP-style encoders · BM25 hybrid · cross-encoder rerankers · LLM/VLM tool calls

**METRICS:** >0.9 recall@10 · <300 ms edge retrieval · 100% cited safety claims · 0 ungrounded critical decisions

**NOTE:** RAG is presented here as an accountability mechanism first and a capability second.

---

### Slide 34 — The loop that makes it physical

- **Kicker:** ACT V · PHYSICAL AI
- **Layout:** `full`
- **Scene module:** `physicalAILoop`
- **Subtitle:** PHYSICAL WORLD → SENSORS → PERCEPTION MODEL → WORLD MODEL → REASONING → PLANNING → CONTROL POLICY → ACTUATOR → PHYSICAL WORLD. Eight stations, one closed loop, running at 10–100 Hz on the vehicle.
- **Stage caption:** Each station is a real subsystem with its own latency budget; the ring is the actual data path, not a metaphor.

**VISUAL**
Full-bleed hero: a luminous eight-station ring hovering above a working city, with a UAV and a robot operating inside the ring’s footprint.

**3D SCENE**
Eight 2.4 m pillars with halos and light columns on an ellipse of radius 19 (Z 0.62) at y≈9; curved beams between stations; city, UAV and UGV below; observe/act links tie the ring to the assets.

**COMPONENTS**
- 8 loop stations
- Curved inter-station beams
- City + UAV + UGV
- observe / act links

**DATA FLOW**
Clockwise: world → sensors → perception → world model → reasoning → planning → control → actuator → world.

**ANIMATION**
- Packets circulate continuously
- Halos pulse at 2 Hz out of phase
- UAV and robot move inside the loop footprint
- Slow 50 m camera orbit

**TEXT**
Title and subtitle only — the ring is the content.

**TECHNICAL MESSAGE**
Autonomy is a closed physical loop with a guaranteed rate; every station has an owner and a latency budget.

**PRODUCTION**
Camera (0,20,46) → (0,9,0), 48° FOV. Station colours follow the deck grammar: cyan sensing, mint world model, violet reasoning, amber control.


**KEY TECHNOLOGIES:** visual-inertial odometry · occupancy + ESDF · learned world models · MPC / RL policies · ros2_control · TensorRT

**METRICS:** 10–100 Hz loop rate · <10 ms control latency · 8 stations · 0 unbounded outputs

**NOTE:** This is the slide to remember: intelligence that does not close this loop on hardware is analytics, not autonomy.

---

### Slide 35 — Real world and twin, and the three flows between them

- **Kicker:** ACT V · DIGITAL TWIN ARCHITECTURE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `dtArchitecture`
- **Subtitle:** A twin is only useful if the flows are specified: what goes up, what comes back, and how stale either is allowed to be.
- **Stage caption:** 1 · telemetry → twin. 2 · twin → optimised policy. 3 · policy → real UAV. Sync channels and rates listed in-scene.

**VISUAL**
Symmetric split screen: warm real city (left) and mint twin (right) with identical geometry and a mirrored UAV, plus three numbered arrows.

**3D SCENE**
Two 38 m city instances with seed 71 rendered in different palettes; twin bounded by a mint wireframe box; three arrows: telemetry (cyan, →), policy (violet, ←), actuation (mint, ↑ on the real side).

**COMPONENTS**
- Real city + tower + UAV
- Twin city + tower + UAV
- Three numbered flows
- Sync-channel panel

**DATA FLOW**
Explicitly numbered 1-2-3 so the viewer reads the causal order.

**ANIMATION**
- Real UAV flies; twin UAV mirrors exactly
- Arrows pulse in sequence 1 → 2 → 3
- Slow orbit keeping both halves in frame

**TEXT**
What the twin is for, the fidelity contract, and the silent-drift failure mode.

**TECHNICAL MESSAGE**
A twin is a measured instrument with a published error budget, not a visualisation.


**LEFT COLUMN — concept / inputs**

- *WHAT THE TWIN IS FOR*
  - Predicting risk before acting
  - Rehearsing plans in parallel
  - Training policies at scale
  - Explaining decisions to humans
  - Regression-testing every model release

**RIGHT COLUMN — outputs / decisions**

- *FIDELITY CONTRACT*
  - `Geometry` < 1 m error
  - `Radio` < 3 dB vs measurement
  - `Dynamics` < 10% on step response
  - `Sync age` < 200 ms
  - `Coverage` 100% of mission volume

- *FAILURE MODE* — A twin that silently drifts is more dangerous than no twin. Age and error are published as first-class telemetry.

**TECHNICAL DIAGRAM** (`chain` — SYNCHRONISATION CHANNELS AND RATES)

- Pose + IMU — 50 Hz · control-relevant
- Perception summary — 5 Hz · objects, occupancy
- Network KPI — 1 Hz · rate, RSRP, outage
- Geometry delta — on change · collapse, blockage
- Twin age budget — < 200 ms for control use

**KEY TECHNOLOGIES:** Omniverse / OpenUSD · Isaac Sim · Sionna RT · SUMO · weather feeds · state estimation

**METRICS:** <200 ms sync age · <1 m geometry error · <3 dB radio error · 3 specified flows

**NOTE:** The twin is the platform’s prediction engine, and it is held to published accuracy numbers like any other sensor.

---

### Slide 36 — One network from orbit to the user

- **Kicker:** ACT V · COMMUNICATION ARCHITECTURE
- **Layout:** `full`
- **Scene module:** `commGlobal`
- **Subtitle:** LEO constellation → UAV swarm → 5G/6G towers → ground users and edge servers, with satellite-to-satellite optical links overhead. Each link type has its own visual signature.
- **Stage caption:** SAT→GROUND (Ka) · SAT→UAV (Ku NTN) · UAV↔UAV mesh · UAV→TOWER fronthaul · 5G/6G ACCESS · OPTICAL ISL.

**VISUAL**
Full-bleed: Earth limb and LEO shell at the top, a UAV mesh in the middle, and a city with towers, gateway, edge racks and users at the bottom — all links labelled in 3D.

**3D SCENE**
Earth r=38 centred at (0,−42,−10); 2 × 6 ambient satellite shell at r=48 plus two detailed satellites at 29–32 m that carry the labelled links; 8-UAV mesh at 15 m; city, gateway, edge rack, 8 users.

**COMPONENTS**
- LEO constellation
- UAV mesh
- Towers with coverage cones
- Gateway
- Edge racks
- Users

**DATA FLOW**
Five labelled flows spanning space, air and ground, including an inter-satellite optical link.

**ANIMATION**
- Satellites orbit
- Packets march at per-link rates
- Mesh re-forms as UAVs move

**TEXT**
Title and link legend only; the labels live in the 3D scene.

**TECHNICAL MESSAGE**
Space, air and ground are one routable network, continuously optimised rather than statically planned.

**PRODUCTION**
Camera 46° FOV authored at (0,18,58) → (0,14,0), then auto-framed. White for the optical ISL, mint for fronthaul, ice for space links.


**KEY TECHNOLOGIES:** 3GPP NTN Rel-17/18 · 5G NR · 6G candidates · mmWave · FSO · O-RAN · Sionna · TR 38.901

**METRICS:** 5 distinct link types · >100 Mb/s aggregate user rate · <50 ms edge RTT · n+1 paths per critical flow

**NOTE:** Every node in this picture is a routing decision the communication agent makes and re-makes continuously.

---

### Slide 37 — Learning from the fleet without collecting the fleet’s data

- **Kicker:** ACT V · FEDERATED LEARNING
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `federated`
- **Subtitle:** Each UAV, robot and edge server trains on what it sees. Only model updates leave the device, encrypted and aggregated. Raw imagery, locations and personal data stay where they were captured.
- **Stage caption:** Red cubes: raw data that never leaves. Mint octahedra: model updates that do.

**VISUAL**
Six devices in a ring, each holding a red “raw data stays” cube and a mint “Δθ leaves” octahedron, all linked to an aggregation orb that feeds a rotating global model above.

**3D SCENE**
Four UAVs, two ground assets and an edge rack on a ring of radius ~22; aggregation orb at (0,20,0); global model icosahedron at (0,27,0); dashed updates up, beam broadcasts down.

**COMPONENTS**
- 6 devices
- Local data (red) vs update (mint) per device
- Secure aggregation orb
- Global model
- Protocol panel

**DATA FLOW**
Device → Δθ → aggregation → global θ → broadcast → device. Raw data has no outbound path at all.

**ANIMATION**
- Update octahedra pulse while “training”
- Dashed packets rise, beam packets descend
- Global model rotates

**TEXT**
Why it is required, processing steps, and the three real risks with mitigations.

**TECHNICAL MESSAGE**
Privacy-preserving learning is an enabling constraint: it is what makes fleet-scale learning legally and commercially possible.


**LEFT COLUMN — concept / inputs**

- *WHY IT IS REQUIRED HERE*
  - Imagery of people and property is sensitive
  - Bandwidth from a UAV is scarce and precious
  - Some data cannot legally cross a border
  - Customers will not hand over raw operational data

- *INPUTS*
  - Local datasets per device
  - Current global model
  - Privacy budget and clipping bounds

**RIGHT COLUMN — outputs / decisions**

- *PROCESSING*
  - Local epochs with FedAvg / FedProx
  - Update clipping + optional differential privacy
  - Secure aggregation (server cannot inspect individuals)
  - Client selection weighted by data quality

- *OUTPUTS / RISKS*
  - Global model + per-round quality report
  - Risk: non-IID divergence → use proximal terms
  - Risk: stragglers → asynchronous aggregation
  - Risk: poisoning → robust aggregation + attestation

**TECHNICAL DIAGRAM** (`chain` — FEDERATED ROUND)

- Local training — on-device, own data
- Δθ only — encrypted, clipped, noised
- Secure aggregation — server sees no individual update
- Global model θ — validated before release
- Broadcast — back to every device

Note: Non-IID by construction: each device sees a different city, channel and mission profile — the aggregation must expect it.

**KEY TECHNOLOGIES:** FedAvg / FedProx · secure aggregation · differential privacy · CSI-feedback style compression · device attestation · 3GPP Rel-18 AI/ML framework

**METRICS:** 0 bytes raw sensitive data transmitted · >10× bandwidth saving vs raw upload · ≈ central accuracy on non-IID splits · <1% accuracy loss from privacy noise

**NOTE:** Federated learning here is not a research flourish: it is the only way the fleet can learn from customer environments at all.

---

### Slide 38 — A swarm that learns to cooperate

- **Kicker:** ACT V · MULTI-AGENT RL
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `marlSwarm`
- **Subtitle:** Each UAV is an agent with its own observation and action space; the reward couples them. Centralised training with decentralised execution means they learn together but fly independently.
- **Stage caption:** City + obstacles + users + channels as the environment; six agents; state, action and reward panels above.

**VISUAL**
Six labelled agents flying over a city of users with demand bars, each projecting a coverage cone, over a violet wireframe reward field, with state/action/reward panels floating above.

**3D SCENE**
City spread 52 m; 22 users with height-coded demand bars; 6-UAV mesh at 16 m with 26 m range; 26 × 26 wireframe reward field at y=0.4; three panels at y=27.

**COMPONENTS**
- 6 agents with labels
- Users + demand bars
- Coverage cones
- Reward field
- State/action/reward panels

**DATA FLOW**
Environment → observations → policies → actions → environment, with the reward field visualising the shared objective.

**ANIMATION**
- Agents re-form the mesh and shift coverage
- Cones breathe
- Reward field shimmers where coverage is good

**TEXT**
Full Dec-POMDP formulation with state, action, reward and training setup.

**TECHNICAL MESSAGE**
Where resources are shared, coordination must be learned jointly — with hard penalties for safety violations, not soft ones.


**LEFT COLUMN — concept / inputs**

- *STATE (per agent)*
  - `kinematics` position, velocity, altitude
  - `energy` battery, power draw
  - `channel` CSI, interference, blockage
  - `demand` users served, queue
  - `neighbours` relative state of nearby agents

- *ACTION*
  - `trajectory` waypoint / velocity command
  - `power` transmit power
  - `channel` resource block selection
  - `altitude` coverage vs path loss
  - `association` which users to serve

**RIGHT COLUMN — outputs / decisions**

- *REWARD*
  - + aggregate throughput and fairness
  - + priority-area coverage
  - − energy consumed per bit
  - − end-to-end latency
  - − collision and geofence violation (hard penalty)

- *TRAINING SETUP*
  - CTDE: centralised critic, decentralised actors
  - Domain randomisation over city, wind, demand
  - Curriculum: 2 agents → 6 → 20
  - Evaluated against a tuned classical baseline

**TECHNICAL DIAGRAM** (`graph` — MARL FORMULATION (Dec-POMDP))

- `env` ENVIRONMENT — city geometry · users · channel · wind · energy
- `o1` Agent 1 obs — local + neighbours
- `o2` Agent 2 obs — local + neighbours
- `o3` Agent i obs — local + neighbours
- `critic` Centralised critic — sees joint state (training only)
- `act` Decentralised actors — run on each UAV
- `r` REWARD +throughput +coverage −energy −latency −collision — shared + individual shaping terms

Edges: env→o1, env→o2, env→o3, env→critic, critic→act, o3→r, act→env

**KEY TECHNOLOGIES:** MADDPG / QMIX / MAPPO · Isaac Lab · Sionna channel models · PyTorch · Ray · domain randomisation

**METRICS:** 6 → 20 agents in curriculum · >baseline throughput vs tuned heuristic · 0 collisions in evaluation · <15% sim-to-real gap

**NOTE:** MARL is used where the coupling is real — spectrum, coverage and airspace are shared resources, so the policies must be learned jointly.

---


## ACT VI · DEVELOPMENT PIPELINE

### Slide 39 — Fourteen phases, and the loop that never ends

- **Kicker:** ACT VI · DEVELOPMENT PIPELINE
- **Layout:** `full`
- **Scene module:** `pipelineOverview`
- **Subtitle:** P0 requirements → P1 design → P2 data → P3 digital twin → P4 AI models → P5 agentic AI → P6 multi-agent learning → P7 simulation → P8 safety validation → P9 hardware-in-the-loop → P10 field test → P11 pilot → P12 continual learning → P13 autonomous operation.
- **Stage caption:** The ascending helix is the build path; the mint return path is field data flowing back into P2, which is what makes this a platform rather than a project.

**VISUAL**
A rising helix of fourteen labelled phase discs with a bright forward path and a separate mint return path arcing from the top back to the data phase.

**3D SCENE**
Discs on a 2.1-turn helix (radius 22 × 12, height 3 → 25); Catmull-Rom tube for the forward path with 14 packets; second tube for the P13 → P2 return.

**COMPONENTS**
- 14 phase discs
- Forward path
- Return path
- Phase labels

**DATA FLOW**
Forward: artefacts. Backward: field experience and measured gaps.

**ANIMATION**
- Packets travel the helix continuously
- Return-path packets travel faster to imply the tight learning loop

**TEXT**
Title and phase enumeration only.

**TECHNICAL MESSAGE**
Development is a gated, cyclic pipeline whose last phase feeds its third.


**KEY TECHNOLOGIES:** requirements traceability · interface contracts · data versioning · twin validation · RL training · fault injection · HITL rigs · flight test · canary rollout

**METRICS:** 14 phases · 1 return loop · 9 validation levels inside P7–P11 · <24 h field data → candidate model

**NOTE:** Phases are gated: each one has entry criteria, exit criteria and artefacts. Nothing advances because a demo looked good.

---

### Slide 40 — Requirements — write down what “done” means

- **Kicker:** PHASE 0 / 13
- **Layout:** `standard`
- **Scene module:** `p0Requirements`
- **Subtitle:** Mission definition, constraints, success criteria and explicit non-goals. Everything in the following thirteen phases must trace back to a line written here.
- **Stage caption:** Four cards: mission, constraints, success criteria, non-goals.

**VISUAL**
Four floating requirement cards over empty terrain — deliberately quiet, no hardware yet.

**3D SCENE**
Bare 120 m terrain; four canvas panels arranged 2 × 2 at y = 5–12; non-goals card outlined in red.

**COMPONENTS**
- Mission card
- Constraints card
- Success-criteria card
- Non-goals card

**DATA FLOW**
None — this phase produces text, and that is the point.

**ANIMATION**
- Very slow camera drift only; the stillness contrasts with later phases

**TEXT**
Activities, entry criteria, artefacts, exit criteria.

**TECHNICAL MESSAGE**
Autonomy programmes are won or lost in the requirements phase.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Mission and stakeholder definition
  - Operational environment description
  - Regulatory and airspace constraints
  - Explicit non-goals and out-of-scope risks

- *ENTRY CRITERIA*
  - A named operator and a named use case
  - Access to the target environment’s data

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Mission specification with measurable success criteria
  - Constraint register (physical, legal, ethical)
  - KPI definitions and acceptance thresholds
  - Requirements traceability matrix

- *EXIT CRITERIA* — Every KPI has a number, an owner and a test method. If a criterion cannot be measured, it is rewritten or removed.

**KEY TECHNOLOGIES:** requirements management · CONOPS documents · airspace / NOTAM analysis · stakeholder workshops

**METRICS:** 100% requirements measurable · 0 unowned KPIs

**NOTE:** The most expensive autonomy failures are specification failures discovered after hardware exists.

---

### Slide 41 — System design — interfaces before implementations

- **Kicker:** PHASE 1 / 13
- **Layout:** `standard`
- **Scene module:** `p1SystemDesign`
- **Subtitle:** Define the fifteen layers, the four planes, and every contract between them: message schema, rate, latency class and failure semantics.
- **Stage caption:** Nine subsystem blocks with eleven versioned interface contracts between them.

**VISUAL**
A wireframe blueprint of the platform: nine translucent subsystem boxes in three tiers, linked by animated contract edges.

**3D SCENE**
Boxes 9 × 3 × 4 m at y = 4, 11, 18, 25; eleven links alternating beam/dashed with packets; “design output” panel in front.

**COMPONENTS**
- 9 subsystem blocks
- 11 interface links
- Design-output panel

**DATA FLOW**
Each edge is a contract; packets show that contracts carry traffic classes, not just arrows.

**ANIMATION**
- Packets traverse each contract
- Slow orbit to reveal the tiering

**TEXT**
Activities, artefacts, and the two-team exit test.

**TECHNICAL MESSAGE**
Interfaces are the architecture; implementations are replaceable.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Layer and plane decomposition
  - Interface contract definition
  - Latency and bandwidth budgeting
  - Failure mode and effects analysis (FMEA)
  - Safety concept and authority model

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Architecture description with 15 layers + 4 planes
  - Interface catalogue (schema, rate, latency, failure)
  - Compute placement decisions per function
  - Preliminary safety case outline

- *EXIT CRITERIA* — Two teams can build either side of every interface without talking to each other. If they cannot, the contract is incomplete.

**KEY TECHNOLOGIES:** ROS 2 IDL · protobuf / JSON schema · ArchiMate / C4 diagrams · FMEA · latency budgeting

**METRICS:** 11+ contracts specified · 100% interfaces with failure semantics · 4 planes with separate guarantees

**NOTE:** The interface catalogue is the real deliverable of this phase; the block diagram is just its cover page.

---

### Slide 42 — Data — collect and generate the fuel

- **Kicker:** PHASE 2 / 13
- **Layout:** `standard`
- **Scene module:** `p2Data`
- **Subtitle:** Real-world collection campaigns plus simulation-generated data, unified in one versioned platform where any mission can be replayed bit-exactly.
- **Stage caption:** Real collection (left) and simulated/synthetic generation (right) converging into one versioned data platform.

**VISUAL**
Two collection worlds — a warm real city with a flying UAV and a mint simulated city with a swarm — both streaming into a glowing cylindrical data vault.

**3D SCENE**
Real city at x=−18, simulated city at x=+18, vault (r=5, h=4) at (0,2.4,16); two convergent beams with packets; six source-type labels around the vault.

**COMPONENTS**
- Real collection
- Synthetic generation
- Data vault
- Source-type labels

**DATA FLOW**
Both worlds → vault; the vault is the only path into P4.

**ANIMATION**
- UAV sweeps the real city; swarm patrols the sim city
- Packets converge into the vault

**TEXT**
Activities, artefacts, and the gap-analysis exit criterion.

**TECHNICAL MESSAGE**
The output of this phase is a versioned, replayable dataset — not a folder of recordings.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Flight and drive campaigns for real data
  - Satellite and GIS product acquisition
  - RF / channel measurement campaigns
  - Synthetic data generation in the twin
  - Labelling with quality control

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Versioned datasets with lineage
  - Dataset cards: coverage, bias, gaps
  - Replay bundles per mission
  - Labelling guidelines and inter-annotator agreement

- *EXIT CRITERIA* — A named dataset exists for every model planned in P4, with a documented gap analysis against the operating envelope.

**KEY TECHNOLOGIES:** MCAP / rosbag2 · Parquet / Delta · DVC / LakeFS · Isaac Sim replicator · CVAT-style labelling · Sionna for RF data

**METRICS:** TB/day ingest rate · >0.9 inter-annotator agreement · bit-exact replay · <24 h campaign → usable dataset

**NOTE:** Synthetic data is not a shortcut here — it is how rare and dangerous cases become trainable at all.

---

### Slide 43 — Digital twin — build it layer by layer, validate each

- **Kicker:** PHASE 3 / 13
- **Layout:** `standard`
- **Scene module:** `p3DigitalTwinBuild`
- **Subtitle:** GIS → terrain → buildings → traffic and weather → agents and network. Each layer is validated against measurements before the next is added.
- **Stage caption:** Five construction stages, left to right, each adding one validated layer.

**VISUAL**
Five side-by-side pads showing the twin being assembled: bare GIS grid, terrain, buildings, traffic + weather, then agents + network.

**3D SCENE**
Pads 13 × 13 m at x = −30 … +30, each cumulative; arrows between pads; camera dollies left to right.

**COMPONENTS**
- 5 construction stages
- Inter-stage arrows

**DATA FLOW**
Each stage inherits the previous and adds exactly one validated layer.

**ANIMATION**
- Traffic moves in stage 4
- Swarm holds formation in stage 5
- Lateral camera dolly across the assembly line

**TEXT**
Activities, artefacts, numeric exit criteria.

**TECHNICAL MESSAGE**
Fidelity is built and proven incrementally, layer by layer, with numbers.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Import authoritative geospatial data
  - Generate terrain and building geometry (USD)
  - Add traffic (SUMO) and weather fields
  - Add agents with validated dynamics
  - Add radio propagation on the real geometry

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Versioned twin scene of record
  - Per-layer validation report with error numbers
  - Scenario library built on the twin
  - Twin-to-reality comparison harness

- *EXIT CRITERIA* — Geometry < 1 m error, radio < 3 dB error, vehicle dynamics < 10% step-response error — each demonstrated against field measurements.

**KEY TECHNOLOGIES:** QGIS / OSM · OpenUSD · Omniverse · Isaac Sim · SUMO · Sionna RT · weather reanalysis data

**METRICS:** <1 m geometry error · <3 dB radio error · <10% dynamics error · 5 validated layers

**NOTE:** Building the twin in validated increments is what prevents a beautiful simulation that teaches the wrong physics.

---

### Slide 44 — AI model development — train what the mission needs

- **Kicker:** PHASE 4 / 13
- **Layout:** `standard`
- **Scene module:** `p4ModelDev`
- **Subtitle:** Perception, prediction, planning, communication optimisation, resource allocation and navigation models, trained on the P2 datasets and P3 twin, then quantised for the edge.
- **Stage caption:** GPU cluster training with live curves for perception, trajectory, channel and policy models.

**VISUAL**
A GPU cluster with four live training curves rendered above it, and a UAV and robot receiving/returning artefacts.

**3D SCENE**
2 × 5 rack pod; four canvas plots (340 × 190) at y=16 animating a growing loss/metric trace; deploy beam to a UAV, experience link from a robot.

**COMPONENTS**
- GPU pod
- 4 live metric plots
- Deploy + experience links

**DATA FLOW**
Data → training → candidate model → device; experience returns to the cluster.

**ANIMATION**
- Curves draw progressively and reset (implying successive runs)
- Packets on both links

**TEXT**
Activities, artefacts, and the baseline-beating exit criterion.

**TECHNICAL MESSAGE**
Models are engineering deliverables with budgets and baselines, not research artefacts.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Baseline first: classical method before learning
  - Backbone selection and fine-tuning
  - Uncertainty calibration
  - Quantisation and TensorRT export
  - Offline evaluation on held-out scenarios

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Registered model versions with metrics
  - Model cards: data, limits, failure modes
  - Edge-ready engines (INT8/FP8)
  - Comparison against the classical baseline

- *EXIT CRITERIA* — Every model beats a tuned classical baseline on the mission metric, is calibrated (ECE < 0.05), and runs inside its latency and power budget.

**KEY TECHNOLOGIES:** PyTorch · CUDA · TensorRT · MLflow / W&B · ONNX · Optuna · model cards

**METRICS:** >baseline on mission metric · ECE < 0.05 calibration · INT8 edge precision · <15 W inference power

**NOTE:** The classical baseline is mandatory. Without it, nobody can tell whether the learning added value or noise.

---

### Slide 45 — Agentic AI — build agents like software, not prompts

- **Kicker:** PHASE 5 / 13
- **Layout:** `standard`
- **Scene module:** `p5AgenticBuild`
- **Subtitle:** Each agent gets an objective, tools with typed schemas, scoped memory, guardrails and full tracing — then a review before it is allowed near the fleet.
- **Stage caption:** Three assembly bays: objective + policy, tools + memory, guardrails + logging.

**VISUAL**
An “agent factory”: three wireframe assembly bays with an agent orb growing in complexity from bay to bay, ending as a certified agent above.

**3D SCENE**
Bays 9 × 8 × 6 m at x = −12, 0, +12 on a violet holo ring; orbs of increasing radius per bay; certified agent at (0,15,−6).

**COMPONENTS**
- 3 assembly bays
- Progressive agent orbs
- Certified agent
- Build checklist panel

**DATA FLOW**
Left to right assembly, then upward to certification.

**ANIMATION**
- Arrows pulse between bays
- Orbs rotate at increasing rates
- Certified agent glows steadily

**TEXT**
Activities, artefacts, and the adversarial exit criterion.

**TECHNICAL MESSAGE**
Agentic autonomy is a software engineering discipline with review gates.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Define objective and success test
  - Register tools with schemas and rate limits
  - Scope memory and set retention
  - Add guardrails: envelopes, budgets, veto hooks
  - Red-team the agent against adversarial prompts and states

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Agent specification (the seven fields)
  - Tool registry entries
  - Guardrail test suite + red-team report
  - Revocation procedure

- *EXIT CRITERIA* — The agent cannot exceed its envelope even when its model output is adversarial or nonsensical — demonstrated, not asserted.

**KEY TECHNOLOGIES:** tool schemas · behaviour trees · guardrail middleware · prompt / policy versioning · OpenTelemetry tracing · red-teaming

**METRICS:** 7 mandatory spec fields · 100% tool calls validated · 0 envelope escapes in red-team · <1 s revocation

**NOTE:** An agent is a privileged process with tools and authority. It gets the same review as any other privileged process.

---

### Slide 46 — Multi-agent learning — train the swarm, not the drone

- **Kicker:** PHASE 6 / 13
- **Layout:** `standard`
- **Scene module:** `p6MultiAgentLearning`
- **Subtitle:** Swarm coordination, distributed decision making, federated learning and multi-agent reinforcement learning across many randomised environments in parallel.
- **Stage caption:** Five parallel arenas with different seeds, one shared policy/critic above them.

**VISUAL**
Five circular arenas, each with its own mini-city and 5-UAV swarm and its own seed, all connected to a shared policy orb above.

**3D SCENE**
Arenas r=11 at five positions; per-arena swarms with different mesh colours; shared policy orb at (0,26,4) with dashed gradients up and mint policy beams down.

**COMPONENTS**
- 5 seeded arenas
- Shared policy/critic orb
- MARL setup panel

**DATA FLOW**
Arenas → experience → shared critic → improved policy → arenas.

**ANIMATION**
- Each swarm behaves slightly differently
- Gradient packets rise, policy packets descend

**TEXT**
Full activity list, artefacts, and graceful-degradation exit criterion.

**TECHNICAL MESSAGE**
Swarm behaviour is trained and audited as a joint policy, with explicit robustness to losing agents.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Formulate the Dec-POMDP: obs, actions, reward
  - Curriculum from 2 agents to 20+
  - Domain randomisation across cities, wind, demand
  - Federated variant where data cannot be pooled
  - Emergent-behaviour review

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Trained joint policies with evaluation matrix
  - Scenario-family performance breakdown
  - Emergent behaviour catalogue (good and bad)
  - Baseline comparison vs classical heuristics

- *EXIT CRITERIA* — The policy beats the tuned heuristic on throughput and coverage, never violates hard constraints, and degrades gracefully when agents are removed.

**KEY TECHNOLOGIES:** MADDPG / QMIX / MAPPO · Isaac Lab · Ray · FedAvg · domain randomisation · curriculum learning

**METRICS:** 5 → 10⁴ parallel environments · 2 → 20 agents in curriculum · 0 hard-constraint violations · n−1 agents removable without failure

**NOTE:** Emergent coordination is reviewed, catalogued and constrained. “The swarm figured something out” is not an acceptable operational answer.

---

### Slide 47 — Simulation — run millions of missions before one flight

- **Kicker:** PHASE 7 / 13
- **Layout:** `standard`
- **Scene module:** `p7Simulation`
- **Subtitle:** Thousands of parallel randomised environments produce statistics, not anecdotes: performance distributions per scenario family, with tail behaviour visible.
- **Stage caption:** 49 of 10,000+ parallel environments, each with randomised layout, weather, noise and link quality.

**VISUAL**
A 7 × 7 grid of miniature simulated worlds, each with its own randomised buildings and moving agents — the visual impression of scale.

**3D SCENE**
49 groups on a 13 m pitch, each with a glowing pad, 9 procedural buildings and 3 orbiting agent markers, all with independent seeds.

**COMPONENTS**
- 49 environment tiles
- Per-tile agents
- “Massive simulation” panel

**DATA FLOW**
Each tile independently produces mission statistics that aggregate upward.

**ANIMATION**
- Agents orbit at per-tile rates so the grid never looks synchronised
- High slow orbit

**TEXT**
Randomised dimensions, artefacts, and the P99 exit criterion.

**TECHNICAL MESSAGE**
Statistical evidence over many randomised missions is the only credible pre-flight argument.


**LEFT COLUMN — concept / inputs**

- *RANDOMISED DIMENSIONS*
  - Layout, obstacles, user distribution
  - Weather, wind, visibility
  - Sensor noise and calibration drift
  - Link quality, interference, outages
  - Asset failures and energy states

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Performance distributions per scenario family
  - Tail analysis: worst 1% of missions
  - Failure catalogue with reproducible seeds
  - Regression suite for every future model

- *EXIT CRITERIA* — Mission success in the worst 1% of scenarios still meets safety criteria, and every discovered failure has a reproducible seed.

**KEY TECHNOLOGIES:** Isaac Lab parallel envs · CUDA · Ray · scenario DSL · seeded determinism · statistical analysis

**METRICS:** 10⁴–10⁶ missions simulated · P99 reported, not just mean · 100% failures reproducible · seeded determinism

**NOTE:** The purpose of massive simulation is to find the tail, not to prove the average.

---

### Slide 48 — Safety validation — break it on purpose

- **Kicker:** PHASE 8 / 13
- **Layout:** `standard`
- **Scene module:** `p8SafetyValidation`
- **Subtitle:** GPS denial, link loss, sensor failure, battery degradation, weather, adversarial inputs, satellite outage and UAV loss — each injected deliberately, each requiring a demonstrated safe outcome.
- **Stage caption:** Six simultaneous fault injections into a live swarm, each with a required safe response.

**VISUAL**
A red-lit swarm over a damaged city with six simultaneous warning rings and labels — “GPS DENIED”, “LINK LOST”, “SENSOR FAILURE”, “BATTERY FAULT”, “WIND GUST”, “ADVERSARIAL INPUT”.

**3D SCENE**
Red-tinted grid and city; 6-UAV swarm at 14 m with red mesh; per-fault pulsing torus rings and floating warning labels attached to individual UAVs.

**COMPONENTS**
- Fault-injected swarm
- 6 warning rings + labels
- Fault-injection campaign panel

**DATA FLOW**
Fault → detection → safe policy → recorded evidence (stated in the panel).

**ANIMATION**
- Warning rings pulse and scale asynchronously
- Labels blink
- Camera keeps the whole swarm in frame

**TEXT**
Fault catalogue vs required responses, plus the evidence-based exit criterion.

**TECHNICAL MESSAGE**
Safety is validated by deliberate failure with recorded evidence, not by absence of incidents.


**LEFT COLUMN — concept / inputs**

- *FAULT CATALOGUE*
  - GPS denied / spoofed
  - Communication lost (partial and total)
  - Sensor failure and calibration drift
  - Battery degradation and thermal limits
  - Severe weather and wind gusts
  - Adversarial and out-of-distribution inputs
  - Satellite outage
  - Single and multiple UAV loss

**RIGHT COLUMN — outputs / decisions**

- *REQUIRED RESPONSES*
  - GPS denial → visual-inertial navigation fallback
  - Link loss → autonomous return inside the geofence
  - Sensor fault → degraded but stable policy
  - OOD input → anomaly detector triggers veto
  - Multi-asset loss → mission re-scoped, not abandoned

- *EXIT CRITERIA* — Every fault in the catalogue has an injected test, a recorded outcome and evidence that the safe behaviour occurred within its time budget.

**KEY TECHNOLOGIES:** fault injection framework · chaos testing · adversarial input generation · anomaly detectors · geofencing · formal envelope checks

**METRICS:** <1 s detection → safe policy · 100% faults with evidence · 0 unsafe outcomes accepted · 8 fault families

**NOTE:** This phase is where autonomy earns the right to be trusted. It is also the phase most programmes skip.

---

### Slide 49 — Hardware-in-the-loop — real firmware, simulated world

- **Kicker:** PHASE 9 / 13
- **Layout:** `standard`
- **Scene module:** `p9HITL`
- **Subtitle:** The actual autopilot and the actual compute module run the actual binaries, while sensors and radio are injected from the twin. This is where integration and timing bugs surface.
- **Stage caption:** Real flight controller and edge GPU on the bench (left) wired to the simulated world (right).

**VISUAL**
Split bench scene: an illuminated flight-controller board with components on a lab bench, cabled to a large screen showing the simulated city with a flying UAV.

**3D SCENE**
Bench + board at x=−9 with 14 procedural components; simulation screen 14 × 8 m at x=+10 with an inset live mini-city and UAV; two labelled links (sensor injection, actuator commands).

**COMPONENTS**
- Real autopilot board
- Simulated world screen
- Sensor injection link
- Actuator command link
- HITL panel

**DATA FLOW**
Simulated sensors → real hardware → real commands → simulated actuation, closed at real time.

**ANIMATION**
- Packets on both links
- Mini UAV flies inside the screen
- Slow parallax drift

**TEXT**
Activities, artefacts, and timing/jitter exit criteria.

**TECHNICAL MESSAGE**
Timing parity on real hardware is a prerequisite for flight, and it is cheap to test on a bench.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Bench rig with real autopilot + real edge compute
  - Sensor injection at true rates and formats
  - RF channel emulation from the twin
  - Timing and jitter measurement
  - Fault injection at the hardware level

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Timing and jitter report for the real loop
  - Integration defect list (the point of the phase)
  - Repeatable HITL regression suite
  - Firmware + model version pairing matrix

- *EXIT CRITERIA* — The loop meets its rate and jitter budget on real hardware, and every P8 fault scenario reproduces the same safe behaviour with hardware in the loop.

**KEY TECHNOLOGIES:** PX4 HITL · Jetson on the bench · Isaac Sim sensor injection · Sionna channel emulation · CAN / UART / Ethernet capture · timing analysis

**METRICS:** <10 ms measured control latency · <1 ms jitter budget · 100% P8 scenarios reproduced · 1:1 firmware/model pairing

**NOTE:** Most “AI failures” in robotics are integration and timing failures. This is the phase that finds them cheaply.

---

### Slide 50 — Controlled field test — one aircraft, bounded volume

- **Kicker:** PHASE 10 / 13
- **Layout:** `standard`
- **Scene module:** `p10FieldTest`
- **Subtitle:** First contact with reality: a small number of physical agents inside a geofenced test range, with a safety pilot, full telemetry recording and a direct comparison against the twin’s prediction.
- **Stage caption:** Geofenced volume, one UAV on a repeatable trajectory, ground control with a safety pilot on the stick.

**VISUAL**
A bright daylight test range with a visible cylindrical geofence, one UAV flying a closed repeatable circuit, and a ground control vehicle with two operators.

**3D SCENE**
Geofence cylinder r=22, h=14 with glowing top and bottom rims; Catmull-Rom closed trajectory with a trail and the UAV as marker; GCS van + dish + two humans at (−26,0,18); dashed C2 link.

**COMPONENTS**
- Geofence volume
- UAV + flown trajectory
- Ground control station
- C2 link
- Field-test panel

**DATA FLOW**
C2 link (dashed) to the aircraft; telemetry recorded; results compared to twin prediction (stated in panel).

**ANIMATION**
- UAV traverses the trajectory continuously
- Trail persists to show repeatability
- Geofence rims glow steadily

**TEXT**
Activities, artefacts, and numeric exit criteria.

**TECHNICAL MESSAGE**
The first flights exist to measure the gap between the twin and reality.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Repeatable trajectories flown in a bounded volume
  - Sim-to-real gap measurement on the same scenario
  - Sensor and channel calibration against ground truth
  - Progressive envelope expansion
  - Abort-procedure rehearsal

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Measured sim-to-real gap per metric
  - Twin corrections fed back to P3
  - Flight-test report with envelope achieved
  - Updated safety case

- *EXIT CRITERIA* — Sim-to-real gap under 15% on mission metrics, zero geofence breaches, and every abort executed within its time budget.

**KEY TECHNOLOGIES:** geofencing (independent of the policy) · RTK ground truth · full-rate telemetry logging · safety pilot override · flight-test procedures

**METRICS:** <15% sim-to-real gap · 0 geofence breaches · 1 aircraft at a time · 100% flights recorded at full rate

**NOTE:** The purpose is measurement, not demonstration. A field test that only proves it works has wasted the flight.

---

### Slide 51 — Pilot deployment — real mission, real users

- **Kicker:** PHASE 11 / 13
- **Layout:** `standard`
- **Scene module:** `p11Pilot`
- **Subtitle:** A limited fleet operating a real mission in a defined district, with full monitoring, agreed abort criteria and a daily review of every intervention.
- **Stage caption:** Pilot district with a small fleet, a satellite backhaul, a working tower and a gateway.

**VISUAL**
A real district ringed in mint, with four UAVs, a ground robot, a live tower, a gateway and a satellite pass overhead.

**3D SCENE**
Terrain 180 m; 120-building city; 4-UAV mesh at 18 m; UGV; tower with coverage; gateway at (−30,0,22); satellite at (18,44,−14) with a feeder beam; district ring r=25.

**COMPONENTS**
- Pilot district ring
- Limited fleet
- Live network
- Satellite backhaul
- Pilot panel

**DATA FLOW**
Satellite feeder → gateway; fleet mesh; all telemetry to operations.

**ANIMATION**
- Fleet operates continuously
- Feeder beam packets
- Slow wide orbit

**TEXT**
Activities, artefacts, exit criteria.

**TECHNICAL MESSAGE**
Scale-up is earned with measured operational evidence, not with a successful demo.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Operate a real mission at reduced scale
  - Monitor continuously with a human on call
  - Review every intervention within 24 hours
  - Measure operational KPIs against P0 criteria
  - Engage regulators with real evidence

**RIGHT COLUMN — outputs / decisions**

- *ARTEFACTS*
  - Operational KPI report vs P0 acceptance thresholds
  - Intervention log with root causes
  - Regulatory evidence package
  - Go / no-go recommendation for scale-up

- *EXIT CRITERIA* — KPIs met on real missions, intervention rate trending down, and no safety event that was not already anticipated in P8.

**KEY TECHNOLOGIES:** operational monitoring · on-call procedures · regulatory reporting · canary model rollout · incident management

**METRICS:** <0.1/h interventions per UAV · >90% mission objectives met · 0 unanticipated safety events · 24 h review cadence

**NOTE:** The pilot is where value is measured for the first time — and where the operational culture is actually built.

---

### Slide 52 — Continual learning — the loop that makes it an infrastructure

- **Kicker:** PHASE 12 / 13
- **Layout:** `standard`
- **Scene module:** `p12ContinualLearning`
- **Subtitle:** Field data returns, hard cases are mined first, candidates are retrained, re-validated through the whole gate stack, and rolled out as canaries with a rollback always one command away.
- **Stage caption:** Field operations → ingest → label/mine → retrain → re-validate → roll out → back to the field.

**VISUAL**
Field operations on the left feeding a five-station learning chain above right, with an improved policy arcing back to the field.

**3D SCENE**
Field city + 4-UAV swarm at x=−22; five chain stations at y=18 spaced 6.2 m; dashed experience link up, sagging mint policy beam back down.

**COMPONENTS**
- Field operations
- 5-station learning chain
- Experience link
- Policy return beam
- Discipline panel

**DATA FLOW**
Field → ingest → mine → retrain → re-validate → roll out → field.

**ANIMATION**
- Packets step through the chain
- Return beam carries the improved policy back

**TEXT**
Activities, the four “never” rules, and the 24-hour exit criterion.

**TECHNICAL MESSAGE**
Compounding improvement requires automated gates, canaries and instant rollback.


**LEFT COLUMN — concept / inputs**

- *ACTIVITIES*
  - Prioritise data the models got wrong
  - Active learning and hard-case mining
  - Retrain candidates against the regression suite
  - Re-run P7–P9 gates automatically
  - Canary rollout with KPI monitoring

**RIGHT COLUMN — outputs / decisions**

- *DISCIPLINE*
  - Never retrain without re-validating
  - Never roll out to the whole fleet at once
  - Never lose the ability to roll back
  - Never discard a failure case

- *EXIT CRITERIA* — A new mission’s data can produce a validated candidate model within 24 hours, and rollback completes in under a minute.

**KEY TECHNOLOGIES:** active learning · automated regression suites · model registry · canary deployment · drift detection · OTA update with rollback

**METRICS:** <24 h mission → candidate · <60 s rollback · 100% candidates re-validated · >1 improvement per mission batch

**NOTE:** This loop is the difference between a system that ages and a system that compounds.

---

### Slide 53 — Autonomous operation — sense, learn, reason, plan, act, observe, adapt

- **Kicker:** PHASE 13 / 13
- **Layout:** `standard`
- **Scene module:** `p13AutonomousOperation`
- **Subtitle:** Steady state: the platform runs continuously, decides locally, escalates rarely, and improves from every hour it operates.
- **Stage caption:** Live city operations under the seven-stage continuous loop.

**VISUAL**
A fully operational city — swarm, robots, satellite, traffic — under a luminous seven-node ring reading SENSE, LEARN, REASON, PLAN, ACT, OBSERVE, ADAPT.

**3D SCENE**
City 56 m with vehicles; 9-UAV mesh at 17 m; two UGVs; a translating satellite; seven ring nodes at y=30 on radius 20 (Z 0.5) linked by curved beams.

**COMPONENTS**
- Live operations
- 7-stage loop ring
- Satellite pass

**DATA FLOW**
The ring is the control loop; the city below is its subject.

**ANIMATION**
- Loop packets circulate
- Fleet and traffic operate continuously
- Satellite translates overhead

**TEXT**
Steady-state behaviour and the four “not”s that define bounded autonomy.

**TECHNICAL MESSAGE**
Autonomy in production means bounded, observable, continuously improving operation — not the absence of humans.


**LEFT COLUMN — concept / inputs**

- *STEADY-STATE BEHAVIOUR*
  - Continuous sensing across space, air and ground
  - Local decisions at the edge, global coordination above
  - Human attention spent only on genuine judgement calls
  - Model versions rolling forward under monitoring

**RIGHT COLUMN — outputs / decisions**

- *WHAT “AUTONOMOUS” MEANS HERE*
  - Not unsupervised — bounded and observable
  - Not static — continuously retrained
  - Not opaque — every decision traceable
  - Not fragile — degrades level by level

- *OPERATING TARGETS*
  - `availability` > 99% of mission windows
  - `interventions` < 0.1 per UAV-hour
  - `adaptation` new policy per mission batch
  - `safety` zero unrecoverable assets

**KEY TECHNOLOGIES:** multi-region operations · observability stack · automated assurance · continuous certification evidence

**METRICS:** 24/7 operation · >99% availability · <0.1/h interventions · 7 loop stages

**NOTE:** This is the destination: an infrastructure that senses, understands, reasons, learns, plans, acts, observes and adapts without stopping.

---


## ACT VII–VIII · VALIDATION, SAFETY, OPS, HARDWARE

### Slide 54 — The testing pyramid: nine levels before anything matters

- **Kicker:** ACT VII · VALIDATION
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `testPyramid`
- **Subtitle:** Cheap tests run constantly; expensive tests run rarely; nothing flies over people until level 8. The pyramid is an economic argument as much as a safety one.
- **Stage caption:** Level 1 software unit tests → level 9 operational deployment, with cost of failure rising and test count falling.

**VISUAL**
A nine-tier 3D pyramid with a UAV hovering above the apex, cost-of-failure rising on the left and test-count falling on the right.

**3D SCENE**
Boxes 30 → 6.8 m wide, 1.7 m tall, spaced 2.1 m; per-level description labels to the right; cyan spine on the left annotated with the two gradients.

**COMPONENTS**
- 9 pyramid tiers
- Per-tier description
- Cost/count gradient annotations
- UAV at the apex

**DATA FLOW**
Artefacts and regression scenarios move upward only after passing each level.

**ANIMATION**
- Spine packets rise
- Apex UAV hovers
- Slow orbit to show the taper

**TEXT**
Why not the real world first, the gate rule, and what moves upward.

**TECHNICAL MESSAGE**
Validation is a staged, evidence-based economic process — reality is the last step, not the first.


**LEFT COLUMN — concept / inputs**

- *WHY NOT TEST IN THE REAL WORLD FIRST*
  - A real failure can injure someone — a simulated one cannot
  - A real flight costs hours; a simulated mission costs seconds
  - Real conditions are not repeatable, so you cannot debug them
  - Rare events are, by definition, almost never in your flight log

**RIGHT COLUMN — outputs / decisions**

- *GATE RULE* — A level is only passed with evidence: recorded runs, metrics against thresholds, and reproducible seeds for every failure found.

- *WHAT MOVES UPWARD*
  - Only artefacts that passed the level below
  - Plus the scenarios that broke them, as permanent regression tests

**TECHNICAL DIAGRAM** (`pyramid` — NINE VALIDATION LEVELS)

- L1 SOFTWARE UNIT TESTS
- L2 AI MODEL TESTS
- L3 SIMULATION
- L4 MASSIVE SIMULATION
- L5 SCENARIO RANDOMISATION
- L6 HARDWARE-IN-THE-LOOP
- L7 CONTROLLED FIELD TEST
- L8 PILOT DEPLOYMENT
- L9 OPERATIONAL DEPLOYMENT

**KEY TECHNOLOGIES:** CI/CD · pytest / gtest · model test harness · Isaac Lab batch runs · scenario DSL · PX4 HITL · flight-test procedures · canary rollout

**METRICS:** 9 levels · 10⁶ simulated missions before flight · 100% failures kept as regressions · L8 first flight over people

**NOTE:** Autonomous AI must not be debugged in the real world. The pyramid exists so that reality is the confirmation, not the experiment.

---

### Slide 55 — Failure architecture: ten failures, one response chain

- **Kicker:** ACT VII · SAFETY
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `safetyArch`
- **Subtitle:** Every credible failure is enumerated, detected by a monitor that is independent of the AI, and handled by a chain that ends — if necessary — with a human.
- **Stage caption:** Ten failure sources converging on the vehicle, and the six-stage response chain in front of it.

**VISUAL**
A UAV inside a mint protective shield, encircled by ten pulsing red failure nodes, with a six-stage green response chain laid out in front.

**3D SCENE**
UAV at 12 m inside a 5.4 m shield sphere; ten failure octahedra on an ellipse (r=17 × 9) with dashed links inward; six response boxes at z=12 with arrows between them.

**COMPONENTS**
- Protected vehicle
- 10 failure nodes
- 6-stage response chain
- Escalation path

**DATA FLOW**
Failures converge on the vehicle; the response chain runs left to right and ends in human escalation and an evidence record.

**ANIMATION**
- Failure nodes pulse asynchronously
- Dashed fault links march inward
- Response chain arrows are steady — deliberately calm

**TEXT**
Independence requirement and the seven concrete mechanisms.

**TECHNICAL MESSAGE**
Safety is an independent plane with its own mechanisms, guarantees and evidence trail.


**LEFT COLUMN — concept / inputs**

- *INDEPENDENCE REQUIREMENT*
  - Monitors do not share models with the policy
  - Envelope checks run outside the learned stack
  - Fallback controllers are classical and certifiable
  - Separate power and clock domains where feasible

**RIGHT COLUMN — outputs / decisions**

- *MECHANISMS*
  - Safety agent with veto authority
  - Fallback controller (MPC / PID)
  - Emergency landing site selection
  - Return-to-home with energy reserve
  - Geofencing enforced below the policy
  - Redundant communication paths
  - Human override from any mode

**TECHNICAL DIAGRAM** (`graph` — DETECTION → RESPONSE → EVIDENCE)

- `f1` GPS unavailable
- `f2` Communication lost
- `f3` Sensor failure
- `f4` Battery degradation
- `f5` Collision risk
- `f6` Weather deterioration
- `f7` Model uncertainty / OOD
- `f8` Cyber attack
- `f9` Satellite outage
- `f10` UAV failure
- `d` DETECTION — independent monitors
- `a` ASSESSMENT — severity + time to act
- `sp` SAFE POLICY — classical fallback
- `rd` REDUNDANCY — alternate asset / path
- `rc` RECOVERY — RTH · land · re-route
- `hu` HUMAN ESCALATION — override authority
- `ev` EVIDENCE RECORD — for certification + learning
- `mech` Mechanisms: safety agent · fallback controller · emergency landing · return-to-home · geofencing · redundant comms · human override

Edges: f1→d, f5→d, f7→d, f10→d, d→a, a→sp, sp→rd, a→rc, rc→hu, hu→ev, rd→ev

**KEY TECHNOLOGIES:** independent monitors · runtime assurance (simplex) · geofence enforcement · anomaly / OOD detection · secure boot + attestation · redundant links

**METRICS:** <1 s detect → safe policy · 10 enumerated failure families · 100% events with evidence records · 0 AI-only safety decisions

**NOTE:** If the AI is wrong, the thing that stops it must not be wrong for the same reason. That single sentence drives this entire slide.

---

### Slide 56 — Four modes, one-way transitions

- **Kicker:** ACT VII · DEGRADATION
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `safetyLadder`
- **Subtitle:** Autonomy does not fail — it degrades. NOMINAL → DEGRADED → SAFE → EMERGENCY, each with its own controller, its own envelope and its own monitor.
- **Stage caption:** Same aircraft, four operating modes, decreasing altitude and authority from left to right.

**VISUAL**
Four lit pads in a row, each with the same UAV at a lower altitude and a different trim colour, with red trigger arrows between them; the last one is descending inside an emergency beacon cone.

**3D SCENE**
Pads at x = −21, −7, +7, +21; UAV altitudes 12, 9, 6, ~1–2.4 m; emergency UAV descends repeatedly inside a red cone; trigger arrows between pads.

**COMPONENTS**
- 4 mode pads
- 4 UAV states
- Trigger arrows
- Ladder panel

**DATA FLOW**
One-way downward transitions; upward requires conditions stated in the panel.

**ANIMATION**
- Left three UAVs hover at different frequencies; the right one repeatedly descends and lands
- Trigger arrows steady

**TEXT**
Triggers, properties, and the binary-autonomy anti-pattern.

**TECHNICAL MESSAGE**
Design the degraded modes first; they are what the system will actually spend its bad days in.


**LEFT COLUMN — concept / inputs**

- *TRIGGER EXAMPLES*
  - NOMINAL → DEGRADED: link margin low, one sensor lost, model uncertainty high
  - DEGRADED → SAFE: GPS denied, second sensor lost, controller disagreement
  - SAFE → EMERGENCY: energy reserve breached, geofence proximity, airframe fault

**RIGHT COLUMN — outputs / decisions**

- *PROPERTIES*
  - Each mode is independently testable
  - Each mode has a monitor that can force the next mode down
  - Human override is reachable from every mode
  - Mode history is part of the mission record

- *ANTI-PATTERN* — A single “autonomy on/off” switch. Binary autonomy produces binary outcomes.

**TECHNICAL DIAGRAM** (`chain` — MODE DEFINITIONS AND TRIGGERS)

- NOMINAL — learned policy · full envelope · full autonomy
- DEGRADED — reduced envelope · simpler policy · higher margins
- SAFE — classical fallback controller · minimal mission
- EMERGENCY — return-to-home or immediate controlled landing

Note: Transitions down are automatic and immediate; transitions up require a clean state, a stabilisation timer and (for NOMINAL) an explicit release.

**KEY TECHNOLOGIES:** runtime assurance / simplex architecture · MPC and PID fallbacks · energy reserve policy · independent mode monitors

**METRICS:** 4 operating modes · <1 s downward transition · timer + clean state upward transition · 100% mode changes logged

**NOTE:** Graceful degradation is what makes autonomy operationally acceptable: the worst case is a boring, predictable landing.

---

### Slide 57 — The operational pipeline for models that fly

- **Kicker:** ACT VII · MLOps / AIOps / ROBOTOPS
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `mlopsLoop`
- **Subtitle:** DATA → TRAIN → VALIDATE → REGISTER → SIMULATE → CERTIFY → DEPLOY → MONITOR → COLLECT → RETRAIN, with versioning, canaries and rollback as first-class features.
- **Stage caption:** Ten-station operational loop with the model registry above it and a sub-minute rollback path.

**VISUAL**
A ten-station operational ring with a model-registry row of version cubes above it and a red rollback arrow cutting back through the versions.

**3D SCENE**
Stations on an ellipse (r=19 × 10.5) at y=6; four version cubes at y=15 with the live one glowing mint; red rollback arrow above the cubes.

**COMPONENTS**
- 10 lifecycle stations
- Version cubes v12.4 → v14.2
- Rollback arrow
- Rules panel

**DATA FLOW**
Clockwise lifecycle; registry above; rollback jumps backwards through versions.

**ANIMATION**
- Packets circulate the ring
- Live version cube rotates faster than the archived ones
- Rollback arrow pulses

**TEXT**
Non-negotiables, rollback contract, and how this differs from web MLOps.

**TECHNICAL MESSAGE**
Model operations for physical systems require signing, canaries and instant rollback as defaults.


**LEFT COLUMN — concept / inputs**

- *NON-NEGOTIABLES*
  - No manual copies of weights, ever
  - Every deployed model is signed and traceable to data + code + seed
  - Certification artefacts stored with the model
  - Fleet health tracked per model version

**RIGHT COLUMN — outputs / decisions**

- *ROLLBACK*
  - `trigger` KPI regression, safety event, drift alarm
  - `scope` per asset, per region, or fleet-wide
  - `time` < 60 s to previous version
  - `evidence` automatic incident record

- *WHAT IS DIFFERENT FROM WEB MLOps* — A bad rollout here has mass and velocity. Canaries are physical assets, so the blast radius is bounded by geography and mission role, not by traffic percentage alone.

**TECHNICAL DIAGRAM** (`loop` — MODEL LIFECYCLE WITH GATES)

- DATA — versioned datasets
- TRAIN — pinned code + seed
- VALIDATE — offline metrics + calibration
- REGISTER — signed artefact + model card
- SIMULATE — P7 regression suite
- CERTIFY — safety evidence package
- DEPLOY — canary → staged fleet
- MONITOR — KPI + drift + fleet health
- COLLECT — hard cases first
- RETRAIN — candidate for the next round

**KEY TECHNOLOGIES:** MLflow / W&B · model registry + signing · DVC / LakeFS · Argo / GitOps · OTA update · drift detection · OpenTelemetry

**METRICS:** <60 s rollback · 100% signed artefacts · canary-first every deploy · per-version fleet health tracking

**NOTE:** RobotOps is MLOps with a physical blast radius. Everything is the same except the consequences, which changes every default.

---

### Slide 58 — Fleet health and model rollout, on one wall

- **Kicker:** ACT VII · OPERATIONS
- **Layout:** `standard`
- **Scene module:** `fleetWall`
- **Subtitle:** Thirty-two assets, three health states, two model versions in flight. The operations question is never “is the model good?” but “which assets are running which model, and how are they doing?”.
- **Stage caption:** Per-asset state and model version, with four aggregate gauges below.

**VISUAL**
A wall of 32 status tiles (mint/amber/red) each labelled with asset ID, state and model version, above four aggregate gauges.

**3D SCENE**
4 × 8 tile grid of 2.9 × 2.2 m planes with edge outlines and three text rows each; four canvas gauges at y=3.4.

**COMPONENTS**
- 32 asset tiles
- 4 aggregate gauges

**DATA FLOW**
Telemetry → per-asset state → aggregate KPIs → rollback proposals.

**ANIMATION**
- Tile glow breathes per asset to imply live telemetry
- Gauges oscillate slightly

**TEXT**
Per-asset state, aggregates, and the automatic escalation rule.

**TECHNICAL MESSAGE**
Fleet operations is where model quality becomes an operational fact, per asset and per version.


**LEFT COLUMN — concept / inputs**

- *PER-ASSET STATE*
  - NOMINAL / DEGRADED / FAULT
  - Model version currently running
  - Energy and mission assignment
  - Open faults and their age

**RIGHT COLUMN — outputs / decisions**

- *AGGREGATES*
  - `availability` share of assets mission-capable
  - `adoption` share on the newest certified model
  - `open faults` count and trend
  - `energy reserve` fleet-wide margin

- *ESCALATION* — Fault clusters that correlate with a model version trigger an automatic rollback proposal, not a discussion.

**KEY TECHNOLOGIES:** observability stack · time-series KPIs · per-version cohort analysis · automated rollback proposals

**METRICS:** 32 assets shown · >99% availability target · 2 model versions in flight · auto rollback proposal

**NOTE:** Operating an autonomous fleet is a cohort-analysis problem: assets, versions, environments and outcomes, correlated continuously.

---

### Slide 59 — The hardware ecosystem, and what each part owes the system

- **Kicker:** ACT VIII · HARDWARE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `hardwareEcosystem`
- **Subtitle:** UAV, ground robot, satellite, ground station, edge server and cloud cluster — one exploded view showing the subsystems that actually determine what the autonomy can promise.
- **Stage caption:** UAV subsystems called out; robot, satellite, gateway, edge and cloud linked by their real data paths.

**VISUAL**
A wide hangar-style layout with a large UAV on the left annotated with six callout lines, and robot, satellite, gateway, edge rack and cloud pod arrayed to the right.

**3D SCENE**
UAV at scale 3.2 with six leader lines to labels; UGV, satellite, ground station, edge rack, 2 × 3 cloud pod; five links between them in different styles.

**COMPONENTS**
- Annotated UAV
- UGV
- Satellite
- Ground station
- Edge rack
- Cloud pod
- Inter-asset links

**DATA FLOW**
UAV → gateway → edge → cloud, plus robot → UAV and satellite → gateway.

**ANIMATION**
- Rotors, LiDAR and satellite yaw
- Packets on all five links
- Slow orbit

**TEXT**
Selection drivers and the four hardware guarantees the software depends on.

**TECHNICAL MESSAGE**
Autonomy budgets are hardware budgets: watts, milliseconds and centimetres.


**LEFT COLUMN — concept / inputs**

- *SELECTION DRIVERS*
  - Compute per watt (endurance is the real constraint)
  - Sensor synchronisation capability
  - Radio flexibility (mesh + cellular + NTN)
  - Serviceability and spare availability
  - Certification history of the airframe

**RIGHT COLUMN — outputs / decisions**

- *WHAT HARDWARE PROMISES THE SOFTWARE*
  - A time base good to < 1 ms
  - A pose good to < 5 cm (RTK) or a documented degradation
  - A power budget the inference stack must live inside
  - A guaranteed independent path for safety commands

**TECHNICAL DIAGRAM** (`matrix` — SUBSYSTEM RESPONSIBILITIES)

- **UAV**: flight controller (PX4) · GPU/SoC (Orin-class) · camera + gimbal · LiDAR / radar · IMU + GNSS-RTK · 5G modem + mesh radio
- **GROUND ROBOT**: drive + suspension · 360° LiDAR · manipulator (optional) · edge GPU · long-endurance battery
- **SATELLITE**: imaging payload · SAR (optional) · Ka/Ku radios · optical terminal · power + ADCS
- **GROUND STATION**: tracking antenna · modem + gateway · timing reference · core network uplink
- **EDGE / CLOUD**: edge GPU servers · training cluster · object storage · model registry · Kubernetes control plane

**KEY TECHNOLOGIES:** PX4 / ArduPilot · Jetson Orin / AGX · Ouster / Velodyne · mmWave radar · RTK GNSS · 5G modules · Kubernetes · NVIDIA GPUs

**METRICS:** 100–275 TOPS onboard AI compute · <15 W inference power budget · <1 ms time sync · <5 cm RTK pose

**NOTE:** Hardware is where autonomy claims meet physics: endurance, power and time synchronisation set the ceiling for everything above.

---

### Slide 60 — Where computation happens: onboard, edge, cloud, satellite

- **Kicker:** ACT VIII · COMPUTE PLACEMENT
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `computeBands`
- **Subtitle:** Four altitude bands, four latency classes, four different jobs. The placement is derived from the control loop, not from where capacity happens to be cheap.
- **Stage caption:** Satellite · UAV/onboard · edge · cloud, each with its capacity bar and its assigned workloads.

**VISUAL**
Four stacked translucent altitude bands with ring outlines, each labelled with its tier, a capacity bar and its three assigned workloads, pierced by a bidirectional spine.

**3D SCENE**
Bands at y = 30 (satellite), 20 (UAV), 9 (edge), 2 (cloud); 44 × 16 m planes with r=19 rings; capacity bars scaled 0.25–1.0; central spine with up/down packets.

**COMPONENTS**
- 4 bands
- Capacity bars
- Workload labels
- Bidirectional spine

**DATA FLOW**
Requests and data move up and down the spine; each band answers only what its latency class allows.

**ANIMATION**
- Spine packets travel both ways
- Bands glow at intensities proportional to capacity

**TEXT**
Decision inputs and the consequences of each placement.

**TECHNICAL MESSAGE**
Latency and link-loss behaviour decide placement; cost is a secondary consideration.


**LEFT COLUMN — concept / inputs**

- *DECISION INPUTS*
  - Loop deadline (hard vs soft)
  - Data volume vs available bandwidth
  - Power and thermal budget
  - Privacy and data-residency constraints
  - Failure behaviour when the tier is unreachable

**RIGHT COLUMN — outputs / decisions**

- *CONSEQUENCES*
  - Onboard: quantised models, fixed memory, no surprises
  - Edge: shared state, must be replicated per region
  - Cloud: unlimited scale, never in a control loop
  - Satellite: compute is a power decision first

**TECHNICAL DIAGRAM** (`chain` — WORKLOAD PLACEMENT AND WHY)

- ONBOARD — perception · control · local planning — 1–20 ms · must survive link loss
- EDGE — multi-agent fusion · twin slice · RAG cache — 10–50 ms · shared context
- CLOUD — training · massive simulation · LLM reasoning — 0.2–2 s · elastic scale
- SATELLITE — onboard triage · change detection · store-and-forward — power-limited

Note: Rule: if losing the link would break the loop, the loop runs on the vehicle. Everything else is an optimisation.

**KEY TECHNOLOGIES:** TensorRT / INT8 · Triton · KubeEdge / K3s · GPU clusters · store-and-forward protocols · data residency policy

**METRICS:** 1–20 ms onboard · 10–50 ms edge · 0.2–2 s cloud · 200–700 ms via satellite

**NOTE:** Compute placement is a safety architecture decision disguised as an infrastructure decision.

---


## ACT IX · END-TO-END MISSION

### Slide 61 — Earthquake — telecommunication restoration

- **Kicker:** ACT IX · END-TO-END MISSION
- **Layout:** `full`
- **Scene module:** `missionOverview`
- **Subtitle:** One mission, seventeen steps, every layer of the architecture exercised: from a satellite detection to a restored network, a searched district and a retrained model.
- **Stage caption:** T+0 event · T+2m detect · T+5m launch · T+9m link up · T+20m map · T+40m optimise · T+60m restored · after: learn.

**VISUAL**
An arc of eight time-stamped mission milestones rising over a damaged city with a working swarm and a satellite pass.

**3D SCENE**
Milestone rings along a parabolic arc from x=−34 to +34 at y=20–29; Catmull-Rom tube with travelling packets; damaged city below; 8-UAV mesh; translating satellite.

**COMPONENTS**
- 8 milestone nodes
- Timeline tube
- Damaged city
- Working swarm

**DATA FLOW**
Time flows left to right; the packets on the arc make the timeline feel live.

**ANIMATION**
- Packets traverse the arc
- Satellite translates
- Swarm holds a mesh above the city

**TEXT**
Title and timeline only.

**TECHNICAL MESSAGE**
The mission is the proof that the architecture is coherent end to end.


**KEY TECHNOLOGIES:** satellite change detection · NTN backhaul · UAV aerial base stations · LiDAR mapping · digital twin · agentic planning · MARL resource allocation · ground robots

**METRICS:** 17 steps · <10 min first usable link · 60 min to restored coverage · 1 retrained model afterwards

**NOTE:** Everything in this act is a consequence of the architecture in Acts III–V. Nothing new is introduced — it is simply executed.

---

### Slide 62 — An M7.2 earthquake strikes

- **Kicker:** MISSION STEP 1 / 17 · T+0
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":1}`
- **Subtitle:** Ground shaking damages structures across the district. Nothing in the platform has been told anything yet — the physical world has simply changed.

**VISUAL**
Expanding red seismic wave over the damaged city with fires igniting.

**ANIMATION**
- Seismic ring expands and fades every ~3 s
- Fires flicker at 5 Hz

**TECHNICAL MESSAGE**
The world changed; the system does not know yet.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Structural collapse across multiple districts
  - Power distribution partially fails
  - Roads blocked by debris
  - Emergency call volume spikes instantly

**RIGHT COLUMN — outputs / decisions**

- *PLATFORM STATE*
  - No mission active
  - Assets in standby at the staging area
  - Twin holds the pre-event geometry — now stale

**METRICS:** T+0 event · 0 information available · stale twin state

**NOTE:** The starting condition of every autonomy story is ignorance. The measure of the system is how quickly that changes.

---

### Slide 63 — Cellular infrastructure fails

- **Kicker:** MISSION STEP 2 / 17 · T+30s
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":2}`
- **Subtitle:** Base stations lose power and backhaul. Coverage collapses precisely when demand peaks — the classic disaster failure mode.

**VISUAL**
Dead towers with blinking “NO SERVICE” labels; no coverage cones.

**ANIMATION**
- Four NO SERVICE labels blink out of phase

**TECHNICAL MESSAGE**
Loss of infrastructure is the first observable signal.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Four base stations go offline
  - Backhaul fibre severed in two places
  - Surviving cells overload and shed traffic
  - Emergency services lose data connectivity

**RIGHT COLUMN — outputs / decisions**

- *PLATFORM SIGNAL*
  - RAN alarms visible via the operator network feed
  - This is the first machine-readable evidence of the event

**METRICS:** 4 towers down · 0% coverage in the core district · T+30 s first alarm

**NOTE:** The network outage is itself a sensor: its pattern localises the damage before any camera sees it.

---

### Slide 64 — A satellite detects the affected region

- **Kicker:** MISSION STEP 3 / 17 · T+2m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":3}`
- **Subtitle:** The next LEO pass images the district. Change detection against the twin’s pre-event geometry produces a damage map in about 90 seconds.

**VISUAL**
Satellite with a wide ice-blue sensing cone and a bright ground footprint ring over the district; Ka feeder beam to the gateway.

**ANIMATION**
- Footprint ring pulses
- Feeder-beam packets flow to the gateway

**TECHNICAL MESSAGE**
Space provides the first wide-area picture, referenced against the twin.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - LEO pass acquires optical + SAR imagery
  - Onboard triage selects the changed tiles
  - Change detection runs against the twin baseline
  - Damage polygons and confidences downlinked

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L2 sensing (satellite)
  - L4 communication (Ka feeder)
  - L6 digital twin (baseline geometry)
  - L9 AI models (change detection)

**METRICS:** 90 s detection latency · <10 m damage polygon resolution · 1 satellite pass needed

**NOTE:** The twin earns its keep here: without a pre-event baseline, change detection is guesswork.

---

### Slide 65 — The mission agent recognises an emergency

- **Kicker:** MISSION STEP 4 / 17 · T+3m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":4}`
- **Subtitle:** The satellite damage map and the RAN alarm pattern together match a known emergency signature. The mission agent retrieves the relevant playbook, drafts a plan and asks for approval.

**VISUAL**
Violet mission-agent orb above the city with a five-line reasoning-trace panel.

**ANIMATION**
- Orb rings counter-rotate
- Trace panel steady and legible

**TECHNICAL MESSAGE**
Autonomy begins with a cited, approvable plan, not with a takeoff.


**LEFT COLUMN — concept / inputs**

- *AGENT REASONING TRACE*
  - Trigger satellite change map + RAN alarms
  - Classify mass-casualty comms outage
  - Retrieve playbook 4b, NOTAMs, terrain, hospital locations
  - Plan 8-UAV relay lattice + 2 UGV search
  - Request human approval → granted

**RIGHT COLUMN — outputs / decisions**

- *WHY RAG MATTERS HERE* — The plan cites the playbook clause, the active NOTAM and the hospital register. The operator approves in seconds because the basis is visible.

- *HUMAN ROLE* — One decision, one click, fully informed — the target shape of human-in-the-loop.

**METRICS:** <20 s trigger → draft plan · 3 cited sources · 1 human approval

**NOTE:** This is agentic AI doing the job it is actually good at: assembling context into a defensible plan under time pressure.

---

### Slide 66 — The UAV swarm launches

- **Kicker:** MISSION STEP 5 / 17 · T+5m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":5}`
- **Subtitle:** Eight UAVs launch in sequence from the staging area, each with its assigned role in the relay lattice already loaded.

**VISUAL**
Eight UAVs in a low line formation with faint ascent plumes, still below operating altitude.

**ANIMATION**
- Line formation with slight vertical scatter; plumes track each aircraft

**TECHNICAL MESSAGE**
Launch is an orchestration event with roles and reserves pre-assigned.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Pre-flight checks automated per aircraft
  - Roles assigned: 5 relay, 2 mapping, 1 spare
  - Airspace deconfliction against the NOTAM
  - Energy plan computed for a 45-minute sortie

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L3 physical agents
  - L13 orchestration (task queues)
  - L11 physical AI (takeoff + ascent)
  - safety plane (geofence armed before launch)

**METRICS:** 8 aircraft · <120 s all airborne · 45 min planned sortie · 1 spare in the air

**NOTE:** The spare is not optional. Redundancy is planned at launch, not improvised after a failure.

---

### Slide 67 — A temporary communication network is established

- **Kicker:** MISSION STEP 6 / 17 · T+9m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":6}`
- **Subtitle:** The UAVs take station as aerial base stations, backhauled over NTN to the satellite and down to the surviving gateway. Users on the ground reconnect.

**VISUAL**
Swarm at operating altitude with mint coverage cones, mesh links, NTN backhaul to the satellite, and ground users with signal bars.

**ANIMATION**
- Coverage cones breathe
- Packets flow on mesh, backhaul and gateway links
- User signal bars steady green

**TECHNICAL MESSAGE**
A flying network restores service before any ground crew arrives.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - UAVs form a relay lattice with overlapping coverage
  - NTN backhaul established to the satellite
  - Gateway link restored to the core network
  - First user devices attach and pass traffic

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L4 communication (mesh, NTN, access)
  - L5 edge (local core functions)
  - L10 agentic (comms agent owns topology)
  - L13 orchestration (spectrum grants)

**METRICS:** 9 min time to first usable link · >100 Mb/s aggregate capacity · <50 ms edge RTT · n+1 backhaul paths

**NOTE:** This is the mission’s headline promise: usable connectivity in under ten minutes with zero surviving ground infrastructure.

---

### Slide 68 — The swarm maps the disaster zone

- **Kicker:** MISSION STEP 7 / 17 · T+20m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":7}`
- **Subtitle:** While relaying, four aircraft sweep the district with LiDAR and cameras, producing a fresh geometric and semantic map of what has actually collapsed.

**VISUAL**
Four UAVs projecting rotating LiDAR fans with hit points, and a mint wireframe sheet marking the scanned area.

**ANIMATION**
- LiDAR fans rotate at different rates
- Scanned wireframe grows in coverage

**TECHNICAL MESSAGE**
Sensing and relaying are concurrent duties of the same aircraft.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - LiDAR sweeps produce point clouds at 10–20 Hz
  - Semantic segmentation labels rubble, voids, access routes
  - Onboard triage sends summaries, not raw frames
  - Coverage tracked so gaps are visible and closable

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L2 sensing (LiDAR, camera)
  - L5 edge (onboard inference)
  - L7 data (streams + lineage)
  - L9 AI models (segmentation)

**METRICS:** >90% district scanned in 11 min · 10–20 Hz LiDAR rate · >10:1 onboard data reduction

**NOTE:** The aircraft relay and map at the same time. Multi-role assets are what make a small fleet sufficient.

---

### Slide 69 — The digital twin updates

- **Kicker:** MISSION STEP 8 / 17 · T+22m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":8}`
- **Subtitle:** New geometry, blocked roads, collapsed structures and the current radio environment are written into the twin. Every planner from this point onward reasons about the post-event world.

**VISUAL**
Mint twin city appearing beside the real one, connected by a data beam, bounded by a wireframe volume.

**ANIMATION**
- Beam packets flow from the fleet to the twin
- Twin lights up as it synchronises

**TECHNICAL MESSAGE**
The twin is refreshed mid-mission and becomes the planning substrate.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Geometry deltas merged into the twin
  - Road network re-derived from observed blockages
  - Radio propagation recomputed on the new geometry
  - Twin age published as telemetry (140 ms)

**RIGHT COLUMN — outputs / decisions**

- *CONSEQUENCE*
  - Coverage predictions become accurate again
  - Ground routes for robots become plannable
  - Rehearsal of the next hour becomes possible

**METRICS:** 140 ms twin sync age · <1 m geometry error · <3 dB radio model error

**NOTE:** A twin that updates during the mission is the difference between planning on reality and planning on memory.

---

### Slide 70 — The AI identifies priority areas

- **Kicker:** MISSION STEP 9 / 17 · T+26m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":9}`
- **Subtitle:** Damage severity, population density, hospital locations, detected calls and access difficulty are fused into a ranked priority map.

**VISUAL**
Three pulsing coloured priority discs over the city, labelled hospital / shelter / district.

**ANIMATION**
- Discs pulse at different phases
- Labels remain legible during camera drift

**TECHNICAL MESSAGE**
Ranked, justified priorities — not undifferentiated “coverage”.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Priority 1: hospital district — life-critical connectivity
  - Priority 2: shelter zone — high population, low coverage
  - Priority 3: outer district — monitored, lower urgency
  - Each zone carries a justification the operator can inspect

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L8 RAG (hospital register, protocols)
  - L9 models (demand + damage fusion)
  - L10 agentic (mission planner re-ranks tasks)
  - L14 human (confirms the ordering)

**METRICS:** 3 priority tiers · <5 s priority map computation · 100% zones with a cited justification

**NOTE:** Prioritisation is the most ethically loaded step in the mission, which is exactly why it is explained and human-confirmed.

---

### Slide 71 — Communication resources are optimised

- **Kicker:** MISSION STEP 10 / 17 · T+40m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":10}`
- **Subtitle:** The learned MARL policy reallocates trajectories, power, channels and altitudes; a dedicated relay UAV is repositioned to reach a district shadowed by rubble.

**VISUAL**
A dedicated relay UAV hovering at the canyon edge, beaming a violet link into the shadowed district, plus three live gauges (throughput, coverage, fairness).

**ANIMATION**
- Relay UAV bobs on station, rotors spinning
- Gauges climb and hold
- Relay beam packets flow toward users

**TECHNICAL MESSAGE**
Learned joint policies outperform hand-tuned allocation under coupling.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Trajectories shifted toward priority zones
  - Transmit power and channels reallocated
  - Altitudes traded off: coverage vs path loss
  - A dedicated relay UAV re-tasked to cover a blocked street canyon

**RIGHT COLUMN — outputs / decisions**

- *RESULT*
  - `throughput` +86% vs initial lattice
  - `priority coverage` 92%
  - `fairness` 0.78 Jain index
  - `energy` within sortie plan

**METRICS:** +86% throughput · 92% priority coverage · <2 s reallocation decision · 1 relay UAV repositioned

**NOTE:** This is where multi-agent reinforcement learning pays for itself: the coupling between agents is real and the search space is too large for hand-tuning.

---

### Slide 72 — Ground robots assist the search

- **Kicker:** MISSION STEP 11 / 17 · T+45m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":11}`
- **Subtitle:** Three UGVs enter the rubble field where UAVs cannot see, guided by the twin’s route graph, carrying thermal, acoustic and RF-beacon sensing.

**VISUAL**
Three ground robots with sweeping LiDAR fans moving through the rubble, and a pulsing amber “SURVIVOR SIGNAL” marker.

**ANIMATION**
- Robots traverse laterally
- LiDAR fans sweep
- Survivor label pulses at 3 Hz

**TECHNICAL MESSAGE**
Cross-domain teaming turns partial sensing into actionable findings.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Robots routed on the twin’s post-event road graph
  - Thermal + acoustic + RF beacon fusion for detection
  - Findings geo-tagged and pushed to responders
  - UAVs relay the robots’ links out of the rubble

**RIGHT COLUMN — outputs / decisions**

- *LAYERS EXERCISED*
  - L3 agents (UGV)
  - L6 twin (route graph)
  - L9 models (multimodal detection)
  - L4 comms (UAV relaying for UGV)

**METRICS:** 3 UGVs deployed · <2 m detection localisation · 100% findings geo-tagged

**NOTE:** Air and ground are complementary, not competing: the UAV sees the district, the robot reaches the void.

---

### Slide 73 — Operators monitor and decide

- **Kicker:** MISSION STEP 12 / 17 · T+48m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":12}`
- **Subtitle:** The operations room sees mission status, the AI’s reasoning and a short queue of decisions that genuinely require human authority.

**VISUAL**
Two amber operator panels above the operating city: mission status and human decisions.

**ANIMATION**
- Panels steady; the scene below continues to operate

**TECHNICAL MESSAGE**
Human attention is a scarce resource the architecture is designed to conserve.


**LEFT COLUMN — concept / inputs**

- *ON THE WALLS*
  - Mission status: coverage 92%, 9/9 assets nominal, twin age 140 ms
  - Decision queue: restricted-zone entry, priority confirmation, night operations authorisation
  - AI accountability: model version, confidence, available explanations

**RIGHT COLUMN — outputs / decisions**

- *INTERVENTION BUDGET*
  - `target` < 0.1 interventions per UAV-hour
  - `this mission` 2 interventions in 48 min
  - `both` policy-required approvals, not corrections

**METRICS:** 2 human decisions so far · <5 s alert → informed decision · 0 manual flying

**NOTE:** Humans are spending their attention on authority questions, not on flying aircraft or reading raw video.

---

### Slide 74 — The AI adapts to a failure

- **Kicker:** MISSION STEP 13 / 17 · T+52m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":13}`
- **Subtitle:** UAV-06 reports a propulsion fault, descends under its own safe policy, and the swarm redistributes its coverage in 1.4 seconds — with no human input.

**VISUAL**
One UAV descending with a red fault label while the rest of the swarm closes the gap.

**ANIMATION**
- Failed aircraft descends and wobbles slightly
- Replan link from the mission agent pulses
- Remaining swarm re-forms its mesh

**TECHNICAL MESSAGE**
A single-asset failure is absorbed by design, not escalated to a human.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Onboard monitor detects the fault and enters SAFE mode
  - Aircraft descends to a pre-selected landing site
  - Fleet manager reassigns its coverage role to the spare
  - Comms agent re-optimises the remaining lattice

**RIGHT COLUMN — outputs / decisions**

- *WHY IT WORKS*
  - The spare was already airborne (step 5)
  - The MARL policy was trained with agent dropout
  - Coverage degradation was bounded by design
  - The whole event is logged as evidence and training data

**METRICS:** 1.4 s detect → reallocate · <4% coverage dip · 0 human interventions · 1 safe landing

**NOTE:** Robustness is not an emergent property. It was trained for in P6 and validated in P8, which is why it appears here as a non-event.

---

### Slide 75 — Network coverage is restored

- **Kicker:** MISSION STEP 14 / 17 · T+60m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":14}`
- **Subtitle:** Ninety-two per cent of the priority grid has usable service. Emergency services are operating on data links that did not exist an hour ago.

**VISUAL**
Coverage disc glowing mint over the city, towers relit, traffic moving again, swarm holding station.

**ANIMATION**
- Coverage disc breathes gently
- City lights shift from ember to cyan
- Vehicles reappear on the road grid

**TECHNICAL MESSAGE**
Measured restoration, with residual gaps stated explicitly.


**LEFT COLUMN — concept / inputs**

- *ACHIEVED*
  - 92% priority-grid coverage
  - Voice and data for responders and civilians
  - Live damage map shared with all agencies
  - Search findings continuously updated

**RIGHT COLUMN — outputs / decisions**

- *STILL DEGRADED*
  - Outer districts monitored, not covered
  - Capacity below pre-event levels
  - Battery rotations required every ~40 minutes

**METRICS:** 92% priority coverage · 60 min from event to restored · 0 safety events · 9 assets operating

**NOTE:** An honest slide states what is still degraded. Overclaiming is how autonomy programmes lose the trust they need.

---

### Slide 76 — The mission ends

- **Kicker:** MISSION STEP 15 / 17 · T+95m
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":15}`
- **Subtitle:** Terrestrial crews restore the first fixed base station. The swarm hands over, returns to the staging area and the mission is formally closed.

**VISUAL**
Swarm converging back toward the staging area, coverage still active beneath them.

**ANIMATION**
- UAVs drift toward the recovery point
- Coverage disc remains until the last aircraft lands

**TECHNICAL MESSAGE**
Controlled handover and recovery are part of the mission, not an afterthought.


**LEFT COLUMN — concept / inputs**

- *WHAT HAPPENS*
  - Handover of served users to the restored terrestrial cell
  - Aircraft return in sequence, energy-reserve respecting
  - Robots recovered, sensors safed
  - Mission closure checklist executed automatically

**RIGHT COLUMN — outputs / decisions**

- *HANDOVER RULE* — The aerial network does not switch off — it withdraws only as terrestrial capacity comes back, cell by cell.

**METRICS:** 0 dropped sessions at handover · 100% assets recovered · 95 min total mission duration

**NOTE:** The withdrawal is as engineered as the deployment; that is what makes the capability usable by real operators.

---

### Slide 77 — All data is stored, with lineage

- **Kicker:** MISSION STEP 16 / 17 · T+2h
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":16}`
- **Subtitle:** Every frame, point cloud, radio measurement, decision and human action is archived in a form that allows the entire mission to be replayed bit-exactly.

**VISUAL**
A glowing archive cylinder receiving a wide data beam from the fleet.

**ANIMATION**
- Dense packet flow into the archive
- Archive glow intensifies

**TECHNICAL MESSAGE**
The mission record is an engineering asset, not an obligation.


**LEFT COLUMN — concept / inputs**

- *WHAT IS STORED*
  - Raw and summarised sensor data with time + pose
  - All agent decisions with their inputs and cited sources
  - Model versions running on every asset
  - Human approvals, interventions and their timing
  - Network measurements and achieved KPIs

**RIGHT COLUMN — outputs / decisions**

- *WHY IT MATTERS*
  - Regulatory evidence for the next authorisation
  - Root-cause analysis of the UAV-06 fault
  - Training data for the next policy version
  - A permanent regression scenario built from a real event

**METRICS:** bit-exact replay · 100% decisions traceable · 1 new regression scenario · <2 h archive complete

**NOTE:** A mission that cannot be replayed cannot be certified, explained or learned from. Storage is a safety feature.

---

### Slide 78 — The models learn from the mission

- **Kicker:** MISSION STEP 17 / 17 · AFTER
- **Layout:** `standard`
- **Scene module:** `mission` `{"step":17}`
- **Subtitle:** Hard cases are mined first, candidates are retrained, the full validation stack is re-run, and an improved policy is rolled out as a canary to the fleet.

**VISUAL**
GPU cluster receiving the archive and sending an improved policy back to the fleet.

**ANIMATION**
- Archive → cluster packets, then cluster → fleet policy beam
- Fleet continues operating below

**TECHNICAL MESSAGE**
Every mission compounds into the platform’s permanent capability.


**LEFT COLUMN — concept / inputs**

- *WHAT IS LEARNED*
  - Collapse patterns the segmentation model got wrong
  - Channel behaviour in the rubble-shadowed canyon
  - The UAV-06 fault signature, for earlier detection
  - A better initial lattice for this city’s geometry

**RIGHT COLUMN — outputs / decisions**

- *GATES BEFORE IT FLIES AGAIN*
  - Massive simulation regression (P7)
  - Fault-injection campaign (P8)
  - Hardware-in-the-loop (P9)
  - Canary on two aircraft before fleet-wide rollout

**METRICS:** <24 h mission → candidate model · 4 gates before deployment · 2 canary aircraft · <60 s rollback if needed

**NOTE:** This is the step that turns a successful mission into a permanently better platform — and it is the step that makes the next mission cheaper.

---

### Slide 79 — What the mission actually delivered

- **Kicker:** ACT IX · MISSION RESULT
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `kpiWall` `{"caption":"MISSION KPI SUMMARY","gauges":[{"label":"priority coverage","value":0.92,"color":"#6ef2c0"},{"label":"link uptime","value":0.97,"color":"#35e0ff"},{"label":"autonomy","value":0.96,"color":"#b07bff"},{"label":"energy margin","value":0.31,"color":"#ffb347"}]}`
- **Subtitle:** The numbers that matter to an operator, an agency and an investor — plus the honest list of what remained degraded.

**VISUAL**
Four mission-result gauges over a working city, with a six-cell scorecard beneath.

**COMPONENTS**
- Coverage / uptime / autonomy / energy gauges
- Scorecard chain

**ANIMATION**
- Gauges settle near their final values with small live oscillation

**TEXT**
Delivered vs still degraded, plus the next iteration.

**TECHNICAL MESSAGE**
Report the numbers, including the ones that are not flattering.


**LEFT COLUMN — concept / inputs**

- *DELIVERED*
  - Connectivity for responders in under 10 minutes
  - A fresh, shared damage map within 22 minutes
  - Three survivor locations passed to ground teams
  - A complete, replayable evidence record

**RIGHT COLUMN — outputs / decisions**

- *STILL DEGRADED*
  - Outer districts monitored only
  - Capacity below pre-event levels
  - 40-minute battery rotation cycle
  - Night operations required a separate authorisation

- *NEXT ITERATION* — Longer-endurance airframes, a pre-built twin for every served city, and an initial lattice learned per city geometry.

**TECHNICAL DIAGRAM** (`chain` — MISSION SCORECARD)

- 9 min — time to first usable link (target <10)
- 92% — priority-grid coverage (target >90%)
- 2 — human decisions in 95 min
- 1.4 s — failure → reallocation
- 0 — safety events
- 31% — energy margin at closure

**METRICS:** 9 min first link · 92% priority coverage · 2 human decisions · 0 safety events

**NOTE:** Autonomy claims are only worth what their measurement discipline is worth. Publish the gaps with the wins.

---


## ACT X · GLOBAL USE CASES

### Slide 80 — Disaster response

- **Kicker:** USE CASE 1 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"disaster"}`
- **Subtitle:** The sharpest case: no infrastructure, no map, no time. Space provides the picture, air provides the network, ground provides the reach.

**VISUAL**
Damaged city with a working swarm, three ground robots and a satellite overhead.

**ANIMATION**
- Swarm mesh reconfigures; robots traverse the rubble

**TECHNICAL MESSAGE**
Cross-domain autonomy converts a blackout into a managed operation.


**LEFT COLUMN — concept / inputs**

- *WHY THE PLATFORM WINS*
  - One system covers detection, comms, mapping and search
  - Works with zero surviving ground infrastructure
  - Every decision is logged for the post-event inquiry

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - National disaster agencies
  - Telecom operators with resilience mandates
  - Civil protection and military support units

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — infrastructure destroyed, situational awareness zero, minutes matter
- AI DECISION — classify event, rank priority zones, allocate relay + search roles
- PHYSICAL ACTION — UAV relay lattice + LiDAR mapping + UGV search in rubble
- RESULT — usable network in <10 min, live damage map, survivors located

**METRICS:** <10 min to first link · 92% priority coverage · 3 domains coordinated

**NOTE:** Disaster response is the proving ground: if the architecture works here, the commercial cases are easier versions of the same problem.

---

### Slide 81 — Telecommunications — coverage on demand

- **Kicker:** USE CASE 2 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"telecom"}`
- **Subtitle:** Aerial base stations turn coverage into something that can be deployed in minutes and moved as demand moves.

**VISUAL**
City with one dead tower, an aerial base station with a wide mint coverage cone, and connected users.

**ANIMATION**
- Coverage cone breathes; user signal bars light up as they attach

**TECHNICAL MESSAGE**
Coverage becomes a deployable, steerable resource.


**LEFT COLUMN — concept / inputs**

- *WHY NOW*
  - 3GPP NTN makes non-terrestrial access standard, not exotic
  - UAV relays make shadowed streets recoverable without new sites
  - Operators are measured on resilience, not just peak speed

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Mobile network operators
  - Neutral-host and tower companies
  - Event and industrial private-network providers

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — cell outage, event-driven demand spikes, shadowed streets, rural gaps
- AI DECISION — predict demand and channel quality, choose station altitude, power and channels
- PHYSICAL ACTION — UAV takes station as an aerial base station; relays re-task as demand moves
- RESULT — coverage and capacity restored, users served, SLA maintained

**METRICS:** minutes to deploy coverage · >100 Mb/s aggregate capacity · +86% throughput after optimisation

**NOTE:** This is the most direct commercial path: the same platform, sold as coverage-as-a-service.

---

### Slide 82 — Agriculture — decisions per square metre

- **Kicker:** USE CASE 3 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"agriculture"}`
- **Subtitle:** Satellite for the field, UAV for the plant, robot for the action — with the twin holding the crop history that makes each intervention justifiable.

**VISUAL**
Grid of crop plots colour-coded by health, a UAV flying a survey lawnmower pattern with a green sensing cone, and a ground robot treating a strip.

**ANIMATION**
- UAV follows the survey path; robot traverses the rows

**TECHNICAL MESSAGE**
Per-square-metre decisions, executed by the right machine.


**LEFT COLUMN — concept / inputs**

- *PLATFORM REUSE*
  - Same sensing and twin stack, different payload and policy
  - Satellite revisit for field scale, UAV for plant scale
  - Traceability satisfies food-safety and subsidy audits

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Large-scale growers and cooperatives
  - Agrochemical and equipment manufacturers
  - Government agricultural agencies

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — stress, disease and irrigation faults are found too late and treated uniformly
- AI DECISION — fuse multispectral + weather + history; localise stress; choose treatment
- PHYSICAL ACTION — UAV surveys and targets; ground robot treats only the affected rows
- RESULT — yield protected, input use and cost down, full treatment audit trail

**METRICS:** cm-scale intervention resolution · −30–60% input use (targeted vs uniform) · days → hours detection latency

**NOTE:** Agriculture is where the economics of autonomy are easiest to prove: inputs saved are directly measurable.

---

### Slide 83 — Logistics — air and ground last mile

- **Kicker:** USE CASE 4 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"logistics"}`
- **Subtitle:** One planner allocates parcels across UAVs and autonomous vehicles based on weight, distance, weather, airspace and energy.

**VISUAL**
A fulfilment hub with stacked parcels, four UAVs on curved delivery arcs to landing pads, and an autonomous van on the road grid.

**ANIMATION**
- UAVs traverse their delivery arcs; van drives the loop

**TECHNICAL MESSAGE**
Last mile is a joint air/ground allocation problem.


**LEFT COLUMN — concept / inputs**

- *WHAT IS HARD*
  - Airspace authorisation, not aerodynamics
  - Energy planning with wind and payload coupling
  - Handover between air and ground modes
  - Recharging as a scheduled resource

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Logistics and courier operators
  - Hospital and laboratory networks
  - Island and remote-community services

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — last-mile cost dominates, terrain and traffic break schedules, demand is spiky
- AI DECISION — joint air/ground assignment under weather, airspace and energy constraints
- PHYSICAL ACTION — UAVs fly light urgent parcels; autonomous vans carry the heavy tail
- RESULT — delivery time and cost reduced, schedule robust to traffic and weather

**METRICS:** air+ground joint optimisation · −20–40% last-mile cost in favourable geographies · minutes urgent medical delivery

**NOTE:** The interesting problem is allocation across modes, not the drone itself — which is exactly what this platform is built for.

---

### Slide 84 — Infrastructure inspection

- **Kicker:** USE CASE 5 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"inspection"}`
- **Subtitle:** Power lines, pipelines, bridges, railways and wind farms surveyed autonomously, with defect history in the twin instead of in an engineer’s notebook.

**VISUAL**
Five pylons with catenary conductors, a UAV flying a closed inspection circuit with a camera frustum, and a pulsing hotspot warning.

**ANIMATION**
- UAV traverses the corridor loop; hotspot label pulses

**TECHNICAL MESSAGE**
Autonomous inspection produces comparable time series, not photographs.


**LEFT COLUMN — concept / inputs**

- *WHY REPEATABILITY MATTERS*
  - The signal is the change between surveys, not one image
  - Same trajectory + same twin frame = comparable data
  - Trend data enables predictive maintenance, not just reporting

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Transmission and distribution utilities
  - Oil, gas and water pipeline operators
  - Rail and highway authorities
  - Wind farm operators

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — manual inspection is slow, dangerous, inconsistent and rarely repeatable
- AI DECISION — plan the corridor, detect anomalies, compare against previous surveys
- PHYSICAL ACTION — UAV flies a repeatable corridor with camera, thermal and LiDAR payloads
- RESULT — defects ranked by severity and trend, maintenance scheduled before failure

**METRICS:** cm-level defect localisation · repeatable trajectory-to-trajectory comparison · −50%+ inspection cost vs manual crews

**NOTE:** The value is a time series of a physical asset. That is a data-platform problem with a flying sensor attached.

---

### Slide 85 — Search and rescue

- **Kicker:** USE CASE 6 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"sar"}`
- **Subtitle:** Wide-area thermal and RF search over terrain that ground teams cannot cover, with detections localised well enough to act on.

**VISUAL**
Mountain terrain with a six-UAV mesh, alternating thermal/visual sensing cones, three pulsing detection markers and a robot climbing toward one.

**ANIMATION**
- Detection markers bob and pulse; robot advances

**TECHNICAL MESSAGE**
Wide-area autonomous search with confirmation before human dispatch.


**LEFT COLUMN — concept / inputs**

- *SENSOR FUSION*
  - Thermal for bodies, RF for phones and beacons
  - Acoustic for calls in voids
  - Terrain-aware coverage planning (shadowed valleys first)
  - False-positive suppression before a team is dispatched

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Mountain rescue and coastguard services
  - Civil protection agencies
  - Military SAR units

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — search areas are enormous, terrain is hostile, survival windows are short
- AI DECISION — plan coverage under terrain and weather; fuse thermal, acoustic and RF cues
- PHYSICAL ACTION — UAV swarm sweeps assigned sectors; UGV investigates confirmed hits
- RESULT — search time collapsed, detections localised to a few metres, teams directed

**METRICS:** <2 m detection localisation · hours → minutes sector search time · multi-sensor confirmation before dispatch

**NOTE:** The metric that matters is not detections but confirmed detections per team-hour spent.

---

### Slide 86 — Smart cities

- **Kicker:** USE CASE 7 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"smartcity"}`
- **Subtitle:** Traffic, energy, safety and environmental monitoring treated as one control problem over a live city twin.

**VISUAL**
Dense city with moving traffic, 22 pulsing IoT sensor nodes, a four-UAV patrol and live towers.

**ANIMATION**
- Traffic flows; sensors pulse; patrol orbits

**TECHNICAL MESSAGE**
City-scale coordination on a shared twin with privacy-preserving learning.


**LEFT COLUMN — concept / inputs**

- *WHAT IS DIFFERENT HERE*
  - The twin already exists — the city is the customer
  - Privacy is the primary constraint, not bandwidth
  - Aerial assets fill the gaps fixed sensors leave

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Municipal governments
  - Utilities and transport authorities
  - Public safety agencies

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — city subsystems are instrumented separately and optimised against each other
- AI DECISION — fuse fixed sensors, vehicles and aerial survey into one twin; predict and coordinate
- PHYSICAL ACTION — signal timing, patrol routing, aerial survey and maintenance dispatch
- RESULT — congestion, response times and energy waste reduced measurably

**METRICS:** one twin multiple departments · federated learning to preserve privacy · <5 min map freshness

**NOTE:** Smart-city projects fail on integration and privacy. This architecture addresses both structurally: one twin, federated learning.

---

### Slide 87 — Maritime monitoring

- **Kicker:** USE CASE 8 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"maritime"}`
- **Subtitle:** Satellite SAR plus AIS plus aerial verification: detect vessels that do not want to be detected, over areas no patrol can cover.

**VISUAL**
Open sea with a swell wireframe, three vessels (one flagged “AIS DARK VESSEL”), a patrolling UAV with a sensing cone and a satellite with a SAR detection link.

**ANIMATION**
- Vessels traverse; swell rolls; UAV orbits the area of interest

**TECHNICAL MESSAGE**
Satellite detection plus aerial verification beats patrol coverage.


**LEFT COLUMN — concept / inputs**

- *FUSION LOGIC*
  - SAR sees hulls regardless of cooperation
  - AIS says who is declaring themselves
  - A detection without a track is the interesting object
  - Aerial verification converts suspicion into evidence

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Coastguards and fisheries agencies
  - Port authorities
  - Environmental protection bodies
  - Naval forces

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — vast areas, sparse patrols, AIS can simply be switched off
- AI DECISION — correlate SAR detections with AIS tracks; flag unmatched vessels; task verification
- PHYSICAL ACTION — UAV or vessel dispatched to verify the highest-confidence anomaly
- RESULT — dark vessels identified, illegal activity evidenced, patrols used efficiently

**METRICS:** km²-scale coverage per satellite pass · SAR+AIS correlation for dark-vessel detection · hours → minutes anomaly to verification tasking

**NOTE:** This use case is almost pure data fusion — the physical assets exist only to verify what the fusion already suspects.

---

### Slide 88 — Industrial automation

- **Kicker:** USE CASE 9 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"industrial"}`
- **Subtitle:** Continuous autonomous inspection inside plants, refineries and yards, where the same rounds are walked by people today.

**VISUAL**
Plant with six tanks (one showing a thermal anomaly), pipe runs, a UAV orbiting above and a robot patrolling at ground level.

**ANIMATION**
- Anomaly label pulses; UAV and robot follow independent routes

**TECHNICAL MESSAGE**
Continuous autonomous inspection inside GPS-denied industrial environments.


**LEFT COLUMN — concept / inputs**

- *CONSTRAINTS*
  - GPS-denied and cluttered interiors
  - Explosive-atmosphere zoning restrictions
  - Fixed asset registers that must be matched exactly
  - Existing SCADA systems that must be integrated, not replaced

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Refineries and chemical plants
  - Mines and steelworks
  - Ports, yards and large warehouses
  - Power generation sites

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — manual rounds are infrequent, inconsistent and sometimes hazardous
- AI DECISION — schedule rounds, detect thermal/gas/vibration anomalies, predict failures
- PHYSICAL ACTION — UAV flies the elevated route; UGV covers ground level and confined areas
- RESULT — earlier fault detection, fewer human entries into hazardous zones

**METRICS:** continuous vs periodic rounds · GPS-denied navigation required · −human entries into hazardous zones

**NOTE:** Industrial sites are where GPS-denied autonomy and asset-register discipline matter more than range or speed.

---

### Slide 89 — Defence and security

- **Kicker:** USE CASE 10 / 10
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `useCase` `{"variant":"defense"}`
- **Subtitle:** Persistent ISR across a monitored boundary, with detection and classification automated and every action requiring human authority.

**VISUAL**
Boundary line with posts, unattended ground sensors, a five-UAV high-altitude mesh with wide sensing cones and a flagged track requiring human decision.

**ANIMATION**
- Sensors pulse; track label pulses; satellite links dashed

**TECHNICAL MESSAGE**
Persistent ISR with automated classification and mandatory human authority.


**LEFT COLUMN — concept / inputs**

- *NON-NEGOTIABLE CONSTRAINTS*
  - Human authorisation required for any action against a track
  - Full audit trail of every automated classification
  - Operation under jamming and degraded GNSS
  - Data residency and classification handling

**RIGHT COLUMN — outputs / decisions**

- *BUYER*
  - Border and infrastructure security agencies
  - Defence ISR programmes
  - Critical national infrastructure operators

**TECHNICAL DIAGRAM** (`chain` — PROBLEM → AI DECISION → PHYSICAL ACTION → RESULT)

- PROBLEM — long boundaries, sparse sensors, alert fatigue, contested communications
- AI DECISION — fuse ground sensors, aerial and satellite data; classify and rank tracks
- PHYSICAL ACTION — aerial assets re-task to verify; findings escalated to a human decision
- RESULT — higher detection confidence, fewer false alarms, human authority preserved

**METRICS:** persistent coverage vs periodic patrol · 100% actions human-authorised · contested comms and GNSS assumed

**NOTE:** The platform is explicitly a sensing, communication and decision-support infrastructure. Authority over any use of force stays with humans, by architecture.

---


## ACT XI · TECHNOLOGY, GOVERNANCE & CLOSE

### Slide 90 — The complete technology ecosystem

- **Kicker:** ACT XI · TECHNOLOGY MAP
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `toolConstellation`
- **Subtitle:** Six families, explicit primary choices, and no magic. Everything here either exists today or is an active standards track.

**VISUAL**
Technology constellation in 3D above a six-column technology matrix.

**3D SCENE**
Six hubs on a ring of radius 13 with ~30 tool nodes at radius 19–22, all beamed to a central platform orb.

**COMPONENTS**
- 6 family hubs
- 30+ tool nodes
- Platform core

**DATA FLOW**
Core → families: the shared contracts. Families → core: capabilities.

**ANIMATION**
- Core rings rotate, beams carry packets outward

**TEXT**
Primary choices, explicit non-scope, and exit paths.

**TECHNICAL MESSAGE**
Standard, provable components — integrated by architecture rather than by adapters.


**LEFT COLUMN — concept / inputs**

- *PRIMARY CHOICES*
  - Simulation Isaac Sim + Isaac Lab on OpenUSD
  - Robotics ROS 2 + PX4
  - AI PyTorch + CUDA + TensorRT
  - Comms 3GPP NTN + Sionna for modelling
  - Infra Kubernetes everywhere, GPU-first

**RIGHT COLUMN — outputs / decisions**

- *DELIBERATELY NOT IN SCOPE*
  - Custom silicon
  - Proprietary middleware replacing ROS 2
  - A single monolithic “do everything” model
  - Any autonomous use of force

- *EXIT PATHS* — Each primary choice has a documented replacement path — the interfaces from Phase 1 are what make that possible.

**TECHNICAL DIAGRAM** (`matrix` — TECHNOLOGY MAP BY FAMILY)

- **SIMULATION**: Omniverse / OpenUSD · Isaac Sim · Isaac Lab · SUMO (traffic) · STK (orbits) · QGIS (geospatial)
- **ROBOTICS**: ROS 2 (middleware) · PX4 (flight control) · MAVLink · ros2_control · Nav2 / MoveIt
- **AI**: PyTorch · CUDA / TensorRT · LLMs · VLMs · RL · MARL · Federated learning · RAG · vector DB · KG
- **COMMUNICATION**: 5G NR · 6G candidates · 3GPP NTN Rel-17/18 · mmWave · FSO / optical ISL · O-RAN · NVIDIA Sionna
- **INFRASTRUCTURE**: Kubernetes / K3s · GPU clusters · Edge servers · Object storage · Model registry · GitOps
- **DATA**: GIS / OSM / GeoJSON · Telemetry (MCAP) · Sensor data (LiDAR, RGB, RF) · Satellite products · Parquet / Delta

**KEY TECHNOLOGIES:** Omniverse · Isaac Sim/Lab · ROS 2 · PX4 · PyTorch · CUDA · Sionna · NTN · Kubernetes · GIS

**METRICS:** 6 technology families · ~35 named components · 0 unproven dependencies

**NOTE:** The differentiator is not the tool list — it is that these tools share one world model, one data platform and one deployment path.

---

### Slide 91 — Regulation, ethics and assurance are part of the architecture

- **Kicker:** ACT XI · GOVERNANCE
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `backdrop` `{"variant":"orbit","cam":[0,10,34]}`
- **Subtitle:** An autonomy platform that cannot produce evidence cannot be authorised. Compliance is therefore designed into the data platform, the safety plane and the agent layer — not added afterwards.

**VISUAL**
Quiet orbital backdrop (Earth and constellation) so the evidence-chain diagram is the focus.

**COMPONENTS**
- Evidence chain: requirements → safety concept → verification → operations → authorisation
- Four cross-cutting governance blocks

**ANIMATION**
- Backdrop only: Earth rotates, satellites orbit. No motion competing with the diagram.

**TEXT**
What regulators ask for, mapped one-to-one onto architectural answers.

**TECHNICAL MESSAGE**
Assurance is an architectural property, and it is what converts capability into permission to operate.


**LEFT COLUMN — concept / inputs**

- *WHAT REGULATORS ASK FOR*
  - What can go wrong, and what stops it
  - How you know it works (evidence, not opinion)
  - What happens when the AI is wrong
  - Who is responsible for each decision
  - How you will notice degradation in service

**RIGHT COLUMN — outputs / decisions**

- *HOW THE ARCHITECTURE ANSWERS*
  - Safety plane independent of the learning plane
  - Nine-level validation with recorded evidence
  - Degradation ladder with classical fallbacks
  - Per-decision traces bound to model versions
  - Fleet monitoring with automatic rollback

- *ETHICAL POSITION* — Human authority over consequential action is architectural, not procedural: the fleet manager will not execute an unauthorised class of action even if an agent requests it.

**TECHNICAL DIAGRAM** (`graph` — EVIDENCE CHAIN FROM DESIGN TO AUTHORISATION)

- `r` Requirements + hazards — P0 / P1 artefacts
- `s` Safety concept — planes, modes, monitors
- `v` Verification evidence — L1–L9 test records
- `o` Operational record — replayable missions
- `a` Authorisation — regulator decision
- `p` Privacy & data protection — federated learning, minimisation, residency
- `e` Ethical constraints — human authority, no autonomous force
- `x` Explainability — cited decisions, traces, counterfactuals
- `c` Continuous assurance — per release

Edges: r→s, s→v, v→o, o→a, p→v, e→v, x→o, c→a

**KEY TECHNOLOGIES:** ISO/IEC standards for AI management · aviation airworthiness processes · GDPR-style data minimisation · audit logging · model cards · incident reporting

**METRICS:** 100% decisions attributable · per release assurance evidence · 0 autonomous use-of-force · <60 s rollback on regression

**NOTE:** Every claim in this deck is designed to be defensible in front of a regulator, an auditor or an inquiry.

---

### Slide 92 — Capability milestones, not calendar promises

- **Kicker:** ACT XI · SCALE-UP
- **Layout:** `standard` (3D + diagram)
- **Scene module:** `backdrop` `{"variant":"swarm","cam":[0,16,44]}`
- **Subtitle:** Each milestone is defined by demonstrated capability and evidence, with an explicit gate. Programmes fail when milestones are dates instead of proofs.

**VISUAL**
A live swarm backdrop under a seven-rung capability ladder diagram.

**COMPONENTS**
- 7 milestone rungs with gates
- Critical-path and risk lists

**ANIMATION**
- Backdrop swarm only — the diagram carries the content.

**TEXT**
Gate requirements, parallel work, critical path, and the four biggest risks with mitigations.

**TECHNICAL MESSAGE**
Milestones are proofs, and the critical path is a chain of evidence dependencies.


**LEFT COLUMN — concept / inputs**

- *WHAT EACH GATE REQUIRES*
  - A measurable claim
  - Recorded evidence, reproducible
  - An independent reviewer
  - A documented residual risk list

- *PARALLELISABLE WORK*
  - Twin construction and data collection
  - Agent development and safety-plane implementation
  - Regulatory engagement (starts at M1, not M6)

**RIGHT COLUMN — outputs / decisions**

- *CRITICAL PATH*
  - Twin fidelity → everything trained on it
  - Safety plane → everything allowed to fly
  - Interface contracts → everything that must integrate
  - Regulatory relationship → everything that must operate

- *BIGGEST RISKS*
  - Twin fidelity overestimated (mitigated by measured gap at M3)
  - Tool sprawl (mitigated by primary-choice discipline)
  - Safety plane treated as a feature (mitigated by plane separation)
  - Data without lineage (mitigated at P2 by design)

**TECHNICAL DIAGRAM** (`stack` — CAPABILITY LADDER · EACH RUNG IS A GATE)

- M1 · One asset, one twin, one mission in simulation — twin validated, single-agent policy beats baseline
- M2 · Hardware-in-the-loop parity — real firmware meets rate and jitter budgets
- M3 · Controlled flight, measured gap — sim-to-real gap < 15% on mission metrics
- M4 · Multi-agent swarm with learned coordination — MARL policy beats heuristic, survives agent loss
- M5 · Cross-domain mission (satellite + air + ground) — detection-to-tasking under 2 s across domains
- M6 · Pilot deployment with real users — KPIs met, interventions < 0.1 / UAV-hour
- M7 · Multi-region operation with continual learning — automated retrain → validate → canary loop

**KEY TECHNOLOGIES:** capability-based gating · independent review · residual risk registers · regulatory pre-engagement

**METRICS:** 7 capability milestones · 1 gate per milestone · 4 critical-path dependencies

**NOTE:** Sequencing is driven by evidence dependencies: nothing is scheduled that cannot be proven when it is claimed.

---

### Slide 93 — One system: space, air, ground, edge, cloud, twin, agents

- **Kicker:** ACT XI · FINAL MASTER VISUAL
- **Layout:** `full`
- **Scene module:** `finalMaster`
- **Subtitle:** Earth and its constellation above, a living city below, a swarm and robots working, a digital twin on one side, the training cloud on the other, and the agent layer coordinating everything inside the SENSE → UNDERSTAND → REASON → LEARN → PLAN → ACT → ADAPT loop.
- **Stage caption:** Everything in this deck, operating simultaneously, in one frame.

**VISUAL**
The maximal scene: Earth limb with a four-plane constellation, a full city with towers, gateway, edge racks, robots and people, a 14-UAV swarm, the digital twin to the left, the training cloud to the right, an agent ring in the middle and the seven-stage loop ring above everything.

**3D SCENE**
Earth r=52 at (0,−57,0); 3 × 6 ambient satellite shell at r=64 plus two detailed satellites at 31–34 m linked by an optical ISL; city (140 buildings) at y=−3.6 with towers, gateway, edge rack, 3 UGVs and pedestrians; 12-UAV mesh at 16 m; digital twin at (−46,2,18); GPU pod at (46,0,20); 7 agent orbs at y=28; SENSE→ADAPT ring of 7 nodes at y=44 on radius 26; bidirectional spine on the axis.

**COMPONENTS**
- Earth + constellation
- City + infrastructure + robots + humans
- UAV swarm
- Digital twin
- Cloud cluster
- Agent layer
- SENSE→ADAPT loop ring
- Central bidirectional spine

**DATA FLOW**
Vertical spine carries observations up and commands/models down; side beams connect the twin and the cloud; the loop ring above states the system’s cycle.

**ANIMATION**
- Earth rotates, constellation orbits
- Swarm re-forms its mesh, robots patrol, traffic moves
- Loop-ring packets circulate
- Agent orbs pulse
- 110 m camera orbit with slow vertical bob

**TEXT**
Title, subtitle and the loop legend only. This slide must work with the sound off.

**TECHNICAL MESSAGE**
One continuously learning autonomous system spanning space, air, ground, edge and cloud.

**PRODUCTION**
Camera 48° FOV authored at (0,26,96) → (0,22,0), auto-framed with fitMargin 0.94 to fill the stage. Fog is derived from the content bounding sphere. Exposure 1.16. If rendered as video: 20 s orbit, no cuts, titles fading in over the first 3 s.


**KEY TECHNOLOGIES:** LEO / NTN · 6G mesh · UAV swarm · ground robots · edge GPU · digital twin · RAG + knowledge · agentic AI · physical AI · federated MARL · MLOps

**METRICS:** 15 layers · 14 phases · 9 validation levels · 7 loop stages · 1 platform

**NOTE:** This is not an AI model for drones. It is an autonomous physical AI infrastructure that senses, understands, reasons, learns, plans, acts and adapts — continuously.

---

### Slide 94 — SENSE · UNDERSTAND · REASON · LEARN · PLAN · ACT · ADAPT

- **Kicker:** THE POINT OF ALL OF THIS
- **Layout:** `full`
- **Scene module:** `closingRing`
- **Subtitle:** An autonomous physical AI infrastructure connecting space, air, ground, edge, cloud, digital twins, generative AI, agentic AI, physical AI, multi-agent learning, communication networks and robotics into one continuously learning system.
- **Stage caption:** Deck built as a live WebGL presentation — every scene above is rendered in real time, not pre-recorded.

**VISUAL**
A luminous seven-node loop ring in orbit above Earth with a single UAV rotating slowly at its centre.

**3D SCENE**
Earth r=30 at (0,−32,−16); seven ring nodes on radius 22 (Z 0.8) at y≈12 seen from a raised camera so the ring reads as a ring; UAV at the centre rotating at 0.3 rad/s.

**COMPONENTS**
- Earth
- 7-stage loop ring
- Central UAV

**DATA FLOW**
The ring is the system’s cycle; the UAV at its centre is what the cycle acts through.

**ANIMATION**
- Ring nodes pulse in sequence
- Packets circulate the ring
- UAV yaws slowly
- Camera orbits at 0.03 rad/s

**TEXT**
One line: the loop. One paragraph: what the platform is.

**TECHNICAL MESSAGE**
The deck ends where the system does: a loop that never stops.


---

