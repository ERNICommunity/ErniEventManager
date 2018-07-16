import * as mongoose from 'mongoose';
import { NextFunction } from 'express';


export type UserModel = mongoose.Document & {
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    avatar: string;
    role: string;
};

const UserSchema = new mongoose.Schema({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    type: {type: String},
    avatar: {type: String},
    role: {type: String}
});

UserSchema.index({ email: 1 }, { unique: true });

// In case of errors remove this from function parameters
UserSchema.pre('save', function (this: UserModel, next: NextFunction) {
    next();
});

UserSchema.post('save', function (error: any, doc: any, next: NextFunction) {
    if (error.code === 11000) {
        next('User already present, please change your data');
    } else {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);
export default User;
