import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import { inject } from 'snowball/app';
import { DragItem } from 'nuclear';
import { createBrick } from '../../../bricks/factories';

/**
 * 模块的容器，提供拖拽、编辑等功能
 */
@inject(({ decorationService }) => (
    decorationService
        ? {
            pageState: decorationService.pageState,
            bricks: decorationService.bricks,
            selectedBrickId: decorationService.selectedBrickId,
            onSelectBrick: decorationService.onSelectBrick.emit,
            onSwapBrick: decorationService.onSwapBrick.emit,
            onDeleteBrick: decorationService.onDeleteBrick.emit,
        }
        : {}
))
class Brick extends Component {

    onDeleteBrick(brickId) {
        const { onDeleteBrick } = this.props;

        Modal.confirm({
            title: '温馨提示',
            content: '确认删除该模块吗？',
            onOk: () => {
                onDeleteBrick(brickId);
            },
            onCancel() { }
        });
    }

    render() {
        const {
            template,
            brick,
            index,
            pageState,
            bricks,
            className,
            selectedBrickId,
            onSelectBrick,
            onSwapBrick,
        } = this.props;

        const isFixed = template.props.isFixed;
        const isStickyBar = template.props.isStickyBar;
        const brickElement = createBrick(template.type, {
            page: pageState,
            brick,
            template
        });

        return (
            <DragItem
                key={brick.id}
                insertable={!isStickyBar}
                data={brick}
                className={`py_pagecenter_emulator_brick ${className ? " " + className : ""}`}
                onClick={() => onSelectBrick({
                    brick,
                    template
                })}
            >
                <div
                    style={{ pointerEvents: 'none' }}
                >
                    {brickElement}
                </div>
                {
                    selectedBrickId === brick.id
                        ? (
                            <div className="py_pagecenter_emulator_brick_editor">
                                <div className="btns" onMouseDown={(e) => { e.stopPropagation(); }}>
                                    {
                                        template.props.sort || isFixed || index === 0
                                            ? null
                                            : (
                                                <button type="button" onClick={() => onSwapBrick(index, index - 1)}>
                                                    <Icon type="arrow-up" />
                                                </button>
                                            )
                                    }
                                    {
                                        template.props.sort || isFixed || index === bricks.length - 1
                                            ? null
                                            : (
                                                <button type="button" onClick={() => onSwapBrick(index, index + 1)}>
                                                    <Icon type="arrow-down" />
                                                </button>
                                            )
                                    }
                                    <button
                                        type="button"
                                        onClick={() => this.onDeleteBrick(brick)}
                                    >
                                        <Icon type="close" />
                                    </button>
                                </div>
                            </div>
                        )
                        : null
                }
            </DragItem>
        );
    }
}

export { Brick };