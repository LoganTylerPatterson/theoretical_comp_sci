import { Circle, Latex, Line, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {
    const s1 = createRef<Circle>();
    const s2 = createRef<Circle>();
    const s3 = createRef<Circle>();
    const s4 = createRef<Circle>();
    const s4Final = createRef<Circle>();

    const lstart = createRef<Line>();
    const ls1s1 = createRef<Circle>();
    const ls1s2 = createRef<Line>();
    const ls2s3 = createRef<Line>();
    const ls3s4 = createRef<Line>();
    const ls4s4 = createRef<Circle>();

    const s1s1 = createRef<Latex>();
    const s1s2 = createRef<Latex>();
    const s2s3 = createRef<Latex>();
    const s3s4 = createRef<Latex>();
    const s4s4 = createRef<Latex>();

    const machine1 = createRef<Rect>();

    const lineWidth = 4;
    const stroke = "cornflowerblue";
    const lightRed = "coral"
    const white = "white"
    const labelSize = 32;
    const stateSize = 140;

    view.add(
        <Rect ref={machine1}>
      // S1 exit transitions and state
            <Line
                ref={lstart}
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
                position={[-850, 0]}
            />

            <Circle
                ref={ls1s1}
                stroke={stroke}
                lineWidth={lineWidth}
                startAngle={135}
                endAngle={45}
                x={s1().x}
                endArrow
            />
            <Latex
                ref={s1s1}
                tex={""}
                fill={white}
                fontSize={labelSize}
                position={[-850, -175]}
            />

            <Line
                ref={ls1s2}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[]}
                radius={500}
                endArrow
            />
            <Latex
                ref={s1s2}
                tex={""}
                fill={white}
                fontSize={labelSize}
                position={[-600, -130]}
            />

      // S2 state and exit transitions
            <Circle
                ref={s2}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-300, 0]}
            />
            <Line
                ref={ls2s3}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[0, 0], [0, 0], [1, 0]]}
                radius={500}
                endArrow
            />
            <Latex
                ref={s2s3}
                tex={""}
                fill={white}
                fontSize={labelSize}
                position={[0, -130]}
            />

      // S3 state and exit transitions
            <Circle
                ref={s3}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[300, 0]}
            />
            <Line
                ref={ls3s4}
                lineWidth={lineWidth}
                stroke={stroke}
                points={[[350, -50], [351, -50]]}
                radius={500}
                endArrow
            />
            <Latex
                ref={s3s4}
                tex={""}
                fill={white}
                fontSize={labelSize}
                position={[560, -130]}
            />

      // S4 state and exit transtiions
            <Circle
                ref={s4}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[850, 0]}
            />
            <Circle
                ref={s4Final}
                size={0}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[850, 0]}
            />
            <Circle
                ref={ls4s4}
                stroke={stroke}
                lineWidth={lineWidth}
                startAngle={135}
                endAngle={45}
                x={s4().x}
                endArrow
            />
            <Latex
                ref={s4s4}
                tex={""}
                fill={white}
                fontSize={labelSize}
                position={[845, -175]}
            />
        </Rect>
    );


    yield* all(
        s1().size(stateSize, 1),
        s2().size(stateSize, 1),
        s3().size(stateSize, 1),
        s4().size(stateSize, 1),
        s4Final().size(stateSize- 20, 1),
    );

    yield* all(
        drawStartStateArrow(lstart, s1),
        drawSelfTransitionArrowTop(s1, ls1s1),
        drawTopTransitionArrow(s1, s2, ls1s2),
        drawTopTransitionArrow(s2, s3, ls2s3),
        drawTopTransitionArrow(s3, s4, ls3s4),
        drawSelfTransitionArrowTop(s4, ls4s4),

        // add the labels
        s1s1().tex('0, 1', 1),
        s1s2().tex('1', 1),
        s2s3().tex('0, e', 1),
        s3s4().tex('1', 1),
        s4s4().tex('0, 1', 1)
    )

    yield* waitUntil('conversion');
    yield* machine1().scale(0,1);

    const dfa = createRef<Polygon>();
    const nfa = createRef<Polygon>();
    const lnfa = createRef<Latex>();
    const ldfa = createRef<Latex>();
    const g1 = createRef<Rect>();
    view.add(
        <Rect ref={g1} scale={0}>
            <Polygon
                ref={dfa}
                sides={4}
                size={160}
                stroke={'lightseagreen'}
                lineWidth={4}
                position={[-200, 0]}
            />
            <Latex
                ref={ldfa}
                tex={''}
                fill={'lightseagreen'}
                fontSize={labelSize}
                position={dfa().position()}
            />
            <Polygon
                ref={nfa}
                sides={14}
                size={160}
                stroke={'lightseagreen'}
                lineWidth={4}
                position={[200, 0]}
            />
            <Latex
                ref={lnfa}
                tex={''}
                fill={'lightseagreen'}
                fontSize={labelSize}
                position={nfa().position}
            />
        </Rect>
    )
    yield* waitUntil("show_same");
    yield* all(
        g1().scale(1, 1),
        dfa().sides(4, 3),
        nfa().sides(4, 3),
        lnfa().tex('NFA', 1),
        ldfa().tex('DFA', 1),
    )
    yield* waitUntil("show_simplicity");

    // Add with other refs
    const q1 = createRef<Circle>();
    const q2 = createRef<Circle>();
    const q3 = createRef<Circle>();
    const q4 = createRef<Circle>();
    const q5 = createRef<Circle>();

    const q1q2 = createRef<Line>();
    const q2q3 = createRef<Line>();
    const q1q4 = createRef<Line>();
    const q3q5 = createRef<Line>();
    const q4q5 = createRef<Line>();
    const q2q4 = createRef<Line>();
    const q2q5 = createRef<Line>();
    const comp = createRef<Rect>();

    view.add(
        <Rect ref={comp} scale={0}>
            <Circle
                ref={q1}
                size={stateSize}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-400, -200]}
            />
            <Circle
                ref={q2}
                size={stateSize}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[0, -200]}
            />
            <Circle
                ref={q3}
                size={stateSize}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[400, -200]}
            />
            <Circle
                ref={q4}
                size={stateSize}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[-200, 200]}
            />
            <Circle
                ref={q5}
                size={stateSize}
                stroke={stroke}
                lineWidth={lineWidth}
                position={[200, 200]}
            />
            
            <Line
                ref={q1q2}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q1, q2, 0, Math.PI)}
                endArrow
            />
            <Line
                ref={q2q3}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q2, q3, 0, Math.PI)}
                endArrow
            />
            <Line
                ref={q1q4}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q1, q4, 6*Math.PI/4,  3*Math.PI/4)}
                endArrow
            />
            <Line
                ref={q3q5}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q3, q5, 5*Math.PI/4, Math.PI/4)}
                endArrow
            />
            <Line
                ref={q4q5}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q4, q5, 0, Math.PI)}
                endArrow
            />
            <Line
                ref={q2q4}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q2, q4, 5*Math.PI/4, Math.PI/4)}
                endArrow
            />
            <Line
                ref={q2q5}
                lineWidth={lineWidth}
                stroke={stroke}
                points={getPointsAtAngles(q2, q5, 7*Math.PI/4, 3*Math.PI/4)}
                endArrow
            />
        </Rect>
    )
    yield* all(
        g1().scale(0,1),
        comp().scale(1,1)
    )

    const stateA = createRef<Circle>();
    const stateB = createRef<Circle>();
    const transitionAB = createRef<Line>();
    const transitionBA = createRef<Line>();
    const component = createRef<Rect>();
    view.add(
        <Rect ref={component} scale={0}>
            <Circle
            ref={stateA}
            size={stateSize}
            stroke={lightRed}
            lineWidth={lineWidth}
            position={[-200, 0]}
            />
            <Circle
            ref={stateB}
            size={stateSize}
            stroke={lightRed}
            lineWidth={lineWidth}
            position={[200, 0]}
            />
            
            <Line
            ref={transitionAB}
            lineWidth={lineWidth}
            stroke={lightRed}
            points={getPointsAtAngles(stateA, stateB, 0, Math.PI)}
            endArrow
            />
            <Line
                ref={transitionAB}
                lineWidth={lineWidth}
                stroke={lightRed}
                points={[]}
                endArrow
            />
        </Rect>
    )
    yield* all(
        comp().position(comp().position().addX(-400),1),
        component().scale(1,1),
        component().position(component().position().addX(400),1),
    )
    yield* waitUntil('to_next');
    yield* component().scale(0,1);
    yield* comp().scale(0, 1);
});


function drawLineAtAngles(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>, angle1: number, angle2: number): Vector2[] {
    let p1 = getPointOnCircle(circle1(), angle1);
    let p2 = getPointOnCircle(circle2(), angle2);
    return [
        p1,
        new Vector2((p2.x - p1.x) / 2 + p1.x, p1.y - 100),
        p2
    ];
}

function getPointsAtAngles(circle1: Reference<Circle>, circle2: Reference<Circle>, angle1: number, angle2: number): [Vector2, Vector2] {
    let p1 = getPointOnCircle(circle1(), angle1);
    let p2 = getPointOnCircle(circle2(), angle2);
        return [
            p1,
            p2,
        ]
    
}

function getCurvedArrowTop(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>): ThreadGenerator {
    let p1 = getPointOnCircle(circle1(), Math.PI / 4);
    let p2 = getPointOnCircle(circle2(), 3 * Math.PI / 4);
    return all(
        line().points([
            p1, 
            [(p2.x - p1.x) / 2 + p1.x, p1.y - 100],
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
