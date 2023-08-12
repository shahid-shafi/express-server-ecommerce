import { model, Model, Schema } from 'mongoose';
import { IActivateAccount } from '../interfaces/schemaInterfaces';

const activateAccountSchema: Schema = new Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

export const ActivateAccount: Model<IActivateAccount> =
    model<IActivateAccount>('ActivateAccount', activateAccountSchema);