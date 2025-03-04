import {makeProject} from '@motion-canvas/core';

import regularOperations from './scenes/regularOperations?scene';
import operationsScene from './scenes/operationsScene?scene';
import closedScene from './scenes/closed?scene';

import audio from '../audio/AudioFinal.mp3';

export default makeProject({
  scenes: [regularOperations],
  audio: audio,
});
