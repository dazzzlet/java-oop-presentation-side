
export function LayoutStep() {
    return null;
}

export function CodeDescription() {
    return null;
}

export function LayoutColumn() {
    return null;
}

export const noneCodeDescriptionFilter = stepElement => {
    return stepElement.props.mdxType !== "CodeDescription";
};

export const codeDescriptionFilter = stepElement => {
    return stepElement.props.mdxType === "CodeDescription";
};
