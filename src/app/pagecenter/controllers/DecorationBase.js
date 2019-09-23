import { injectable } from "snowball/app";
import { PageService } from "../../../domain/services/PageService";
import { TemplateService } from "../../../domain/services/TemplateService";
import { DecorationService } from "../services/DecorationService";

import CategoryService from "../../../domain/services/CategoryService";
import CateSelectService from "../../product/services/CateSelectService";

import SpuTypeService from "../../../domain/services/SpuTypeService";
import SpuTypeSelectService from "../../product/services/SpuTypeSelectService";

import ProductService from "../../../domain/services/ProductService";
import FormulaService from "../../../domain/services/FormulaService";
import FormulaSelectService from "../../product/services/FormulaSelectService";
import SearchService from "../../../domain/services/SearchService";

export class DecorationBase {
    @injectable decorationService: DecorationService;
    @injectable productService: ProductService;
    @injectable searchService: SearchService;

    @injectable cateSelectServiceFactory() {
        if (!this.cateSelectService) {
            this.cateSelectService = new CateSelectService({
                categoryService: new CategoryService()
            });
        }
        return this.cateSelectService;
    }

    @injectable spuTypeSelectServiceFactory() {
        if (!this.spuTypeSelectService) {
            this.spuTypeSelectService = new SpuTypeSelectService({
                spuTypeService: new SpuTypeService()
            });
        }
        return this.spuTypeSelectService;
    }

    @injectable formulaSelectServiceFactory() {
        if (!this.formulaSelectService) {
            this.formulaSelectService = new FormulaSelectService({
                formulaService: new FormulaService()
            });
        }
        return this.formulaSelectService;
    }

    @injectable get title() {
        return this.decorationService.title;
    }

    @injectable get templates() {
        return this.decorationService.templates;
    }

    @injectable get pageState() {
        return this.decorationService.pageState;
    }

    @injectable get bricks() {
        return this.decorationService.bricks;
    }

    @injectable get warning() {
        return this.decorationService.warning;
    }

    @injectable get isSettingVisible() {
        return this.decorationService.isSettingVisible;
    }

    constructor() {
        this.templateService = new TemplateService();
        this.pageService = new PageService();
        this.decorationService = new DecorationService({
            pageService: this.pageService
        });

        this.productService = new ProductService();

        this.searchService = new SearchService();
    }
}