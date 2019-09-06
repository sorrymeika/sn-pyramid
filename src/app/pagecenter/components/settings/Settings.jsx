import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { createSettings } from '../../bricks';
import { message } from 'antd';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    handleOk = () => {
        this.formRef.current.validateFields((err, data) => {
            if (!err) {
                this.props.onOk({
                    ...this.props.currentBrick,
                    data
                });
            } else {
                message.error('请完整填写表单!');
            }
        });
    }

    render() {
        const {
            currentBrick,
            currentTemplate,
            children,
        } = this.props;

        return (
            <div className="h_1x py_pagecenter_settings">
                <div className="py_pagecenter_settings_con">
                    {children}
                    <div className="pl_l pr_l">
                        {
                            currentBrick && currentBrick.id
                                ? createSettings(currentTemplate.type, {
                                    ref: this.formRef,
                                    brick: currentBrick,
                                    template: currentTemplate,
                                    data: currentBrick.data
                                })
                                : null
                        }
                    </div>
                </div>
                <div className="py_pagecenter_settings_ft flex">
                    <button
                        className="py_pagecenter_settings_cancel flexitem"
                        onClick={this.props.onCancel}
                    >取消</button>
                    <button
                        className="py_pagecenter_settings_ok flexitem"
                        onClick={this.handleOk}
                    >确定</button>
                </div>
            </div>
        );
    }
}

const SettingsInjc = inject(({ decorationService }) => ({
    currentBrick: decorationService.currentBrick,
    currentTemplate: decorationService.currentTemplate,
    onCancel: decorationService.onSettingCancel.emit,
    onOk: decorationService.onSettingOk.emit
}))(Settings);

export { SettingsInjc as Settings };