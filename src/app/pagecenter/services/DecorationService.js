import { observable } from "snowball";
import { Service } from "snowball/app";

export class DecorationService extends Service {
    @observable pageState;
    @observable bricks = [];

    @observable isSaveButtonDisabled = true;
    onSaveButtonClick = this.ctx.createEvent();

    @observable isPublishButtonDisabled = false;
    onPublishButtonClick = this.ctx.createEvent();

    constructor({ pageService }) {
        super();
        this.pageService = pageService;

        this.onSaveButtonClick(() => this.savePage());
        this.onPublishButtonClick(() => this.publishPage());
    }

    savePage() {
        this.pageService.savePage();
    }

    publishPage() {
        this.pageService.publishPage();
    }
}