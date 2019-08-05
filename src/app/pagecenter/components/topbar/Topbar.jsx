import React from 'react';

export function Topbar({ children }) {
    return <div className="flex pr_l py_pagecenter_topbar dock_tlr">{children}</div>;
}

export function Right({ children }) {
    return (
        <div
            className="ml_m ps_r flex"
            style={{ zIndex: 9 }}
        >{children}</div>
    );
}

export function Left({ children }) {
    return <div className="flexitem"><div className="flex">{children}</div></div>;
}
