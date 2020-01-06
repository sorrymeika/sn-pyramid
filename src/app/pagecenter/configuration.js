import { configuration } from "snowball/app";
import TemplateService from "../../shared/services/TemplateService";
import DecorationService from "./services/DecorationService";

import PageService from "../../shared/services/PageService";
import PageSettingService from "./services/PageSettingService";
import { PageListService } from "./services/PageListService";

export const TemplateConfiguration = configuration({
    modules: {
        templateService: TemplateService
    }
});

export const PageConfiguration = configuration({
    dependencies: [TemplateConfiguration],
    modules: {
        decorationService: DecorationService,
        pageService: PageService,
        pageSettingService: PageSettingService,
        pageListService: PageListService
    }
});

export const HomeConfiguration = configuration({
    dependencies: [PageConfiguration],
    modules: {
    }
});