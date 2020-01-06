import { configuration } from "snowball/app";
import PageService from "./services/PageService";

export const CommonConfiguration = configuration({
    modules: {
        pageService: PageService
    }
});