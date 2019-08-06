import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { Warning } from './Warning';

@inject('warning')
class DecorationZone extends Component {
    render() {
        let { warning, children } = this.props;

        return (
            <div className="py_pagecenter_emulator flexitem">
                {
                    warning
                        ? (
                            <Warning message={`温馨提示：${warning}`} />
                        )
                        : null
                }
                {children}
            </div>
        );
    }
}

export { DecorationZone };