import { Circle, Img, Latex, Line, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
import { 
    drawLineAtAngles,
    drawStartStateArrow,
    drawSelfTransitionArrowTop,
    drawTopTransitionArrow,
    drawBottomTransitionArrow,
    getPointOnCircle,
    flash,
    flashAndHold
} from '../helpers';

export default makeScene2D(function* (view) {
    const fontSize = 28;
    const blue = 'cornflowerblue';
    const white = 'white';
    const lightRed = 'coral';
    const stateSize = 120;
    const lineWidth = 4;
    const exampleStringB = createRef<Latex>();

    const startArrow = createRef<Line>();
    const machineBNfa = createRef<Rect>();
    const s1 = createRef<Circle>();
    const s2 = createRef<Circle>();
    const s3 = createRef<Circle>();
    const s4 = createRef<Circle>();
    const s5 = createRef<Circle>();
    const s6 = createRef<Circle>();

    const ts1s2 = createRef<Line>();
    const ts2s3 = createRef<Line>();
    const ts3s2 = createRef<Line>();
    const ts1s4 = createRef<Line>();
    const ts4s5 = createRef<Line>();
    const ts5s6 = createRef<Line>();
    const ts6s4 = createRef<Line>();

    const ls1s2 = createRef<Latex>();
    const ls2s3 = createRef<Latex>();
    const ls3s2 = createRef<Latex>();
    const ls1s4 = createRef<Latex>();
    const ls4s5 = createRef<Latex>();
    const ls5s6 = createRef<Latex>();
    const ls6s4 = createRef<Latex>();

    view.add(
        <Rect ref={machineBNfa}>
            <Line
                ref={startArrow}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            //S1
            <Circle
                ref={s1}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[-240,0]}
            />
            <Line
                ref={ts1s2}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            <Line
                ref={ts1s4}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            //TOP PART
            //S2
            <Circle
                ref={s2}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[-120, 120]}
            />
            <Line
                ref={ts2s3}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            //S3
            <Circle
                ref={s3}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[-120, -120]}
            >
                <Circle
                    stroke={blue}
                    lineWidth={lineWidth}
                    size={stateSize - 20}
                />
            </Circle>
            <Line
                ref={ts3s2}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            //BOTTOM machine
            //s4
            <Circle
                ref={s4}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[120, 120]}
            >
                <Circle
                    stroke={blue}
                    lineWidth={lineWidth}
                    size={stateSize - 20}
                />
            </Circle>
            <Line
                ref={ts4s5}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            >
                <Latex  
                    ref={ls4s5}
                    fontSize={fontSize}
                    position={[-20, 0]}
                    tex={"0"}
                    fill={white}
                />
            </Line>
            //s5
            <Circle
                ref={s5}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[120, -120]}
            />
            <Line
                ref={ts5s6}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
            //s6
            <Circle
                ref={s6}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[240, 0]}
            />
            <Line
                ref={ts5s6}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
            />
        </Rect>
    );
    yield* all(
        s1().size(stateSize,1),
    )
    yield* drawStartStateArrow(startArrow, s1);
})