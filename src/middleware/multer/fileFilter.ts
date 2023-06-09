import { Request } from 'express';
import AppError from '../../utils/appError';
interface File extends Express.Multer.File { }

const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];

export const imageFilter = (req: Request, file: File, callback: any) => {
    if (validMimeTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {     
        callback(new AppError('Only .png, .jpg, .jpeg and svg format allowed!', 400), false)   
    }
};


