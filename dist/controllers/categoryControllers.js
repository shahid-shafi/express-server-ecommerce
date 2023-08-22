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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.updateCategoryById = exports.getAllCatagories = exports.getCategoryById = exports.createCategory = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const commonMethods_1 = require("../utils/common/commonMethods");
const category_service_1 = require("./services/category.service");
exports.createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_service_1.createCategoryService)(req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: category,
        message: 'Category created successfully!',
    });
}));
exports.getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_service_1.getCategoryByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: category,
        message: 'Category fetched successfully!',
    });
}));
exports.getAllCatagories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield (0, category_service_1.getAllCategoriesService)(req.query);
    if (!((_a = data === null || data === void 0 ? void 0 : data.categories) === null || _a === void 0 ? void 0 : _a.length)) {
        (0, commonMethods_1.sendResponse)(res, 204, {
            status: true,
            data,
            message: 'No categories found',
        });
        return;
    }
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data,
        message: 'Categories fetched successfully!',
    });
}));
exports.updateCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_service_1.updateCategoryByIdService)(req.params.id, req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: category,
        message: 'Category updated successfully!',
    });
}));
exports.deleteCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, category_service_1.deleteCategoryByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'Category deleted successfully!',
    });
}));
