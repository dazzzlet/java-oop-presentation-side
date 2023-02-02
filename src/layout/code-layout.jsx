import React from "react";
import { useDeck } from "mdx-deck";
import styles from "./code-layout.css";
import { getCodeDescriptionFromChildren, CodeViewer } from "../components";
const redDash = require('./../assets/red-dash.png');
const logo = require('./../assets/logo-default.png');

export function CodeLayout({ children, title, subTitle }) {
    const deck = useDeck();
    const codeDescription = React.useMemo(getCodeDescriptionFromChildren(children), [deck.index]);

    return (
        <>
            <div className={styles.container}>
                <h1>{title}</h1>
                <img className={styles.redDash} src={redDash} alt="reddash" />
                {subTitle && (<h3>{subTitle}</h3>)}
                <CodeViewer>
                    {children}
                </CodeViewer>
                {codeDescription || ''}
                <img className={styles.logo} src={logo} alt="netcompany" />
                <span className={styles.slideNumber}>{deck.index + 1}</span>
            </div>
        </>
    );
}
