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

    const red = "coral";
    const blue = "cornflowerblue";
    const white = "white";
    const lw = 4;
    const rotation = createSignal(0);

    view.add(
        <Rect ref={group}>
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
        nfaLang().rotation(120, 5),
        dfaLang().rotation(120, 5),
        nfaLang().size(400, 5).to(200, 3),
        dfaLang().size(100, 5).to(200, 3),
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
        flashAndHold(nfaLang, white, 3),
    )

    yield* waitFor(10);
})