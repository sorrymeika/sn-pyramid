import { BrickBase } from "../BrickBase";

export class Products extends BrickBase {
    processData(data) {
        return {
        };
    }

    template(template) {
        return `<div sn-if="!products||!products.length" style="padding: 20px; text-align: center; border: 1px solid #ddd; background:#fff;padding: 20px 4px;">${template.name}</div>
        <div sn-else>${template.html}</div>`;
    }
}
