import { observable } from "snowball";
import { Service } from "snowball/app";

export default class FormulaSelectService extends Service {
    @observable formulas = [];
    @observable isEditModalVisible = false;
    @observable currentFormula;
    @observable total;
    @observable pageIndex = 1;
    @observable pageSize = 20;

    searchParams = {};

    onInit = this.ctx.createEmitter();
    onSearch = this.ctx.createEmitter();
    onPageChange = this.ctx.createEmitter();

    constructor({
        formulaService,
        sellerId = 0
    }) {
        super();

        this.sellerId = sellerId;
        this.formulaService = formulaService;
        this.onInit(() => {
            this.loadFormulas();
        });
        this.onSearch((params) => this.search(params, 1));
        this.onPageChange(({ current }) => this.changePage(current));
    }

    search(params, pageIndex) {
        this.searchParams = {
            ...params,
            sellerId: this.sellerId
        };
        this.pageIndex = pageIndex;
        this.loadFormulas();
    }

    changePage(pageIndex) {
        this.pageIndex = pageIndex;
        this.loadFormulas();
    }

    loadFormulas() {
        this.formulaService.listFormula({
            ...this.searchParams,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        })
            .then((res) => {
                this.formulas = res.data;
                this.total = res.total;
            });
    }
}