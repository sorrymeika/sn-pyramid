import { SettingsBase } from "../SettingsBase";

export class ProductsSettings extends SettingsBase {
    static defaultData = {
        products: [],
        type: 1,
        cols: 2,
        bottomMargin: true
    };

    cols = [{
        text: '1列',
        value: 1
    }, {
        text: '2列',
        value: 2
    }, {
        text: '3列',
        value: 3
    }];

    types = [{
        text: '自动选品',
        value: 1
    }, {
        text: '手动选品',
        value: 2
    }];

    renderJson() {
        const { type } = this.data;

        return [{
            type: 'select',
            props: {
                label: '样式',
                labelSpan: 6,
                labelLineBreak: true,
                field: 'data.cols',
                dataSource: '{cols}'
            }
        }, {
            type: 'div',
            children: [{
                type: 'checkbox',
                props: {
                    label: '下外边距',
                    field: 'data.bottomMargin'
                }
            }]
        }, {
            type: 'radiolist',
            props: {
                label: '选品方式',
                field: 'data.type',
                dataSource: '{types}'
            }
        },
        type == 1
            ? {
                type: 'formula',
                props: {
                    label: '选品规则ID',
                    field: 'data.formulaId',
                }
            }
            : {
                type: 'div',
                children: [{
                    type: 'products-transfer',
                    props: {
                        field: 'data.products'
                    }
                }]
            }
        ];
    }
}