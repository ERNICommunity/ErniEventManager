import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IEventSchema, IEventResponse, IPaginator } from '../../interfaces';
import { preparePaginator } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly eventPath = 'api/event';

  constructor(private httpClient: HttpClient) {}

  createEvent(data: IEventSchema): Observable<IEventSchema> {
    return this.httpClient.post<IEventSchema>(`${environment.serverPath}${this.eventPath}`, { data });
  }

  getEvent(id: string): Observable<IEventSchema> {
    return this.httpClient.get<IEventSchema>(`${environment.serverPath}${this.eventPath}/${id}`);
  }

  queryEventsPaginated(paginator: IPaginator): Observable<IEventResponse> {
    // paginator.exactFilter.group = eventName;
    return this.httpClient.get<IEventResponse>(`${environment.serverPath}${this.eventPath}`,
      {
        params: {
          ...preparePaginator(paginator)
        }
      }
    );
  }

  editEvent(id: string, data: IEventSchema): Observable<IEventSchema> {
    return this.httpClient.put<IEventSchema>(`${environment.serverPath}${this.eventPath}/${id}`, { data });
  }

  deleteEvent (data: IEventSchema, paginated: IPaginator): Observable<IEventResponse> {
    return this.httpClient.delete<IEventResponse>(`${environment.serverPath}${this.eventPath}/${data._id}`, {
        params: {
          ...preparePaginator(paginated)
        }
      })
      .pipe(switchMap(() => this.queryEventsPaginated(paginated)));
  }



  join(id): Observable<Object> {
    return this.httpClient.get(`${environment.serverPath}${this.eventPath}/join/${id}`);
  }

  leave(id): Observable<Object> {
    return this.httpClient.get(`${environment.serverPath}${this.eventPath}/leave/${id}`);
  }

  joined(event: IEventSchema): boolean {
    return event.participants.filter((user: any) => user.email === localStorage.getItem('user_email')).length !== 0;
  }
}
