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

import A_Machine from '../../images/A_Machine.png';

export default makeScene2D(function* (view) {
    const fontSize = 28;
    const blue = 'cornflowerblue';
    const white = 'white';
    const lightRed = 'coral';
    const stateSize = 120;
    const lineWidth = 4;
    const exampleStringA = createRef<Latex>();

    const machineAnfa = createRef<Rect>();
    const startArrow = createRef<Line>();
    const s1 = createRef<Circle>();
    const s2 = createRef<Circle>();
    const s3 = createRef<Circle>();
    const s4 = createRef<Circle>();

    const ts1s1 = createRef<Circle>();
    const ts1s2 = createRef<Line>();
    const ts2s3 = createRef<Line>();
    const ts3s4 = createRef<Line>();
    const ts4s4 = createRef<Circle>();

    const ls1s1 = createRef<Latex>();
    const ls1s2 = createRef<Latex>();
    const ls2s3 = createRef<Latex>();
    const ls3s4 = createRef<Latex>();
    const ls4s4 = createRef<Latex>();
    view.add(
        <Rect ref={machineAnfa}>
            <Latex
                ref={exampleStringA}
                fill={white}
                fontSize={32}
                position={[0, -450]}
                tex={"1011000110100"}
                scale={0}
            />
            <Line
                ref={startArrow}
                stroke={blue}
                lineWidth={lineWidth}
                points={[]}
                endArrow
                />
            //S1 and Transitions
            <Circle
                ref={s1}
                stroke={blue}
                size = {stateSize}
                position={[-240*2, 0]}
                lineWidth={lineWidth}
                scale={0}
                />
            <Circle
                ref={ts1s1}
                stroke={blue}
                lineWidth={lineWidth}
                startAngle={135}
                endAngle={45}
                x={s1().x}
                endArrow
                />
            <Latex
                ref={ls1s1}
                fill={white}
                fontSize={0}
                position={ts1s1().position().addY(-160)}
                tex={"0, 1"}
                />
            <Line
                ref={ts1s2}
                stroke={blue}
                lineWidth={lineWidth}
                radius={300}
                points={[s1().position()]}
                endArrow
                />
            <Latex
                ref={ls1s2}
                fill={white}
                fontSize={0}
                position={[-360, -100]}
                tex={"1"}
                />
            //S2 and Transitions
            <Circle
                ref={s2}
                stroke={blue}
                position={[-240, 0]}
                size={stateSize}
                lineWidth={lineWidth}
                scale={0}
                />
            <Line
                ref={ts2s3}
                stroke={blue}
                lineWidth={lineWidth}
                radius={300}
                points={[s2().position()]}
                endArrow
                />
            <Latex
                ref={ls2s3}
                fill={white}
                fontSize={0}
                position={[-125, -100]}
                tex={"0, 1"}
                />

            //S3
            <Circle
                ref={s3}
                stroke={blue}
                position={[0, 0]}
                size={stateSize}
                lineWidth={lineWidth}
                scale={0}
                />
            <Line
                ref={ts3s4}
                stroke={blue}
                lineWidth={lineWidth}
                radius={300}
                points={[s3().position()]}
                endArrow
                />
            <Latex
                ref={ls3s4}
                fill={white}
                fontSize={0}
                position={[119, -100]}
                tex={"0, 1"}
                />

            //S4
            <Circle 
                ref={s4}
                stroke={blue}
                position={[240, 0]}
                size={stateSize}
                lineWidth={lineWidth}
                scale={0}
                >
                    <Circle
                        stroke={blue}
                        size={stateSize-20}
                        lineWidth={lineWidth}
                        />
            </Circle>
        </Rect>
    )
    yield* exampleStringA().scale(1, 1);
    yield* all(
        s1().scale(1, 1),
        s2().scale(1, 1),
        s3().scale(1, 1),
        s4().scale(1, 1),
    )
    yield* all(
        drawStartStateArrow(startArrow, s1),
        drawSelfTransitionArrowTop(s1, ts1s1, stateSize - 20, 40),
        drawTopTransitionArrow(s1, s2, ts1s2),
        drawTopTransitionArrow(s2, s3, ts2s3),
        drawTopTransitionArrow(s3, s4, ts3s4),
        ls1s1().fontSize(fontSize, 1),
        ls1s2().fontSize(fontSize, 1),
        ls2s3().fontSize(fontSize, 1),
        ls3s4().fontSize(fontSize, 1),
    )
    yield* waitUntil("show_repeat");
    yield* all(
        flash(s1, blue, lightRed),
        flash(ts1s1, blue, lightRed),
    )
    yield* all(
        flash(s1, blue, lightRed),
        flash(ts1s1, blue, lightRed),
    )
    yield* flash(ts1s2, blue, lightRed);
    yield* flashAndHold(s2, lightRed);
    yield* all(
        flashAndHold(s2, blue),
        flash(ts2s3, blue, lightRed),
        flashAndHold(s3, lightRed),
    )
    yield* all(
        flashAndHold(s3, blue),
        flash(ts3s4, blue, lightRed),
        flashAndHold(s4, lightRed),
    )

    yield* waitUntil("not_Drawing_that");
    const machineAdfa = createRef<Rect>();
    view.add(
        <Rect ref={machineAdfa} opacity={0}>
            <Latex
                fill={white}
                fontSize={32}
                position={[0, -450]}
                tex={"*no\\ way\\ i\\ am\\ animating\\ that*"}
                />
            <Img src={A_Machine} scale={0.5}/>
        </Rect>
    ) 
    
    yield* machineAnfa().opacity(-1.2, 1);
    yield* machineAdfa().opacity(1 ,1); 
    yield* waitFor(3 )
    yield* all(
        machineAdfa().scale(0, 1),
        machineAnfa().scale(0, 1), 
    )
})

