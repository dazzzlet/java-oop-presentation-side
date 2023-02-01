import React from "react";
import useSteps from "../utils/use-steps";

export function SwitcherSteps({ children }) {
    const steps = React.Children.toArray(children);
    const targetStepIndex = useSteps(steps.length - 1);

    return steps[targetStepIndex]
}