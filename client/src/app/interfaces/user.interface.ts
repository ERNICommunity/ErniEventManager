export class IUserSchema {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    avatar: string;
    role: string;
}

export class IUserResponse {
    list: Array<IUserSchema>;
    length: number;
    qi: string;
}

export const userSchemaMock1: IUserSchema = {
    _id: '111111',
    email: 'mock@mock.com',
    firstName: 'Fname',
    lastName: 'Lname',
    type: 'internal',
    avatar: 'avatarPath',
    role: 'standard'
};
