import { makeProject } from '@motion-canvas/core';

import example from './scenes/example?scene';
import nfa from './scenes/nfa?scene';
import intro from './scenes/intro?scene';
import audio from '../audio/NfaVsDFa.mp3';

export default makeProject({
  scenes: [intro, nfa],
  audio: audio
});
