import { TEMPLATE_TYPES } from "../../constants/TEMPLATE_TYPES";
import { registerTemplate } from "../factories";
import { NavBall } from './NavBall';
import { NavBallSettings } from './NavBallSettings';

registerTemplate({
    type: TEMPLATE_TYPES.NAV_BALL,
    preivew: NavBall,
    settings: NavBallSettings
});