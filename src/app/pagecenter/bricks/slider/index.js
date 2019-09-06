import { TEMPLATE_TYPES } from "../../constants/TEMPLATE_TYPES";
import { registerTemplate } from "../factories";
import { Slider } from './Slider';
import { SliderSettings } from './SliderSettings';

registerTemplate({
    type: TEMPLATE_TYPES.SLIDER,
    preivew: Slider,
    settings: SliderSettings
});