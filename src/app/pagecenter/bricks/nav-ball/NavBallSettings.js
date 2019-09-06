import { SettingsBase } from "../SettingsBase";

export class NavBallSettings extends SettingsBase {
    static defaultData = {
        images: [{
            src: ''
        }],
        rows: 2,
        bottomMargin: true
    };

    rows = [{
        text: '1行',
        value: 1
    }, {
        text: '2行',
        value: 2
    }];

    renderJson() {
        return [{
            type: 'select',
            props: {
                label: '行数',
                labelSpan: 6,
                labelLineBreak: true,
                field: 'data.rows',
                dataSource: '{rows}'
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
            type: 'inputGroup',
            props: {
                title: '图片',
                field: 'data.images',
                minNum: 4,
                maxNum: 16,
                items: [{
                    type: 'image',
                    props: {
                        field: 'image',
                        max: 1,
                        help: '上传格式为png、jpg、gif，大小20kb以下的图片',
                        rules: [{ required: true, message: '必须上传图片' }]
                    }
                }, {
                    type: 'link',
                    props: {
                        placeholder: '请输入合法链接',
                        field: 'link',
                    }
                }]
            }
        }];
    }
}