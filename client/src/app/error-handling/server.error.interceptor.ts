import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {handleError} from '../utils';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    return next.handle(request)
      .pipe(
        retry(5),
        catchError((error, caught) => {
          if (error.status === 401) {
            if (error.error === 'Incorrect credentials') {
              this.authService.authError.emit(true);
            } else {
              this.router.navigateByUrl('/login');
            }
          } else {
            handleError(error);
          }
          return throwError(error);
        })
      );
  }
}
