"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const appError_1 = __importDefault(require("../utils/appError"));
const roleModel_1 = __importDefault(require("./roleModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        maxLength: 40,
        minLength: 3,
        required: [true, 'User must have a name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.'],
        validate: [validator_1.default.isEmail, 'Please provide valid email address.']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    age: Number,
    username: {
        type: String,
        unique: true,
    },
    phone: String,
    profilePicture: {
        type: String,
        default: 'default.png',
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
    },
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    address: [
        {
            address: { type: String },
            city: { type: String },
            coordinates: {
                lat: { type: Number },
                lng: { type: Number },
            },
            postalCode: { type: String },
            state: { type: String },
        }
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: false,
        select: false
    },
    __v: {
        type: Number,
        select: false,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (this.role) {
        return next();
    }
    let defaultRole = await roleModel_1.default.findOne({ name: 'user' });
    if (!defaultRole) {
        defaultRole = await roleModel_1.default.create({ name: 'user' });
    }
    this.role = defaultRole._id;
    next();
});
userSchema.pre('save', async function (next) {
    const existingUser = await User.findOne().or([{ username: this.username }, { email: this.email }]);
    if (existingUser) {
        if (existingUser.username === this.username) {
            return next(new appError_1.default(`Username "${this.username}" already taken`, 409));
        }
        else {
            return next(new appError_1.default(`Account with email "${this.email}" already exists`, 409));
        }
    }
    else {
        next();
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    //: Encryption: Hash the password field with cost of 12  
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
userSchema.methods.correctPassword =
    async function (candidatePassword, userPassword) {
        return await bcryptjs_1.default.compare(candidatePassword, userPassword);
    };
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
