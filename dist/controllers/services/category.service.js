"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryByIdService = exports.updateCategoryByIdService = exports.getAllCategoriesService = exports.getCategoryByIdService = exports.createCategoryService = void 0;
const commonMethods_1 = require("../../utils/common/commonMethods");
const category_query_1 = require("../query/category.query");
const createCategoryService = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, category_query_1.createCategoryQuery)(categoryData);
});
exports.createCategoryService = createCategoryService;
const getCategoryByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_query_1.getCategoryByIdQuery)(id);
    if (!category) {
        throw new Error('Category not found');
    }
    ;
    return category;
});
exports.getCategoryByIdService = getCategoryByIdService;
const getAllCategoriesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = query;
    const { skip, limit } = (0, commonMethods_1.getPaginationOptions)(page, size);
    return yield (0, category_query_1.getAllCategoriesQuery)(skip, limit);
});
exports.getAllCategoriesService = getAllCategoriesService;
const updateCategoryByIdService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_query_1.updateCategoryByIdQuery)(id, updateData);
    if (!category) {
        throw new Error('Category not found');
    }
    ;
    return category;
});
exports.updateCategoryByIdService = updateCategoryByIdService;
const deleteCategoryByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_query_1.deleteCategoryByIdQuery)(id);
    if (!category) {
        throw new Error('Category not found');
    }
    ;
    return category;
});
exports.deleteCategoryByIdService = deleteCategoryByIdService;
