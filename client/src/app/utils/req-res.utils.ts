import { IEventSchema, IEventResponse, IPaginator } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function parseResponse(response: IEventSchema): IEventSchema {
    return response;
}

export function parseResponsePaginated(response: IEventResponse): IEventResponse {
    return response;
}

export function preparePaginator(paginator: IPaginator): any {
    const finalPaginator: any = {
        size: paginator.size,
        index: paginator.index,
        qi: paginator.qi,
        ...paginator.filter,
        ...paginator.exactFilter
    };
    finalPaginator.field  = paginator.sort.field;
    finalPaginator.way = paginator.sort.way;

    return finalPaginator;
}

export function handleError(error: HttpErrorResponse) {
    let errMsg = 'UNKNOWN_MESSAGE';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errMsg = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        errMsg = error.error;
    }
    return throwError(errMsg);
  }
