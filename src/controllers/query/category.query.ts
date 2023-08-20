import { Category } from "../../Models/category.model";
import { ICategory } from "../../interfaces/schemaInterfaces";

export const createCategoryQuery = async (categoryData: ICategory): Promise<any> => {
    return await Category.create(categoryData);
}

export const getCategoryByIdQuery = async (id: string): Promise<any> => {
    return await Category.findById(id);
}

export const getAllCategoriesQuery = async (skip: number, limit: number): Promise<any> => {
    const [categories, count] = await Promise.all([
        Category.find().skip(skip).limit(limit).populate(''),
        Category.countDocuments(),
    ]);
    return { categories, count };
};

export const updateCategoryByIdQuery = async (id: string, updateData: Partial<ICategory>): Promise<any> => {
    return await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
};

export const deleteCategoryByIdQuery = async (id: string): Promise<any> => {
    return await Category.findByIdAndDelete(id);
}