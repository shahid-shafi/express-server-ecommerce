"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to the user'],
    },
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to the product'],
    },
    rating: {
        type: Number,
        required: [true, 'Review must contain a rating'],
        min: 1,
        max: 5,
    },
    comment: String,
    v: {
        type: Number,
        select: false,
    }
}, {
    timestamps: true,
});
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
