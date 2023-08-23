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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewByIdService = exports.updateReviewByIdService = exports.getAllReviewsService = exports.getReviewByIdService = exports.createReviewService = void 0;
const commonMethods_1 = require("../../utils/common/commonMethods");
const review_query_1 = require("../query/review.query");
const createReviewService = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, review_query_1.createReviewQuery)(reviewData);
});
exports.createReviewService = createReviewService;
const getReviewByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield (0, review_query_1.getReviewByIdQuery)(id);
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
});
exports.getReviewByIdService = getReviewByIdService;
const getAllReviewsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = query;
    const { skip, limit } = (0, commonMethods_1.getPaginationOptions)(page, size);
    return yield (0, review_query_1.getAllReviewsQuery)(skip, limit);
});
exports.getAllReviewsService = getAllReviewsService;
const updateReviewByIdService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield (0, review_query_1.updatedReviewByIdQuery)(id, updateData);
    if (!updatedReview) {
        throw new Error('Review not found');
    }
    return updatedReview;
});
exports.updateReviewByIdService = updateReviewByIdService;
const deleteReviewByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedReview = yield (0, review_query_1.deleteReviewByIdQuery)(id);
    if (!deletedReview) {
        throw new Error('Review not found');
    }
    return deletedReview;
});
exports.deleteReviewByIdService = deleteReviewByIdService;
