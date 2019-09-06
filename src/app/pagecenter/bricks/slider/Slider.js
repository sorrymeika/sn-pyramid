import { registerComponent } from 'snowball';
import { SliderComponent } from 'snowball/widget';
import { BrickBase } from "../BrickBase";

registerComponent('slider', SliderComponent);

export class Slider extends BrickBase {
    processData(data) {
        return {
        };
    }

    template(template) {
        return `<div sn-if="!images||!images.length" style="padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff;padding: 20px 4px;">${template.name}</div>
        <div sn-else>${template.html}</div>`;
    }
}
