import { Circle, Latex, Line, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const s1 = createRef<Circle>();
    const s2 = createRef<Circle>();

    const l0 = createRef<Line>();
    const l1 = createRef<Circle>();
    const l2 = createRef<Line>();

    const s1s1 = createRef<Latex>();
    const s1s2 = createRef<Latex>();

    const lineWidth = 4;
    const stroke = "cornflowerblue";
    const lightRed = "coral"
    const white = "white"
    const animationTime = 1;

    view.add(
        <>
            <Line
                ref={l0}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[-624, 0], [-623, 0]]}
                radius={200}
                endArrow
            />
            <Circle
                ref={s1}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-350, 0]}
            />
            <Latex
                ref={s1s1}
                tex={""}
                fill={"white"}
                fontSize={32}
                position={[-350, -180]}
            />
            <Circle
                ref={l1}
                stroke={stroke}
                lineWidth={lineWidth}
                startAngle={135}
                endAngle={45}
                x={s1().x}
                endArrow
            />
            <Line
                ref={l2}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[]}
                radius={200}
                endArrow
            />
            <Circle
                ref={s2}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
            />
            <Latex
                ref={s1s2}
                tex={""}
                fill={"white"}
                fontSize={32}
                position={[-185, -120]}
            />
        </>
    )

    yield * s1().size(140, 1)
    yield * drawStartStateArrow(l0, s1);

    yield * s2().size(140, 1)
    yield * drawSelfTransitionArrowTop(s1,l1);
    yield* s1s1().tex("1", animationTime);
    yield * drawTopTransitionArrow(s1, s2, l2);
    yield * s1s2().tex("1", animationTime);

    yield* waitUntil("show_path")

    // color the paths
    yield * l0().stroke(lightRed, animationTime);
    yield * s1().stroke(lightRed, animationTime);

    yield * all(
        l0().stroke(stroke, animationTime),
        l1().stroke(lightRed, animationTime),
        s1().stroke(lightRed, animationTime)
    )
    
    yield * all(
        l1().stroke(stroke, animationTime),
        l2().stroke(lightRed, animationTime),
        s1().stroke(stroke,animationTime),
        s2().stroke(lightRed, animationTime),
    )

    yield* waitUntil('show_epsilon')
    yield* all(
        s2().stroke(stroke,animationTime),
        l2().stroke(stroke,animationTime),
    )
    //draw another state, line, and latex for the epsilon symbol
    const s3 = createRef<Circle>();
    const l3 = createRef<Line>();
    const s2s3 = createRef<Latex>();
    view.add(
        <>
            <Circle
                ref={s3}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[350, 0]}
            />
            <Line
                ref={l3}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[]}
                radius={200}
                endArrow
            />
            <Latex
                ref={s2s3}
                tex={""}
                fill={"white"}
                fontSize={32}
                position={[175, -120]}
            />
        </>
    )

    yield * s3().size(140, 1)
    yield * drawTopTransitionArrow(s2, s3, l3);
    yield * s2s3().tex("ε", animationTime);

    yield* waitUntil('demonstrate_epsilon')
    yield* s2().stroke(lightRed, animationTime);
    yield * all(
        s2().stroke(stroke, animationTime),
        l3().stroke(lightRed, animationTime)
    )
    yield* s3().stroke(lightRed, animationTime);

    yield* waitUntil('end');
    yield* all(
        s1().opacity(0, 1),
        s2().opacity(0, 1),
        s3().opacity(0, 1),
        l0().opacity(0, 1),
        l1().opacity(0, 1),
        l2().opacity(0, 1),
        l3().opacity(0, 1),
        s1s1().opacity(0, 1),
        s1s2().opacity(0, 1),
        s2s3().opacity(0, 1),
    )
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