import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';
import AppError from '../utils/appError';
import Role from './role.model';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/schemaInterfaces';

const userSchema: Schema = new Schema({
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
        validate: [validator.isEmail, 'Please provide valid email address.']
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
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    cart: {
        type: Schema.Types.ObjectId,
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
            country: { type: String },
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
},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (this.role) {
        return next();
    }

    let defaultRole = await Role.findOne({ name: 'user' });

    if (!defaultRole) {
        defaultRole = await Role.create({ name: 'user' });
    }
    this.role = defaultRole._id
    next();
});

userSchema.pre('save', async function (this: IUser, next) {
    const existingUser = await User.findOne().or([{ username: this.username }, { email: this.email }]);

    if (existingUser) {
        if (existingUser.username === this.username) {
            return next(new AppError(`Username "${this.username}" already taken`, 409));
        } else {
            return next(new AppError(`Account with email "${this.email}" already exists`, 409));
        }
    } else {
        next();
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.methods.isPasswordCorrect =
    async function (candidatePassword: string, userPassword: string) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
