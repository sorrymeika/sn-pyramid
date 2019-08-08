import TemplateController from "./pagecenter/controllers/TemplateController";
import { HomeController } from "./pagecenter/controllers/HomeController";

import '../atom-extentions';

export default {
    '/test': import("./Test"),
    '/pagecenter/templates': TemplateController,
    '/pagecenter/home': HomeController,
};