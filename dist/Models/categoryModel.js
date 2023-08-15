"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
categorySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield exports.Category.findOne({ title: this.title });
        if (category) {
            return next(new appError_1.default(`Category "${this.title}" already exists`, 409));
        }
        else {
            next();
        }
    });
});
exports.Category = mongoose_1.default.model('Category', categorySchema);
