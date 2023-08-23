"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const url = 'mongodb://127.0.0.1:27017/ecommerce';
const jsonData = fs_1.default.readFileSync('myusers.json');
const data = JSON.parse(jsonData.toString());
// console.log('Data:', data);
const updateOnebyOne = (Model, data) => {
    data.forEach((document) => {
        try {
            const id = document._id;
            const { name, email, gender, age, phone, username, image, addresses, role } = document;
            const body = { name, email, gender, age, phone, username, image, addresses, role };
            Model.findByIdAndUpdate(id, body);
        }
        catch (error) {
            console.log(error);
        }
    });
    console.log('Running complete');
};
updateOnebyOne(user_model_1.default, data);
