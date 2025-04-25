import { Circle, Line } from "@motion-canvas/2d";
import { all, Reference, ThreadGenerator, Vector2 } from "@motion-canvas/core";

export function flash(
    element: Reference<Circle | Line>, 
    color: string, 
    flashColor: string, 
    flashTime: number = 1
): ThreadGenerator {
    return all(
        element().stroke(flashColor, flashTime).to(color, flashTime),
        element().lineWidth(8, flashTime).to(4, flashTime),
    )
}

export function flashAndHold(
    element: Reference<Circle | Line>, 
    flashColor: string, 
    flashTime: number = 1
): ThreadGenerator {
    return all(
        element().stroke(flashColor, flashTime),
        element().lineWidth(8, flashTime).to(4, flashTime),
    )
}

export function drawLineAtAngles(
    circle1: Reference<Circle>, 
    circle2: Reference<Circle>, 
    line: Reference<Line>, 
    angle1: number, 
    angle2: number
): ThreadGenerator {
    let p1 = getPointOnCircle(circle1(), angle1);
    let p2 = getPointOnCircle(circle2(), angle2);
    line().points([p1, p2]);
    return all(
        line().end(1, 1),
    )
}

export function drawStartStateArrow(
    arrow: Reference<Line>, 
    circle: Reference<Circle>
): ThreadGenerator {
    let p1 = getPointOnCircle(circle(), Math.PI);
    p1.x -= circle().width();
    let p2 = getPointOnCircle(circle(), Math.PI);
    arrow().end(0);
    arrow().points([p1, p2]);
    return all(
        arrow().end(1, 1) // Ensure the arrow is visible
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

export function drawTopTransitionArrow(
    circle1: Reference<Circle>, 
    circle2: Reference<Circle>, 
    line: Reference<Line>
): ThreadGenerator {
    let p1 = getPointOnCircle(circle1(), Math.PI / 4);
    let p2 = getPointOnCircle(circle2(), 3 * Math.PI / 4);
    line().points([
        p1,
        [(p2.x - p1.x) / 2 + p1.x, p1.y - 100],
        p2,
    ])
    return all(line().end(1, 1));
 }

export function drawBottomTransitionArrow(
    circle1: Reference<Circle>, 
    circle2: Reference<Circle>, 
    line: Reference<Line>
): ThreadGenerator {
    let p1 = getPointOnCircle(circle2(), 5 * Math.PI / 4);
    let p2 = getPointOnCircle(circle1(), 7 * Math.PI / 4);
    line().points([
        p1,
        [(p2.x - p1.x) / 2 + p1.x, p1.y + 100],
        p2,
    ]);
    return all(
        line().end(1, 1),
    );
}

export function getPointOnCircle(circle: Circle, radians: number): Vector2 {
    const radius = circle.width() / 2;
    const position = circle.position();
    return new Vector2(
        Math.cos(-radians) * radius + position.x,
        Math.sin(-radians) * radius + position.y
    );
}