import { TEMPLATE_TYPES } from "../../constants/TEMPLATE_TYPES";
import { registerTemplate } from "../factories";
import { Products } from './Products';
import { ProductsSettings } from './ProductsSettings';

registerTemplate({
    type: TEMPLATE_TYPES.PRODUCTS,
    preivew: Products,
    settings: ProductsSettings
});