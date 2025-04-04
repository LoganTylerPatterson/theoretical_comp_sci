import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import audio from '../audio/ndfa.mp3';
import intro from './scenes/intro?scene';

export default makeProject({
  scenes: [intro],
  audio: audio
});
