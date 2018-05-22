import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { IEventSchema, IEventRequest, IEventResponse, IPaginator } from '../../interfaces';
import { parseResponse, parseResponsePaginated, preparePaginator, handleError } from '../../utils';

@Injectable()
export class EventService {
  eventPath = 'api/event';
  eventsFromFile: Array<IEventSchema> = [];

  constructor(private httpClient: HttpClient) {
  }

  createEvent = (eventData: IEventSchema): Observable<IEventSchema> => {
    return <Observable<IEventSchema>> this.httpClient.post(`${environment.serverPath}${this.eventPath}`, { eventData })
      .pipe(
        catchError(handleError)
      );
  }

  getEvent = (id: string): Observable<IEventSchema> => {
    return <Observable<IEventSchema>> this.httpClient.get(`${environment.serverPath}${this.eventPath}/${id}`)
      .pipe(
        catchError(handleError)
      );
  }

  queryEventsPaginated = (paginator: IPaginator): Observable<IEventResponse> => {
    // paginator.exactFilter.group = eventName;
    return <Observable<IEventResponse>> this.httpClient.get(`${environment.serverPath}${this.eventPath}`, {
      params: {
        ...preparePaginator(paginator)
      }
    })
      .pipe(
        catchError(handleError)
      );
  }

  editEvent = (id: string, eventData: IEventSchema): Observable<IEventSchema> => {
    return <Observable<IEventSchema>> this.httpClient.put(`${environment.serverPath}${this.eventPath}/${id}`, { eventData })
      .pipe(
        catchError(handleError)
      );
  }

  deleteEvent = (eventData: IEventSchema, paginated: IPaginator): Observable<IEventResponse> => {
    return <Observable<IEventResponse>> this.httpClient.delete(`${environment.serverPath}${this.eventPath}/${eventData._id}`,
    {
      params: {
        ...preparePaginator(paginated)
      }
   })
    .pipe(
      catchError(handleError)
    );
  }

}
