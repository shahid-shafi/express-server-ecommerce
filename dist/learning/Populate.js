"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../Models/productModel");
const handlerFactory_1 = require("../controllers/handler/handlerFactory");
const PopulateOtherCollections = (0, handlerFactory_1.getAll)(productModel_1.Product, ['createdby', 'category']);
const PopulateWithSelectedFields = (0, handlerFactory_1.getAll)(productModel_1.Product, [
    { path: 'createdby', select: 'name' },
    { path: 'category', select: 'title' },
]);
const getProductById = (0, handlerFactory_1.getOne)(productModel_1.Product, [
    { path: 'category', select: { title: 1, createdAt: 1, updatedAt: 1 } },
    'createdby',
]);
