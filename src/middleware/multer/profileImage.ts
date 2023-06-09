import { Request, Response, NextFunction } from 'express';
import multer, { Multer, MulterError } from "multer";
import fs from "fs";
import { imageFilter } from "./fileFilter";
import sharp from 'sharp';


//: In order to resize image with sharp library we need to save image in memory.
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    // limits: { fileSize: 1024 * 1024 * 2 }, //: we might not need when resizing image.
    fileFilter: imageFilter,
});

export const parseProfilePicture = upload.single('profilePicture');

export const resizeProfilePicture = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    //: image extension ('jpeg','png', ...) will always be what we choose in sharp configuration below.
    req.file.filename = `${Date.now()}.jpeg`;

    sharp(req.file.buffer) //: Image compression configuration. 
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`${__dirname}/../../static/users/${req.file.filename}`)

    next();
};

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         const destinationDir = `${__dirname}/../../static/users`;

//         // Create the directory if it doesn't exist
//         if (!fs.existsSync(destinationDir)) {
//             fs.mkdirSync(destinationDir, { recursive: true });
//         }

//         callback(null, destinationDir);
//     },
//     filename: (req, file, callback) => {
//         // const extension = file.originalname.split('.').slice(-1).pop();
//         const finalFilename = `${Date.now()}_${file.originalname}`;
//         callback(null, finalFilename);
//     },
// })

// Create middleware function
// export const parseProfilePicture = (req: Request, res: Response, next: NextFunction) => {
//     upload(req, res, (err: any) => {
//         if (err instanceof MulterError) {
//             // Multer error occurred
//             return res.status(400).json({ error: 'File size limit exceeded!' });
//         } else if (err) {
//             // Other error occurred
//             return res.status(400).json({ error: err.message });
//         };
//         next();
//     });
// };