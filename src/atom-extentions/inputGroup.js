import { JsonComponent, Atom } from "nuclear";
import { observable } from "snowball";

const iconStyle = { cursor: 'pointer', width: 24, height: 24, lineHeight: '25px', color: '#333', border: '1px solid #333', borderRadius: 2 };

class InputGroupList extends JsonComponent {
    static defaultProps = {
        minNum: 1,
        maxNum: 20
    }

    @observable data = [];

    constructor(props) {
        super(props);

        this.id = 0;
        const data = (props.value || []).map((item) => {
            return {
                ...item,
                id: this.id++
            };
        });
        if (data.length < this.props.minNum) {
            for (let i = data.length; i < this.props.minNum; i++) {
                data.push({
                    ...this.props.defaultItemData,
                    id: this.id++
                });
            }
        }
        this.data = data;
    }

    componentDidMount() {
        this.asModel().observe('data', (data) => {
            this.props.onChange && this.props.onChange(data);
        });
    }

    removeItem(item) {
        this.data.withMutations((data) => {
            data.remove('id', item.id);
        });
    }

    addItem() {
        this.data.withMutations((data) => {
            data.add({
                ...this.props.defaultItemData,
                id: this.id++
            });
        });
    }

    swapItem(a, b) {
        this.data.withMutations((data) => {
            data.swap(a, b);
        });
    }

    renderJson() {
        const { title, items } = this.props;

        return [{
            type: 'form',
            children: [{
                type: 'list',
                props: {
                    indexAlias: 'i',
                    itemAlias: 'item',
                    rowKey: 'id',
                    items: [{
                        type: 'div',
                        props: {
                            className: 'flex'
                        },
                        children: [{
                            type: 'div',
                            props: {
                                className: 'fx_1 fw_b cl_000 fs_m',
                                innerText: title + '{i + 1}'
                            }
                        }, {
                            type: 'div',
                            children: [{
                                type: 'icon',
                                props: {
                                    type: 'arrow-up',
                                    style: iconStyle,
                                    visible: `{i!=0}`,
                                    onClick: `{swapItem.bind(this,i,i-1)}`
                                }
                            }, {
                                type: 'icon',
                                props: {
                                    type: 'arrow-down',
                                    style: { marginLeft: 5, ...iconStyle },
                                    visible: `{i!=data.length-1}`,
                                    onClick: `{swapItem.bind(this,i,i+1)}`
                                }
                            }, {
                                type: 'icon',
                                props: {
                                    type: 'close',
                                    style: { marginLeft: 5, ...iconStyle },
                                    visible: `{data.length>(props.minNum||1)}`,
                                    onClick: '{removeItem.bind(this,item)}'
                                }
                            }]
                        }]
                    },
                    ...items.map((input) => {
                        return {
                            ...input,
                            props: {
                                ...input.props,
                                field: `{"data["+i+"].${input.props.field}"}`
                            }
                        };
                    })],
                    dataSource: '{data}'
                }
            }, {
                type: 'button',
                props: {
                    icon: 'plus',
                    type: "button",
                    className: "pb_m mb_m fs_s ta_c w_full bg_fff",
                    style: { cursor: 'pointer', border: '1px dashed #333', color: '#333', height: 27, lineHeight: '26px' },
                    text: '{buttonText || "添加图片"} {data.length}/{props.maxNum}',
                    visible: '{props.addible!==false}',
                    onClick: '{addItem}'
                }
            }]
        }];

    }
}

Atom.registerAtom('inputGroup', Atom.wrapFormItem(InputGroupList));

export { InputGroupList };