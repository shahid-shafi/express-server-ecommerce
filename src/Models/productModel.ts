import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces/schemaInterfaces';

const productSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 1,
    },
    brand: String,
    discountPercentage: {
        type: Number,
        default: 0,
    },
    category: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
            },
        ],
        required: [true, 'Select at least one category for this product'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Product thumbnail is required'],
    },
    images: [String],
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Product creatorId is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product available stock is required'],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    __v: {
        type: Number,
        select: false,
    },
});

export const Product: Model<IProduct> = mongoose.model<IProduct>(
    'Product',
    productSchema
);
