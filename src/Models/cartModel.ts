import mongoose, { Model, Schema } from "mongoose";
import { ICart } from "../interfaces/schemaInterfaces";

const cartSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cart should belong to a user'],
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
});

export const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);