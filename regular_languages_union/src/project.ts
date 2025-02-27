import {makeProject} from '@motion-canvas/core';

import regularOperations from './scenes/regularOperations?scene';

import audio from '../audio/AudioFinal.mp3';

export default makeProject({
  scenes: [regularOperations],
  audio: audio,
});
