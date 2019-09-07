import { SettingsBase } from "../SettingsBase";

export class ImagesSettings extends SettingsBase {
    static defaultData = {
        images: [{
            src: ''
        }],
        cols: 1,
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
    }, {
        text: '4列',
        value: 4
    }, {
        text: '5列',
        value: 5
    }];

    renderJson() {
        return [{
            type: 'select',
            props: {
                label: '列数',
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
            type: 'inputGroup',
            props: {
                title: '图片',
                field: 'data.images',
                minNum: this.data.cols,
                items: [{
                    type: 'image',
                    props: {
                        field: 'src',
                        max: 1,
                        maxSize: 100,
                        help: '上传格式为png、jpg、gif，大小100kb以下的图片',
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