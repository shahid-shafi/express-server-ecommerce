import mongoose, { Model, Schema } from 'mongoose';
import AppError from '../utils/appError';
import { ICategory } from '../interfaces/schemaInterfaces';

const categorySchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Category must have a title'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    __v: {
        type: Number,
        select: false
    }
});

categorySchema.pre('save', async function (this: ICategory, next) {
    const category = await Category.findOne({ title: this.title });
    if (category) {
        return next(new AppError(`Category "${this.title}" already exists`, 409));
    } else {
        next();
    }
});

export const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);