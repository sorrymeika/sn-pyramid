import { observable } from "snowball";
import { Service } from "snowball/app";
import PageService from "../../../shared/services/PageService";
import { message } from "antd";

export default class PageSettingService extends Service {
    @observable data;
    @observable formFactory;
    @observable isPanelVisible = false;

    pageState = null;

    onSettingOk = this.ctx.createEmitter();
    onSettingCancel = this.ctx.createEmitter();
    onDidSave = this.ctx.createEmitter();

    constructor(pageService: PageService, formFactory) {
        super();

        this.pageService = pageService;
        this.formFactory = formFactory;

        this.onSettingOk((props) => {
            this.setPageProps(props);
        });

        this.onSettingCancel(() => {
            this.isPanelVisible = false;
        });
    }

    setPageProps(props) {
        this.pageService.savePageProps(this.pageState.id, this.pageState.historyId, props)
            .then(res => {
                message.success('设置成功！');
                this.isPanelVisible = false;
                this.onDidSave.emit();
            })
            .catch(e => {
                message.error(e.message);
            });
    }

    showPanel() {
        this.isPanelVisible = true;
    }

    hidePanel() {
        this.isPanelVisible = false;
    }
}