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
        return this.ctx.server.market.post('/page/list', params);
    }

    addPage(page) {
        return this.ctx.server.market.post('/page/add', page);
    }

    editPage(pageId) {
        return this.ctx.server.market.post('/page/edit', {
            pageId
        });
    }

    editHome() {
        return this.ctx.server.market.post('/page/editHome');
    }

    editBricks(pageId, historyId) {
        return this.ctx.server.market.post('/page/editBricks', {
            pageId,
            historyId
        });
    }

    addBrick(pageId, brick, historyId) {
        return this.ctx.server.market.post('/page/addBrick', {
            pageId,
            historyId,
            brick
        });
    }

    updateBrick(pageId, brick) {
        return this.ctx.server.market.post('/page/updateBrick', {
            pageId,
            brick
        });
    }

    deleteBrick(pageId, brick) {
        return this.ctx.server.market.post('/page/deleteBrick', {
            pageId,
            brickId: brick.id,
            brickType: brick.type,
        });
    }

    savePage(pageId, historyId, name, sortings) {
        return this.ctx.server.market.post('/page/savePage', {
            pageId,
            pageName: name,
            historyId,
            sortings
        });
    }

    publishPage(pageId, historyId) {
        return this.ctx.server.market.post('/page/publishPage', {
            pageId,
            historyId
        });
    }
}

export { PageService };