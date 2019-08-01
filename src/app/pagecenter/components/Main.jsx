import * as React from 'react';
import { Component } from 'react';

import { inject, Drag } from 'truck';

@inject('disableEdit', 'page', "onDrop")
class Main extends Component {
    componentDidMount() {
    }

    render() {
        const {
            page,
            onDrop,
            children
        } = this.props;

        return (
            <Drag
                className="sp_decoration__main dock"
                onDrop={onDrop}
            >
                {
                    page.unableEdit
                        ? <div style={{
                            background: 'rgba(0,0,0,.5)',
                            position: "fixed",
                            left: 50,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99999
                        }}>
                            <div style={{
                                color: '#fff',
                                background: '#c00000',
                                padding: '5px 10px',
                                fontSize: '12px'
                            }}>
                                {page.unableReason}
                            </div>
                        </div>
                        : null
                }
                <div className="flex ai_s h_full">
                    {children}
                </div>
            </Drag>
        );
    }
}

export default Main;
