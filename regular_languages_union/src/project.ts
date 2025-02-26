import {makeProject} from '@motion-canvas/core';

import regularOperations from './scenes/regularOperations?scene';

import audio from '../audio/FinalAudio.mp3';

export default makeProject({
  scenes: [regularOperations],
  audio: audio,
});
