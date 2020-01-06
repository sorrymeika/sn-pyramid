import { observable } from "snowball";
import { Service } from "snowball/app";
import { message } from "antd";

export default class CateSelectService extends Service {
    @observable cates = [];
    @observable subCates = [];
    @observable subSubCates = [];

    @observable cateId = 0;
    @observable subCateId = 0;
    @observable subSubCateId = 0;

    onInit = this.ctx.createEmitter();
    onChange = this.ctx.createEmitter();
    onCateChange = this.ctx.createEmitter();
    onSubCateChange = this.ctx.createEmitter();
    onSubSubCateChange = this.ctx.createEmitter();

    constructor({ categoryService }) {
        super();

        this.categoryService = categoryService;
        this.onInit((value) => this.init(value));
        this.onCateChange((cateId) => {
            this.selectCate(cateId);
            this.subCateId = 0;
            this.subSubCateId = 0;
            this.onChange.emit([this.cateId, this.subCateId, this.subSubCateId]);
        });
        this.onSubCateChange((cateId) => {
            this.selectSubCate(cateId);
            this.subSubCateId = 0;
            this.onChange.emit([this.cateId, this.subCateId, this.subSubCateId]);
        });
        this.onSubSubCateChange((cateId) => {
            this.selectSubSubCate(cateId);
            this.onChange.emit([this.cateId, this.subCateId, this.subSubCateId]);
        });
    }

    async init(cates) {
        const res = await this.categoryService.listByPid(0);

        try {
            this.cates = res.data;
        } catch (e) {
            message.error(e.message);
        }

        this.setCates(cates);
    }

    setCates([cateId = 0, subCateId = 0, subSubCateId = 0] = []) {
        if (this.cateId != cateId) {
            this.selectCate(cateId);
        }
        if (this.subCateId != subCateId) {
            this.selectSubCate(subCateId);
        }
        this.subSubCateId = subSubCateId;
    }

    async selectCate(cateId) {
        this.cateId = cateId;
        this.subCateId = 0;

        if (cateId == 0) {
            this.subCates = [];
        } else {
            try {
                const res = await this.categoryService.listByPid(cateId);
                this.subCates = res.data;
            } catch (e) {
                message.error(e.message);
                this.subCates = [];
            }
        }
    }

    async selectSubCate(subCateId) {
        this.subCateId = subCateId;
        if (subCateId == 0) {
            this.subSubCates = [];
        } else {
            try {
                const res = await this.categoryService.listByPid(subCateId);
                this.subSubCates = res.data;
            } catch (e) {
                message.error(e.message);
                this.subSubCates = [];
            }
        }
    }

    selectSubSubCate(subSubCateId) {
        this.subSubCateId = subSubCateId;
    }
}