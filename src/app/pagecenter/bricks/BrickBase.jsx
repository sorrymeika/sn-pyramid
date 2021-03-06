import React, { Component } from 'react';
import { util, template as newTemplate, observable } from 'snowball';
import { PageContext } from 'snowball/app';

export class BrickBase extends Component {
    static contextType = PageContext;

    model;
    node;
    brickData;
    brickProps;

    constructor(props, context) {
        super(props, context);

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

        const connect = newTemplate(`<div style="${isFixed ? '' : 'overflow:hidden;'}width:100%;">
        <div sn-if={data}>${this.template(template)}</div>
        <div sn-else style="${isFixed ? 'padding: 4px;' : 'padding: 20px;'} text-align: center; border: 1px solid #ddd; background:#fff">{templateName}</div>
    </div>`);
        this.model = observable({
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
        });
        this.component = connect(this.model);
        this._processData(brick);
        this.model.observe(() => {
            this.rectChange();
        });
    }

    setRef = (ref) => {
        if (ref && !this.node) {
            this.node = ref;
            this.component.appendTo(ref);
            this.component.render();
        }
    }

    shouldComponentUpdate(nextProps) {
        const {
            brick
        } = nextProps;

        if (JSON.stringify(this.brickData) != JSON.stringify(brick.data) || JSON.stringify(this.brickProps) != JSON.stringify(brick.props)) {
            this._processData(brick);
        }
        return false;
    }

    componentWillUnmount() {
        this.model.destroy();
    }

    template(template) {
        let html = template.html;
        const style = 'padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff';
        return `<div sn-if={!data||util.isEmptyObject(data)} style="${style};padding: 20px 4px;">${template.name + 'bbb'}</div><div sn-else>${html}</div>`;
    }

    async _processData(brick) {
        if (!brick) {
            this.rectChange();
            return;
        }

        this.brickData = JSON.parse(JSON.stringify(brick.data || {}));
        this.brickProps = brick.props;

        this.processData && this.model.set(this.processData(this.brickData));

        const defaultData = this.constructor.defaultData;
        if (defaultData && util.isEmptyObject(this.brickData)) {
            this.brickData = defaultData;
        }

        this.model.set({
            data: this.brickData,
            props: this.brickProps
        });
    }

    rectChange() {
        this.model.nextTick(() => {
            this.props.onRectChange && this.props.onRectChange();
        });
    }

    render() {
        return <div ref={this.setRef} style={{ minHeight: 50 }} />;
    }
}
