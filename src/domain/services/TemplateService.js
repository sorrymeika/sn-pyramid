import { Service } from 'snowball/app';

class TemplateService extends Service {
    addTemplate(data) {
        const { supportPageTypes } = data;

        return this.ctx.marketServer.post('/template/add', {
            ...data,
            supportPageTypes: supportPageTypes ? supportPageTypes.join(',') : undefined
        });
    }

    getTemplates() {
        return this.ctx.marketServer.post('/template/query');
    }
}

export { TemplateService };