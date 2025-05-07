import { Circle, drawLine, Img, Latex, Line, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { all, createRef, createSignal, fadeTransition, Reference, sequence, ThreadGenerator, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
import {
	drawLineAtAngles,
	drawStartStateArrow,
	drawSelfTransitionArrowTop,
	drawSelfTransitionArrowBottom,
	drawTopTransitionArrow,
	drawBottomTransitionArrow,
	getPointOnCircle,
	flash,
	flashAndHold
} from '../../helpers';

export default makeScene2D(function* (view) {
	const red = "coral";
	const blue = "cornflowerblue";
	const white = "white";
	const lw = 4;

	const n1 = createRef<Circle>();
	const sa = createRef<Line>();
	const tn1n2 = createRef<Line>();
	const ln1n2 = createRef<Latex>();
	const tn1n3 = createRef<Line>();
	const ln1n3 = createRef<Latex>();

	const n2 = createRef<Circle>();
	const tn2n2 = createRef<Circle>();
	const tn2n3 = createRef<Line>();
	const ln2n2 = createRef<Latex>();
	const ln2n3 = createRef<Latex>();

	const n3 = createRef<Circle>();
	const tn3n1 = createRef<Line>();
	const ln3n1 = createRef<Latex>();

	const stateSize = createSignal(0);
	const acceptState = createSignal(0);
	const fontSize = createSignal(0);

	const nfa = createRef<Rect>();

	view.add(
		<Rect ref={nfa} scale={.8}>
			<Circle
				ref={n1}
				lineWidth={lw}
				stroke={red}
				size={stateSize}
				position={[0, -350]}
			>
				<Circle
					lineWidth={lw}
					stroke={red}
					size={acceptState}
					position={[0, 0]}
				/>
				<Latex
					ref={ln2n2}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"1"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={sa}
				lineWidth={lw}
				stroke={red}
				points={[]}
				end={0}
				endArrow
			/>
			<Line
				ref={tn1n2}
				lineWidth={lw}
				stroke={red}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ln1n2}
				fontSize={fontSize}
				position={[-185, -140]}
				tex={"a"}
				fill={white}
			/>
			<Line
				ref={tn1n3}
				lineWidth={lw}
				stroke={red}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ln1n3}
				fontSize={fontSize}
				position={[90, -140]}
				tex={"\\varepsilon"}
				fill={white}
			/>
			<Circle
				ref={n2}
				lineWidth={lw}
				stroke={red}
				size={stateSize}
				position={[-350, 150]}
			>
				<Latex
					fontSize={fontSize}
					tex={"2"}
					fill={white}
					position={[0, 0]}
				/>
			</Circle>
			<Circle
				ref={tn2n2}
				lineWidth={lw}
				stroke={red}
				startAngle={-45}
				endAngle={-135}
				endArrow
			/>
			<Latex
				ref={ln2n2}
				fontSize={fontSize}
				position={[-350, 310]}
				tex={"a"}
				fill={white}
			/>
			<Line
				ref={tn2n3}
				lineWidth={lw}
				stroke={red}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ln2n2}
				fontSize={fontSize}
				position={[-350, 150]}
				tex={""}
				fill={blue}
			/>
			<Latex
				ref={ln2n3}
				fontSize={fontSize}
				position={[0, 180]}
				tex={"a,b"}
				fill={white}
			/>
			<Circle
				ref={n3}
				lineWidth={lw}
				stroke={red}
				size={stateSize}
				position={[350, 150]}
			>
				<Latex
					fontSize={fontSize}
					tex={"3"}
					fill={white}
					position={[0, 0]}
				/>
			</Circle>
			<Line
				ref={tn3n1}
				lineWidth={lw}
				stroke={red}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ln3n1}
				fontSize={fontSize}
				position={[240, -140]}
				tex={"a"}
				fill={white}
			/>
		</Rect>
	);

	yield* stateSize(120, 2);
	yield* drawStartStateArrow(sa, n1);

	yield* all(
		drawLineAtAngles(n1, n2, tn1n2, 5 * Math.PI / 4, Math.PI / 4),
		drawLineAtAngles(n2, n3, tn2n3, 0, Math.PI),
		drawSelfTransitionArrowBottom(n2, tn2n2),
		drawLineAtAngles(n1, n3, tn1n3, 5 * Math.PI / 3, 5 * Math.PI / 6),
		drawLineAtAngles(n3, n1, tn3n1, 2 * Math.PI / 4, 0),
	);

	yield* all(
		acceptState(100, 1)
	);
	yield* fontSize(32, 1);

	yield* waitFor(20);
});
