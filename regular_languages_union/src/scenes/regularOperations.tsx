import { makeScene2D, Polygon } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const language = createRef<Polygon>();
    view.add(
        <Polygon
          ref={language}
          sides={2}
          size={0}
          fill={'white'}
          />
    );
    yield * all(
      language().size(32, 1.5),
      language().sides(6, 2)
    );

    const polygon = createRef<Polygon>();
    view.add(
        <Polygon
          ref={polygon}
          sides={0}
          size={160}
          stroke={'lightseagreen'}
          lineWidth={4}
        />
    );

    yield * polygon().sides(8, 3.5)

    
});
