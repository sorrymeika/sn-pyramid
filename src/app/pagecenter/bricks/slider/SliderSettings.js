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
                        field: 'src',
                        max: 1,
                        restrict: {
                            width: 750,
                            minHeight: 100,
                            maxHeight: 400
                        },
                        maxSize: 60,
                        help: '上传格式为png、jpg，宽750，高100~400，大小60kb以下的图片',
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