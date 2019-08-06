import React from 'react';
import { DropTarget } from "nuclear";

function FixedLayer({
    children,
    fixedLayerRef
}) {
    return (
        <DropTarget
            ref={fixedLayerRef}
            position="absolute"
            className="py_pagecenter_emulator_fixed"
        >
            {children}
        </DropTarget>
    );
}

export { FixedLayer };