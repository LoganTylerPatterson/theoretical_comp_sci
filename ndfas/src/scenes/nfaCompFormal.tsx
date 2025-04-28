import { Circle, drawLine, Img, Latex, Line, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, createSignal, fadeTransition, Reference, sequence, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
import {
    drawLineAtAngles,
    drawStartStateArrow,
    drawSelfTransitionArrowTop,
    drawTopTransitionArrow,
    drawBottomTransitionArrow,
    getPointOnCircle,
    flash,
    flashAndHold
} from '../helpers';

export default makeScene2D(function* (view) {
    const fontSize = createSignal(0);
    const blue = 'cornflowerblue';
    const white = 'white';
    const lightRed = 'coral';
    const stateSize = 120;
    const lineWidth = 4;

    const definition = createRef<Rect>();
    const nfaFormal = createRef<Latex>();
    const qDefinition = createRef<Latex>();
    const sigmaDefinition = createRef<Latex>();
    const deltaDefinition = createRef<Latex>();
    const q0Definition = createRef<Latex>();
    const fDefinition = createRef<Latex>();
    view.add(
        <Rect
            ref={definition}
            layout
            direction={"column"}
            gap={50}
            position={[0, -100]}
        >
            <Latex
                ref={nfaFormal}
                tex={"\\text{An NFA accepts a string } w \\in \\Sigma^* \\text{ if there exists a sequence of states } q_0, q_1, \\dots, q_n \\text{ such that:}"}
                fill={white}
                fontSize={fontSize}
                marginBottom={200}
            />
            <Latex
                ref={qDefinition}
                tex={"1. \\ q_0 \\in Q \\text{ is the start state.}"}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={deltaDefinition}
                tex={"2. \\ q_{i+1} \\in \\delta(q_i, a_{i+1}) \\text{ for } 0 \\leq i < n, \\text{ where } a_{i+1} \\text{ is the } (i+1)\\text{-th symbol of } w."}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={deltaDefinition}
                tex={"3. \\ q_n \\in F, \\text{ where } F \\subseteq Q \\text{ is the set of accept states.}"}
                fill={white}
                fontSize={fontSize}
            />
        </Rect>
    )
});