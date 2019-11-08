import { Service } from 'snowball/app';

class TemplateService extends Service {
    getTemplates(params) {
        return this.app.server.market.post('/template/query', params);
    }

    addTemplate(data) {
        const { supportPageTypes } = data;

        return this.app.server.market.post('/template/add', {
            ...data,
            supportPageTypes: supportPageTypes ? supportPageTypes.join(',') : undefined
        });
    }

    updateTemplate(data) {
        if (!data.id) return Promise.reject(new Error('id必传'));

        const { supportPageTypes } = data;

        return this.app.server.market.post('/template/update', {
            ...data,
            supportPageTypes: supportPageTypes ? supportPageTypes.join(',') : undefined
        });
    }
}

export { TemplateService };