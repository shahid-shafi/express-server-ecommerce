import { ICategory } from "../../interfaces/schemaInterfaces";
import { getPaginationOptions } from "../../utils/common/commonMethods";
import { createCategoryQuery, deleteCategoryByIdQuery, getAllCategoriesQuery, getCategoryByIdQuery, updateCategoryByIdQuery } from "../query/category.query";

export const createCategoryService = async (categoryData: ICategory): Promise<any> => {
    return await createCategoryQuery(categoryData);
};

export const getCategoryByIdService = async (id: string): Promise<any> => {
    const category = await getCategoryByIdQuery(id);

    if (!category) {
        throw new Error('Category not found');
    };

    return category;
};

export const getAllCategoriesService = async (query: any): Promise<any> => {
    const { page, size } = query;
    const { skip, limit } = getPaginationOptions(page, size);
    return await getAllCategoriesQuery(skip, limit);
}

export const updateCategoryByIdService = async (id: string, updateData: Partial<ICategory>): Promise<any> => {
    const category = await updateCategoryByIdQuery(id, updateData);

    if (!category) {
        throw new Error('Category not found');
    };

    return category;
};

export const deleteCategoryByIdService = async (id: string): Promise<any> => {
    const category = await deleteCategoryByIdQuery(id);

    if (!category) {
        throw new Error('Category not found');
    };

    return category;
};

