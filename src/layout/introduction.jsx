import React from "react";
import { Footer } from "theme-ui";

export const IntroductionLayout = ({ children }) => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          padding: "3em",
        }}
      >
        {children}
        <footer></footer>
      </div>
    </>
  );
};
