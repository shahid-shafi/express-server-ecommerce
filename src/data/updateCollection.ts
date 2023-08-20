import mongoose, { ConnectOptions, Model } from 'mongoose';
import fs from 'fs';
import User from '../Models/user.model';

const url = 'mongodb://127.0.0.1:27017/ecommerce';

interface UserData {
    [key: string]: any;
}

interface UpdateData {
    userIds: string[];
    userData: UserData;
}

const jsonData = fs.readFileSync('myusers.json');
const data: UpdateData = JSON.parse(jsonData.toString());

// console.log('Data:', data);

const updateOnebyOne = (Model: Model<any>, data: any) => {
    data.forEach((document: any) => {
        try {
            const id = document._id;
            const { name, email, gender, age, phone, username, image, addresses, role } = document;
            const body = { name, email, gender, age, phone, username, image, addresses, role }
            Model.findByIdAndUpdate(id, body);
        } catch (error) {
            console.log(error)
        }
    })
    console.log('Running complete')
}
updateOnebyOne(User, data);