import { Circle, Line, makeScene2D } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";


export default makeScene2D(function* (view){
  const s1 = createRef<Circle>();
  const s2 = createRef<Circle>();
  const s3 = createRef<Circle>();
  
  const l1 = createRef<Line>();
  const l2 = createRef<Line>();
  
  const lineWidth = 4;
  const stroke = "cornflowerblue";
  
  view.add(
    <>
      <Circle
          ref={s1}
          size={0}
          stroke={stroke}
          lineWidth={lineWidth}
      />
      <Line
        ref={l1}
        lineWidth={lineWidth}
        stroke={stroke}
        points={[]}
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
        points={[]}
      />
      <Circle
          ref={s3}
          size={0}
          stroke={stroke}
          lineWidth={lineWidth}
      />
    </>
  )

  yield* all(
    s1().size(120, 1),
  );
});