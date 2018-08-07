import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResponse, IUserSchema, ILoginSchema } from '../../interfaces/user.interface';
import { IPaginator } from '../../interfaces';
import { environment } from '../../../environments/environment';
import { preparePaginator, handleError } from '../../utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userPath = 'api/user';
  loginPath = 'api/user/login';

  constructor(
    private httpClient: HttpClient
  ) { }

  create = (data: IUserSchema): Observable<IUserSchema> => {
    return <Observable<IUserSchema>> this.httpClient.post(`${environment.serverPath}${this.userPath}`, { data })
      .pipe(
        catchError(handleError)
      );
  }

  get = (id: string): Observable<IUserSchema> => {
    return <Observable<IUserSchema>> this.httpClient.get(`${environment.serverPath}${this.userPath}/${id}`)
      .pipe(
        catchError(handleError)
      );
  }

  queryPaginated = (paginator: IPaginator): Observable<IUserResponse> => {
    return <Observable<IUserResponse>> this.httpClient.get(`${environment.serverPath}${this.userPath}`, {
      params: {
        ...preparePaginator(paginator)
      }
    })
      .pipe(
        catchError(handleError)
      );
  }

  edit = (id: string, data: IUserSchema): Observable<IUserSchema> => {
    return <Observable<IUserSchema>> this.httpClient.put(`${environment.serverPath}${this.userPath}/${id}`, { data })
      .pipe(
        catchError(handleError)
      );
  }

  delete = (data: IUserSchema): Observable<IUserResponse> => {
    return <Observable<IUserResponse>> this.httpClient.delete(`${environment.serverPath}${this.userPath}/${data._id}`)
    .pipe(
      catchError(handleError)
    );
  }

  login(data: ILoginSchema): Observable<ILoginSchema> {
    return this.httpClient.post<ILoginSchema>(`${environment.serverPath}${this.loginPath}`, { data });
  }
}
