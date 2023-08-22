"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFile = exports.removeFolder = exports.removeFile = exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const createDir = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
exports.createDir = createDir;
const removeFile = (dir) => fs_1.default.unlinkSync(dir);
exports.removeFile = removeFile;
const removeFolder = (dir) => fs_extra_1.default.remove(dir);
exports.removeFolder = removeFolder;
const moveFile = (oldDir, newDir) => fs_extra_1.default.move(oldDir, newDir);
exports.moveFile = moveFile;
