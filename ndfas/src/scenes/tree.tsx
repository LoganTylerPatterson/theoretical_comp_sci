import { Circle, Line, makeScene2D, Shape } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const root = createRef<Circle>();
    const l1 = createRef<Line>();
    const l2 = createRef<Line>();
    const n1 = createRef<Circle>();
    const n2 = createRef<Circle>();
    const l3 = createRef<Line>();
    const l4 = createRef<Line>();
    const n3 = createRef<Circle>();
    const n4 = createRef<Circle>();
    const l5 = createRef<Line>();
    const l6 = createRef<Line>();
    const n5 = createRef<Circle>();
    const n6 = createRef<Circle>();
    const l7 = createRef<Line>();
    const n7 = createRef<Circle>();

    const lineWidth = 4;
    const stroke = "cornflowerblue";
    const nodeSize = 80;
    const deadColor = "coral";

    view.add(
        <>
            <Circle
                ref={root}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[0, -300]}
            />
            <Line
                ref={l1}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[0, -300], [0, -300]]}
            />
            <Line
                ref={l2}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[0, -300], [0, -300]]}
            />
            <Circle
                ref={n1}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-200, -150]}
            />
            <Circle
                ref={n2}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[200, -150]}
            />
            <Line
                ref={l3}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[-200, -150], [-200, -150]]}
            />
            <Line
                ref={l4}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[200, -150], [200, -150]]}
            />
            <Circle
                ref={n3}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-300, 0]}
            />
            <Circle
                ref={n4}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-100, 0]}
            />
            <Line
                ref={l5}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[-100, 0], [-100, 0]]}
            />
            <Line
                ref={l6}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[200, -150], [200, -150]]}
            />
            <Circle
                ref={n5}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-150, 150]}
            />
            <Circle
                ref={n6}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[100, 150]}
            />
            <Line
                ref={l7}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[100, 150], [100, 150]]}
            />
            <Circle
                ref={n7}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[200, 300]}
            />
        </>
    );

    // Grow root
    yield* root().size(nodeSize, 1);

    // Grow first level
    yield* all(
        n1().size(nodeSize, 1),
        n2().size(nodeSize, 1),
    );
    yield* all(
        l1().points([
            getPointOnCircle(root(), 5 * Math.PI / 4),
            getPointOnCircle(n1(), Math.PI / 4)
        ], 1),
        l2().points([
            getPointOnCircle(root(), 7 * Math.PI / 4),
            getPointOnCircle(n2(), 3 * Math.PI / 4)
        ], 1),
    );
    

    // Grow second level left
    yield* all(
        n3().size(nodeSize, 1),
        n4().size(nodeSize, 1),
    );

    yield* all(
        l3().points([
            getPointOnCircle(n1(), 5 * Math.PI / 4),
            getPointOnCircle(n3(), Math.PI / 4)
        ], 1),
        l4().points([
            getPointOnCircle(n1(), 7 * Math.PI / 4),
            getPointOnCircle(n4(), 3 * Math.PI / 4)
        ], 1),
    );
    
    // Kill left branch
    yield* waitFor(1);
    yield* all(
        n3().stroke(deadColor, 0.5),
        l3().stroke(deadColor, 0.5),
    );

    yield* waitUntil('end');
    yield* all(
        root().opacity(0, 1),
        n1().opacity(0, 1),
        n2().opacity(0, 1),
        n3().opacity(0, 1),
        n4().opacity(0, 1),
        n5().opacity(0, 1),
        n6().opacity(0, 1),
        n7().opacity(0, 1),
        l1().opacity(0, 1),
        l2().opacity(0, 1),
        l3().opacity(0, 1),
        l4().opacity(0, 1),
        l5().opacity(0, 1),
        l6().opacity(0, 1),
        l7().opacity(0, 1),
    );

    yield* waitUntil('to_next');
});



function* flash(object: Reference<Shape>) {
    let ogStroke = object().stroke();
    yield* object().stroke("white", 1);
    yield* object().stroke(ogStroke, 1);
}

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
