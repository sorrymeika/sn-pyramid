import { Service } from "snowball/app";

export default class CategoryService extends Service {
    listByPid(pid) {
        return this.app.server.trade.post('/category/listCateByPid', {
            pid
        });
    }
}