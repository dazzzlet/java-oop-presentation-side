import { themes } from "mdx-deck";

export default {
  ...themes.prism,
  colors: {
    text: "white",
    background: "#0f2147",
    primary: "blue",
  },
  styles: {
    Slide: {
      fontSize: "31px",
    },
    Footer: {
      position: "fixed",
      bottom: 3,
      left: 0,
      right: 0,
      fontSize: "20px",
      display: "flex",
      flexDirection: "row",
      "-webkit-box-align": 'center',
      "-ms-flex-align": 'center',
      alignItems: 'center',
      "-webkit-box-pack": 'center',
      "-webkit-justify-content": 'center',
      "-ms-flex-pack": 'center',
      justifyContent: 'center',
    },
    blockquote: {
      fontSize: '40px',
      borderLeft: "0.5em solid #e36053",
      fontWeight: "400",
      paddingLeft: "1em",
      "& p": {
        marginTop: 0
      }
    }
  },
};
