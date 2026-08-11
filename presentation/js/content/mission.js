const M = (n, clock, title, o) => ({
  kicker: `MISSION STEP ${n} / 17 · ${clock}`,
  title,
  badge: clock,
  scene: 'mission',
  sceneOpts: { step: n },
  ...o,
});

export const MISSION = [
  {
    layout: 'full',
    kicker: 'ACT IX · END-TO-END MISSION',
    title: 'Earthquake — telecommunication restoration',
    sub: 'One mission, seventeen steps, every layer of the architecture exercised: from a satellite detection to a restored network, a searched district and a retrained model.',
    scene: 'missionOverview',
    stageTag: 'MISSION TIMELINE',
    caption: 'T+0 event · T+2m detect · T+5m launch · T+9m link up · T+20m map · T+40m optimise · T+60m restored · after: learn.',
    tech: ['satellite change detection', 'NTN backhaul', 'UAV aerial base stations', 'LiDAR mapping', 'digital twin', 'agentic planning', 'MARL resource allocation', 'ground robots'],
    metrics: [['17', 'steps'], ['&lt;10 min', 'first usable link'], ['60 min', 'to restored coverage'], ['1', 'retrained model afterwards']],
    note: 'Everything in this act is a consequence of the architecture in Acts III–V. Nothing new is introduced — it is simply executed.',
    spec: {
      visual: 'An arc of eight time-stamped mission milestones rising over a damaged city with a working swarm and a satellite pass.',
      scene3d: 'Milestone rings along a parabolic arc from x=−34 to +34 at y=20–29; Catmull-Rom tube with travelling packets; damaged city below; 8-UAV mesh; translating satellite.',
      components: ['8 milestone nodes', 'Timeline tube', 'Damaged city', 'Working swarm'],
      dataflow: 'Time flows left to right; the packets on the arc make the timeline feel live.',
      animation: ['Packets traverse the arc', 'Satellite translates', 'Swarm holds a mesh above the city'],
      text: 'Title and timeline only.',
      message: 'The mission is the proof that the architecture is coherent end to end.',
    },
  },

  M(1, 'T+0', 'An M7.2 earthquake strikes', {
    sub: 'Ground shaking damages structures across the district. Nothing in the platform has been told anything yet — the physical world has simply changed.',
    left: [{ h: 'WHAT HAPPENS', items: ['Structural collapse across multiple districts', 'Power distribution partially fails', 'Roads blocked by debris', 'Emergency call volume spikes instantly'] }],
    right: [{ h: 'PLATFORM STATE', tone: 'warn', items: ['No mission active', 'Assets in standby at the staging area', 'Twin holds the pre-event geometry — now stale'] }],
    metrics: [['T+0', 'event'], ['0', 'information available'], ['stale', 'twin state']],
    note: 'The starting condition of every autonomy story is ignorance. The measure of the system is how quickly that changes.',
    spec: { visual: 'Expanding red seismic wave over the damaged city with fires igniting.', animation: ['Seismic ring expands and fades every ~3 s', 'Fires flicker at 5 Hz'], message: 'The world changed; the system does not know yet.' },
  }),

  M(2, 'T+30s', 'Cellular infrastructure fails', {
    sub: 'Base stations lose power and backhaul. Coverage collapses precisely when demand peaks — the classic disaster failure mode.',
    left: [{ h: 'WHAT HAPPENS', items: ['Four base stations go offline', 'Backhaul fibre severed in two places', 'Surviving cells overload and shed traffic', 'Emergency services lose data connectivity'] }],
    right: [{ h: 'PLATFORM SIGNAL', tone: 'warn', items: ['RAN alarms visible via the operator network feed', 'This is the first machine-readable evidence of the event'] }],
    metrics: [['4', 'towers down'], ['0%', 'coverage in the core district'], ['T+30 s', 'first alarm']],
    note: 'The network outage is itself a sensor: its pattern localises the damage before any camera sees it.',
    spec: { visual: 'Dead towers with blinking “NO SERVICE” labels; no coverage cones.', animation: ['Four NO SERVICE labels blink out of phase'], message: 'Loss of infrastructure is the first observable signal.' },
  }),

  M(3, 'T+2m', 'A satellite detects the affected region', {
    sub: 'The next LEO pass images the district. Change detection against the twin’s pre-event geometry produces a damage map in about 90 seconds.',
    left: [{ h: 'WHAT HAPPENS', items: ['LEO pass acquires optical + SAR imagery', 'Onboard triage selects the changed tiles', 'Change detection runs against the twin baseline', 'Damage polygons and confidences downlinked'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L2 sensing (satellite)', 'L4 communication (Ka feeder)', 'L6 digital twin (baseline geometry)', 'L9 AI models (change detection)'] }],
    metrics: [['90 s', 'detection latency'], ['&lt;10 m', 'damage polygon resolution'], ['1', 'satellite pass needed']],
    note: 'The twin earns its keep here: without a pre-event baseline, change detection is guesswork.',
    spec: { visual: 'Satellite with a wide ice-blue sensing cone and a bright ground footprint ring over the district; Ka feeder beam to the gateway.', animation: ['Footprint ring pulses', 'Feeder-beam packets flow to the gateway'], message: 'Space provides the first wide-area picture, referenced against the twin.' },
  }),

  M(4, 'T+3m', 'The mission agent recognises an emergency', {
    sub: 'The satellite damage map and the RAN alarm pattern together match a known emergency signature. The mission agent retrieves the relevant playbook, drafts a plan and asks for approval.',
    left: [{ h: 'AGENT REASONING TRACE', tone: 'ai', items: ['<b>Trigger</b> satellite change map + RAN alarms', '<b>Classify</b> mass-casualty comms outage', '<b>Retrieve</b> playbook 4b, NOTAMs, terrain, hospital locations', '<b>Plan</b> 8-UAV relay lattice + 2 UGV search', '<b>Request</b> human approval → granted'] }],
    right: [{ h: 'WHY RAG MATTERS HERE', tone: 'ok', text: 'The plan cites the playbook clause, the active NOTAM and the hospital register. The operator approves in seconds because the basis is visible.' },
      { h: 'HUMAN ROLE', tone: 'warn', text: 'One decision, one click, fully informed — the target shape of human-in-the-loop.' }],
    metrics: [['&lt;20 s', 'trigger → draft plan'], ['3', 'cited sources'], ['1', 'human approval']],
    note: 'This is agentic AI doing the job it is actually good at: assembling context into a defensible plan under time pressure.',
    spec: { visual: 'Violet mission-agent orb above the city with a five-line reasoning-trace panel.', animation: ['Orb rings counter-rotate', 'Trace panel steady and legible'], message: 'Autonomy begins with a cited, approvable plan, not with a takeoff.' },
  }),

  M(5, 'T+5m', 'The UAV swarm launches', {
    sub: 'Eight UAVs launch in sequence from the staging area, each with its assigned role in the relay lattice already loaded.',
    left: [{ h: 'WHAT HAPPENS', items: ['Pre-flight checks automated per aircraft', 'Roles assigned: 5 relay, 2 mapping, 1 spare', 'Airspace deconfliction against the NOTAM', 'Energy plan computed for a 45-minute sortie'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L3 physical agents', 'L13 orchestration (task queues)', 'L11 physical AI (takeoff + ascent)', 'safety plane (geofence armed before launch)'] }],
    metrics: [['8', 'aircraft'], ['&lt;120 s', 'all airborne'], ['45 min', 'planned sortie'], ['1', 'spare in the air']],
    note: 'The spare is not optional. Redundancy is planned at launch, not improvised after a failure.',
    spec: { visual: 'Eight UAVs in a low line formation with faint ascent plumes, still below operating altitude.', animation: ['Line formation with slight vertical scatter; plumes track each aircraft'], message: 'Launch is an orchestration event with roles and reserves pre-assigned.' },
  }),

  M(6, 'T+9m', 'A temporary communication network is established', {
    sub: 'The UAVs take station as aerial base stations, backhauled over NTN to the satellite and down to the surviving gateway. Users on the ground reconnect.',
    left: [{ h: 'WHAT HAPPENS', items: ['UAVs form a relay lattice with overlapping coverage', 'NTN backhaul established to the satellite', 'Gateway link restored to the core network', 'First user devices attach and pass traffic'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L4 communication (mesh, NTN, access)', 'L5 edge (local core functions)', 'L10 agentic (comms agent owns topology)', 'L13 orchestration (spectrum grants)'] }],
    metrics: [['9 min', 'time to first usable link'], ['&gt;100 Mb/s', 'aggregate capacity'], ['&lt;50 ms', 'edge RTT'], ['n+1', 'backhaul paths']],
    note: 'This is the mission’s headline promise: usable connectivity in under ten minutes with zero surviving ground infrastructure.',
    spec: { visual: 'Swarm at operating altitude with mint coverage cones, mesh links, NTN backhaul to the satellite, and ground users with signal bars.', animation: ['Coverage cones breathe', 'Packets flow on mesh, backhaul and gateway links', 'User signal bars steady green'], message: 'A flying network restores service before any ground crew arrives.' },
  }),

  M(7, 'T+20m', 'The swarm maps the disaster zone', {
    sub: 'While relaying, four aircraft sweep the district with LiDAR and cameras, producing a fresh geometric and semantic map of what has actually collapsed.',
    left: [{ h: 'WHAT HAPPENS', items: ['LiDAR sweeps produce point clouds at 10–20 Hz', 'Semantic segmentation labels rubble, voids, access routes', 'Onboard triage sends summaries, not raw frames', 'Coverage tracked so gaps are visible and closable'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L2 sensing (LiDAR, camera)', 'L5 edge (onboard inference)', 'L7 data (streams + lineage)', 'L9 AI models (segmentation)'] }],
    metrics: [['&gt;90%', 'district scanned in 11 min'], ['10–20 Hz', 'LiDAR rate'], ['&gt;10:1', 'onboard data reduction']],
    note: 'The aircraft relay and map at the same time. Multi-role assets are what make a small fleet sufficient.',
    spec: { visual: 'Four UAVs projecting rotating LiDAR fans with hit points, and a mint wireframe sheet marking the scanned area.', animation: ['LiDAR fans rotate at different rates', 'Scanned wireframe grows in coverage'], message: 'Sensing and relaying are concurrent duties of the same aircraft.' },
  }),

  M(8, 'T+22m', 'The digital twin updates', {
    sub: 'New geometry, blocked roads, collapsed structures and the current radio environment are written into the twin. Every planner from this point onward reasons about the post-event world.',
    left: [{ h: 'WHAT HAPPENS', items: ['Geometry deltas merged into the twin', 'Road network re-derived from observed blockages', 'Radio propagation recomputed on the new geometry', 'Twin age published as telemetry (140 ms)'] }],
    right: [{ h: 'CONSEQUENCE', tone: 'ok', items: ['Coverage predictions become accurate again', 'Ground routes for robots become plannable', 'Rehearsal of the next hour becomes possible'] }],
    metrics: [['140 ms', 'twin sync age'], ['&lt;1 m', 'geometry error'], ['&lt;3 dB', 'radio model error']],
    note: 'A twin that updates during the mission is the difference between planning on reality and planning on memory.',
    spec: { visual: 'Mint twin city appearing beside the real one, connected by a data beam, bounded by a wireframe volume.', animation: ['Beam packets flow from the fleet to the twin', 'Twin lights up as it synchronises'], message: 'The twin is refreshed mid-mission and becomes the planning substrate.' },
  }),

  M(9, 'T+26m', 'The AI identifies priority areas', {
    sub: 'Damage severity, population density, hospital locations, detected calls and access difficulty are fused into a ranked priority map.',
    left: [{ h: 'WHAT HAPPENS', items: ['Priority 1: hospital district — life-critical connectivity', 'Priority 2: shelter zone — high population, low coverage', 'Priority 3: outer district — monitored, lower urgency', 'Each zone carries a justification the operator can inspect'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L8 RAG (hospital register, protocols)', 'L9 models (demand + damage fusion)', 'L10 agentic (mission planner re-ranks tasks)', 'L14 human (confirms the ordering)'] }],
    metrics: [['3', 'priority tiers'], ['&lt;5 s', 'priority map computation'], ['100%', 'zones with a cited justification']],
    note: 'Prioritisation is the most ethically loaded step in the mission, which is exactly why it is explained and human-confirmed.',
    spec: { visual: 'Three pulsing coloured priority discs over the city, labelled hospital / shelter / district.', animation: ['Discs pulse at different phases', 'Labels remain legible during camera drift'], message: 'Ranked, justified priorities — not undifferentiated “coverage”.' },
  }),

  M(10, 'T+40m', 'Communication resources are optimised', {
    sub: 'The learned MARL policy reallocates trajectories, power, channels and altitudes; an RIS panel is configured to reach a district shadowed by rubble.',
    left: [{ h: 'WHAT HAPPENS', items: ['Trajectories shifted toward priority zones', 'Transmit power and channels reallocated', 'Altitudes traded off: coverage vs path loss', 'RIS phases configured to bypass a blocked street canyon'] }],
    right: [{ h: 'RESULT', tone: 'ok', kv: [['throughput', '+86% vs initial lattice'], ['priority coverage', '92%'], ['fairness', '0.78 Jain index'], ['energy', 'within sortie plan']] }],
    metrics: [['+86%', 'throughput'], ['92%', 'priority coverage'], ['&lt;2 s', 'reallocation decision'], ['1', 'RIS reconfigured']],
    note: 'This is where multi-agent reinforcement learning pays for itself: the coupling between agents is real and the search space is too large for hand-tuning.',
    spec: { visual: 'RIS panel with shimmering elements bouncing a violet beam into a shadowed district, plus three live gauges (throughput, coverage, fairness).', animation: ['RIS elements shimmer as phases update', 'Gauges climb and hold', 'Reflected beam packets flow toward users'], message: 'Learned joint policies outperform hand-tuned allocation under coupling.' },
  }),

  M(11, 'T+45m', 'Ground robots assist the search', {
    sub: 'Three UGVs enter the rubble field where UAVs cannot see, guided by the twin’s route graph, carrying thermal, acoustic and RF-beacon sensing.',
    left: [{ h: 'WHAT HAPPENS', items: ['Robots routed on the twin’s post-event road graph', 'Thermal + acoustic + RF beacon fusion for detection', 'Findings geo-tagged and pushed to responders', 'UAVs relay the robots’ links out of the rubble'] }],
    right: [{ h: 'LAYERS EXERCISED', tone: 'ai', items: ['L3 agents (UGV)', 'L6 twin (route graph)', 'L9 models (multimodal detection)', 'L4 comms (UAV relaying for UGV)'] }],
    metrics: [['3', 'UGVs deployed'], ['&lt;2 m', 'detection localisation'], ['100%', 'findings geo-tagged']],
    note: 'Air and ground are complementary, not competing: the UAV sees the district, the robot reaches the void.',
    spec: { visual: 'Three ground robots with sweeping LiDAR fans moving through the rubble, and a pulsing amber “SURVIVOR SIGNAL” marker.', animation: ['Robots traverse laterally', 'LiDAR fans sweep', 'Survivor label pulses at 3 Hz'], message: 'Cross-domain teaming turns partial sensing into actionable findings.' },
  }),

  M(12, 'T+48m', 'Operators monitor and decide', {
    sub: 'The operations room sees mission status, the AI’s reasoning and a short queue of decisions that genuinely require human authority.',
    left: [{ h: 'ON THE WALLS', items: ['Mission status: coverage 92%, 9/9 assets nominal, twin age 140 ms', 'Decision queue: restricted-zone entry, priority confirmation, night operations authorisation', 'AI accountability: model version, confidence, available explanations'] }],
    right: [{ h: 'INTERVENTION BUDGET', tone: 'warn', kv: [['target', '&lt; 0.1 interventions per UAV-hour'], ['this mission', '2 interventions in 48 min'], ['both', 'policy-required approvals, not corrections']] }],
    metrics: [['2', 'human decisions so far'], ['&lt;5 s', 'alert → informed decision'], ['0', 'manual flying']],
    note: 'Humans are spending their attention on authority questions, not on flying aircraft or reading raw video.',
    spec: { visual: 'Two amber operator panels above the operating city: mission status and human decisions.', animation: ['Panels steady; the scene below continues to operate'], message: 'Human attention is a scarce resource the architecture is designed to conserve.' },
  }),

  M(13, 'T+52m', 'The AI adapts to a failure', {
    sub: 'UAV-06 reports a propulsion fault, descends under its own safe policy, and the swarm redistributes its coverage in 1.4 seconds — with no human input.',
    left: [{ h: 'WHAT HAPPENS', items: ['Onboard monitor detects the fault and enters SAFE mode', 'Aircraft descends to a pre-selected landing site', 'Fleet manager reassigns its coverage role to the spare', 'Comms agent re-optimises the remaining lattice'] }],
    right: [{ h: 'WHY IT WORKS', tone: 'ok', items: ['The spare was already airborne (step 5)', 'The MARL policy was trained with agent dropout', 'Coverage degradation was bounded by design', 'The whole event is logged as evidence and training data'] }],
    metrics: [['1.4 s', 'detect → reallocate'], ['&lt;4%', 'coverage dip'], ['0', 'human interventions'], ['1', 'safe landing']],
    note: 'Robustness is not an emergent property. It was trained for in P6 and validated in P8, which is why it appears here as a non-event.',
    spec: { visual: 'One UAV descending with a red fault label while the rest of the swarm closes the gap.', animation: ['Failed aircraft descends and wobbles slightly', 'Replan link from the mission agent pulses', 'Remaining swarm re-forms its mesh'], message: 'A single-asset failure is absorbed by design, not escalated to a human.' },
  }),

  M(14, 'T+60m', 'Network coverage is restored', {
    sub: 'Ninety-two per cent of the priority grid has usable service. Emergency services are operating on data links that did not exist an hour ago.',
    left: [{ h: 'ACHIEVED', tone: 'ok', items: ['92% priority-grid coverage', 'Voice and data for responders and civilians', 'Live damage map shared with all agencies', 'Search findings continuously updated'] }],
    right: [{ h: 'STILL DEGRADED', tone: 'warn', items: ['Outer districts monitored, not covered', 'Capacity below pre-event levels', 'Battery rotations required every ~40 minutes'] }],
    metrics: [['92%', 'priority coverage'], ['60 min', 'from event to restored'], ['0', 'safety events'], ['9', 'assets operating']],
    note: 'An honest slide states what is still degraded. Overclaiming is how autonomy programmes lose the trust they need.',
    spec: { visual: 'Coverage disc glowing mint over the city, towers relit, traffic moving again, swarm holding station.', animation: ['Coverage disc breathes gently', 'City lights shift from ember to cyan', 'Vehicles reappear on the road grid'], message: 'Measured restoration, with residual gaps stated explicitly.' },
  }),

  M(15, 'T+95m', 'The mission ends', {
    sub: 'Terrestrial crews restore the first fixed base station. The swarm hands over, returns to the staging area and the mission is formally closed.',
    left: [{ h: 'WHAT HAPPENS', items: ['Handover of served users to the restored terrestrial cell', 'Aircraft return in sequence, energy-reserve respecting', 'Robots recovered, sensors safed', 'Mission closure checklist executed automatically'] }],
    right: [{ h: 'HANDOVER RULE', tone: 'ok', text: 'The aerial network does not switch off — it withdraws only as terrestrial capacity comes back, cell by cell.' }],
    metrics: [['0', 'dropped sessions at handover'], ['100%', 'assets recovered'], ['95 min', 'total mission duration']],
    note: 'The withdrawal is as engineered as the deployment; that is what makes the capability usable by real operators.',
    spec: { visual: 'Swarm converging back toward the staging area, coverage still active beneath them.', animation: ['UAVs drift toward the recovery point', 'Coverage disc remains until the last aircraft lands'], message: 'Controlled handover and recovery are part of the mission, not an afterthought.' },
  }),

  M(16, 'T+2h', 'All data is stored, with lineage', {
    sub: 'Every frame, point cloud, radio measurement, decision and human action is archived in a form that allows the entire mission to be replayed bit-exactly.',
    left: [{ h: 'WHAT IS STORED', items: ['Raw and summarised sensor data with time + pose', 'All agent decisions with their inputs and cited sources', 'Model versions running on every asset', 'Human approvals, interventions and their timing', 'Network measurements and achieved KPIs'] }],
    right: [{ h: 'WHY IT MATTERS', tone: 'ok', items: ['Regulatory evidence for the next authorisation', 'Root-cause analysis of the UAV-06 fault', 'Training data for the next policy version', 'A permanent regression scenario built from a real event'] }],
    metrics: [['bit-exact', 'replay'], ['100%', 'decisions traceable'], ['1', 'new regression scenario'], ['&lt;2 h', 'archive complete']],
    note: 'A mission that cannot be replayed cannot be certified, explained or learned from. Storage is a safety feature.',
    spec: { visual: 'A glowing archive cylinder receiving a wide data beam from the fleet.', animation: ['Dense packet flow into the archive', 'Archive glow intensifies'], message: 'The mission record is an engineering asset, not an obligation.' },
  }),

  M(17, 'AFTER', 'The models learn from the mission', {
    sub: 'Hard cases are mined first, candidates are retrained, the full validation stack is re-run, and an improved policy is rolled out as a canary to the fleet.',
    left: [{ h: 'WHAT IS LEARNED', items: ['Collapse patterns the segmentation model got wrong', 'Channel behaviour in the rubble-shadowed canyon', 'The UAV-06 fault signature, for earlier detection', 'A better initial lattice for this city’s geometry'] }],
    right: [{ h: 'GATES BEFORE IT FLIES AGAIN', tone: 'warn', items: ['Massive simulation regression (P7)', 'Fault-injection campaign (P8)', 'Hardware-in-the-loop (P9)', 'Canary on two aircraft before fleet-wide rollout'] }],
    metrics: [['&lt;24 h', 'mission → candidate model'], ['4', 'gates before deployment'], ['2', 'canary aircraft'], ['&lt;60 s', 'rollback if needed']],
    note: 'This is the step that turns a successful mission into a permanently better platform — and it is the step that makes the next mission cheaper.',
    spec: { visual: 'GPU cluster receiving the archive and sending an improved policy back to the fleet.', animation: ['Archive → cluster packets, then cluster → fleet policy beam', 'Fleet continues operating below'], message: 'Every mission compounds into the platform’s permanent capability.' },
  }),

  {
    kicker: 'ACT IX · MISSION RESULT',
    title: 'What the mission actually delivered',
    sub: 'The numbers that matter to an operator, an agency and an investor — plus the honest list of what remained degraded.',
    scene: 'kpiWall',
    sceneOpts: {
      caption: 'MISSION KPI SUMMARY',
      gauges: [
        { label: 'priority coverage', value: 0.92, color: '#6ef2c0' },
        { label: 'link uptime', value: 0.97, color: '#35e0ff' },
        { label: 'autonomy', value: 0.96, color: '#b07bff' },
        { label: 'energy margin', value: 0.31, color: '#ffb347' },
      ],
    },
    stageTag: 'RESULTS',
    diagram: {
      type: 'chain',
      title: 'MISSION SCORECARD',
      bh: 74,
      items: [
        { t: '9 min', s: 'time to first usable link (target &lt;10)', cls: 'ok' },
        { t: '92%', s: 'priority-grid coverage (target &gt;90%)', cls: 'ok' },
        { t: '2', s: 'human decisions in 95 min', cls: 'ok' },
        { t: '1.4 s', s: 'failure → reallocation', cls: 'ok' },
        { t: '0', s: 'safety events', cls: 'ok' },
        { t: '31%', s: 'energy margin at closure', cls: 'warn' },
      ],
    },
    diagramLead: true,
    left: [
      { h: 'DELIVERED', tone: 'ok', items: ['Connectivity for responders in under 10 minutes', 'A fresh, shared damage map within 22 minutes', 'Three survivor locations passed to ground teams', 'A complete, replayable evidence record'] },
    ],
    right: [
      { h: 'STILL DEGRADED', tone: 'warn', items: ['Outer districts monitored only', 'Capacity below pre-event levels', '40-minute battery rotation cycle', 'Night operations required a separate authorisation'] },
      { h: 'NEXT ITERATION', tone: 'ai', text: 'Longer-endurance airframes, a pre-built twin for every served city, and an initial lattice learned per city geometry.' },
    ],
    metrics: [['9 min', 'first link'], ['92%', 'priority coverage'], ['2', 'human decisions'], ['0', 'safety events']],
    note: 'Autonomy claims are only worth what their measurement discipline is worth. Publish the gaps with the wins.',
    spec: {
      visual: 'Four mission-result gauges over a working city, with a six-cell scorecard beneath.',
      components: ['Coverage / uptime / autonomy / energy gauges', 'Scorecard chain'],
      animation: ['Gauges settle near their final values with small live oscillation'],
      text: 'Delivered vs still degraded, plus the next iteration.',
      message: 'Report the numbers, including the ones that are not flattering.',
    },
  },
];
