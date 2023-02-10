import React from "react";
import { useDeck } from "mdx-deck";
import { CodeSurfer } from "@code-surfer/standalone";
import * as github from "../themes/code-surfer";
import { readStepFromElement } from "../utils/step-reader";
import { useStepSpring } from "../utils/use-step-spring";
import styles from "./code-viewer.css";
import { codeDescriptionFilter } from ".";

export const getStepsFromChildren = children => () => {
    const steps = React.Children.map(children || [], child =>
        readStepFromElement(child)
    ).filter(x => x);
    if (steps.length === 0) {
        throw Error("No codeblocks found inside <CodeSurfer/>.");
    }
    return steps;
};

export const getCodeDescriptionFromChildren = children => () => {
    const codeDescription = React.Children.toArray(children)
        .filter(codeDescriptionFilter)
        .map(element => React.Children.toArray(element.props.children))
        .find(e => true);
    return codeDescription;
};

export function CodeViewer({ children }) {
    const deck = useDeck();
    const steps = React.useMemo(getStepsFromChildren(children), [deck.index]);

    const progress = useStepSpring(steps.length);

    return (
        <div className={styles.codeContainer}>
            <div style={{ maxHeight: '100%', height: '100%' }}>
                <CodeSurfer steps={steps} progress={progress} theme={github} />
            </div>
        </div>
    );
}
