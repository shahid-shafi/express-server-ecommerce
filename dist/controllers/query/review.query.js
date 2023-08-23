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
exports.deleteReviewByIdQuery = exports.updatedReviewByIdQuery = exports.getAllReviewsQuery = exports.getReviewByIdQuery = exports.createReviewQuery = void 0;
const review_model_1 = __importDefault(require("../../Models/review.model"));
const createReviewQuery = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.create(reviewData);
});
exports.createReviewQuery = createReviewQuery;
const getReviewByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findById(id);
});
exports.getReviewByIdQuery = getReviewByIdQuery;
const getAllReviewsQuery = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [reviews, count] = yield Promise.all([
        review_model_1.default.find().skip(skip).limit(limit).populate(''),
        review_model_1.default.countDocuments(),
    ]);
    return { reviews, count };
});
exports.getAllReviewsQuery = getAllReviewsQuery;
const updatedReviewByIdQuery = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
});
exports.updatedReviewByIdQuery = updatedReviewByIdQuery;
const deleteReviewByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findByIdAndDelete(id);
});
exports.deleteReviewByIdQuery = deleteReviewByIdQuery;
