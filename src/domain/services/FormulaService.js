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

        return this.app.server.trade.post('/formula/list', {
            id,
            sellerId,
            name,
            pageIndex,
            pageSize
        });
    }

    getFormulaById(formulaId) {
        return this.app.server.trade.post('/formula/getById', {
            id: formulaId
        });
    }
}

export default FormulaService;