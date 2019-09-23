import { Service } from "snowball/app";

class FormulaService extends Service {
    listFormula({ keywords, sellerId, pageIndex, pageSize }) {
        let name,
            id;

        if (/^\d+$/.test(keywords)) {
            id = Number(keywords);
        } else {
            name = keywords;
        }

        return this.ctx.server.trade.post('/formula/list', {
            id,
            sellerId,
            name,
            pageIndex,
            pageSize
        });
    }

    getFormulaById(formulaId) {
        return this.ctx.server.trade.post('/formula/getById', {
            id: formulaId
        });
    }
}

export default FormulaService;