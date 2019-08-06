import React, { Component } from 'react';
import { inject } from 'snowball/app';

@inject('title')
class PhoneHead extends Component {
    render() {
        const { title, children } = this.props;

        return (
            <div className="ps_r of_h" style={{ height: 64 }}>
                <img alt="" className="w_full dp_b" src={'images/phone_head.jpg'} />
                <div
                    className="ps_a dock_tbr ta_c to_e"
                    style={{
                        left: '0',
                        bottom: 1,
                        textAlign: 'center',
                        top: '.2rem',
                        background: '#f9f9f9',
                        lineHeight: '44px',
                        height: '44px',
                    }}
                >
                    <span>{title || '商城'}</span> {children}
                </div>
            </div>
        );
    }
}

export { PhoneHead };