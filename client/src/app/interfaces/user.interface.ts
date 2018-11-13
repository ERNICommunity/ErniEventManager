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

export class ILoginSchema {
  login: string;
  password: string;
}

export class ILoginResultSchema {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  role: string;
}
