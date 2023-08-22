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
exports.deleteProductById = exports.getProductById = exports.getAllProducts = exports.updateProductById = exports.createProduct = void 0;
const commonMethods_1 = require("../utils/common/commonMethods");
const product_service_1 = require("./services/product.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_service_1.createProductService)(req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: product,
        message: 'Product created successfully!',
    });
}));
exports.updateProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_service_1.updateProductByIdService)(req.params.id, req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: product,
        message: 'Product updated successfully!',
    });
}));
exports.getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield (0, product_service_1.getAllProductsService)(req.query);
    if (!((_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.length)) {
        (0, commonMethods_1.sendResponse)(res, 204, {
            status: true,
            data,
            message: 'No Products found',
        });
        return;
    }
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data,
        message: 'Products fetched successfully!',
    });
}));
exports.getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_service_1.getProductByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: product,
        message: 'Product fetched successfully',
    });
}));
exports.deleteProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, product_service_1.deleteProductByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: null,
        message: 'Product fetched successfully',
    });
}));
