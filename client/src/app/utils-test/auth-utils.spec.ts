import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ILoginResultSchema } from '../interfaces';

const loginResultSchemaMock: ILoginResultSchema  = {
    token: 'toktoktoktoktok',
    firstName: 'Juro',
    lastName: 'Lname',
    email: 'email@email.em',
    role: 'nobody'
};

export const authServiceSpy = {
    loginChange: new EventEmitter(),
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
