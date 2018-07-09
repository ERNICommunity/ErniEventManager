import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IEventSchema, IEventResponse, IPaginator } from '../../interfaces';
import { preparePaginator } from '../../utils';

@Injectable()
export class EventService {
  readonly eventPath = 'api/event';

  constructor(private httpClient: HttpClient) {}

  createEvent(data: IEventSchema): Observable<IEventSchema> {
    return <Observable<IEventSchema>>(
      this.httpClient.post(`${environment.serverPath}${this.eventPath}`, { data })
    );
  }

  getEvent(id: string): Observable<IEventSchema> {
    return <Observable<IEventSchema>>(
      this.httpClient.get(`${environment.serverPath}${this.eventPath}/${id}`)
    );
  }

  queryEventsPaginated(paginator: IPaginator): Observable<IEventResponse> {
    // paginator.exactFilter.group = eventName;
    return <Observable<IEventResponse>>this.httpClient.get(
      `${environment.serverPath}${this.eventPath}`,
      {
        params: {
          ...preparePaginator(paginator)
        }
      }
    );
  }

  editEvent(id: string, data: IEventSchema): Observable<IEventSchema> {
    return <Observable<IEventSchema>>(
      this.httpClient.put(`${environment.serverPath}${this.eventPath}/${id}`, { data })
    );
  }

  deleteEvent (data: IEventSchema, paginated: IPaginator): Observable<IEventResponse> {
    return <Observable<IEventResponse>>this.httpClient
      .delete(`${environment.serverPath}${this.eventPath}/${data._id}`, {
        params: {
          ...preparePaginator(paginated)
        }
      })
      .pipe(switchMap(() => this.queryEventsPaginated(paginated)));
  }
}
