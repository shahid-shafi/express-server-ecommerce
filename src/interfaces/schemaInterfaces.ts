import mongoose from "mongoose";
export interface IUser {
    name: string;
    phoneNumber: string;
    email: string;
    gender: string;
    age: number;
    phone?: string;
    profilePicture: string;
    username: string;
    address: Address[];
    role: mongoose.Types.ObjectId;
    cart: mongoose.Types.ObjectId,
    password: string;
    passwordConfirm?: string;
    passwordChangedAt: Date,
    passwordResetToken: string,
    passwordResetExpires: Date,
    active: boolean;
    correctPassword?: any;
    __v?: number;
}

export interface Address {
    address: string
    city: string
    coordinates: {
        lat: number
        lng: number,
    },
    postalCode: string,
    state: string,
}

export interface IRole {
    title: string;
    __v?: number;
}

export interface ICart extends Document {
    user: IUser[];
    items: IProduct[];
    totalAmount: number;
}
export interface IProduct {
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
