import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { message } from 'antd';
import PageSettingService from '../../services/PageSettingService';

class PageSetting extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    handleOk = () => {
        this.formRef.current.validateFields((err, data) => {
            if (!err) {
                this.props.onOk({
                    ...this.props.data,
                    ...data
                });
            } else {
                message.error('请完整填写表单!');
            }
        });
    }

    render() {
        if (!this.props.visible) {
            return null;
        }

        const {
            data,
            children,
            formFactory
        } = this.props;

        return (
            <div className="h_1x py_pagecenter_settings">
                <div className="py_pagecenter_settings_con">
                    <div className="pd_l pb_s">
                        <h1 className="fs_xl mb_l">页面设置</h1>
                    </div>
                    {children}
                    <div className="pl_l pr_l">
                        {formFactory && formFactory({
                            ref: this.formRef,
                            data
                        })}
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

export default inject(({ pageSettingService }: { pageSettingService: PageSettingService }) => ({
    visible: pageSettingService.isPanelVisible,
    formFactory: pageSettingService.formFactory,
    data: pageSettingService.data,
    onCancel: pageSettingService.onSettingCancel.emit,
    onOk: pageSettingService.onSettingOk.emit
}))(PageSetting);