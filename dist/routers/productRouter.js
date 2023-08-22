"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const reviewRouter_1 = __importDefault(require("./reviewRouter"));
const validateReqBody_1 = __importDefault(require("../middleware/validateReqBody"));
const productValidation_1 = require("../validation/productValidation");
const router = express_1.default.Router();
router.use('/products/:productId/reviews', reviewRouter_1.default);
router.route('/products')
    .post((0, validateReqBody_1.default)(productValidation_1.createProductValidation), productControllers_1.createProduct)
    .get(productControllers_1.getAllProducts);
router.route('/products/:id')
    .get(productControllers_1.getProductById)
    .delete(productControllers_1.deleteProductById)
    .patch(productControllers_1.updateProductById);
exports.default = router;
