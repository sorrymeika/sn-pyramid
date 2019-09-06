import { controller, injectable } from "snowball/app";

import { PageService } from "../../../domain/services/PageService";
import { PageListService } from "../services/PageListService";
import { PageList } from "../containers/PageList";


@controller(PageList)
class PageListController {
    @injectable pageListService;

    constructor(props, ctx) {
        this.pageType = Number(props.location.params.type);
        this.pageListService = new PageListService({
            pageService: new PageService()
        });
    }

    onInit() {
        this.pageListService.init(this.pageType);
    }
}

export default PageListController;