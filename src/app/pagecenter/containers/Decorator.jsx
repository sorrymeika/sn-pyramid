import React, { } from 'react';
import { Main } from '../components/Main';
import { Sidebar } from '../components/Sidebar';
import { Bricks } from '../components/Bricks';
import { Topbar, Left, Right } from '../components/topbar/Topbar';
import { SaveButton } from '../components/topbar/SaveButton';
import { PublishButton } from '../components/topbar/PublishButton';

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
                <Bricks groups={[]}></Bricks>
            </Main>
        </div>
    );
}

export { Decorator };