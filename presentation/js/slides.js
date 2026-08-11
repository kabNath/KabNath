import { OPENING } from './content/opening.js';
import { LAYERS } from './content/layers.js';
import { ARCH } from './content/arch.js';
import { PIPELINE } from './content/pipeline.js';
import { OPS } from './content/ops.js';
import { MISSION } from './content/mission.js';
import { USECASES } from './content/usecases.js';
import { CLOSING } from './content/closing.js';

const GROUPS = [
  { t: 'ACT 0–III · VISION & MASTER ARCHITECTURE', slides: OPENING },
  { t: 'ACT IV · THE 15 LAYERS', slides: LAYERS },
  { t: 'ACT V · DEEP ARCHITECTURES', slides: ARCH },
  { t: 'ACT VI · DEVELOPMENT PIPELINE', slides: PIPELINE },
  { t: 'ACT VII–VIII · VALIDATION, SAFETY, OPS, HARDWARE', slides: OPS },
  { t: 'ACT IX · END-TO-END MISSION', slides: MISSION },
  { t: 'ACT X · GLOBAL USE CASES', slides: USECASES },
  { t: 'ACT XI · TECHNOLOGY, GOVERNANCE & CLOSE', slides: CLOSING },
];

export const SLIDES = GROUPS.flatMap((g) => g.slides);

export const ACTS = (() => {
  let n = 0;
  return GROUPS.map((g) => {
    const a = { t: g.t, from: n };
    n += g.slides.length;
    return a;
  });
})();
