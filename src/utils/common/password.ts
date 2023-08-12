import bcrypt from 'bcrypt';

export const generateHashPassword =
    async (password: string): Promise<string> => {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };

export const matchPassword =
    async (password: string, storedPassword: string,): Promise<boolean> => {
        return await bcrypt.compare(password, storedPassword);
    };
