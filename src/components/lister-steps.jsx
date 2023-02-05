import React from "react";
import useSteps from "../utils/use-steps";

export function ListerSteps({ children, showFirstItem }) {
    let steps = React.Children.toArray(children);
    let ulFlag = false;
    if (children.props.mdxType === 'ul') {
        steps = React.Children.toArray(children.props.children);
        ulFlag = true;
    }
    let length = steps.length;
    if (showFirstItem) {
        length = length - 1;
    }
    const targetStepIndex = useSteps(length);

    var getterFilter = (s, index) => index < targetStepIndex;
    if (showFirstItem) {
        getterFilter = (s, index) => index <= targetStepIndex;
    }

    return ulFlag ? (
        <ul style={{ marginTop: 0 }}>
            {steps.filter(getterFilter)}
        </ul>
    ) : (
        <>
            {steps.filter(getterFilter)}
        </>
    );
}