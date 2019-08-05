import React from "react";
import { Icon } from "antd";
import { inject } from "snowball/app";

function Sidebar({ page, pageType }) {
    return (
        <div className="py_pagecenter_sidebar dock_tbl">
            <a
                href={`#`}
                className={pageType != 'backup' ? 'active' : ''}
            >
                <Icon
                    type="skin"
                />
                <p>装修</p>
            </a>
            <a
                href={`javascript:;`}
                className={pageType == 'backup' ? 'active' : ''}
            >
                <Icon
                    type="schedule"
                />
                <p>备份</p>
            </a>
        </div>
    );
}

const SidebarInjc = inject(({ decorationService }) => ({
    page: decorationService.pageState
}))(Sidebar);

export { SidebarInjc as Sidebar };