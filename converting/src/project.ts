import { makeProject } from '@motion-canvas/core';

import nfa from './scenes/nfa?scene';
import intro from './scenes/intro?scene';
import audio from '../audio/ConvertingNFAToDFA.mp3';

export default makeProject({
  scenes: [intro, nfa],
  audio: audio
});
