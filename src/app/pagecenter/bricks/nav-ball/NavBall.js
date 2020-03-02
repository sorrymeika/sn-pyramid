import { BrickBase } from "../BrickBase";

export class NavBall extends BrickBase {
    processData(data) {
        const { images = [], rows } = data;
        return {
            rows,
            width: Math.max(100, rows == 1 ? (images.length / 5) * 100 + 1 : ((images.length / 10) * 100 + 1)),
            images: images.map((img) => ({
                ...img,
                src: this.props.ctx.app.sfs.completeUrl(img.src)
            }))
        };
    }

    template(template) {
        return `<div sn-if={!images||!images.length} style="padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff;padding: 20px 4px;">${template.name}</div>
        <div sn-else>${template.html}</div>`;
    }
}
