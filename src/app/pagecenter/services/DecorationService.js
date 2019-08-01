import { Service } from "snowball/app";

export class DecorationService extends Service {
    constructor({ pageService }) {
        super();
        this.pageService = pageService;
    }
}