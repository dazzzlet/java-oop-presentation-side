
import { github } from "@code-surfer/themes";

export const theme = {
  ...github,
  styles: {
    ...github.styles,
    CodeSurfer: {
      ...github.styles.CodeSurfer,
      subtitle: {
        ...github.styles.CodeSurfer.subtitle,
        padding: "0.1em"
      }
    }
  }
};
