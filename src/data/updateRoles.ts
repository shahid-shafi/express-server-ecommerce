import mongoose, { ConnectOptions } from 'mongoose';
import User from '../Models/user.model';

const url = 'mongodb://127.0.0.1:27017/ecommerce';
const dbName = 'your-database-name';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(async () => {
        console.log('Connected successfully to server');

        // Update all users in the collection and add a new field `roleId`
        const result = await User.updateMany(
            {},
            { $set: { roleId: '6445179decb7694e160bd533' } }
        );

        console.log(`${result} users updated`);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error(err);
    });
