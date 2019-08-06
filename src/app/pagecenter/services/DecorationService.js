import { observable } from "snowball";
import { Service } from "snowball/app";

export class DecorationService extends Service {
    @observable pageState = {};
    @observable bricks = [];
    @observable templates = [];
    @observable currentBrick = {};
    @observable selectedBrickId;
    @observable warning;
    @observable title;

    onDrop = this.ctx.createEvent();

    onSelectBrick = this.ctx.createEvent();
    onSwapBrick = this.ctx.createEvent();
    onDeleteBrick = this.ctx.createEvent();

    @observable isSaveButtonDisabled = true;
    onSaveButtonClick = this.ctx.createEvent();

    @observable isPublishButtonDisabled = false;
    onPublishButtonClick = this.ctx.createEvent();

    constructor({ pageService }) {
        super();
        this.pageService = pageService;

        this.onDrop((e) => this.handleDrop(e));

        this.onSelectBrick((brick) => this.selectBrick(brick));
        this.onSwapBrick((fromIndex, toIndex) => this.onSwapBrick(fromIndex, toIndex));
        this.onDeleteBrick((brick) => this.deleteBrick(brick));

        this.onSaveButtonClick(() => this.savePage());
        this.onPublishButtonClick(() => this.publishPage());
    }

    handleDrop(e) {
        console.log(e);
        const { sourceType, source, target } = e;

        if (sourceType == 'new') {
            const template = source.data;
            this.bricks.withMutations((bricks) => {
                bricks.add({
                    id: 1,
                    data: {},
                    props: {},
                    template
                });
            });
        }
    }

    selectBrick(brick) {
        console.log(brick);
        this.currentBrick = brick;
    }

    swapBrick(fromIndex, toIndex) {
        console.log(fromIndex, toIndex);
    }

    deleteBrick(brick) {
        console.log(brick);
    }

    savePage() {
        this.pageService.savePage();
    }

    publishPage() {
        this.pageService.publishPage();
    }
}