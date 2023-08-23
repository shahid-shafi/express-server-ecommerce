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
exports.deleteReviewById = exports.updateReviewById = exports.getAllReviews = exports.getReviewById = exports.createReview = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const commonMethods_1 = require("../utils/common/commonMethods");
const review_service_1 = require("./services/review.service");
exports.createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield (0, review_service_1.createReviewService)(req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: review,
        message: 'Review created successfully',
    });
}));
exports.getReviewById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield (0, review_service_1.getReviewByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: review,
        message: 'Review fetched successfully',
    });
}));
exports.getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield (0, review_service_1.getAllReviewsService)(req.query);
    if (!((_a = data === null || data === void 0 ? void 0 : data.reviews) === null || _a === void 0 ? void 0 : _a.length)) {
        (0, commonMethods_1.sendResponse)(res, 204, {
            status: true,
            data,
            message: 'No reviews found',
        });
        return;
    }
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data,
        message: 'Reviews fetched successfully!',
    });
}));
exports.updateReviewById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield (0, review_service_1.updateReviewByIdService)(req.params.id, req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: updatedReview,
        message: 'Reviews fetched successfully!',
    });
}));
exports.deleteReviewById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, review_service_1.deleteReviewByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'Reviews fetched successfully!',
    });
}));
