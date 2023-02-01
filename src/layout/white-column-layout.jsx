import React from "react";
import styles from "./white-column-layout.css";
import { useDeck } from "mdx-deck";
const redDash = require("./../assets/red-dash.png");
const logo = require("./../assets/logo-default.png");

export const WhiteColumnLayout = ({ children, title, sizes, colors, texts }) => {
    const deck = useDeck();
    const [columns] = React.useMemo(
        () => getColumnsFromChildren(children, sizes, colors, texts),
        [deck.index]
    );

    return (
        <>
            <div className={styles.container}>
                <h1>{title}</h1>
                <img className={styles.redDash} src={redDash} alt="reddash" />
                <div className={styles.columnsContainer}>
                    <div>
                        {columns.map((column, i) => (
                            <Column key={i} column={column} />
                        ))}
                    </div>
                </div>
                <img className={styles.logo} src={logo} alt="netcompany" />
                <span className={styles.slideNumber}>{deck.index + 1}</span>
            </div>
        </>
    );
};

function getColumnsFromChildren(children, sizes = [], colors = [], texts = []) {
    const columns = [];
    const columnElements = React.Children.toArray(children);

    if (columnElements.length === 0) {
        throw Error("No <Step/> found inside <CodeSurferColumns/>.");
    }
    columnElements.forEach((columnElement, columnIndex) => {
        if (
            !columnElement ||
            !columnElement.props ||
            columnElement.props.mdxType !== "LayoutColumn"
        ) {
            return;
        }
        columns.push({
            elements: React.Children.toArray(columnElement.props.children),
            fontSize: columnElement.props.fontSize || undefined,
            fontFamily: columnElement.props.fontFamily || undefined
        });
    });

    if (columns.length === 0) {
        throw Error("<Step/> shouldn't be empty.");
    }

    columns.forEach((column, columnIndex) => {
        column.flex = sizes[columnIndex] || 1;
        column.color = colors[columnIndex] || '#fff';
        column.text = texts[columnIndex] || '#0f2147';
    });

    return [columns];
}

function Column({ column }) {
    return (
        <div
            style={{
                flex: column.flex,
                backgroundColor: column.color,
                color: column.text,
                overflow: "hidden",
                height: "100%",
                marginLeft: "5px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: '0.5em',
                    fontSize: column.fontSize,
                    fontFamily: column.fontFamily,
                    height: "100%"
                }}
            >
                {column.elements}
            </div>
        </div>
    );
}

export function LayoutColumn() {
    return null;
}
