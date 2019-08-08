import { TEMPLATE_TYPES } from "../../constants/TEMPLATE_TYPES";
import { registerTemplate } from "../factories";
import { Images } from './Images';
import { ImagesSettings } from './ImagesSettings';

registerTemplate({
    type: TEMPLATE_TYPES.IMAGE,
    preivew: Images,
    settings: ImagesSettings
});