import React from "react";
import { useDeck } from "mdx-deck";
import { CodeSurfer } from "@code-surfer/standalone";
import { github } from "@code-surfer/themes"
import { readStepFromElement } from "../utils/step-reader";
import { useStepSpring } from "../utils/use-step-spring";
import styles from "./code-layout.css";
const redDash = require('./../assets/red-dash.png');
const logo = require('./../assets/logo-default.png');

const getStepsFromChildren = children => () => {
    const steps = React.Children.map(children || [], child =>
        readStepFromElement(child)
    ).filter(x => x);
    if (steps.length === 0) {
        throw Error("No codeblocks found inside <CodeSurfer/>.");
    }
    return steps;
};

export function CodeLayout({ children, title }) {
    const deck = useDeck();
    const steps = React.useMemo(getStepsFromChildren(children), [deck.index]);

    // useNotes(steps.map(s => s.notesElement));
    const progress = useStepSpring(steps.length);

    return (
        <>
            <div className={styles.container}>
                <h1>{title}</h1>
                <img className={styles.redDash} src={redDash} alt="reddash" />
                <div className={styles.codeContainer}>
                    <div style={{ maxHeight: '100%', height: '100%' }} className="abc">
                        <CodeSurfer steps={steps} progress={progress} theme={github} />
                    </div>
                </div>
                <img className={styles.logo} src={logo} alt="netcompany" />
                <span className={styles.slideNumber}>{deck.index + 1}</span>
            </div>
        </>
    );
}
