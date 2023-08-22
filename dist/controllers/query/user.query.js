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
exports.getAllUsersQuery = exports.deleteUserByIdQuery = exports.getUserByIdQuery = exports.userResetPasswordQuery = exports.findUserWithPassword = exports.findUserByParams = exports.activateUserAccountQuery = exports.userSignUpQuery = void 0;
const user_model_1 = __importDefault(require("../../Models/user.model"));
const userSignUpQuery = (newUserData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(newUserData);
});
exports.userSignUpQuery = userSignUpQuery;
const activateUserAccountQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndUpdate({ _id: id }, { $set: { active: true } }, { new: true });
});
exports.activateUserAccountQuery = activateUserAccountQuery;
const findUserByParams = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne(params);
});
exports.findUserByParams = findUserByParams;
const findUserWithPassword = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne(params).select('+password +active');
});
exports.findUserWithPassword = findUserWithPassword;
const userResetPasswordQuery = (id, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate({ _id: id }, { $set: { password: hashedPassword } }, { new: true });
});
exports.userResetPasswordQuery = userResetPasswordQuery;
const getUserByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id);
});
exports.getUserByIdQuery = getUserByIdQuery;
const deleteUserByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndUpdate({ _id: id }, { $set: { active: false } }, { new: true });
});
exports.deleteUserByIdQuery = deleteUserByIdQuery;
const getAllUsersQuery = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [users, count] = yield Promise.all([
        user_model_1.default.find()
            .skip(skip)
            .limit(limit)
            .populate(''),
        user_model_1.default.countDocuments(),
    ]);
    return { users, count };
});
exports.getAllUsersQuery = getAllUsersQuery;
