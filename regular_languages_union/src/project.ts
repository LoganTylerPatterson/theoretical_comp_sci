import {makeProject} from '@motion-canvas/core';

import regularOperations from './scenes/regularOperations?scene';
import operationsScene from './scenes/operationsScene?scene';

import audio from '../audio/AudioFinal.mp3';

export default makeProject({
  scenes: [regularOperations, operationsScene],
  audio: audio,
});
