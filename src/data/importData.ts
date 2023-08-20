import fs from 'fs';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../Models/product.model';

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);
    console.log('this is inside the process');
    process.exit(1);
});

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE_URL || '';
const dbUrl = 'mongodb://127.0.0.1:27017/ecommerce';
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

//: Read File .
const users = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf8'));

//: Import Date to DataBase .
const importDataToCollection = async () => {
    try {
        // await clearCollection();
        const result = await Product.create(users);
        console.log(result)
        console.log('Data loaded successfully');
    } catch (error) {
        console.log(error)
    }
}

//: Delete data from DataBase .
const clearCollection = async () => {
    try {
        await Product.deleteMany()
        console.log('Data deleted successfully');
    } catch (error) {
        console.log(error)
    }
}
importDataToCollection()

console.log(process.argv)