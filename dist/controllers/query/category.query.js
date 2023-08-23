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
exports.deleteCategoryByIdQuery = exports.updateCategoryByIdQuery = exports.getAllCategoriesQuery = exports.getCategoryByIdQuery = exports.createCategoryQuery = void 0;
const category_model_1 = require("../../Models/category.model");
const createCategoryQuery = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.create(categoryData);
});
exports.createCategoryQuery = createCategoryQuery;
const getCategoryByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findById(id);
});
exports.getCategoryByIdQuery = getCategoryByIdQuery;
const getAllCategoriesQuery = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [categories, count] = yield Promise.all([
        category_model_1.Category.find().skip(skip).limit(limit).populate(''),
        category_model_1.Category.countDocuments(),
    ]);
    return { categories, count };
});
exports.getAllCategoriesQuery = getAllCategoriesQuery;
const updateCategoryByIdQuery = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
});
exports.updateCategoryByIdQuery = updateCategoryByIdQuery;
const deleteCategoryByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findByIdAndDelete(id);
});
exports.deleteCategoryByIdQuery = deleteCategoryByIdQuery;
