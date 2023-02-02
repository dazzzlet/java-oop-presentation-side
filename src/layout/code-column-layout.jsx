import React from "react";
import { readStepFromElement, isCode } from "../utils/step-reader";
import { CodeSurfer } from "@code-surfer/standalone";
import { github } from "@code-surfer/themes";
import { useDeck, Notes } from "mdx-deck";
import { useNotes } from "../utils/notes";
import { useStepSpring } from "../utils/use-step-spring";
import { codeDescriptionFilter, noneCodeDescriptionFilter } from "../components";
import styles from "./code-column-layout.css";
const redDash = require('./../assets/red-dash.png');
const logo = require('./../assets/logo-default.png');

export function CodeColumnLayout({ children, title, subTitle, sizes }) {
    const deck = useDeck();
    const [columns, notesElements, codeDescriptionElement] = React.useMemo(
        () => getColumnsFromChildren(children, sizes),
        [deck.index]
    );

    useNotes(notesElements);
    const progress = useStepSpring(columns[0].steps.length);

    return (
        <>
            <div className={styles.container}>
                <h1>{title}</h1>
                <img className={styles.redDash} src={redDash} alt="reddash" />
                {subTitle && (<h3>{subTitle}</h3>)}
                <div className={styles.codeContainer}>
                    <div>
                        {columns.map((column, i) => (
                            <Column key={i} column={column} progress={progress} theme={github} />
                        ))}
                    </div>
                </div>
                {codeDescriptionElement}
                <img className={styles.logo} src={logo} alt="netcompany" />
                <span className={styles.slideNumber}>{deck.index + 1}</span>
            </div>
        </>
    );
}

function Column({ column, progress, theme }) {
    return (
        <div
            style={{
                flex: column.flex,
                overflow: "hidden",
                height: "100%",
                marginLeft: "5px"
            }}
        >
            {column.isCode ? (
                <CodeSurfer steps={column.steps} progress={progress} theme={theme} />
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    {column.steps[Math.round(progress)].element}
                </div>
            )}
        </div>
    );
}

function getColumnsFromChildren(children, sizes = []) {
    const columns = [];
    const stepElements = React.Children.toArray(children);

    if (stepElements.length === 0) {
        throw Error("No <Step/> found inside <CodeSurferColumns/>.");
    }
    stepElements.filter(noneCodeDescriptionFilter).forEach((stepElement, stepIndex) => {
        React.Children.toArray(stepElement.props.children).forEach(
            (cellElement, columnIndex) => {
                if (!cellElement || !cellElement.props) {
                    throw Error(
                        "Invalid element inside <Step/>. Make sure to add empty lines (no spaces) before and after each element."
                    );
                }

                columns[columnIndex] = columns[columnIndex] || {
                    steps: [],
                    isCode: true
                };

                const step = isCode(cellElement)
                    ? readStepFromElement(cellElement)
                    : { element: cellElement };

                columns[columnIndex].steps[stepIndex] = step;
                columns[columnIndex].isCode =
                    columns[columnIndex].isCode && isCode(cellElement);
            }
        );
    });

    if (columns.length === 0) {
        throw Error("<Step/> shouldn't be empty.");
    }

    columns.forEach((column, columnIndex) => {
        column.flex = sizes[columnIndex] || 1;
    });

    const notesElements = stepElements.filter(noneCodeDescriptionFilter).map(stepElement => {
        const stepChildren = React.Children.toArray(stepElement.props.children);
        const notesElement = stepChildren.find(
            element => element.props && element.props.originalType === Notes
        );
        return notesElement;
    });

    const codeDescriptionElement = stepElements.filter(codeDescriptionFilter)
        .map(element => React.Children.toArray(element.props.children))
        .find(e => true);

    return [columns, notesElements, codeDescriptionElement];
}
