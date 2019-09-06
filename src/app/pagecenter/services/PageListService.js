import { Service } from "snowball/app";
import { observable } from "snowball";

export class PageListService extends Service {
    @observable pageList = [];

    params;
    type;

    @observable pageIndex = 1;
    pageSize = 20;
    total = 0;

    constructor({ pageService }) {
        super();

        this.pageService = pageService;
    }

    init(type) {
        this.type = type;
        this.search();
    }

    search(params = {}) {
        this.params = params;
        this.pageIndex = 1;
        return this.loadPageList();
    }

    changePageIndex(pageIndex) {
        this.pageIndex = pageIndex;
        return this.loadPageList();
    }

    async loadPageList() {
        this.pageService.getPageList({
            ...this.params,
            type: this.type,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }
}