import { SettingsBase } from "../../bricks/SettingsBase";

export default class ShopPageSettings extends SettingsBase {
    static defaultData = {
    };

    renderJson() {
        return [{
            type: 'image',
            props: {
                label: '店招图片',
                labelSpan: 6,
                field: 'data.backgroundImage',
                restrict: {
                    width: 750,
                    height: 360
                }
            }
        }];
    }
}