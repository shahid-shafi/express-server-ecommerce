import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_PROD;

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