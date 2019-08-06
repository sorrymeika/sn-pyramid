import React, { } from 'react';
import { Main } from '../components/Main';
import { Sidebar } from '../components/Sidebar';
import { Templates } from '../components/Templates';
import { Topbar, Left, Right } from '../components/topbar/Topbar';
import { SaveButton } from '../components/topbar/SaveButton';
import { PublishButton } from '../components/topbar/PublishButton';
import { DecorationZone, Emulator, PhoneHead } from '../components/decoration-zone';
import { Settings } from '../components/settings';

function Decorator() {
    return (
        <div className="py_pagecenter_window">
            <Sidebar></Sidebar>
            <Topbar>
                <Left></Left>
                <Right>
                    <SaveButton></SaveButton>
                    <PublishButton></PublishButton>
                </Right>
            </Topbar>
            <Main>
                <Templates groups={[]}></Templates>
                <DecorationZone>
                    <Emulator
                        head={<PhoneHead></PhoneHead>}
                    ></Emulator>
                </DecorationZone>
                <Settings></Settings>
            </Main>
        </div>
    );
}

export { Decorator };