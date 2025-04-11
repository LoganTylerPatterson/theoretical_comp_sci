import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import audio from '../audio/NonDeterministicFiniteAutomata.mp4';
import intro from './scenes/intro?scene';
import ndfaExample from './scenes/ndfaExample?scene';
import bookExample from './scenes/bookExample?scene';

export default makeProject({
  scenes: [intro, ndfaExample, bookExample],
  audio: audio
});
