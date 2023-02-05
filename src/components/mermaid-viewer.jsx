import React from "react";
import { useDeck } from "mdx-deck";
import Mermaid from 'react-mermaid2';
import styles from "./mermaid-viewer.css";
import useSteps from "../utils/use-steps";
import { getStepsFromChildren } from "./code-viewer";


export function MermaidViewer({ children }) {
    const deck = useDeck();
    const steps = React.useMemo(getStepsFromChildren(children), [deck.index]);

    const stepIndex = useSteps(steps.length - 1);

    return (
        <div className={styles.codeContainer}>
            {steps.map((step, index) => (
                <div key={index} style={{ maxHeight: '100%', height: '100%', visibility: (index !== stepIndex) ? 'hidden' : undefined }}>
                    <Mermaid chart={step.code} />
                </div>
            ))}
        </div>
    );
}
