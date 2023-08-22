"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateAccount = void 0;
const mongoose_1 = require("mongoose");
const activateAccountSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
    },
    token: {
        type: String,
        required: [true, 'token is required'],
    },
    expire: {
        type: Date,
        required: [true, 'expire date is required'],
    },
}, {
    timestamps: true,
});
exports.ActivateAccount = (0, mongoose_1.model)('ActivateAccount', activateAccountSchema);
