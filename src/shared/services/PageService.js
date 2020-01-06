import { Service, autowired } from "snowball/app";

export default class PageService extends Service {
    @autowired
    _marketServer;

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
        return this._marketServer.post('/admin/page/list', params);
    }

    addPage(page) {
        return this._marketServer.post('/admin/page/add', page);
    }

    editPage(pageId) {
        return this._marketServer.post('/admin/page/edit', {
            pageId
        });
    }

    editHome() {
        return this._marketServer.post('/admin/page/editHome');
    }

    editShop(sellerId) {
        return this._marketServer.post('/admin/page/editShop', { sellerId });
    }

    editBricks(pageId, historyId) {
        return this._marketServer.post('/admin/page/editBricks', {
            pageId,
            historyId
        });
    }

    addBrick(pageId, brick, historyId) {
        return this._marketServer.post('/admin/page/addBrick', {
            pageId,
            historyId,
            brick
        });
    }

    updateBrick(pageId, brick) {
        return this._marketServer.post('/admin/page/updateBrick', {
            pageId,
            brick
        });
    }

    deleteBrick(pageId, brick) {
        return this._marketServer.post('/admin/page/deleteBrick', {
            pageId,
            brickId: brick.id,
            brickType: brick.type,
        });
    }

    savePageProps(pageId, historyId, props) {
        return this._marketServer.post('/admin/page/savePageProps', {
            pageId,
            historyId,
            props: !props || typeof props === 'string' ? props : JSON.stringify(props)
        });
    }

    savePage(pageId, historyId, name, sortings) {
        return this._marketServer.post('/admin/page/savePage', {
            pageId,
            pageName: name,
            historyId,
            sortings
        });
    }

    publishPage(pageId, historyId) {
        return this._marketServer.post('/admin/page/publishPage', {
            pageId,
            historyId
        });
    }
}
