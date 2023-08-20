import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbUrl: string = process.env.DATABASE_LOCAL || '';

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