import { makeScene2D, Node, Rect, Circle, Line, Layout, Latex } from '@motion-canvas/2d';
import { all, createRef, easeInOutCubic, waitFor, Vector2, Signal, Reference, ThreadGenerator } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const LIGHTBLUEGREEN = '#85ffda';
  const PI = Math.PI

  const machine1 = createRef<Layout>();

  // Q`
  const state1 = createRef<Circle>();
  const state2 = createRef<Circle>();

  // transition function
  const t1 = createRef<Line>();
  const t2 = createRef<Circle>();
  const t3 = createRef<Circle>();
  const t4 = createRef<Line>();

  // q0 arrow
  const q0arrow = createRef<Line>();

  view.add(
    <>
      <Layout ref={machine1} direction={'row'} gap={200} layout>
        <Circle
          ref={state1}
          size={0}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
        />

        <Circle
          ref={state2}
          size={0}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
        />

        // transition line
        <Line
          layout={false}
          ref={t1}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
          points={[
            0, 0
          ]}
          radius={200}
          endArrow
        />

        <Line
          layout={false}
          ref={t4}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
          points={[
            0, 0
          ]}
          radius={200}
          startArrow
        />

        // self cirlce
        <Circle
          ref={t2}
          layout={false}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
          startAngle={135}
          endAngle={45}
          x={state1().x}
          endArrow
        />

        <Circle
          ref={t3}
          layout={false}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
          startAngle={135}
          endAngle={45}
          x={state2().x}
          endArrow
        />

        <Line
          layout={false}
          ref={q0arrow}
          stroke={LIGHTBLUEGREEN}
          lineWidth={4}
          radius={200}
          points={[state1().position().x, state1().position().y]}
          endArrow
        />
      </Layout>
    </>
  );

  // grow states
  yield* all(
    state1().size(160, 1),
    state2().size(160, 1),
  );

  yield* drawSelfTransitionArrowTop(state1, t2, null)

  yield* drawTopTransitionArrow(state1, state2, t1, null);

  yield* drawBottomTransitionArrow(state1, state2, t4, null);

  yield* drawSelfTransitionArrowTop(state2, t3, null);

  yield* drawStartStateArrow(q0arrow, state1);
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
  )
}

function drawSelfTransitionArrowTop(
  state: Reference<Circle>,
  circle: Reference<Circle>,
  t: Reference<Latex>,
  size: number = 120,
  yOffset: number = 45
): ThreadGenerator {
  return all(
    circle().size(size, 1),
    circle().x(state().x(), 1),
    circle().y(state().y() - state().width() + yOffset, 1)
  )
}

function drawTopTransitionArrow(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>, text: Reference<Latex>): ThreadGenerator {
  let p1 = getPointOnCircle(circle1(), Math.PI / 4);
  let p2 = getPointOnCircle(circle2(), 3 * Math.PI / 4);
  return line().points([
    p1,
    [(p2.x - p1.x) / 2 + p1.x, p1.y - 100],
    p2,
  ], 1)
}

function drawBottomTransitionArrow(circle1: Reference<Circle>, circle2: Reference<Circle>, line: Reference<Line>, text: Reference<Latex>): ThreadGenerator {
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

function getPointOnCircle(circle: Circle, radians: number): Vector2 {
  const radius = circle.width() / 2;
  const position = circle.position();
  const result = new Vector2(
    Math.cos(-radians) * radius + position.x,
    Math.sin(-radians) * radius + position.y
  );
  return result
}