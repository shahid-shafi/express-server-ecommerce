import fs from 'fs';
import fsExtra from 'fs-extra';

export const createDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

export const removeFile = (dir: string) => fs.unlinkSync(dir);

export const removeFolder = (dir: string) => fsExtra.remove(dir);

export const moveFile = (oldDir: string, newDir: string) => fsExtra.move(oldDir, newDir);