import { controller, injectable } from "snowball/app";

import { TemplateService } from "../../../domain/services/TemplateService";
import { Templates } from "../containers/Templates";

@controller(Templates)
class TemplateController {

    @injectable dataSource;

    constructor() {
        this.templateService = new TemplateService();
    }

    async onInit() {
        this.search();
    }

    @injectable
    async search(data) {
        const res = await this.templateService.getTemplates(data);
        if (res.success) {
            this.dataSource = res.data;
        } else {
            this.dataSource = [];
        }
    }

    @injectable
    async addTemplate(data) {
        const res = await this.templateService.addTemplate(data);
        if (res.success) {
            this.search();
        }
    }

    @injectable
    async updateTemplate(data) {
        const res = await this.templateService.updateTemplate(data);
        if (res.success) {
            this.search();
        }
    }
}

export default TemplateController;