import { Product } from '../../Models/product.model';
import { IProduct } from '../../interfaces/schemaInterfaces';
import { getPaginationOptions } from '../../utils/common/commonMethods';

export const createProductQuery = async (productData: IProduct) => {
    return (await Product.create(productData)).populate({
        path: 'createdby',
        select: 'name',
    });
};

export const getProductByIdQuery = async (id: string): Promise<any> => {
    return await Product.findById(id).populate([
        { path: 'category', select: 'title, createdAt, updatedAt' },
        'createdby',
    ]);
};

export const updateProductByIdQuery = async (id: string, updateData: Partial<IProduct>): Promise<any> => {
    return await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
};

export const getAllProductsQuery = async (skip: number, limit: number): Promise<any> => {
    const [products, count] = await Promise.all([
        Product.find().skip(skip).limit(limit).populate(''),
        Product.countDocuments(),
    ]);
    return { products, count };
};

export const deleteProductByIdQuery = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};