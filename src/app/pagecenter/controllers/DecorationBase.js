import PageService from "../../../shared/services/PageService";
import TemplateService from "../../../shared/services/TemplateService";
import DecorationService from "../services/DecorationService";

import PageSettingService from "../services/PageSettingService";
import { autowired } from "snowball/app";

export default class DecorationBase {
    @autowired
    decorationService: DecorationService;

    @autowired
    templateService: TemplateService;

    @autowired
    pageService: PageService;

    @autowired
    pageSettingService: PageSettingService;

    @autowired
    searchService: SearchService;

    @autowired
    productService;

    get title() {
        return this.decorationService.title;
    }

    get templates() {
        return this.decorationService.templates;
    }

    get pageState() {
        return this.decorationService.pageState;
    }

    get bricks() {
        return this.decorationService.bricks;
    }

    get warning() {
        return this.decorationService.warning;
    }

    get isSettingVisible() {
        return this.decorationService.isSettingVisible;
    }
}