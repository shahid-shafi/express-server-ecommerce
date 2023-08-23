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
exports.deleteProductByIdService = exports.getAllProductsService = exports.updateProductByIdService = exports.getProductByIdService = exports.createProductService = void 0;
const commonMethods_1 = require("../../utils/common/commonMethods");
const product_query_1 = require("../query/product.query");
const createProductService = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, product_query_1.createProductQuery)(productData);
});
exports.createProductService = createProductService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_query_1.getProductByIdQuery)(id);
    if (!product) {
        throw new Error('Product not found');
    }
    ;
    return product;
});
exports.getProductByIdService = getProductByIdService;
const updateProductByIdService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield (0, product_query_1.updateProductByIdQuery)(id, updatedData);
    if (!updatedProduct) {
        throw new Error('Product not found');
    }
    ;
    return updatedProduct;
});
exports.updateProductByIdService = updateProductByIdService;
const getAllProductsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = query;
    const { skip, limit } = (0, commonMethods_1.getPaginationOptions)(page, size);
    return yield (0, product_query_1.getAllProductsQuery)(skip, limit);
});
exports.getAllProductsService = getAllProductsService;
const deleteProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_query_1.deleteProductByIdQuery)(id);
    if (!product) {
        throw new Error('Product not found');
    }
    ;
    return product;
});
exports.deleteProductByIdService = deleteProductByIdService;
