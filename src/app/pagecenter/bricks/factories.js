import React from "react";
import { TEMPLATE_TYPES } from "../constants/TEMPLATE_TYPES";
import { Images } from "./images";

export function createBrick(type, props) {
    console.log(type);
    switch (type) {
        case TEMPLATE_TYPES.IMAGE:
            return React.createElement(Images, props);
    }
    return null;
}