import React from "react";

let registry = {};

export function registerTemplate({ type, preivew, settings }) {
    if (registry[type]) {
        throw new Error(type + '已注册!');
    }
    registry[type] = {
        type,
        preivew,
        settings
    };
}

export function createBrick(type, props) {
    const template = registry[type];
    return template
        ? React.createElement(template.preivew, props)
        : null;
}

export function createSettings(type, props) {
    const template = registry[type];
    return template
        ? React.createElement(template.settings, props)
        : null;
}