import { Latex, makeScene2D, Polygon } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const unionText = createRef<Latex>();
    const concatText = createRef<Latex>();
    view.add(
        <>
            <Latex
                ref={unionText}
                tex="union"
                fill="white"
                fontSize={32}
            />
            <Latex
                ref={concatText}
                tex="concat"
                fill="white"
                fontSize={32}
                top={unionText().bottom}
            />
            
        </>
    )

    yield * unionText().fontSize(16, 1);
});
