import React from 'react';
import { Alert } from 'antd';

export function Warning({ message }) {
    return (
        <div className="py_pagecenter_warning">
            <Alert
                className="to_e"
                message={message}
                banner
            />
        </div>
    );
}