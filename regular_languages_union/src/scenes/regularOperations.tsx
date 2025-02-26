import { makeScene2D, Polygon } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const polygon = createRef<Polygon>();
    view.add(
        <Polygon
          ref={polygon}
          sides={2}
          size={160}
          stroke={'lightseagreen'}
          lineWidth={4}
        />
    );

    yield * polygon().sides(8, 4)
});
