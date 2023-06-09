import { Category } from "../Models/categoryModel";
import {
    createOne, deleteOne, getAll, getOne, updateOne
} from "./handler/handlerFactory";

export const createCategory = createOne(Category);
export const getAllCatagories = getAll(Category, '');
export const getCategoryById = getOne(Category, '');
export const deleteCategoryById = deleteOne(Category);
export const updateCategoryById = updateOne(Category);