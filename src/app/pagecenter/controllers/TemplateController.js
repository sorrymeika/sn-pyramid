import { controller, injectable } from "snowball/app";
import { message } from "antd";

import { TemplateService } from "../../../domain/services/TemplateService";
import { Templates } from "../containers/Templates";

@controller(Templates)
class TemplateController {

    @injectable
    dataSource;

    constructor() {
        this.templateService = new TemplateService();
    }

    async onInit() {
        this.search();
    }

    @injectable
    async search() {
        const res = await this.templateService.getTemplates();
        if (res.success) {
            this.dataSource = res.data;
        } else {
            this.dataSource = [];
        }

    }

    @injectable
    addTemplate(data) {
        return this.templateService.addTemplate(data)
            .catch(e => message.error(e.message || '添加失败'));
    }
}

export default TemplateController;