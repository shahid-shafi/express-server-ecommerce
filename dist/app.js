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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const catchAsync_1 = __importDefault(require("./utils/catchAsync"));
dotenv_1.default.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use('/api/v1', routers_1.default);
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.all('*', (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({
        result: false,
        message: `Can't find ${req.originalUrl} on this Server 🌐`,
        data: null
    });
})));
exports.default = app;
