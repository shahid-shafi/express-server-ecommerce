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
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../Models/userModel"));
const url = 'mongodb://127.0.0.1:27017/ecommerce';
const dbName = 'your-database-name';
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected successfully to server');
    // Update all users in the collection and add a new field `roleId`
    const result = yield userModel_1.default.updateMany({}, { $set: { roleId: '6445179decb7694e160bd533' } });
    console.log(`${result} users updated`);
    mongoose_1.default.connection.close();
}))
    .catch((err) => {
    console.error(err);
});
