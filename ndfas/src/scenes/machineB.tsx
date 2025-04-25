import { Circle, drawLine, Img, Latex, Line, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, createSignal, Reference, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
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
    const fontSize = createSignal(0);
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
    const s2Final = createRef<Circle>();
    const s3 = createRef<Circle>();
    const s4 = createRef<Circle>();
    const s4Final = createRef<Circle>();
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
                position={[-240,-40]}
            />
            <Line
                ref={ts1s2}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                endArrow
            />
            <Latex  
                ref={ls1s2}
                fontSize={fontSize}
                position={[-170, -150]}
                tex={"\\varepsilon"}
                fill={white}
            />
            <Line
                ref={ts1s4}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                endArrow
            />
            <Latex  
                ref={ls1s4}
                fontSize={fontSize}
                position={[-170, 70]}
                tex={"\\varepsilon"}
                fill={white}
            />
            //TOP PART
            //S2
            <Circle
                ref={s2}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[-40, -220]}
            >
               <Circle
                    ref={s2Final}
                    stroke={blue}
                    lineWidth={lineWidth}
                    size={0}
                />
            </Circle>
            <Line
                ref={ts2s3}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                radius={300}
                endArrow
            />
            <Latex  
                ref={ls2s3}
                fontSize={fontSize}
                position={[85, -325]}
                tex={"0"}
                fill={white}
            />
            //S3
            <Circle
                ref={s3}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[220, -220]}
            >
               
            </Circle>
            <Line
                ref={ts3s2}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                radius={300}
                end={0}
                endArrow
            />
            <Latex  
                ref={ls3s2}
                fontSize={fontSize}
                position={[85, -115]}
                tex={"0"}
                fill={white}
            />
            //BOTTOM machine
            //s4
            <Circle
                ref={s4}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[-40, 140]}
            >
                <Circle
                    ref={s4Final}
                    stroke={blue}
                    lineWidth={lineWidth}
                    size={0}
                />
            </Circle>
            <Line
                ref={ts4s5}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                endArrow
            />
            <Latex
                ref={ls4s5}
                fontSize={fontSize}
                position={[90, 110]}
                tex={"0"}
                fill={white}
            />
            //s5
            <Circle
                ref={s5}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[220, 140]}
            />
            <Line
                ref={ts5s6}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                endArrow
            />
            <Latex
                ref={ls5s6}
                fontSize={fontSize}
                position={[185, 260]}
                tex={"0"}
                fill={white}
            />

            //s6
            <Circle
                ref={s6}
                stroke={blue}
                lineWidth={lineWidth}
                size={0}
                position={[90, 380]}
            />
            <Line
                ref={ts6s4}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                end={0}
                endArrow
            />
            <Latex
                ref={ls6s4}
                fontSize={fontSize}
                position={[-10, 260]}
                tex={"0"}
                fill={white}
            />

        </Rect>
    );

    yield* all(
        s1().size(stateSize,1),
        s2().size(stateSize,1),
        s2Final().size(stateSize - 20, 1),
        s3().size(stateSize,1),
        s4().size(stateSize,1),
        s4Final().size(stateSize -20, 1),
        s5().size(stateSize,1),
        s6().size(stateSize,1),
    );

    yield* all(
        drawStartStateArrow(startArrow, s1),
        drawLineAtAngles(s1, s2, ts1s2, Math.PI / 4, 5 * Math.PI / 4),
        drawLineAtAngles(s1, s4, ts1s4, 7 * Math.PI / 4, 3* Math.PI / 4),
        drawTopTransitionArrow(s2, s3, ts2s3),
        drawBottomTransitionArrow(s2, s3, ts3s2),
        drawLineAtAngles(s4, s5, ts4s5, 0, Math.PI),
        drawLineAtAngles(s5, s6, ts5s6, 4 * Math.PI / 3, Math.PI / 3),
        drawLineAtAngles(s6, s4, ts6s4, 2 * Math.PI / 3, 5 * Math.PI / 3),
    )

    yield* fontSize(32, 1);

    yield* waitUntil('both paths');
    yield* all(
        flash(ts1s2, blue, lightRed, 1.5),
        flash(ts1s4, blue, lightRed, 1.5)
    )

    circleBranch1();
    circleBranch2();

    function* circleBranch1() {
        yield* flash(ts2s3, blue, lightRed, 1);
        yield* flash(ts3s2, blue, lightRed, 1);
    }

    function* circleBranch2() {
        yield* flash(ts4s5, blue, lightRed, 1);
        yield* flash(ts5s6, blue, lightRed, 1);
        yield* flash(ts6s4, blue, lightRed, 1);
    }

    yield* waitFor(20);
});
