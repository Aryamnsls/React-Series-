import { IUser } from "../interfaces/IUser";
import * as mongoose from 'mongoose';

const options = { timestamps: { createdAt: 'created_at' ,updatedAt: 'updated_at'} }

const User: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
    type: String,

    }
},options);

export default mongoose.model<IUser & mongoose.Document>('User', User);