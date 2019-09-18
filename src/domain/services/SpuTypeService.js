import { Service } from "snowball/app";

export default class SpuTypeService extends Service {
    listSpuTypes() {
        return this.ctx.server.trade.post('/product/listSpuTypes');
    }
}