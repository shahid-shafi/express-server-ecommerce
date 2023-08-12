"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewControllers_1 = require("../controllers/reviewControllers");
const reviewValidation_1 = require("../constants/validation/reviewValidation");
const validateReqBody_1 = __importDefault(require("../middleware/validation/validateReqBody"));
const router = express_1.default.Router({ mergeParams: true });
router.route('/reviews')
    .post((0, validateReqBody_1.default)(reviewValidation_1.createReviewValidation), reviewControllers_1.createReview)
    .get(reviewControllers_1.getAllReviews);
router.route('/reviews/:id')
    .get(reviewControllers_1.getReviewById)
    .patch(reviewControllers_1.updateReviewById)
    .delete(reviewControllers_1.deleteReviewById);
exports.default = router;
