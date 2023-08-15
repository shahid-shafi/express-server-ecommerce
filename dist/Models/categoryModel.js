"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../utils/appError"));
const categorySchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
categorySchema.pre('save', async function (next) {
    const category = await exports.Category.findOne({ title: this.title });
    if (category) {
        return next(new appError_1.default(`Category "${this.title}" already exists`, 409));
    }
    else {
        next();
    }
});
exports.Category = mongoose_1.default.model('Category', categorySchema);
