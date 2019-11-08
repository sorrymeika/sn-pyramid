import { BrickBase } from "../BrickBase";

class Images extends BrickBase {
    processData(data) {
        return {
            cols: data.cols,
            images: data.images && data.images.map((img) => ({
                ...img,
                src: this.props.ctx.app.sfs.completeUrl(img.src)
            }))
        };
    }

    template(template) {
        return `<div sn-if="!images||!images.length" style="padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff;padding: 20px 4px;">${template.name}</div>
        <div sn-else>${template.html}</div>`;
    }
}

export { Images };