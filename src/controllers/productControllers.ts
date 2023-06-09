import { Product } from '../Models/productModel';
import {
    createOne, getAll, getOne, deleteOne, updateOne,
} from './handler/handlerFactory';

export const createProduct = createOne(Product);
export const getAllProducts = getAll(Product, {
    path: 'createdby',
    select: 'name',
});
export const getProductById = getOne(Product, [
    { path: 'category', select: { title: 1, createdAt: 1, updatedAt: 1 } },
    'createdby',
]);

export const deleteProductById = deleteOne(Product);
export const updateProductById = updateOne(Product);
