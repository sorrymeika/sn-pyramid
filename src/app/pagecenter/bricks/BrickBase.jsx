import React, { Component } from 'react';
import { util, ViewModel } from 'snowball';

const SFS = '';

export class BrickBase extends Component {
    model;
    node;
    brickData;
    brickProps;

    constructor(props) {
        super(props);

        const {
            template,
            brick,
            page
        } = props;

        const { id, css } = template;
        if (css) {
            util.style(id, css, true);
        }
        const templateProps = template.props;
        const isFixed = templateProps.isFixed;

        this.model = new ViewModel({
            components: {
            },
            el: (
                `<div style="${isFixed ? '' : 'overflow:hidden;'}width:100%;">
                    <div sn-if="{data}">${this.template(template)}</div>
                    <div sn-else style="${isFixed ? 'padding: 4px;' : 'padding: 20px;'} text-align: center; border: 1px solid #ddd; background:#fff">{templateName}</div>
                </div>`
            ),
            attributes: {
                visible: true,
                env: {
                    IS_BG: true,
                },
                templateName: template.name,
                templateProps,
                pageState: page,
                pageProps: page.props,
                address: {
                    location: ''
                }
            }
        });

        this.processData(brick);
    }

    setRef = (ref) => {
        if (ref && !this.node) {
            this.node = ref;
            this.model.$el.appendTo(ref);
        }
    }

    shouldComponentUpdate(nextProps) {
        const {
            brick
        } = nextProps;

        if (this.brickData != brick.data || this.brickProps != brick.props) {
            this.processData(brick);
        }
        return false;
    }

    template(template) {
        let html = template.html;
        const style = 'padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff';
        return `<div sn-if="!brickData||util.isEmptyObject(brickData)" style="${style};padding: 20px 4px;">${template.name}</div><div sn-else>${html}</div>`;
    }

    async processData(brick) {
        if (!brick) {
            this.rectChange();
            return;
        }

        this.brickData = brick.data;
        this.brickProps = brick.props;

        const defaultData = this.constructor.defaultData;
        if (defaultData && util.isEmptyObject(this.brickData)) {
            this.brickData = defaultData;
        }
        if (this.brickData && this.brickData.products) {
            this.brickData.products = this.brickData.products.slice(0, 20);
        }

        this.patchImages();

        this.model.set({
            brick,
            data: this.brickData,
            brickProps: this.brickProps
        });

        await this.patchData(this.model, this.brickData, brick);

        this.rectChange();
    }

    patchImages() {
        if (Array.isArray(this.brickData.images)) {
            this.brickData.images.forEach((img) => {
                img.src = SFS + (this.brickData.spriteImage || img.src);
            });
        }
        if (Array.isArray(this.brickData.floors)) {
            this.brickData.floors.forEach((floor) => {
                floor.src = SFS + floor.src;
            });
        }
        if (this.brickData.titleImage) {
            this.brickData.titleImage = SFS + this.brickData.titleImage;
        }
        if (this.brickData.src) {
            this.brickData.src = SFS + this.brickData.src;
        }
    }

    /**
     * 订正数据为模版所需要的数据
     */
    patchData() {
    }

    rectChange() {
        this.model.nextTick(() => {
            this.props.onRectChange && this.props.onRectChange();
        });
    }

    render() {
        return <div ref={this.setRef} />;
    }
}