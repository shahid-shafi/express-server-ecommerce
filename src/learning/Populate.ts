import { Product } from '../Models/productModel';
import { getAll, getOne } from '../controllers/handler/handlerFactory';

const PopulateOtherCollections = getAll(Product, ['createdby', 'category']);
const PopulateWithSelectedFields = getAll(Product, [
    { path: 'createdby', select: 'name' },
    { path: 'category', select: 'title' },
]);

const getProductById = getOne(Product, [ //: 1 => select => true , 0: select => false 
    { path: 'category', select: { title: 1, createdAt: 1, updatedAt: 1 } },
    'createdby',
]);
