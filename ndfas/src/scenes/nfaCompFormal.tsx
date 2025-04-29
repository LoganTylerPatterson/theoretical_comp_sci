import { Circle, drawLine, Img, Latex, Line, makeScene2D, Path, Polygon, Rect } from "@motion-canvas/2d";
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
                ref={fDefinition}
                tex={"3. \\ q_n \\in F, \\text{ where } F \\subseteq Q \\text{ is the set of accept states.}"}
                fill={white}
                fontSize={fontSize}
            />
        </Rect>
    )

    yield* fontSize(32, 1);
    yield* waitUntil("emphasis");
    yield* deltaDefinition().fill(lightRed, 1);
    yield* waitFor(3);
    yield* deltaDefinition().fill(white, 1);
    yield* waitUntil("scale");
    yield* definition().scale(0, 1);

    const dfa = createRef<Polygon>();
    const nfa = createRef<Polygon>();
    view.add(
        <>
            <Polygon
                ref={dfa}
                sides={16}
                size={160}
                stroke={blue}
                lineWidth={4}
                position={[-200, 0]}
            />
            <Polygon
                ref={nfa}
                sides={6}
                size={160}
                stroke={lightRed}
                lineWidth={lineWidth}
                position={[200, 0]}
            />
        </>
    )
    yield* all(
        dfa().sides(5, 3),
        dfa().position(dfa().position().addX(200), 3),
        nfa().sides(17, 3),
        nfa().position(nfa().position().addX(-200), 3),
    )
    yield* all(
        dfa().stroke(white, 3),
        nfa().stroke(white, 3),
        dfa().lineWidth(lineWidth + 3, 3),
        nfa().lineWidth(lineWidth + 3, 3),
        dfa().sides(17, 3),
    )
    yield* waitUntil("the end");
    yield* all(
        dfa().opacity(0, 3),
        nfa().opacity(0, 3),
    )
});