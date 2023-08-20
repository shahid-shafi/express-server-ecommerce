import mongoose, { Schema, Model } from 'mongoose';
import AppError from '../utils/appError';
import { IRole } from '../interfaces/schemaInterfaces';

const userRoleSchema: Schema = new mongoose.Schema({
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
},
    {
        timestamps: true,
    },
);

userRoleSchema.pre('save', async function (this: IRole, next) {
    const role = await Role.findOne({ title: this.title });
    if (role) {
        return next(new AppError(`Role "${this.title}" already exists`, 409));
    } else {
        next();
    }
});

const Role: Model<IRole> = mongoose.model<IRole>('Role', userRoleSchema);

export default Role;
