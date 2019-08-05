import { injectable } from "snowball/app";
import { PageService } from "../../../domain/services/PageService";
import { DecorationService } from "../services/DecorationService";

export class DecorationBase {
    @injectable decorationService: DecorationService;

    @injectable get pageState() {
        return this.decorationService.pageState;
    }

    @injectable get bricks() {
        return this.decorationService.bricks;
    }

    constructor() {
        this.pageService = new PageService();
        this.decorationService = new DecorationService({
            pageService: this.pageService
        });
    }
}