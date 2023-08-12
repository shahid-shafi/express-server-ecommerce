import crypto from 'crypto';
import { activateAccountQuery } from '../query/activateAccountQuery';

export const generateActivateAccountToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
}

export const saveActivateAccountToken = async (id: string, token: string) => {
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);

    return await activateAccountQuery({ id, token, expire })
}