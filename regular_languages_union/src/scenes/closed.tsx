import { Circle, Latex, Layout, Line, makeScene2D, Polygon, Shape } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const circle = createRef<Circle>();

    view.add(
        <Circle
            end={0}
            ref={circle}
            stroke={"coral"}
            size={200}
            lineWidth={4}
            endArrow
        />
    )

    yield * circle().end(1, 3);
    yield * waitUntil("showOperation");
    yield * all(
        circle().end(0, 1),
        circle().size(0, 1)
    )

    const l1 = createRef<Polygon>();
    const l2 = createRef<Polygon>();
    const res = createRef<Polygon>();
    const unionText = createRef<Latex>();
    const equals = createRef<Latex>();
    const operation = createRef<Latex>();
    //add them to the view, position the operations 
    view.add(
        <Layout ref={operation} layout gap={75} alignItems={'center'}>
            <Polygon
                ref={l1}
                sides={4}
                size={100}
                fill={'lightCoral'}
                end={0}
            />,
            <Latex
                ref={unionText}
                fill={'white'}
                fontSize={32}
                tex={'\\bigcup'}
                opacity={0.0}
            />
            <Polygon
                ref={l2}
                sides={4}
                size={100}
                fill={'CornFlowerBlue'}
                end={0}
            />,
            <Latex
                ref={equals}
                fill={'white'}
                fontSize={40}
                tex={'='}
                opacity={0.0}
            />
            <Polygon
                ref={res}
                sides={4}
                size={100}
                fill={'mediumpurple'}
                end={0}
            />
        </Layout>
    );

    yield * l1().end(1,1);
    yield * unionText().opacity(1.0, 1);
    yield * l2().end(1, 1);
    yield * equals().opacity(1.0, 1);
    yield * res().end(1, 1);

    const addOns = createRef<Layout>();

    view.add(
        <Layout ref={addOns} opacity={0.0}>
            <Latex
                tex={'+'}
                fill={'white'}
                fontSize={32}
                position={unionText().position().addY(75)}
            />
            <Latex
                tex={'*'}
                fill={'white'}
                fontSize={32}
                position={unionText().position().addY(-75)}
            />
        </Layout>
    )
    yield * addOns().opacity(1.0, 1);
    yield * waitFor(4);
    yield * addOns().opacity(0.0, 1);
    yield * operation().opacity(0.0, 1);

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
              stroke={'paleturquoise'}
              lineWidth={4}
            />
    
            <Circle
              ref={state2}
              size={0}
              stroke={"paleturquoise"}
              lineWidth={4}
            />
    
            // transition line
            <Line
              layout={false}
              ref={t1}
              stroke={"paleturquoise"}
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
              stroke={"paleturquoise"}
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
              stroke={"paleturquoise"}
              lineWidth={4}
              startAngle={135}
              endAngle={45}
              x={state1().x}
              endArrow
            />
    
            <Circle
              ref={t3}
              layout={false}
              stroke={"paleturquoise"}
              lineWidth={4}
              startAngle={135}
              endAngle={45}
              x={state2().x}
              endArrow
            />
    
            <Line
              layout={false}
              ref={q0arrow}
              stroke={"paleturquoise"}
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

      yield * waitFor(5);

      yield * all(
        shrink(state1, 1),
        shrink(state2, 1),
        shrink(t1, 1),
        shrink(t2, 1),
        shrink(t3, 1),
        shrink(t4, 1),
        shrink(q0arrow, 1),
        machine1().opacity(0.0, 1)
    )

    yield * waitUntil('showNDFA');
    const ndfaText = createRef<Latex>();
    view.add(
        <Latex ref={ndfaText}
            fill={'white'}
            tex={''}
            fontSize={32}
        />
    )
});

function shrink(node: Reference<Shape>, duration: number): ThreadGenerator {
    return node().scale(0, duration);
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
  const position = circle.absolutePosition();
  const result = new Vector2(
    Math.cos(-radians) * radius + position.x,
    Math.sin(-radians) * radius + position.y
  );
  return result
}