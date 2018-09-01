import {Injectable, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ILoginResultSchema} from '../../interfaces';

const loginPath = 'api/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loginChange = new EventEmitter();
  @Output() authError = new EventEmitter();
  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user_email');
    if (user) {
      this.loginChange.emit(user);
    }
  }

  authenticateOnBackend(login: string, password: string): Observable<ILoginResultSchema> {
    return this.http.post<ILoginResultSchema>(`${environment.serverPath}${loginPath}`, {login: login, password: password});
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user_email')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
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
            localStorage.setItem('auth_token', result.token);
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
