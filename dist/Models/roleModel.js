"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../utils/appError"));
const userRoleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Role must have a title.'],
        unique: true,
        minLength: 2,
    },
    __v: {
        type: Number,
        select: false
    }
}, {
    timestamps: true,
});
userRoleSchema.pre('save', async function (next) {
    const role = await Role.findOne({ title: this.title });
    if (role) {
        return next(new appError_1.default(`Role "${this.title}" already exists`, 409));
    }
    else {
        next();
    }
});
const Role = mongoose_1.default.model('Role', userRoleSchema);
exports.default = Role;
