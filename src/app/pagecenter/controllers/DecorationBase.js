import { injectable } from "snowball/app";
import { PageService } from "../../../domain/services/PageService";
import { TemplateService } from "../../../domain/services/TemplateService";
import { DecorationService } from "../services/DecorationService";

export class DecorationBase {
    @injectable decorationService: DecorationService;

    @injectable get title() {
        return this.decorationService.title;
    }

    @injectable get templates() {
        return this.decorationService.templates;
    }

    @injectable get pageState() {
        return this.decorationService.pageState;
    }

    @injectable get bricks() {
        return this.decorationService.bricks;
    }

    @injectable get warning() {
        return this.decorationService.warning;
    }

    constructor() {
        this.templateService = new TemplateService();
        this.pageService = new PageService();
        this.decorationService = new DecorationService({
            pageService: this.pageService
        });
    }
}