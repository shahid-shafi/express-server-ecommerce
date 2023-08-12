"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = require("../Models/productModel");
const handlerFactory_1 = require("./handler/handlerFactory");
exports.createProduct = (0, handlerFactory_1.createOne)(productModel_1.Product);
exports.getAllProducts = (0, handlerFactory_1.getAll)(productModel_1.Product, {
    path: 'createdby',
    select: 'name',
});
exports.getProductById = (0, handlerFactory_1.getOne)(productModel_1.Product, [
    { path: 'category', select: { title: 1, createdAt: 1, updatedAt: 1 } },
    'createdby',
]);
exports.deleteProductById = (0, handlerFactory_1.deleteOne)(productModel_1.Product);
exports.updateProductById = (0, handlerFactory_1.updateOne)(productModel_1.Product);
