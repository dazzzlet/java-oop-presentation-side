import React from "react";

export function Image({ src, alt }) {
    const image = require(src);
    return (
        <img src={image} alt={alt} />
    )
}