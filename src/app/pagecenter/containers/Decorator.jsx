import React from 'react';
import { Main } from '../components/Main';
import { Sidebar } from '../components/Sidebar';
import { Templates } from '../components/Templates';
import { Topbar, Left, Right } from '../components/topbar/Topbar';
import { SaveButton } from '../components/topbar/SaveButton';
import { PublishButton } from '../components/topbar/PublishButton';
import { DecorationZone, Emulator, PhoneHead } from '../components/decoration-zone';
import { Settings, TemplateInfo } from '../components/settings';
import PageSetting from '../components/settings/PageSetting';

function Decorator({ title, isSettingVisible }) {
    return (
        <div className="py_pagecenter_window">
            <Sidebar></Sidebar>
            <Topbar>
                <Left>
                    <div className="ml_m cl_000">{title}装修</div>
                </Left>
                <Right>
                    <SaveButton></SaveButton>
                    <PublishButton></PublishButton>
                </Right>
            </Topbar>
            <Main>
                <Templates></Templates>
                <DecorationZone>
                    <Emulator
                        head={
                            <PhoneHead>
                            </PhoneHead>
                        }
                    />
                </DecorationZone>
                {
                    isSettingVisible
                        ? (
                            <Settings>
                                <TemplateInfo></TemplateInfo>
                            </Settings>
                        )
                        : null
                }
                <PageSetting />
            </Main>
        </div>
    );
}

export default Decorator;