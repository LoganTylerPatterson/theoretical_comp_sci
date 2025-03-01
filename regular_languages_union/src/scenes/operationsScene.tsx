import { Latex, Layout, makeScene2D, Polygon, signal } from "@motion-canvas/2d";
import { all, createRef, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const group = createRef<Layout>();

    const unionText = createRef<Latex>();
    const concatText = createRef<Latex>();
    const starText = createRef<Latex>();
    const fontSize = 42

    view.add(
        <Layout ref={group} layout direction={'column'} gap={50} opacity={0.0} position={[-100, 100]}>
            <Latex
                ref={unionText}
                tex="Union: A \cup B = \{ x \mid x \in A \ or \ x \in B \}"
                fill="white"
                fontSize={42}
            />
            <Latex
                ref={concatText}
                tex="Concat: A \cdot B = \{ xy \mid x \in A \ and \ y \in B \}"
                fill="white"
                fontSize={42}
                top={unionText().bottom}
            />
            <Latex
                ref={starText}
                tex="Star: A^{*} = \{x_1x_2...x_k \mid k >= 0 \ and \ x_i \in A \}"
                fill="white"
                fontSize={42}
                top={concatText().bottom}
            />
        </Layout>
    )

    yield * all(
        group().opacity(1.0, 3),
        group().position([0, -0 ], 1)
    );

    yield * waitUntil('showLanguages');

    yield * all(
        unionText().opacity(.2, 1),
        concatText().opacity(.2, 1),
        starText().opacity(.2, 1),
    )
    
    const langGroup = createRef<Layout>();
    const lang1 = createRef<Latex>();
    const lang2 = createRef<Latex>();
    const exampleText = createRef<Latex>();

    view.add(
        <>
            <Layout ref={langGroup} layout gap={1000} position={[0, -450]} opacity={0.0}>
                <Latex
                    ref={lang1}
                    tex="A = \{ good, apple \}"
                    fill="IndianRed"
                    fontSize={42}
                    top={concatText().bottom}
                />
                <Latex
                    ref={lang2}
                    tex=" B = \{ bad, potato \}"
                    fill="CornflowerBlue"
                    fontSize={42}
                    top={concatText().bottom}
                />
            </Layout>
            <Latex
                ref={exampleText}
                tex=""
                fill="PaleGreen"
                fontSize={fontSize}
                position={[lang1().position().x, lang1().position().y - 450]}
                />
        </>
    );

    yield * langGroup().opacity(1.0, 1);
    yield * waitUntil('star');
    yield * starText().opacity(1.0, 1);

    yield * waitUntil('showStarLanguage')
    yield * all(
        lang1().opacity(0.4, 3),
        lang2().opacity(0.0, 3),
        exampleText().opacity(1.0, 3),
        exampleText().tex("\\{ \\_, good, apple, goodgoodapple, goodapplegood, applegood, appleapplegood, ... \\}", 3),
        exampleText().position.x(0, 3),
        exampleText().position.y(-200, 3)
    )
    
    yield * waitUntil('concat');
    yield * all(
        lang1().opacity(1, 3),
        lang2().opacity(1, 3),
        starText().opacity(0.2, 2),
        concatText().opacity(1.0, 2),
        exampleText().opacity(0.0, 1),
        exampleText().position([lang2().position.x(), lang2().position.y() - 450], 3)
    )

    yield * waitUntil('showConcatLanguage')

    const t1 = createRef<Latex>();
    const t2 = createRef<Latex>();
    const t3 = createRef<Latex>();
    const t4 = createRef<Latex>();
    view.add(
        <>
            <Latex
                ref={t1}
                tex="C = \{\ good,"
                fill="IndianRed"
                fontSize={42}
                position={[lang1().position().x, lang1().position().y - 450]}
                scale={0}
            />
            <Latex
                ref={t2}
                tex="\ apple,"
                fill="IndianRed"
                fontSize={42}
                top={[lang1().position().x, lang1().position().y - 450]}
                scale={0}
            />
            <Latex
                ref={t3}
                tex="\ bad,"
                fill="CornflowerBlue"
                fontSize={42}
                top={[lang2().position().x, lang2().position().y - 450]}
                scale={0}
            />
            <Latex
                ref={t4}
                tex="\ potato \}"
                fill="CornflowerBlue"
                fontSize={42}
                top={[lang2().position().x, lang2().position().y - 450]}
                scale={0}
            />
        </>
    );
    yield * all(
        t1().scale(1, 2),
        t1().left(unionText().left().addY(-150).addX(80), 2),
    )
    yield * all(
        t2().scale(1, 2),
        t2().left(t1().right(), 2 )
    )
    yield * all(
        t3().scale(1, 2),
        t3().left(t2().right(), 2 )
    )
    yield * all(
        t4().scale(1, 2),
        t4().left(t3().right(), 2 )
    )
    yield * waitFor(20 ); 
});
