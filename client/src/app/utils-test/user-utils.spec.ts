import { IUserSchema } from '../interfaces/user.interface';
import { of } from 'rxjs';

export const userSchemaMock1: IUserSchema = {
    _id: '111111',
    email: 'mock@mock.com',
    firstName: 'Fname',
    lastName: 'Lname',
    type: 'internal',
    avatar: 'avatarPath',
    role: 'standard'
};


export const userServiceSpy = {
    get() {
      return of(userSchemaMock1);
    },
    edit() {
      return of(userSchemaMock1);
    },
    create() {
      return of(userSchemaMock1);
    },
    queryPaginated() {
      return of(userSchemaMock1);
    },
    delete() {
      return of(userSchemaMock1);
    }
  };
