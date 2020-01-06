import { SettingsBase } from "../../bricks/SettingsBase";

export default class HomePageSettings extends SettingsBase {
    static defaultData = {
        backgroundColor: true
    };

    renderJson() {
        return [{
            type: 'input',
            props: {
                label: '背景色',
                labelSpan: 6,
                labelLineBreak: true,
                field: 'data.backgroundColor',
            }
        }];
    }
}