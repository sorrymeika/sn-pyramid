import { Service } from "snowball/app";

class ProductService extends Service {
    getSpusByIds(spuIds) {
        return this.app.server.trade.post('/product/getSpusByIds', {
            spuIds
        });
    }

    search(params) {
        return this.app.server.trade.post('/product/listSpu', params);
    }
}

export default ProductService;