import { of } from 'rxjs';
import { ILoginResultSchema } from '../interfaces';
import { EventEmitter } from '@angular/core';

const loginResultSchemaMock: ILoginResultSchema  = {
    token: 'toktoktoktoktok',
    firstName: 'Juro',
    lastName: 'Lname',
    email: 'email@email.em'
};

export const authServiceSpy = {
    isLoggedIn: new EventEmitter(),
    authError: new EventEmitter(),
    authenticateOnBackend() {
      return of(loginResultSchemaMock);
    },
    logout() {
      return undefined;
    },
    login() {
      return of(loginResultSchemaMock);
    }
  };
