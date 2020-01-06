import React from 'react';
import { Icon } from 'antd';
import { inject } from 'snowball/app';
import getPublicUrl from '../../../../../shared/getPublicUrl';
import DecorationService from '../../../services/DecorationService';

function PhoneHead({
    title,
    children,
    onClickSetting
}) {
    return (
        <div className="ps_r of_h" style={{ height: 64 }}>
            <img alt="" className="w_full dp_b" src={getPublicUrl('./images/phone_head.jpg')} />
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
                <div className="dock_tr pr_m">
                    <Icon
                        type="setting"
                        onClick={onClickSetting}
                        style={{ fontSize: 18 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default inject(({ decorationService }: { decorationService: DecorationService }) => {
    return {
        title: decorationService.title,
        onClickSetting: decorationService.onClickPageSetting.emit
    };
})(PhoneHead);