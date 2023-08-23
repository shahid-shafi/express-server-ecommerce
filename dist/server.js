"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
// mongoose.set('strictQuery', false);
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);
    console.log('this is inside the process');
    process.exit(1);
});
dotenv_1.default.config({ path: '.env' });
(0, dbConnection_1.default)();
const port = process.env.PORT || 5000;
const server = app_1.default.listen(port, () => {
    console.log(`☑️  Server is running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
