import * as world from './world.js';
import * as layers from './layers.js';
import * as arch from './arch.js';
import * as pipeline from './pipeline.js';
import * as ops from './ops.js';
import * as mission from './mission.js';

export const SCENES = {
  ...world,
  ...layers,
  ...arch,
  ...pipeline,
  ...ops,
  ...mission,
};
