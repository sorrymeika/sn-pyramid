import { Service, autowired } from "snowball/app";
import { observable } from "snowball";
import { message } from "antd";
import PageService from "../../../shared/services/PageService";

export class PageListService extends Service {
    @observable pageList = [];

    params;
    type;

    @observable pageIndex = 1;
    pageSize = 20;
    total = 0;

    onSearch = this.ctx.createEmitter();
    onPageChange = this.ctx.createEmitter();

    @observable isModalVisible = false;
    onClickAddPage = this.ctx.createEmitter();
    onAddPage = this.ctx.createEmitter();
    onCancelAddPage = this.ctx.createEmitter();

    @autowired
    pageService: PageService;

    constructor() {
        super();

        this.onSearch((params) => this.search(params));
        this.onPageChange(({ current }) => this.changePageIndex(current));

        this.onClickAddPage(() => this.showAddPageModal());
        this.onAddPage((data) => this.addPage(data));
        this.onCancelAddPage(() => this.hideAddPageModal());
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
        const res = await this.pageService.getPageList({
            ...this.params,
            type: this.type,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });

        if (res.success) {
            this.pageList = res.data;
        } else {
            message.error(res.message);
        }
    }

    showAddPageModal() {
        this.isModalVisible = true;
    }

    hideAddPageModal() {
        this.isModalVisible = false;
    }

    async addPage(data) {
        const res = await this.pageService.addPage({
            ...data,
            type: this.type
        });

        if (res.success) {
            message.success('添加成功，进入编辑页...');
            setTimeout(() => {
                window.open(`#/pagecenter/edit/${res.id}`);
            }, 1000);
        } else {
            message.error(res.message);
        }
    }
}