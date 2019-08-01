import { Service } from 'snowball';

class TemplateService extends Service {
    getTemplates() {
        return this.ctx.marketServer.post('/pagecenter/getTemplates');
    }
}

export { TemplateService };