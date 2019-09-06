import { JsonComponent, Atom } from "nuclear";
import { observable } from "snowball";
import { Icon, Modal } from "antd";
import React from "react";

class Link extends JsonComponent {
    static defaultProps = {
    }

    @observable value;
    @observable modalVisible = false;

    constructor(props) {
        super(props);
        this.value = props.value;
    }

    componentDidMount() {
        this.asModel().observe('value', (value) => {
            this.props.onChange && this.props.onChange(value);
        });
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value != this.value) {
            this.value = nextProps.value;
        }
        return true;
    }

    handleLinkClick = () => {
        this.modalVisible = true;
    }

    renderJson() {
        return [{
            type: 'input',
            props: {
                placeholder: '请输入合法链接',
                addonAfter: (
                    [
                        <Icon
                            key="icon"
                            type="link"
                            onClick={this.handleLinkClick}
                        />,
                        <Modal
                            key="modal"
                            visible={this.modalVisible}
                            onCancel={() => {
                                this.modalVisible = false;
                            }}
                        >
                        </Modal>
                    ]
                ),
                ...this.props,
            }
        }];
    }
}

Atom.registerAtom('link', Atom.wrapFormItem(Link));

export { Link };