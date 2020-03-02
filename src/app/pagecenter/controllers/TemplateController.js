import { observable } from "snowball";
import { controller, autowired } from "snowball/app";

import TemplateService from "../../../shared/services/TemplateService";
import Templates from "../containers/Templates";
import { TemplateConfiguration } from "../configuration";

@controller({
    component: Templates,
    configuration: TemplateConfiguration
})
class TemplateController {

    @observable
    dataSource;

    @autowired
    templateService: TemplateService;

    async onInit() {
        this.search();
    }

    async search(data) {
        const res = await this.templateService.getTemplates(data);
        if (res.success) {
            this.dataSource = res.data;
            console.log(this.dataSource, res.data);
        } else {
            this.dataSource = [];
        }
    }

    async addTemplate(data) {
        const res = await this.templateService.addTemplate(data);
        if (res.success) {
            this.search();
        }
    }

    async updateTemplate(data) {
        const res = await this.templateService.updateTemplate(data);
        if (res.success) {
            this.search();
        }
    }
}

export default TemplateController;