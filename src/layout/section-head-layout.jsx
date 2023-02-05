import React from "react";
import styles from "./section-head-layout.css";
import { ErrorBoundary } from "../components";
const redDash = require('./../assets/red-dash.png');
const logo = require('./../assets/logo-white.png');

export const SectionHeadLayout = ({ title, backgroundImage }) => {
    const image = backgroundImage ? `url(${backgroundImage})` : 'none';
    return (
        <ErrorBoundary>
            <div className={styles.backgroundImage} style={{
                backgroundImage: image
            }}></div>
            <div className={styles.backgroundOverlay}></div>
            <div className={styles.container} >
                <div>
                    <h1 className={styles.mainTitle}>{title}</h1>
                    <img className={styles.redDash} src={redDash} alt="netcompany" />
                    <img className={styles.logo} src={logo} alt="netcompany" />
                </div>
            </div>
        </ErrorBoundary>
    );
};
