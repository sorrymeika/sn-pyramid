import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { DropTarget } from 'nuclear';

@inject(({ decorationService }) => (
    decorationService
        ? {
            page: decorationService.pageState
        }
        : {}
))
class Phone extends Component {

    render() {
        const {
            head,
            before,
            after,
            children,
            page,
        } = this.props;

        const pageProps = (page.props && JSON.parse(page.props)) || {};

        return (
            <div
                className="py_pagecenter_emulator_scroll t_3"
            >
                <div className="py_pagecenter_emulator_phone">
                    <div
                        className="py_pagecenter_emulator_main"
                        style={{
                            backgroundColor: pageProps.bgColor ? pageProps.bgColor : 'white',
                            backgroundImage: pageProps.bgImage ? `url(${pageProps.bgImage})` : '',
                            backgroundSize: '100% auto',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {head}
                        {before}
                        <DropTarget
                            className="py_pagecenter_emulator_phone_body"
                        >
                            {children}
                        </DropTarget>
                        {after}
                    </div>
                </div>
            </div>
        );
    }
}

export { Phone };