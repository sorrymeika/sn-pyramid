import { observable } from "snowball";
import { Service } from "snowball/app";
import { message } from "antd";

export default class SpuTypeSelectService extends Service {
    allTypes;
    @observable types = [];
    @observable subTypes = [];

    @observable typeId = 0;
    @observable subTypeId = 0;

    onInit = this.ctx.createEmitter();
    onChange = this.ctx.createEmitter();
    onTypeChange = this.ctx.createEmitter();
    onSubTypeChange = this.ctx.createEmitter();

    constructor({ spuTypeService }) {
        super();

        this.spuTypeService = spuTypeService;
        this.onInit((value) => this.init(value));
        this.onTypeChange((typeId) => {
            this.selectType(typeId);
            this.subTypeId = 0;
            this.onChange.emit([this.typeId, this.subTypeId]);
        });
        this.onSubTypeChange((typeId) => {
            this.selectSubType(typeId);
            this.onChange.emit([this.typeId, this.subTypeId]);
        });
    }

    async init([typeId = 0, subTypeId = 0] = []) {
        if (!this.allTypes) {
            this.allTypes = [];
            try {
                const res = await this.spuTypeService.listSpuTypes();
                this.allTypes = res.data;
                this.types = this.allTypes.filter((item) => item.pid == 0);
            } catch (e) {
                message.error(e.message);
            }
        }

        this.typeId = typeId;
        if (typeId !== 0) {
            await this.selectType(typeId);
        }
        this.subTypeId = subTypeId;
    }

    async selectType(typeId) {
        this.typeId = typeId;
        this.subTypeId = 0;
        this.subTypes = this.allTypes.filter((item) => item.pid == typeId);
    }

    async selectSubType(subTypeId) {
        this.subTypeId = subTypeId;
    }
}
