"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const logger = {
    info: (log) => console.log(chalk_1.default.white(log)),
    success: (log) => console.log(chalk_1.default.green(log)),
    error: (log) => console.log(chalk_1.default.red(log)),
    warn: (log) => console.log(chalk_1.default.yellow(log)),
};
exports.default = logger;
