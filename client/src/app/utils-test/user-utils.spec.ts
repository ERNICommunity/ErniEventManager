import { IUserSchema } from '../interfaces/user.interface';

export const userSchemaMock1: IUserSchema = {
    _id: '111111',
    email: 'mock@mock.com',
    firstName: 'Fname',
    lastName: 'Lname',
    type: 'internal',
    avatar: 'avatarPath',
    role: 'standard'
};
