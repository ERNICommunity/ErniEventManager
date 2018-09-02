import {Injectable, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ILoginResultSchema} from '../../interfaces';
import * as jwt_decode from 'jwt-decode';

const loginPath = 'api/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loginChange = new EventEmitter();
  @Output() authError = new EventEmitter();
  constructor(private http: HttpClient, private router: Router) {
    if (this.isAuthenticated()) {
      this.loginChange.emit(localStorage.getItem('user_email'));
    }
  }

  authenticateOnBackend(login: string, password: string): Observable<ILoginResultSchema> {
    return this.http.post<ILoginResultSchema>(`${environment.serverPath}${loginPath}`, {login: login, password: password});
  }

  isAuthenticated(): boolean {
    if (this.isTokenValid()) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    localStorage.removeItem('auth_token');
  }

  isTokenValid(): boolean {
    // Currently only the expiration date is compared for validation
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decoded = jwt_decode(token);
    const date = this.getTokenExpirationDate(decoded);
    if (date === undefined) {
      return false;
    }
    return (date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(decoded: {exp: number}): Date {
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  logout() {
    this.removeToken();
    localStorage.removeItem('user_firstName');
    localStorage.removeItem('user_lastName');
    localStorage.removeItem('user_email');
    this.loginChange.emit(undefined);
    this.router.navigateByUrl('/login');
  }

  login(login: string, password: string) {
    if (login && password) {
      return this.authenticateOnBackend(login, password)
        .subscribe(
          result => {
            this.setToken(result.token);
            localStorage.setItem('user_firstName', result.firstName);
            localStorage.setItem('user_lastName', result.lastName);
            localStorage.setItem('user_email', result.email);
            this.loginChange.emit(result.email);
            this.authError.emit(false);
            this.router.navigateByUrl('/');
          });
    }
  }
}
