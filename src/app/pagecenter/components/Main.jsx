import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { Drag } from 'nuclear';

@inject(({ decorationService }) => (
    decorationService
        ? {
            onDrop: decorationService.onDrop.emit
        }
        : {}
))
class Main extends Component {
    componentDidMount() {
    }

    render() {
        const {
            onDrop,
            children
        } = this.props;

        return (
            <Drag
                className="py_pagecenter_main flex ai_s"
                onDrop={onDrop}
            >
                {children}
            </Drag>
        );
    }
}

export { Main };
