import { ActivateAccount } from "../../Models/activateAccountModel"
import { IActivateAccount } from "../../interfaces/schemaInterfaces"

export const activateAccountQuery = async (data: IActivateAccount) => {
    return await ActivateAccount.create(data);
};

export const verifyActivateTokenQuery = async (token: string) => {
    return await ActivateAccount.findOne({ token });
};

export const deleteActivateTokenQuery = async (id: string) => {
    return await ActivateAccount.deleteMany({ id });
}

