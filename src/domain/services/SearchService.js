import { Service } from "snowball/app";

class SearchService extends Service {
    searchByFormula(formulaId, pageIndex, pageSize) {
        return this.ctx.server.trade.post('/search/searchByFormula', {
            formulaId,
            pageIndex,
            pageSize
        });
    }
}

export default SearchService;