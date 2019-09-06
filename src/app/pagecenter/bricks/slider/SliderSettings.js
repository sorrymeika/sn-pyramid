import { SettingsBase } from "../SettingsBase";

export class SliderSettings extends SettingsBase {
    static defaultData = {
        images: [{
            src: ''
        }],
        bottomMargin: true
    };

    renderJson() {
        return [{
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
                minNum: 2,
                items: [{
                    type: 'image',
                    props: {
                        field: 'image',
                        max: 1,
                        help: '上传格式为png、jpg，大小100kb以下的图片',
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