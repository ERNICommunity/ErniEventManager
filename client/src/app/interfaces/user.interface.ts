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
