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
	flashAndHold,
	shiftHorizontal,
	shiftVertical
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
		<Rect ref={nfa} scale={1}>
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

	yield* waitUntil("scale_and_move");
	yield* all(
		nfa().scale(0.75, 3),
		shiftHorizontal(nfa, -600, 3),
	)
	yield* shiftVertical(nfa, 100, 3);

	const k2 = createRef<Latex>();
	view.add(
		<Latex
			ref={k2}
			fontSize={fontSize() + 20}
			position={[0, 0]}
			tex={""}
			fill={white}
		/>
	)
	yield* waitUntil("show_k2");
	yield* k2().tex("2^k", 1);

	yield* waitUntil("show_states");
	yield* k2().tex("", 1);

	const dfaFinalStateSize = createSignal(0);

	const d0 = createRef<Circle>();
	const td0d0 = createRef<Circle>();
	const ld0d0 = createRef<Latex>();
	const d0l = createRef<Latex>();
	const d1 = createRef<Circle>();
	const d1l = createRef<Latex>();
	const td1d0 = createRef<Line>();
	const ld1d0 = createRef<Latex>();
	const td1d2 = createRef<Line>();
	const ld1d2 = createRef<Latex>();
	const d2 = createRef<Circle>();
	const d2l = createRef<Latex>();
	const td2d3 = createRef<Line>();
	const ld2d3 = createRef<Latex>();
	const td2d23 = createRef<Line>();
	const ld2d23 = createRef<Latex>();
	const d3 = createRef<Circle>();
	const d3l = createRef<Latex>();
	const td3d0 = createRef<Line>();
	const ld3d0 = createRef<Latex>();
	const td3d13 = createRef<Line>();
	const ld3d13 = createRef<Latex>();
	const d12 = createRef<Circle>();
	const d12l = createRef<Latex>();
	const td12d23 = createRef<Line>();
	const ld12d23 = createRef<Latex>();
	const d13 = createRef<Circle>();
	const d13l = createRef<Latex>();
	const td13d23 = createRef<Line>();
	const ld13d23 = createRef<Latex>();
	const td13d13 = createRef<Circle>();
	const ld13d13 = createRef<Latex>();
	const d23 = createRef<Circle>();
	const d23l = createRef<Latex>();
	const td23d3 = createRef<Line>();
	const ld23d3 = createRef<Latex>();
	const td23d123 = createRef<Line>();
	const ld23d123 = createRef<Latex>();
	const d123 = createRef<Circle>();
	const d123l = createRef<Latex>();
	const td123d123 = createRef<Circle>();
	const ld123d123 = createRef<Latex>();
	const td123d23 = createRef<Line>();
	const ld123d23 = createRef<Latex>();
	const dfa = createRef<Rect>();

	view.add(
		<Rect ref={dfa} scale={1} position={[300, 100]}>
			<Circle
				ref={d0}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[-300, -300]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d0l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"\\emptyset"}
					fill={white}
				/>
			</Circle>
			<Circle
				ref={td0d0}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[-300, -300]}
			/>
			<Latex
				ref={ld0d0}
				fontSize={fontSize}
				position={[-300, -300]}
				tex={"a, b"}
				fill={white}
			/>
			<Circle
				ref={d1}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[-0, -300]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d1l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"1"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td1d0}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld1d0}
				fontSize={fontSize}
				position={[0, -300]}
				tex={"a"}
				fill={white}
			/>
			<Line
				ref={td1d2}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld1d2}
				fontSize={fontSize}
				position={[0, -300]}
				tex={"b"}
				fill={white}
			/>
			<Circle
				ref={d2}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[300, -300]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d2l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"2"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td2d3}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld2d3}
				fontSize={fontSize}
				position={[300, -300]}
				tex={"b"}
				fill={white}
			/>
			<Line
				ref={td2d23}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld2d23}
				fontSize={fontSize}
				position={[300, -300]}
				tex={"a"}
				fill={white}
			/>
			<Circle
				ref={d3}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[-300, 100]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d3l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"3"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td3d0}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld3d0}
				fontSize={fontSize}
				position={[-300, 100]}
				tex={"b"}
				fill={white}
			/>
			<Line
				ref={td3d13}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld3d13}
				fontSize={fontSize}
				position={[0, 100]}
				tex={"a"}
				fill={white}
			/>
			<Circle
				ref={d12}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[600, -300]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d12l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"12"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td12d23}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld12d23}
				fontSize={fontSize}
				position={[600, -300]}
				tex={"a"}
				fill={white}
			/>
			<Circle
				ref={d13}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[0, 100]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d13l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"13"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td13d23}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld13d23}
				fontSize={fontSize}
				position={[0, 100]}
				tex={"b"}
				fill={white}
			/>
			<Circle
				ref={td13d13}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[0, 100]}
				startAngle={-45}
				endAngle={-135}
			/>
			<Latex
				ref={ld13d13}
				fontSize={fontSize}
				position={[0, 100]}
				tex={"a"}
				fill={white}
			/>
			<Circle
				ref={d23}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[300, 100]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d23l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"23"}
					fill={white}
				/>
			</Circle>
			<Line
				ref={td23d3}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld23d3}
				fontSize={fontSize}
				position={[300, 100]}
				tex={"a"}
				fill={white}
			/>
			<Line
				ref={td23d123}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld23d123}
				fontSize={fontSize}
				position={[300, 100]}
				tex={"b"}
				fill={white}
			/>
			<Circle
				ref={d123}
				lineWidth={lw}
				stroke={blue}
				size={0}
				position={[600, 100]}
			>
				<Circle
					lineWidth={lw}
					stroke={blue}
					size={dfaFinalStateSize}
				/>
				<Latex
					ref={d123l}
					fontSize={fontSize}
					position={[0, 0]}
					tex={"123"}
					fill={white}
				/>
			</Circle>
			<Circle
				ref={td123d123}
				lineWidth={lw}
				stroke={blue}
				startAngle={-45}
				endAngle={-135}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld123d123}
				fontSize={fontSize}
				position={[600, 100]}
				tex={"a,b"}
				fill={white}
			/>
			<Line
				ref={td123d23}
				lineWidth={lw}
				stroke={blue}
				points={[]}
				end={0}
				endArrow
			/>
			<Latex
				ref={ld123d23}
				fontSize={fontSize}
				position={[600, 100]}
				tex={"b"}
				fill={white}
			/>
		</Rect>
	)

	yield* waitUntil("show_dfa_states");
	const err = createRef<Latex>();
	view.add(<Latex ref={err} fontSize={fontSize() + 20} position={[0, 0]} tex={"*\\ NO\\ STATE\\ \\ 0\\ * \\ :)"} fill={white} />);

	yield* d1().size(120, 1);
	yield* d2().size(120, 1);

	yield* all(d3().size(120, 1), err().opacity(0, 1));
	yield* d12().size(120, 1);
	yield* d13().size(120, 1);
	yield* d23().size(120, 1);
	yield* d123().size(120, 1);
	yield* d0().size(120, 1);


	yield* waitUntil("find_start_state");
	yield* flashAndHold(n1, white);
	yield* all(
		flashAndHold(tn1n3, white),
		flashAndHold(n3, white)
	)


	yield* waitUntil("combine_start_state");
	yield* flash(d13, blue, white, 5);
	yield* all(
		d13().stroke(blue, 1),
		n1().stroke(red, 1),
		tn1n3().stroke(red, 1),
		n3().stroke(red, 1),
	)

	yield* waitUntil("show_end_state");
	yield* flashAndHold(n1, white)

	yield* waitUntil("find_end_states");
	yield* all(
		flashAndHold(d1, white),
		flashAndHold(d13, white),
		flashAndHold(d23, white),
		flashAndHold(d123, white),
	)

	yield* waitUntil("transitions");
	yield* all(
		d1().stroke(blue, 1),
		d13().stroke(blue, 1),
		d23().stroke(blue, 1),
		d123().stroke(blue, 1),
	)

	yield* waitUntil("empty_state_ab");
	yield* drawSelfTransitionArrowTop(d0, td0d0);


	yield* waitFor(20);
});
