import { Service } from "snowball/app";

class PageService extends Service {
    editHome() {
        return this.ctx.marketServer.post('/page/editHome');
    }

    addPage(page) {
        return this.ctx.marketServer.post('/page/add', page);
    }

    editBricks(pageId, historyId) {
        return this.ctx.marketServer.post('/page/editBricks', {
            pageId,
            historyId
        });
    }

    addBrick(pageId, historyId, brick) {
        return this.ctx.marketServer.post('/page/addBrick', {
            pageId,
            historyId,
            brick
        });
    }
}

export { PageService };