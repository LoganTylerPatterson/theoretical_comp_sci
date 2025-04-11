import { Circle, Latex, Line, makeScene2D, Rect, Shape } from "@motion-canvas/2d";
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
        position={[845,-175]}
      />
    </Rect>
  )

  
  yield* all(
    s1().size(stateSize, 1),
    s2().size(stateSize, 1),
    s3().size(stateSize, 1),
    s4().size(stateSize, 1)
  );

  yield* all(
    drawStartStateArrow(lstart, s1),
    drawSelfTransitionArrowTop(s1, ls1s1),
    drawTopTransitionArrow(s1, s2, ls1s2),
    drawTopTransitionArrow(s2, s3, ls2s3),
    drawTopTransitionArrow(s3, s4, ls3s4),
    drawSelfTransitionArrowTop(s4, ls4s4)
  );
  
  // add the labels
  yield* all(
    s1s1().tex('0, 1', 1),
    s1s2().tex('1', 1),
    s2s3().tex('0, e', 1),
    s3s4().tex('1',1),
    s4s4().tex('0, 1', 1)
  )

  yield* waitUntil("q1_1")
  yield* s1().stroke(lightRed, 1);

  yield * waitUntil("copy");
  yield* all(
    machine1().scale(.5, 1),
    machine1().position(machine1().position().addY(-200), 1)
  )

  const cop1s1 = createRef<Circle>();
  const cop1s2 = createRef<Circle>();
  const cop1s3 = createRef<Circle>();
  const cop1s4 = createRef<Circle>();
  const cop1s4Final = createRef<Circle>();

  const cop1lstart = createRef<Line>();
  const cop1ls1s1 = createRef<Circle>();
  const cop1ls1s2 = createRef<Line>();
  const cop1ls2s3 = createRef<Line>();
  const cop1ls3s4 = createRef<Line>();
  const cop1ls4s4 = createRef<Circle>();

  const cop1s1s1 = createRef<Latex>();
  const cop1s1s2 = createRef<Latex>();
  const cop1s2s3 = createRef<Latex>();
  const cop1s3s4 = createRef<Latex>();
  const cop1s4s4 = createRef<Latex>();

  const machine2 = createRef<Rect>();

  view.add(
    <Rect ref={machine2}>
      // S1 exit transitions and state
      <Line
        ref={cop1lstart}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[]}
        radius={200}
        endArrow
      />
      <Circle
        ref={cop1s1}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[-850, 0]}
      />

      <Circle
          ref={cop1ls1s1}
          stroke={stroke}
          lineWidth={lineWidth}
          startAngle={135}
          endAngle={45}
          x={cop1s1().x}
          endArrow
      />
      <Latex
        ref={cop1s1s1}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[-850, -175]}
      />

      <Line
        ref={cop1ls1s2}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop1s1s2}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[-600, -130]}
      />

      // S2 state and exit transitions
      <Circle
        ref={cop1s2}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[-300, 0]}
      />
      <Line
        ref={cop1ls2s3}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[[0, 0], [0, 0], [1, 0]]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop1s2s3}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[0, -130]}
      />

      // S3 state and exit transitions
      <Circle
        ref={cop1s3}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[300, 0]}
      />
      <Line
        ref={cop1ls3s4}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[[350, -50], [351, -50]]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop1s3s4}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[560, -130]}
      />

      // S4 state and exit transtiions
      <Circle
        ref={cop1s4}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[850, 0]}
      />
      <Circle
        ref={cop1s4Final}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[850, 0]}
      />
      <Circle
          ref={cop1ls4s4}
          stroke={stroke}
          lineWidth={lineWidth}
          startAngle={135}
          endAngle={45}
          x={cop1s4().x}
          endArrow
      />
      <Latex
        ref={cop1s4s4}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[845,-175]}
      />
    </Rect>
  )

  yield* all(
    machine2().scale(.5, .1),
    cop1s1().size(stateSize, 1),
    cop1s2().size(stateSize, 1),
    cop1s3().size(stateSize, 1),
    cop1s4().size(stateSize, 1)
  );

  yield* all(
    drawStartStateArrow(cop1lstart, cop1s1),
    drawSelfTransitionArrowTop(cop1s1, cop1ls1s1),
    drawTopTransitionArrow(cop1s1, cop1s2, cop1ls1s2),
    drawTopTransitionArrow(cop1s2, cop1s3, cop1ls2s3),
    drawTopTransitionArrow(cop1s3, cop1s4, cop1ls3s4),
    drawSelfTransitionArrowTop(cop1s4, cop1ls4s4),
    cop1s1s1().tex('0, 1', 1),
    cop1s1s2().tex('1', 1),
    cop1s2s3().tex('0, e', 1),
    cop1s3s4().tex('1', 1),
    cop1s4s4().tex('0, 1', 1)
  );
  yield* waitUntil("move_q2")
  yield* cop1ls1s2().stroke(lightRed, 1);
  yield* cop1s2().stroke(lightRed,1);

  yield* waitUntil("show3");
  const cop2s1 = createRef<Circle>();
  const cop2s2 = createRef<Circle>();
  const cop2s3 = createRef<Circle>();
  const cop2s4 = createRef<Circle>();
  const cop2s4Final = createRef<Circle>();

  const cop2lstart = createRef<Line>();
  const cop2ls1s1 = createRef<Circle>();
  const cop2ls1s2 = createRef<Line>();
  const cop2ls2s3 = createRef<Line>();
  const cop2ls3s4 = createRef<Line>();
  const cop2ls4s4 = createRef<Circle>();

  const cop2s1s1 = createRef<Latex>();
  const cop2s1s2 = createRef<Latex>();
  const cop2s2s3 = createRef<Latex>();
  const cop2s3s4 = createRef<Latex>();
  const cop2s4s4 = createRef<Latex>();

  const machine3 = createRef<Rect>();

  view.add(
    <Rect ref={machine3}>
      // S1 exit transitions and state
      <Line
        ref={cop2lstart}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[]}
        radius={200}
        endArrow
      />
      <Circle
        ref={cop2s1}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[-850, 200]}
      />

      <Circle
        ref={cop2ls1s1}
        stroke={stroke}
        lineWidth={lineWidth}
        startAngle={135}
        endAngle={45}
        x={cop2s1().x}
        endArrow
      />
      <Latex
        ref={cop2s1s1}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[-850, 25]}
      />

      <Line
        ref={cop2ls1s2}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop2s1s2}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[-600, 70]}
      />

      // S2 state and exit transitions
      <Circle
        ref={cop2s2}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[-300, 200]}
      />
      <Line
        ref={cop2ls2s3}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[[0, 0], [0, 0], [1, 0]]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop2s2s3}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[0, 70]}
      />

      // S3 state and exit transitions
      <Circle
        ref={cop2s3}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[300, 200]}
      />
      <Line
        ref={cop2ls3s4}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[[350, 150], [351, 150]]}
        radius={500}
        endArrow
      />
      <Latex
        ref={cop2s3s4}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[560, 70]}
      />

      // S4 state and exit transtiions
      <Circle
        ref={cop2s4}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[850, 200]}
      />
      <Circle
        ref={cop2s4Final}
        size={0}
        stroke={stroke}
        lineWidth={lineWidth}
        position={[850, 200]}
      />
      <Circle
        ref={cop2ls4s4}
        stroke={stroke}
        lineWidth={lineWidth}
        startAngle={135}
        endAngle={45}
        x={cop2s4().x}
        endArrow
      />
      <Latex
        ref={cop2s4s4}
        tex={""}
        fill={white}
        fontSize={labelSize}
        position={[845, 25]}
      />
    </Rect>
  );

  yield* all(
    machine3().scale(.5, .1),
    machine3().position(machine3().position().addY(100),1),
    cop2s1().size(stateSize, 1),
    cop2s2().size(stateSize, 1),
    cop2s3().size(stateSize, 1),
    cop2s4().size(stateSize, 1)
  );

  yield* all(
    drawStartStateArrow(cop2lstart, cop2s1),
    drawSelfTransitionArrowTop(cop2s1, cop2ls1s1),
    drawTopTransitionArrow(cop2s1, cop2s2, cop2ls1s2),
    drawTopTransitionArrow(cop2s2, cop2s3, cop2ls2s3),
    drawTopTransitionArrow(cop2s3, cop2s4, cop2ls3s4),
    drawSelfTransitionArrowTop(cop2s4, cop2ls4s4),
    cop2s1s1().tex('0, 1', 1),
    cop2s1s2().tex('1', 1),
    cop2s2s3().tex('0, e', 1),
    cop2s3s4().tex('1', 1),
    cop2s4s4().tex('0, 1', 1)
  );

  yield* waitUntil('follow_epsilon');
  yield* cop2ls2s3().stroke(lightRed, 1);
  yield* cop2s3().stroke(lightRed,1);

  yield* waitUntil('flash_m1_q1')
  yield* s1().stroke("white", .5);
  yield* s1().stroke(lightRed, 1);

  yield* cop1s2().stroke("white", .5);
  yield* cop1s2().stroke(lightRed, 1);

  yield* waitUntil('die');
  yield* machine3().opacity(0,1);

  yield* all(
    machine2().position(machine2().position().addY(200), 2),
    machine3().position(machine3().position().addY(-100), 1),
    cop2s3().stroke(stroke, 1)
  )
  yield* machine3().opacity(1, 0);
  yield* waitFor(20);
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
