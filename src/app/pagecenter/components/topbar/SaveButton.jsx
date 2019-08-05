import React from 'react';
import { Button } from 'antd';
import { inject } from 'snowball/app';

function SaveButton({ disabled, onClick }) {
    return (
        <Button
            type="primary"
            style={{ marginLeft: 5 }}
            disabled={disabled}
            onClick={onClick}
        >保存</Button>
    );
}

const SaveButtonInjc = inject(({ decorationService }) => {
    return decorationService
        ? {
            onClick: decorationService.onSaveButtonClick.emit,
            disabled: decorationService.isSaveButtonDisabled
        }
        : {};
})(SaveButton);

export { SaveButtonInjc as SaveButton };