"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewById = exports.updateReviewById = exports.getReviewById = exports.getAllReviews = exports.createReview = void 0;
const reviewModel_1 = __importDefault(require("../Models/reviewModel"));
const handlerFactory_1 = require("./handler/handlerFactory");
exports.createReview = (0, handlerFactory_1.createOne)(reviewModel_1.default);
exports.getAllReviews = (0, handlerFactory_1.getAll)(reviewModel_1.default, '');
exports.getReviewById = (0, handlerFactory_1.getOne)(reviewModel_1.default, '');
exports.updateReviewById = (0, handlerFactory_1.updateOne)(reviewModel_1.default);
exports.deleteReviewById = (0, handlerFactory_1.deleteOne)(reviewModel_1.default);
