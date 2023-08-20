import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import connectDatabase from './utils/dbConnection';

// mongoose.set('strictQuery', false);

process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);
    console.log('this is inside the process');
    process.exit(1);
});

dotenv.config({ path: '.env' });

connectDatabase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`☑️  Server is running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION 💥 Shutting Down Server 🌐...');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});
