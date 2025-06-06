import { makeProject } from '@motion-canvas/core';

import audio from '../audio/NonDeterministicFiniteAutomata.mp4';
import intro from './scenes/intro?scene';
import ndfaExample from './scenes/ndfaExample?scene';
import bookExample from './scenes/bookExample?scene';
import tree from './scenes/tree?scene'
import bridge from './scenes/bridge?scene';
import examples from './scenes/examples?scene';
import machineB from './scenes/machineB?scene';
import nfaFormal from './scenes/nfaFormal?scene';
import nfaCompFormal from './scenes/nfaCompFormal?scene';

export default makeProject({
  scenes: [intro, ndfaExample, bookExample, tree, bridge, examples, machineB, nfaFormal, nfaCompFormal],
  audio: audio
});
