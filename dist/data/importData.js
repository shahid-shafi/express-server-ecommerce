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
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_model_1 = require("../Models/product.model");
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);
    console.log('this is inside the process');
    process.exit(1);
});
dotenv_1.default.config({ path: '.env' });
const DB = process.env.DATABASE_URL || '';
const dbUrl = 'mongodb://127.0.0.1:27017/ecommerce';
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
//: Read File .
const users = JSON.parse(fs_1.default.readFileSync(`${__dirname}/products.json`, 'utf8'));
//: Import Date to DataBase .
const importDataToCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await clearCollection();
        const result = yield product_model_1.Product.create(users);
        console.log(result);
        console.log('Data loaded successfully');
    }
    catch (error) {
        console.log(error);
    }
});
//: Delete data from DataBase .
const clearCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.Product.deleteMany();
        console.log('Data deleted successfully');
    }
    catch (error) {
        console.log(error);
    }
});
importDataToCollection();
console.log(process.argv);
