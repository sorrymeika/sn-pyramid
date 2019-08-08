import { JsonComponent, registerAtom } from "nuclear";
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
        this.data = props.value || [{}];
    }

    componentDidMount() {
        this.asModel().observe('data', (data) => {
            this.props.onChange && this.props.onChange(data);
        });
    }

    render() {
        const { title, items } = this.props;

        return [{
            type: 'list',
            props: {
                indexAlias: 'i',
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
                                visible: `{i!=0}`
                            }
                        }, {
                            type: 'icon',
                            props: {
                                type: 'arrow-down',
                                style: { marginLeft: 5, ...iconStyle },
                                visible: `{i!=data.length-1}`
                            }
                        }, {
                            type: 'icon',
                            props: {
                                type: 'close',
                                style: { marginLeft: 5, ...iconStyle },
                                visible: `{(props.minNum||1)>data.length}`
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
                }), {
                    type: 'button',
                    props: {
                        icon: 'plus',
                        type: "button",
                        className: "pb_m mb_m fs_s ta_c w_full bg_fff",
                        style: { cursor: 'pointer', border: '1px dashed #333', color: '#333', height: 27, lineHeight: '26px' },
                        text: '{buttonText || "添加图片"} {data.length}/{props.maxNum}',
                        visible: '{props.addible!==false}'
                    }
                }],
                dataSource: '{data}'
            }
        }];
    }
}

registerAtom('inputGroup', InputGroupList);

export { InputGroupList };