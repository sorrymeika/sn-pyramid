import { BrickBase } from "../BrickBase";

class Slider extends BrickBase {
    processData(data) {
        return {
            images: data.images && data.images.map((img) => ({
                ...img,
                src: this.props.ctx.app.sfs.completeUrl(img.src)
            }))
        };
    }

    template(template) {
        return `<div sn-if={!images||!images.length} style="padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff;padding: 20px 4px;">${template.name + 'ttt'}</div>
        <div sn-else>${template.html}</div>`;
    }
}

export { Slider };