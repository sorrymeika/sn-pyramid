import { observable } from "snowball";
import { Service } from "snowball/app";
import { message } from "antd";

export class DecorationService extends Service {
    @observable pageState = {};
    @observable bricks = [];
    @observable templates = [];
    @observable currentBrick = {};
    @observable currentTemplate = {};
    @observable selectedBrickId;
    @observable warning;
    @observable title;

    onDrop = this.ctx.createEvent();

    onSelectBrick = this.ctx.createEvent();
    onSwapBrick = this.ctx.createEvent();
    onDeleteBrick = this.ctx.createEvent();

    @observable isSettingVisible = false;
    onSettingCancel = this.ctx.createEvent();
    onSettingOk = this.ctx.createEvent();

    @observable isSaveButtonDisabled = true;
    onSaveButtonClick = this.ctx.createEvent();

    @observable isPublishButtonDisabled = false;
    onPublishButtonClick = this.ctx.createEvent();

    constructor({ pageService }) {
        super();
        this.pageService = pageService;

        this.onDrop((e) => this.handleDrop(e));

        this.onSelectBrick((data) => this.selectBrick(data));
        this.onSwapBrick(({ fromIndex, toIndex }) => this.swapBrick(fromIndex, toIndex));
        this.onDeleteBrick((brick) => this.deleteBrick(brick));

        this.onSettingCancel(() => this.cancelSetting());
        this.onSettingOk((data) => this.submitSetting(data));

        this.onSaveButtonClick(() => this.savePage());
        this.onPublishButtonClick(() => this.publishPage());
    }

    async loadBricks(pageId, historyId) {
        const bricksRes = await this.pageService.editBricks(pageId, historyId);
        if (!bricksRes.success) {
            message.error(bricksRes.message);
            this.warning = bricksRes.message;
            return;
        }
        this.bricks = bricksRes.data.map((brick) => {
            return {
                ...brick,
                data: JSON.parse(brick.data),
                props: JSON.parse(brick.props),
            };
        });
    }

    async handleDrop(e) {
        const { sourceType, status, source, target } = e;
        const targetBrick = target.data;

        if (sourceType == 'new') {
            const template = source.data;
            const brick = {
                data: null,
                props: {},
                sort: 0,
                templateId: template.id
            };
            if (status === 'append') {
                brick.sort = 2048;
            } else if (status === 'before') {
                brick.sort = targetBrick.sort / 2;
            } else if (status === 'after') {
                for (let i = 0; i < this.bricks.length; i++) {
                    if (this.bricks[i] == targetBrick) {
                        const nextSort = this.bricks[i + 1] ? targetBrick.sort + ((this.bricks[i + 1].sort - targetBrick.sort) / 2) : (targetBrick.sort + 2048);
                        brick.sort = nextSort;
                        break;
                    }
                }
            } else if (status === 'dragout') {
                return;
            }

            let newBrickModel;
            this.bricks.withMutations((bricks) => {
                newBrickModel = bricks.add(brick);
                bricks.sort((a, b) => {
                    return a.sort - b.sort;
                });
            });
            const res = await this.pageService.addBrick(this.pageState.id, {
                ...brick,
                data: JSON.stringify(brick.data),
                props: JSON.stringify(brick.props),
            }, this.pageState.historyId);
            if (res.success) {
                newBrickModel.set({
                    id: res.data.id,
                    type: res.data.type
                });
                this.selectBrick({
                    brick: newBrickModel.attributes,
                    template: this.templates.find((tpl) => tpl.id === newBrickModel.attributes.templateId)
                });
                this.isSaveButtonDisabled = false;
            } else {
                message.error(res.message);
                this.bricks.withMutations((bricks) => {
                    bricks.remove(newBrickModel);
                });
            }
        } else if (sourceType == 'move') {
            const brick = source.data;
            if (status === 'dragout') {
                this.deleteBrick(brick);
            } else if (status === 'after') {
                const targetIndex = this.bricks.findIndex((item) => item.id == targetBrick.id);
                const sourceBrick = this.bricks.find((item) => item.id == brick.id);

                sourceBrick.withMutations((sourceBrickModel) => {
                    sourceBrickModel.set({
                        sort: targetIndex === this.bricks.length - 1
                            ? targetBrick.sort + 2048
                            : (targetBrick.sort + ((this.bricks[targetIndex + 1].sort - targetBrick.sort) / 2))
                    });
                });
            } else if (status === 'before') {
                const targetIndex = this.bricks.findIndex((item) => item.id == targetBrick.id);
                const sourceBrick = this.bricks.find((item) => item.id == brick.id);

                sourceBrick.withMutations((sourceBrickModel) => {
                    sourceBrickModel.set({
                        sort: targetIndex === 0
                            ? targetBrick.sort / 2
                            : (this.bricks[targetIndex - 1].sort + ((targetBrick.sort - this.bricks[targetIndex - 1].sort) / 2))
                    });
                });
            }
        }
    }

    selectBrick({ brick, template }) {
        this.currentBrick = brick;
        this.currentTemplate = template;
        this.selectedBrickId = brick.id;
        this.isSettingVisible = true;
    }

    swapBrick(fromIndex, toIndex) {
        this.bricks.withMutations((bricks) => {
            bricks.swap(fromIndex, toIndex);
            bricks.each((brick, i) => {
                brick.set({
                    sort: (i + 1) * 2048
                });
            });
        });
    }

    async deleteBrick(brick) {
        this.bricks.withMutations((bricks) => {
            bricks.remove('id', brick.id);
        });

        const res = await this.pageService.deleteBrick(this.pageState.id, brick);
        if (res.success) {
            message.success('删除成功！');
            this.isSaveButtonDisabled = true;
            if (this.currentBrick.id === brick.id) {
                this.currentBrick = {};
                this.isSettingVisible = false;
            }
        } else {
            message.error(res.message);
        }
    }

    async submitSetting(data) {
        console.log(data);

        const res = await this.pageService.updateBrick(this.pageState.id, {
            ...data,
            data: JSON.stringify(data.data || {}),
            props: JSON.stringify(data.props),
        }, this.pageState.historyId);

        if (res.success) {
            this.currentBrick = this.bricks.find((item) => (item.id == this.currentBrick.id))
                .withMutations((brick) => {
                    brick.set({
                        data: data.data || {},
                        props: data.props
                    });
                });
            this.isSettingVisible = false;
            this.isSaveButtonDisabled = false;
        } else {
            message.error(res.message);
        }
    }

    cancelSetting() {
        this.isSettingVisible = false;
    }

    async savePage() {
        const { id, historyId, name } = this.pageState;
        const sortings = [];
        this.bricks.withMutations((bricks) => {
            bricks.each((brick, i) => {
                brick.set({
                    sort: (i + 1) * 2048
                });
                sortings.push(brick.pick(['id', 'sort']));
            });
        });
        const res = await this.pageService.savePage(id, historyId, name, sortings);
        if (res.success) {
            message.success('保存成功！');
            this.isSaveButtonDisabled = true;
        } else {
            message.error(res.message);
        }
        return res.success;
    }

    async publishPage() {
        if (this.bricks.some((brick) => !brick.data)) {
            message.error('请正确设置每个模块！');
            return;
        }

        if (!this.isSaveButtonDisabled) {
            if (!await this.savePage()) {
                return;
            }
        }

        const { id, historyId } = this.pageState;
        const res = await this.pageService.publishPage(id, historyId);
        if (res.success) {
            message.success('发布成功！');
            this.isPublishButtonDisabled = true;
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        } else {
            message.error(res.message);
        }
    }
}