import { message } from "antd";
import { controller } from "snowball/app";

import { Decorator } from "../containers/Decorator";
import { DecorationBase } from "./DecorationBase";

@controller(Decorator)
class HomeController extends DecorationBase {

    async onInit() {
        const [pageRes, templateRes] = await Promise.all([this.pageService.editHome(), this.templateService.getTemplates()]);
        if (!pageRes.success || !templateRes.success) {
            const error = pageRes.message || templateRes.message;
            message.error(error);
            this.decorationService.warning = error;
            return;
        }
        const pageState = pageRes.data;
        this.decorationService.pageState = pageState;
        this.decorationService.templates = templateRes.data.map(item => ({
            ...item,
            props: item.props
                ? JSON.parse(item.props) || {}
                : {}
        }));

        console.log(this.decorationService.pageState);

        const bricksRes = await this.pageService.editBricks(pageState.id, pageState.historyId);
        if (!bricksRes.success) {
            message.error(bricksRes.message);
            this.decorationService.warning = bricksRes.message;
            return;
        }
        this.decorationService.bricks = bricksRes.data;

        this.decorationService.bricks.withMutations((bricks) => {
            bricks.add({
                id: 1,
                data: {},
                props: {},
                template: this.decorationService.templates[0]
            });
        });
    }
}

export { HomeController };