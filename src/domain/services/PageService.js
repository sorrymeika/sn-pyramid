import { Service } from "snowball/app";

class PageService extends Service {
    getPageList({ type, status, keywords, pageIndex, pageSize }) {
        const params = {
            type,
            status,
            pageIndex,
            pageSize
        };
        if (keywords) {
            if (/^\d+$/.test(keywords)) {
                params.id = Number(keywords);
            } else {
                params.name = keywords;
            }
        }
        return this.ctx.marketServer.post('/page/list', params);
    }

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

    addBrick(pageId, brick, historyId) {
        return this.ctx.marketServer.post('/page/addBrick', {
            pageId,
            historyId,
            brick
        });
    }

    updateBrick(pageId, brick) {
        return this.ctx.marketServer.post('/page/updateBrick', {
            pageId,
            brick
        });
    }

    deleteBrick(pageId, brick) {
        return this.ctx.marketServer.post('/page/deleteBrick', {
            pageId,
            brickId: brick.id,
            brickType: brick.type,
        });
    }

    savePage(pageId, historyId, name, sortings) {
        return this.ctx.marketServer.post('/page/savePage', {
            pageId,
            pageName: name,
            historyId,
            sortings
        });
    }

    publishPage(pageId, historyId) {
        return this.ctx.marketServer.post('/page/publishPage', {
            pageId,
            historyId
        });
    }
}

export { PageService };