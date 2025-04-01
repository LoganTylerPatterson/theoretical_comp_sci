import { makeScene2D } from "@motion-canvas/2d";


export default makeScene2D(function* (view){
  const s1 = creatRef<Circle>();
  const s2 = createRef<Circle>();
  const s3 = createRef<Circle>();
  
  const l1 = createRef<Line>();
  const l2 = createaRef<Line>();
  
  const lineWidth = 4;
  const stroke = "cornflowerblue";
  
  view.add(
    <>
      <Circle 
        ref={s1}
        lineWidth
        stroke
    </>
  )
});