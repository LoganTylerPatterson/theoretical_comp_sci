import { Circle, Line, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view){
  const s1 = createRef<Circle>();
  const s2 = createRef<Circle>();
  const s3 = createRef<Circle>();
  
  const l0 = createRef<Line>();
  const l1 = createRef<Line>();
  const l2 = createRef<Line>();
  
  const lineWidth = 4;
  const stroke = "cornflowerblue";
  const lightRed = "coral";
  
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
          position={[-550,0]}
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
        points={[[0, 0],[0, 0],[1,0]]}
        radius={500}
        endArrow  
      />
      <Circle
          ref={s3}
          size={0}
          stroke={stroke}
          lineWidth={lineWidth}
          position={[550, 0]}
      />
    </>
  )

  yield* all(
	s1().size(120, .5),
	s2().size(120, .5),
	s3().size(120, .5),
  );

  yield * all(
	drawStartStateArrow(l0, s1),
	drawTopTransitionArrow(s1, s2, l1),
	drawTopTransitionArrow(s2, s3, l2)
)

  yield* waitUntil('showPath');

  yield* l0().stroke(lightRed, .5);
  yield* s1().stroke(lightRed, 1);
  yield* l0().stroke(stroke, .5);
  yield* l1().stroke(lightRed, .5);
  yield* all(
    s1().stroke(stroke, 1),
    s2().stroke(lightRed, 1),
    l1().stroke(stroke, 1)
  );
  yield* all(
    l2().stroke(lightRed, 1),
    s3().stroke(lightRed, 1),
    s2().stroke(stroke, 1)
  );

  yield* waitUntil('end');
  yield* all(
    l0().opacity(0, 1),
    l1().opacity(0, 1),
    l2().opacity(0, 1),
    s1().opacity(0, 1),
    s2().opacity(0, 1),
    s3().opacity(0, 1),
  )
});

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
    arrow().endArrow(true , 1)
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
