import { message } from "antd";
import { controller } from "snowball/app";

import { Decorator } from "../containers/Decorator";
import { DecorationBase } from "./DecorationBase";

@controller(Decorator)
class HomeController extends DecorationBase {

    async onInit() {
        const res = await this.pageService.editHome();
        if (!res.success) {
            message.error(res.message);
            return;
        }
        const pageState = res.data;
        this.decorationService.pageState = pageState;

        const bricksRes = await this.pageService.editBricks(pageState.id, pageState.historyId);
        if (!bricksRes.success) {
            message.error(bricksRes.message);
            return;
        }
        this.decorationService.bricks = bricksRes.data;
    }
}

export { HomeController };