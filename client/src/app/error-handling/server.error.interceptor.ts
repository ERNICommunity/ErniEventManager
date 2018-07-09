import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { handleError } from '../utils';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    return next.handle(request)
      .pipe(
        retry(5),
        catchError((error, caught) => {
          handleError(error);
          return Observable.throw(error);
        })
      );
  }
}
