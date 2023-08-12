"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFilter = void 0;
const appError_1 = __importDefault(require("../../utils/appError"));
const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
const imageFilter = (req, file, callback) => {
    if (validMimeTypes.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(new appError_1.default('Only .png, .jpg, .jpeg and svg format allowed!', 400), false);
    }
};
exports.imageFilter = imageFilter;
