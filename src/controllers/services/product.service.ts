import { IProduct } from '../../interfaces/schemaInterfaces';
import { getPaginationOptions } from '../../utils/common/commonMethods';
import { createProductQuery, deleteProductByIdQuery, getAllProductsQuery, getProductByIdQuery, updateProductByIdQuery } from '../query/product.query';

export const createProductService = async (productData: IProduct) => {
    return await createProductQuery(productData);
};

export const getProductByIdService = async (id: string) => {
    const product = await getProductByIdQuery(id);

    if (!product) {
        throw new Error('Product not found');
    };

    return product;
}

export const updateProductByIdService = async (id: string, updatedData: Partial<IProduct>) => {
    const updatedProduct = await updateProductByIdQuery(id, updatedData);

    if (!updatedProduct) {
        throw new Error('Product not found');
    };

    return updatedProduct;
};

export const getAllProductsService = async (query: any) => {
    const { page, size } = query;
    const { skip, limit } = getPaginationOptions(page, size);
    return await getAllProductsQuery(skip, limit);
};

export const deleteProductByIdService = async (id: string) => {
    const product = await deleteProductByIdQuery(id)
    if (!product) {
        throw new Error('Product not found');
    };
    return product;
};