import React from "react";
import { message } from "antd";
import { controller } from "snowball/app";

import Decorator from "../containers/Decorator";
import DecorationBase from "./DecorationBase";
import { PAGE_TYPES } from "../constants/PAGE_TYPES";
import ShopPageSettings from "../components/settings/ShopPageSetting";

@controller(Decorator)
class ShopController extends DecorationBase {
    constructor(props, ctx) {
        super(props, ctx);

        this.sellerId = Number(props.location.params.id);
    }

    async onInit() {
        const [pageRes, templateRes] = await Promise.all([this.pageService.editShop(this.sellerId), this.templateService.getTemplates({ pageType: PAGE_TYPES.SHOP })]);
        if (!pageRes.success || !templateRes.success) {
            const error = pageRes.message || templateRes.message;
            message.error(error);
            this.decorationService.warning = error;
            return;
        }

        this.pageSettingService.formFactory = React.createFactory(ShopPageSettings);

        const pageState = pageRes.data;
        this.decorationService.title = '店铺首页';
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

export default ShopController;