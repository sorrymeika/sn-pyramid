import { SettingsBase } from "../SettingsBase";

export class ImagesSettings extends SettingsBase {
    static defaultData = {
        images: [{
            src: ''
        }, {
            src: ''
        }],
        cols: 1,
    };

    cols = [{
        text: '1列',
        value: 1
    }];

    onImagesChange(data) {
        console.log('onImagesChange:', data);
    }

    render() {
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
            type: 'input',
            props: {
                placeholder: '请输入合法链接',
                field: 'data.images[0].link',
                max: 100
            }
        }, {
            type: 'inputGroup',
            props: {
                title: '图片',
                onChange: '{onImagesChange}',
                items: [{
                    type: 'link',
                    props: {
                        placeholder: '请输入合法链接',
                        field: 'link'
                    }
                }]
            }
        }];
    }
}