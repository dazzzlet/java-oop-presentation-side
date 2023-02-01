import React from "react";
import styles from "./introduction.css";
const redDash = require('./../assets/red-dash.png');
const logo = require('./../assets/logo-white.png');

export const IntroductionLayout = ({ title, department }) => {
  return (
    <>
      <div className={styles.container}>
        <div>

          <span className={styles.department}>{department}</span>
          <h1 className={styles.mainTitle}>{title}</h1>
          <img className={styles.redDash} src={redDash} alt="netcompany" />
          <img className={styles.logo} src={logo} alt="netcompany" />

        </div>
      </div>
      <span className={styles.copyright}>© Copyright Netcompany</span>
    </>
  );
};
