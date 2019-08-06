import React, { useState, useMemo } from 'react';
import { util } from 'snowball';
import { inject } from 'snowball/app';
import { DragSource } from 'nuclear';
import { message } from 'antd';
import { TEMPLATE_GROUPS } from '../constants/TEMPLATE_GROUPS';

function Templates(props) {
    let { bricks, templates } = props;
    const groups = util.groupBy('groupId', templates);
    const [selected, setSelected] = useState(0);
    const previewElement = useMemo(() => {
        const preview = document.createElement('div');
        preview.style.pointerEvents = 'none';
        preview.innerHTML = `<div
        class="ta_c fs_s flex ai_c jc_c h_full mt_1"
        style='color:#c00;min-height:60px;width:100%;border:1px dotted #c00;pointer-events:none'
    >
        <p>释放鼠标将模块添加到此处</p>
    </div>`;
        return preview;
    }, []);

    return (
        <div className="py_pagecenter_templates ai_fs ps_r">
            <div
                style={{ width: '160px', overflow: 'auto' }}
                className="py_pagecenter_templates_scroll dock"
            >
                {
                    groups.map((group, i) => {
                        return (
                            <div key={'group' + i}>
                                <div
                                    className="lh_m pl_m ps_r"
                                    style={{
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => {
                                        setSelected(selected == i ? -1 : i);
                                    }}
                                >
                                    {TEMPLATE_GROUPS.find((item) => item.id == group.key.groupId).name || '其他'}
                                    <i
                                        className="ps_a"
                                        style={{
                                            top: '50%',
                                            right: 10,
                                            marginTop: selected == i ? -4 : -5,
                                            display: 'block',
                                            width: 10,
                                            height: 10,
                                            borderRight: '1px solid #999',
                                            borderBottom: '1px solid #999',
                                            transform: 'rotate(' + (selected == i ? 45 : -45) + 'deg)'
                                        }}
                                    ></i>
                                </div>
                                <div
                                    className="clearfix"
                                    style={{
                                        display: selected == i ? '' : 'none',
                                        background: '#f1f1f1'
                                    }}
                                >
                                    {
                                        group.group.map((template) => {
                                            var isOnlyOne = template.props.onlyOne;
                                            var count = isOnlyOne
                                                ? bricks.filter((mod) => mod.template.id == template.id).length
                                                : 0;

                                            // 检查互斥模块
                                            var excludeItem = bricks.filter((mod) => {
                                                return mod.template.props.exclude
                                                    ? mod.template.props.exclude.includes(template.templetType)
                                                    : false;
                                            });
                                            if (excludeItem.length > 0) {
                                                count = 1;
                                            }

                                            return count
                                                ? (
                                                    <div
                                                        key={template.id}
                                                        className={`sp_decoration__template_item fl_l`}
                                                        style={{ opacity: '.5', cursor: "default" }}
                                                        onMouseDown={() => {
                                                            excludeItem.length <= 0
                                                                ? message.warning(`${template.name}只能添加1个哦！`)
                                                                : message.warning(`${template.name}与${excludeItem[0].template.name}模块互斥`);
                                                        }}
                                                    >
                                                        <img alt="" src={template.img} />
                                                        <p>{template.name}</p>
                                                        {
                                                            template.props.onlyOne
                                                                ? (<p>({count}/1)</p>)
                                                                : null
                                                        }
                                                    </div>
                                                )
                                                : (
                                                    <DragSource
                                                        key={template.id}
                                                        className={`sp_decoration__template_item fl_l`}
                                                        previewElement={previewElement}
                                                        data={template}
                                                        position={template.props.isFixed ? 'fixed' : ''}
                                                    >
                                                        <img alt="" src={template.img} />
                                                        <p>{template.name}</p>
                                                        {
                                                            template.props.onlyOne
                                                                ? (<p>({count}/1)</p>)
                                                                : null
                                                        }
                                                    </DragSource>
                                                );
                                        })
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

const TemplatesInjc = inject('bricks', 'templates')(Templates);

export { TemplatesInjc as Templates };

