"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_LOCAL || '';
const connectDatabase = () => {
    mongoose_1.default
        .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
        .then(() => {
        console.log('✅ DataBase Connected Successfully...');
    })
        .catch((error) => console.log('❌ Error:', error));
};
exports.default = connectDatabase;
