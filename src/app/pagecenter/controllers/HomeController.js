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

        this.decorationService.loadBricks(pageState.id, pageState.historyId);
    }
}

export default HomeController;