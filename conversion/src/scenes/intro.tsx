import { Circle, drawLine, Img, Latex, Line, makeScene2D, Path, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, createSignal, fadeTransition, Reference, sequence, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
import {
    drawLineAtAngles,
    drawStartStateArrow,
    drawSelfTransitionArrowTop,
    drawSelfTransitionArrowBottom,
    drawTopTransitionArrow,
    drawBottomTransitionArrow,
    getPointOnCircle,
    flash,
    flashAndHold,
    shiftHorizontal
} from '../../helpers';
import nfa from "./nfa";

export default makeScene2D(function* (view) {
    const group = createRef<Rect>();
    const nfaLang = createRef<Polygon>();
    const dfaLang = createRef<Polygon>();
    const dfaL = createRef<Latex>();
    const nfaL = createRef<Latex>();

    const red = "coral";
    const blue = "cornflowerblue";
    const white = "white";
    const lw = 4;
    const rotation = createSignal(0);
    const fontSize = createSignal(0);

    view.add(
        <Rect ref={group}>
            <Latex
                ref={nfaL}
                fontSize={fontSize}
                position={[-500, -400]}
                tex={"NFA Languages"}
                fill={blue}
            />
            <Latex
                ref={dfaL}
                fontSize={fontSize}
                position={[500, -400]}
                tex={"DFA Languages"}
                fill={red}
            />
            <Polygon
                ref={nfaLang}
                sides={8}
                stroke={blue}
                lineWidth={lw}
                size={100}
                position={[-0, 0]}
            />
            <Polygon
                ref={dfaLang}
                sides={8}
                stroke={red}
                lineWidth={lw}
                size={100}
                position={[0, 0]}
            />
        </Rect>
    );

    yield* all(
        fontSize(32, 1),
        nfaLang().rotation(120, 3),
        dfaLang().rotation(120, 3),
        nfaLang().size(400, 3).to(200, 3),
        dfaLang().size(100, 3).to(200, 3),
    );

    yield* all(
        nfaLang().opacity(0, 0.1),
        flash(dfaLang, white, white, 3),
    )

    yield* waitUntil("make_equal");
    nfaLang().opacity(1);

    yield* all(
        nfaLang().sides(22, 3),
        shiftHorizontal(nfaLang, 200, 3),
        shiftHorizontal(dfaLang, -200, 3)
    )

    yield* all(
        nfaLang().position([0, 0], 3),
        dfaLang().position([0, 0], 3),
        nfaLang().sides(25, 3),
        dfaLang().sides(25, 3),
    )

    yield* all(
        flashAndHold(nfaLang, white, 2),
    )

    yield* waitUntil("fade_out");
})