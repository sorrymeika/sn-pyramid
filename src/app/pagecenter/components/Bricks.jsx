import React from 'react';
import { DragSource } from 'nuclear';

function Bricks({ groups }) {
    return (
        <div className="py_pagecenter_bricks">
            <div className="of_s h_1x">
                {
                    groups.map((brickGroup) => {
                        return (
                            <div key={brickGroup.groupName}>
                                <div className="py_pagecenter_bricks_hd">{brickGroup.groupName}</div>
                                <div className="flexwrap py_pagecenter_bricks_group_item">
                                    {
                                        brickGroup.items.map((item) => (
                                            <DragSource
                                                key={item.type}
                                                className="py_pagecenter_brick"
                                                data={item}
                                            >{item.name}</DragSource>
                                        ))
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export { Bricks };

