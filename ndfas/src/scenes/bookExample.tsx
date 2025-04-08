import { Circle, Latex, Line, makeScene2D } from "@motion-canvas/2d";
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

  const lineWidth = 4;
  const stroke = "cornflowerblue";
  const lightRed = "coral"
  const white = "white"
  const labelSize = 32;

  view.add(
    <>
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
        position={[-550, 0]}
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
      />

      // S2 state and exit transitions
      <Circle
        ref={s2}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
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
      />

      // S3 state and exit transitions
      <Circle
        ref={s3}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[550, 0]}
      />
      <Line
        ref={ls3s4}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[[0, 0], [0, 0], [1, 0]]}
        radius={500}
        endArrow
      />
      <Latex
        ref={s3s4}
        tex={""}
        fill={white}
        fontSize={labelSize}
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
      />
    </>
  )

  yield* s1().size(120, 1)
  yield* drawStartStateArrow(lstart, s1);
  yield* drawSelfTransitionArrowTop(s1, ls1s1)

  yield* s2().size(120, 1)
  yield* drawTopTransitionArrow(s1, s2, ls1s2);

  yield* s3().size(120, 1)
  yield* drawTopTransitionArrow(s2, s3, ls2s3);

  yield* s3().size(120, 1)
  yield* drawTopTransitionArrow(s3, s4, ls3s4);

  yield* s4().size(120, 1)
  yield* drawSelfTransitionArrowTop(s4, ls4s4);
  
  // add the labels
  yield* all(
    s1s1().tex('0, 1', 1),
    s1s2().tex('1', 1),
    s2s3().tex('0, e', 1),
    s3s4().tex('1',1),
    s4s4().tex('0, 1', 1)
  )

  yield* waitUntil("q1_1")
  yield* s1().stroke("lightRed", 1);
  
  yield* waitFor(20);
});

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