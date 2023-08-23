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
exports.deleteProductByIdQuery = exports.getAllProductsQuery = exports.updateProductByIdQuery = exports.getProductByIdQuery = exports.createProductQuery = void 0;
const product_model_1 = require("../../Models/product.model");
const createProductQuery = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield product_model_1.Product.create(productData)).populate({
        path: 'createdby',
        select: 'name',
    });
});
exports.createProductQuery = createProductQuery;
const getProductByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id).populate([
        { path: 'category', select: 'title, createdAt, updatedAt' },
        'createdby',
    ]);
});
exports.getProductByIdQuery = getProductByIdQuery;
const updateProductByIdQuery = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
});
exports.updateProductByIdQuery = updateProductByIdQuery;
const getAllProductsQuery = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [products, count] = yield Promise.all([
        product_model_1.Product.find().skip(skip).limit(limit).populate(''),
        product_model_1.Product.countDocuments(),
    ]);
    return { products, count };
});
exports.getAllProductsQuery = getAllProductsQuery;
const deleteProductByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndDelete(id);
});
exports.deleteProductByIdQuery = deleteProductByIdQuery;
