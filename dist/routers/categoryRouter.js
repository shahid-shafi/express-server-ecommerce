"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryControllers_1 = require("../controllers/categoryControllers");
const validateReqBody_1 = __importDefault(require("../middleware/validateReqBody"));
const categoryValidation_1 = require("../validation/categoryValidation");
const router = express_1.default.Router();
router.route('/category')
    .post((0, validateReqBody_1.default)(categoryValidation_1.createCategoryValidation), categoryControllers_1.createCategory)
    .get(categoryControllers_1.getAllCatagories);
router.route('category/:id')
    .get(categoryControllers_1.getCategoryById)
    .patch(categoryControllers_1.updateCategoryById)
    .delete(categoryControllers_1.deleteCategoryById);
exports.default = router;
