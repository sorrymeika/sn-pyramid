import { JsonComponent, registerAtom } from "nuclear";
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
        this.value = props.value || '';
    }

    componentDidMount() {
        this.asModel().observe('value', (value) => {
            this.props.onChange && this.props.onChange(value);
        });
    }

    handleLinkClick = () => {
        this.modalVisible = true;
    }

    render() {
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

registerAtom('link', Link);

export { Link };