"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = __importDefault(require("./userRouter"));
const usernameRouter_1 = __importDefault(require("./usernameRouter"));
const userRoleRouter_1 = __importDefault(require("./userRoleRouter"));
const productRouter_1 = __importDefault(require("./productRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const reviewRouter_1 = __importDefault(require("./reviewRouter"));
const combinedRouter = [
    userRouter_1.default,
    usernameRouter_1.default,
    userRoleRouter_1.default,
    productRouter_1.default,
    categoryRouter_1.default,
    reviewRouter_1.default,
];
exports.default = combinedRouter;
