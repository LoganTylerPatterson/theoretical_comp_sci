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
                tex={"M = (Q, \\Sigma, \\delta, q_0, F)"}
                fill={white}
                fontSize={fontSize}
                marginBottom={200}
            />
            <Latex
                ref={qDefinition}
                tex={"Q = \\text{A finite set of states}"}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={sigmaDefinition}
                tex={"\\Sigma = \\text{A finite set of input symbols (alphabet)}"}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={deltaDefinition}
                tex={"\\delta = \\text{The transition function } \\delta: Q \\times \\Sigma \\to 2^Q"}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={q0Definition}
                tex={"q_0 = \\text{The start state, where } q_0 \\in Q"}
                fill={white}
                fontSize={fontSize}
            />
            <Latex
                ref={fDefinition}
                tex={"F = \\text{The set of accept states, where } F \\subseteq Q"}
                fill={white}
                fontSize={fontSize}
            />
        </Rect>
    )
    yield* fontSize(32, 1);

    yield* waitUntil("zoom to delta");
    yield* all(
        nfaFormal().opacity(0, 1),
        qDefinition().opacity(0, 1),
        sigmaDefinition().opacity(0, 1),
        q0Definition().opacity(0, 1),
        fDefinition().opacity(0, 1),
    )

    yield* all(
        fontSize(40, 1),
    )
    yield* definition().position(definition().position().addY(-300), 1)

    const graphBox = createRef<Rect>();
    const q1 = createRef<Latex>();
    const q2 = createRef<Latex>();
    const vertLine = createRef<Line>();
    const horizLine = createRef<Line>();
    const topLine = createRef<Latex>();
    const q1Line = createRef<Latex>();
    const q2Line = createRef<Latex>();
    const end = createSignal(0);
    view.add(
        <>
            <Line
                ref={vertLine}
                points={[[-270, -150], [-270, 100]]}
                lineWidth={lineWidth}
                stroke={white}
                end={end}
            />
            <Line
                ref={horizLine}
                points={[[-350, -100], [0, -100]]}
                lineWidth={lineWidth}
                stroke={white}
                end={end}
            />

            <Rect ref={graphBox} scale={0}>
                <Latex
                    ref={topLine}
                    tex={"0 \\ \\ \\ \\ \\ \\  1 \\ \\ \\ \\ \\ \\epsilon"}
                    fontSize={fontSize}
                    fill={white}
                    position={[-140, -135]}
                />
                <Latex
                    ref={q1Line}
                    tex={"q1 \\ \\ \\ \\ \\  q2 \\ \\ \\ \\  q2"}
                    fontSize={fontSize}
                    fill={white}
                    position={[-125, -65]}
                />
                <Latex
                    ref={q2Line}
                    tex={"q2 \\ \\ \\ \\ \\  q2 \\ \\ \\ \\  \\emptyset"}
                    fontSize={fontSize}
                    fill={white}
                    position={[-135, 30]}
                />
                <Latex
                    ref={q1}
                    tex={"q1"}
                    fontSize={fontSize}
                    fill={white}
                    position={[-310, -65]}
                />
                <Latex
                    ref={q2}
                    tex={"q2"}
                    fontSize={fontSize}
                    fill={white}
                    position={[-310, 30]}
                />
            </Rect>
        </>
    )
    yield* waitUntil("draw graph");
    yield* end(1, 1);
    yield* graphBox().scale(1, 1);
    yield* waitUntil("done");
}); 