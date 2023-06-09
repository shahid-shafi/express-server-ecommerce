import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB: string = process.env.DATABASE_URL || '';
const dbUrl = 'mongodb://127.0.0.1:27017/ecommerce';

const connectDatabase = () => {
    mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        } as ConnectOptions)
        .then(() => {
            console.log('✅ DataBase Connected Successfully...');
        })
        .catch((error) => console.log('❌ Error:', error));
}

export default connectDatabase;