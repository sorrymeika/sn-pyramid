import { controller, autowired, param } from "snowball/app";

import { PageList } from "../containers/PageList";
import { PageConfiguration } from "../configuration";
import { PageListService } from "../services/PageListService";

@controller({
    component: PageList,
    configuration: PageConfiguration
})
class PageListController {
    @param
    pageType: number;

    @autowired
    pageListService: PageListService;

    onInit() {
        this.pageListService.init(this.pageType);
    }
}

export default PageListController;