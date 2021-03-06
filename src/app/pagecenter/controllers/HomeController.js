import React from "react";
import { message } from "antd";
import { controller } from "snowball/app";

import Decorator from "../containers/Decorator";
import DecorationBase from "./DecorationBase";
import { PAGE_TYPES } from "../constants/PAGE_TYPES";

import HomePageSetting from "../components/settings/HomePageSetting";
import { HomeConfiguration } from "../configuration";

@controller({
    component: Decorator,
    configuration: HomeConfiguration
})
class HomeController extends DecorationBase {

    async onInit() {
        const [pageRes, templateRes] = await Promise.all([this.pageService.editHome(), this.templateService.getTemplates({ pageType: PAGE_TYPES.HOME })]);
        if (!pageRes.success || !templateRes.success) {
            const error = pageRes.message || templateRes.message;
            message.error(error);
            this.decorationService.warning = error;
            return;
        }

        this.pageSettingService.formFactory = React.createFactory(HomePageSetting);

        const pageState = pageRes.data;
        this.decorationService.title = '商城首页';
        this.decorationService.pageState = pageState;
        this.decorationService.templates = templateRes.data.map(item => ({
            ...item,
            props: item.props
                ? JSON.parse(item.props) || {}
                : {}
        }));

        console.log(this.decorationService.templates);

        this.decorationService.loadBricks(pageState.id, pageState.historyId);
    }
}

export default HomeController;