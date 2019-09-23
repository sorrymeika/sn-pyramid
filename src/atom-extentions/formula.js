import { JsonComponent, Atom } from "nuclear";
import { observable } from "snowball";
import { Icon, Modal } from "antd";
import React from "react";
import { FormulaSelect } from "../app/product/components/FormulaSelect";

class Formula extends JsonComponent {
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

    handleClick = () => {
        this.modalVisible = true;
    }

    renderJson() {
        return [{
            type: 'input',
            props: {
                placeholder: '请输入选品规则ID',
                addonAfter: (
                    [
                        <Icon
                            key="icon"
                            type="unordered-list"
                            onClick={this.handleClick}
                        />,
                        <Modal
                            title="选品规则选择"
                            key="modal"
                            visible={this.modalVisible}
                            cancelText="取消"
                            onCancel={() => {
                                this.modalVisible = false;
                            }}
                            style={{ top: 0 }}
                            width={800}
                            okText="确定"
                            onOk={() => {
                                this.modalVisible = false;
                            }}
                        >
                            <FormulaSelect onSelect={(item) => {
                                this.value = item.id;
                                this.modalVisible = false;
                            }}></FormulaSelect>
                        </Modal>
                    ]
                ),
                ...this.props,
            }
        }];
    }
}

Atom.registerAtom('formula', Atom.wrapFormItem(Formula));

export { Formula };