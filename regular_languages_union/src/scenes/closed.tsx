import { Circle, makeScene2D, Polygon } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const circle = createRef<Circle>();

    view.add(
        <Circle
            end={0}
            ref={circle}
            fill={"coral"}
            size={200}
        />
    )

    yield * all(
        circle().end(100, 10),
    );
    yield * waitFor(10);
});