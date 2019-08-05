import React from 'react';
import { Button } from 'antd';
import { inject } from 'snowball/app';

function PublishButton({ disabled, onClick }) {
    return (
        <Button
            type="primary"
            style={{ marginLeft: 5 }}
            disabled={disabled}
            onClick={onClick}
        >发布</Button>
    );
}

const PublishButtonInjc = inject(({ decorationService }) => {
    return decorationService
        ? {
            onClick: decorationService.onPublishButtonClick.emit,
            disabled: decorationService.isPublishButtonDisabled
        }
        : {};
})(PublishButton);

export { PublishButtonInjc as PublishButton };