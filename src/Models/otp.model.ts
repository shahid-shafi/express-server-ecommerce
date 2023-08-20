import mongoose, { Model, Schema } from "mongoose";
import { IOtp } from "../interfaces/schemaInterfaces";

const OtpVerificationSchema: Schema = new Schema({
    id: {
        type: String,
        required: [true, 'id is required!'],
    },
    otp: {
        type: Number,
        required: [true, 'otp is required!'],
    },
    expire: {
        type: Date,
        required: [true, 'expire date is required!'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    }
);

export const OTP: Model<IOtp> = mongoose.model<IOtp>('OTP', OtpVerificationSchema);