import { makeScene2D, Node, Rect, Circle, Line, Layout, Latex } from '@motion-canvas/2d';
import { all, createRef, easeInOutCubic, waitFor, Vector2, Signal, Reference, ThreadGenerator } from '@motion-canvas/core';

export function drawStartStateArrow(arrow: Reference<Line>, circle: Reference<Circle>): ThreadGenerator {
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