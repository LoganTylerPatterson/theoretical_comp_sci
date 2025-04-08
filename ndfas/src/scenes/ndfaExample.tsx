import { Circle, Latex, Line, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const s1 = createRef<Circle>();
    const s2 = createRef<Circle>();
    const s3 = createRef<Circle>();
    const s4 = createRef<Circle>();

    const l0 = createRef<Line>();
    const l1 = createRef<Line>();
    const l2 = createRef<Line>();
    const l3 = createRef<Line>();

    const s2s3 = createRef<Latex>();
    const s2s4 = createRef<Latex>();

    const lineWidth = 4;
    const stroke = "cornflowerblue";
    const lightRed = "coral"
    const white = "white"

    view.add(
        <>
            <Line
                ref={l0}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[]}
                radius={200}
                endArrow
            />
            <Circle
                ref={s1}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-550, 0]}
            />
            <Line
                ref={l1}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[]}
                radius={500}
                endArrow
            />
            <Circle
                ref={s2}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
            />
            <Line
                ref={l2}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[0, 0], [0, 0], [1, 0]]}
                radius={500}
                endArrow
            />
            <Latex
                ref={s2s3}
                tex={""}
                fill={"white"}
                fontSize={42}
            />
            <Circle
                ref={s3}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[550, 0]}
            />

      //ndfa path
            <Circle
                ref={s4}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[550, 300]}
            />
            <Line
                ref={l3}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[0, 0], [0, 0], [1, 0]]}
                radius={500}
                endArrow
            />
            <Latex
                ref={s2s4}
                tex={""}
                fill={"white"}
                fontSize={42}
            />
        </>
    )

    yield * s1().size(120, 1)
    yield * drawStartStateArrow(l0, s1);

    yield * s2().size(120, 1)
    yield * drawTopTransitionArrow(s1, s2, l1);

    yield * s3().size(120, 1)
    yield * drawTopTransitionArrow(s2, s3, l2);

    // draw alternate from s2 to s4
    yield * s4().size(120, 1)
    yield * drawLineAtAngles(s2, s4, l3, 7 * Math.PI / 4, 3 * Math.PI / 4);

    // color the paths
    yield * s1().stroke(lightRed, .5);
    yield * l1().stroke(lightRed, .5);

    yield * all(
        s2().stroke(lightRed, .5),
        l1().stroke("white", .5),
        s1().stroke("white", .5)
    )

    yield * all(
        s2().stroke(white, .5),
        l2().stroke(lightRed, .5),
        s3().stroke(lightRed, .5),
        l3().stroke(lightRed, .5),
        s4().stroke(lightRed, .5),
        s2s3().tex("x", .5),
        s2s4().tex("x", .5)
    )

    yield * waitFor(20);
})

function drawLineAtAngles(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>, angle1: number, angle2: number): ThreadGenerator {
    let p1 = getPointOnCircle(circle1(), angle1);
    let p2 = getPointOnCircle(circle2(), angle2);
    return all(
        line().points([
            p1,
            p2,
        ], 1),
    )
}

function drawStartStateArrow(arrow: Reference<Line>, circle: Reference<Circle>): ThreadGenerator {
    let p1 = getPointOnCircle(circle(), Math.PI);
    p1.x -= circle().width();
    let p2 = getPointOnCircle(circle(), Math.PI);
    return all(
        arrow().points(
            [
                p1,
                p2
            ],
            1
        ),
        arrow().endArrow(true, 1)
    )
}

export function drawSelfTransitionArrowTop(
    state: Reference<Circle>,
    circle: Reference<Circle>,
    size: number = 120,
    yOffset: number = 45
): ThreadGenerator {
    return all(
        circle().size(size, 1),
        circle().x(state().x(), 1),
        circle().y(state().y() - state().width() + yOffset, 1)
    )
}

export function drawTopTransitionArrow(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>): ThreadGenerator {
    let p1 = getPointOnCircle(circle1(), Math.PI / 4);
    let p2 = getPointOnCircle(circle2(), 3 * Math.PI / 4);
    return line().points([
        p1,
        [(p2.x - p1.x) / 2 + p1.x, p1.y - 100],
        p2,
    ], 1)
}

export function drawBottomTransitionArrow(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>): ThreadGenerator {
    let p1 = getPointOnCircle(circle2(), 5 * Math.PI / 4);
    let p2 = getPointOnCircle(circle1(), 7 * Math.PI / 4);
    return all(
        line().points([
            p2,
            [(p2.x - p1.x) / 2 + p1.x, p1.y + 100],
            p1,
        ], 1),
    );
}

export function getPointOnCircle(circle: Circle, radians: number): Vector2 {
    const radius = circle.width() / 2;
    const position = circle.position();
    const result = new Vector2(
        Math.cos(-radians) * radius + position.x,
        Math.sin(-radians) * radius + position.y
    );
    return result
}