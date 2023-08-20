import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    _id?: string;
    name: string;
    phoneNumber: string;
    email: string;
    gender?: string;
    age?: number;
    phone?: string;
    profilePicture?: string;
    username?: string;
    address?: Address[];
    role?: mongoose.Types.ObjectId;
    cart?: mongoose.Types.ObjectId,
    password: string;
    passwordConfirm?: string;
    passwordChangedAt?: Date,
    passwordResetToken?: string,
    passwordResetExpires?: Date,
    active?: boolean;
    correctPassword?: any;
    __v?: number;
}

export interface Address extends Document {
    address: string
    city: string
    coordinates: {
        lat: number
        lng: number,
    },
    postalCode: string,
    state: string,
    country: string,
}

export interface IRole extends Document {
    title: string;
    __v?: number;
}

export interface ICart extends Document {
    user: IUser[];
    items: IProduct[];
    totalAmount: number;
}


export interface IActivateAccount {
    id: string;
    token: string;
    expire: Date;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    brand: string;
    createdby: string;
    category: string[];
    thumbnail: string;
    images?: string[];
    reviews?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export interface ICategory {
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}


export interface IReview {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    __v?: number;
}

export interface IOtp {
    id: string;
    otp: number;
    expire: Date;
    isVerified?: boolean;
}