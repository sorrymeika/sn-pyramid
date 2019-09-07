import TemplateController from "./pagecenter/controllers/TemplateController";
import HomeController from "./pagecenter/controllers/HomeController";
import PageListController from "./pagecenter/controllers/PageListController";
import PageEditController from "./pagecenter/controllers/PageEditController";

import '../atom-extentions';

export default {
    '/test': import("./Test"),
    '/pagecenter/templates': TemplateController,
    '/pagecenter/home': HomeController,
    '/pagecenter/list/\\d+:type': PageListController,
    '/pagecenter/edit/\\d+:id': PageEditController,
};