import { Service } from "snowball/app";

class ProductService extends Service {
    getSpusByIds(spuIds) {
        return this.ctx.server.trade.post('/product/getSpusByIds', {
            spuIds
        });
    }

    search(params) {
        return this.ctx.server.trade.post('/product/listSpu', params);
    }
}

export default ProductService;