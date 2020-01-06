import { message } from "antd";
import { controller } from "snowball/app";

import Decorator from "../containers/Decorator";
import DecorationBase from "./DecorationBase";

@controller(Decorator)
class PageEditController extends DecorationBase {
    constructor(props, ctx) {
        super(props, ctx);

        this.pageId = Number(props.location.params.id);
    }

    async onInit() {
        const pageRes = await this.pageService.editPage(this.pageId);
        if (!pageRes.success) {
            const error = pageRes.message;
            message.error(error);
            this.decorationService.warning = error;
            return;
        }

        this.pageType = pageRes.data.type;

        const templateRes = await this.templateService.getTemplates({ pageType: this.pageType });

        if (!templateRes.success) {
            const error = templateRes.message;
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

        this.decorationService.loadBricks(pageState.id, pageState.historyId);
    }
}

export default PageEditController;