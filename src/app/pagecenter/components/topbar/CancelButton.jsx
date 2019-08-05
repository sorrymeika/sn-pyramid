import React from 'react';
import { inject } from 'snowball/app';
import { Button } from 'antd';

function CancelButton({ onCancel }) {
    return (
        <Button
            type="ghost"
            style={{ marginLeft: 5 }}
            onClick={onCancel}
        >取消</Button>
    );
}

const CancelButtonInjc = inject('decorationService')(CancelButton);

export { CancelButtonInjc as CancelButton };