# Animation direction

Animation in this deck exists to explain a process, never to decorate. Every
moving element answers one of three questions: *what flows where*, *what is
changing*, or *what is alive*. If a motion answers none of them, it is removed.

The deck animates live in WebGL, so nothing here is aspirational — this file
documents the timings so they can be reproduced in a rendered video, and so new
scenes stay consistent.

## 1. Global motion budget

| Layer | Motion | Rate |
|---|---|---|
| Camera | slow orbit around the look-at point | 0.018–0.035 rad/s |
| Camera | vertical bob | ±0.4–1.6 m at 0.24 rad/s |
| Camera (interiors) | lateral dolly, ping-pong | 0.05–0.06 cycles/s |
| Data packets | travel along links | 0.22–0.6 of the path per second |
| Rotors | spin | ~30 rad/s (18 for HAPS-class, 12 for a failing aircraft) |
| LiDAR drum / fan | rotate | 1.4–4 rad/s |
| Agent orbs | cage + two rings counter-rotate | 0.16–0.7 rad/s |
| Breathing highlights | scale or opacity pulse | 1.2–3 Hz |
| Alarm labels | blink | 2.2–3 Hz, out of phase per fault |

Rule of thumb: at any instant, no more than three motion classes should be
competing for attention in a single frame.

## 2. What animates, per scene family

**Establishing / vision scenes** (`titleEarthToEdge`, `earthToEdgeStack`, `commGlobal`,
`finalMaster`) — Earth rotates at 0.010–0.020 rad/s; satellites orbit at
0.08–0.12 rad/s; packets rise on the spine in cyan and descend in mint; UAV
swarms continuously re-solve their mesh links so the network looks alive; the
camera does one slow orbit that never cuts.

**Layer scenes** (L1–L15) — one dominant motion per layer, matching the layer's
function:

| Layer | Dominant motion |
|---|---|
| L1 physical world | vehicles driving, sea swell, ship transiting |
| L2 sensing | LiDAR fan rotating, camera scan bar sweeping, radar/RF cones breathing, satellite swath sweeping ±18 m |
| L3 physical agents | rotors, LiDAR, a vehicle crossing the apron |
| L4 communication | per-link packet rates differ by link class; RIS elements shimmer as phases update |
| L5 edge computing | packets up and down the compute stack; latency bars glowing by tier |
| L6 digital twin | the twin UAV mirrors the real UAV *exactly*; sync badge pulses at 1.6 Hz |
| L7 data platform | source packets fall into ingest, consumer links pull outward |
| L8 RAG | documents bob and stream into the embedding cube; cloud and graph rotate at different rates |
| L9 AI models | internal layer bars breathe per model; blocks yaw ±0.05 rad |
| L10 agentic AI | messages march between agents; tasking beams pulse; the safety veto beam stays constant |
| L11 physical AI | packets circulate the 6-station ring while the robot and UAV work below |
| L12 learning | local-model chips pulse while "training"; gradients flow in, global model flows out |
| L13 orchestration | task cards fade in/out as they are (re)assigned; resource gauges oscillate |
| L14 human | twin table rotates slowly; alert banner pulses; camera dollies laterally |
| L15 deployment | four regions operate independently; policy packets descend from global control |

**Pipeline phases (P0–P13)** — motion increases with phase maturity: P0 is almost
still (documents only), P4 draws live training curves, P7 has 49 independently
seeded environments moving out of sync, P8 pulses six asynchronous fault rings,
P13 runs the full seven-stage loop.

**Mission (17 steps)** — the same city persists across all 17 slides and gains
state: a seismic ring expands (step 1), "NO SERVICE" labels blink (2), a satellite
footprint sweeps (3), the agent reasoning panel appears (4), UAVs rise in a line
formation with ascent plumes (5), coverage cones and user signal bars turn mint (6),
LiDAR fans scan and the scanned wireframe grows (7), the twin lights up (8),
priority discs pulse (9), RIS elements shimmer and gauges climb (10), robots
traverse rubble and a survivor marker pulses (11), operator panels appear (12), one
UAV descends with a red fault label while the swarm re-forms (13), the coverage
disc breathes and city lights shift from ember to cyan (14), aircraft drift back to
the staging point (15), a dense packet stream fills the archive (16), and the
archive feeds the GPU cluster which sends a policy beam back to the fleet (17).

**Use cases (10)** — each has exactly one signature motion: the survey lawnmower
path (agriculture), delivery arcs (logistics), corridor circuit (inspection),
pulsing detections (search and rescue), rolling swell with a transiting dark
vessel (maritime), an orbiting inspection UAV plus a ground patrol (industrial),
a wide high-altitude mesh with a flagged track (defence).

## 3. Reveal choreography (for a presented or rendered version)

For slides that carry a sequence, reveal in this order (the live deck shows the
end state; a video should build it):

1. **Master architecture** — layers bottom to top, 120 ms apart, then the SENSE
   spine, then the ACT spine.
2. **AI stack / simulation stack** — one tier at a time from the bottom, each with
   its arrow, 150 ms apart.
3. **Agent topology** — mission agent, then planner, then specialists left to right,
   then the safety veto edge last (it should land like a full stop).
4. **Physical AI loop** — stations clockwise from PERCEPTION, then start the packets.
5. **Testing pyramid** — bottom to top; hold 400 ms before revealing level 8 so the
   "nothing flies over people until level 8" line lands.
6. **Mission** — strictly step order; never cut back to an earlier step.

## 4. Rendering a video from the deck

- Press `P` in the deck to freeze animation (useful for stills and screenshots).
- Every scene is deterministic in its own time base: `scene.html?s=<sceneName>`
  renders a single scene full-window, so a capture tool can record any scene in
  isolation at any resolution.
- Suggested shot lengths: establishing scenes 15–20 s (one camera orbit),
  layer scenes 8–10 s, pipeline phases 6–8 s, mission steps 5–6 s.
- No cuts inside a scene; cut on the slide boundary. The camera never accelerates —
  constant angular velocity keeps the technical content readable.
