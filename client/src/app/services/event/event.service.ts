import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { IEventSchema, IEventRequest, IEventResponse, IPaginator } from '../../interfaces';
import { parseResponse, parseResponsePaginated } from '../../utils';

@Injectable()
export class EventService {
  eventPath = 'api/event';
  eventsFromFile: Array<IEventSchema> = [];

  constructor(private httpClient: HttpClient) {
  }

  createEvent = (eventData: IEventSchema): Promise<IEventSchema> => {
    return this.httpClient.post(`${environment.serverPath}${this.eventPath}/create`, { eventData })
      .toPromise()
      .then(parseResponse)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  getEvent = (id: string): Promise<IEventSchema> => {
    return this.httpClient.get(`${environment.serverPath}${this.eventPath}/${id}`)
      .toPromise()
      .then(parseResponse)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  queryEventsPaginated = (paginator: IPaginator): Promise<IEventResponse> => {
    // paginator.exactFilter.group = eventName;
    return this.httpClient.post(`${environment.serverPath}${this.eventPath}/filters`, paginator)
      .toPromise()
      .then((parseResponsePaginated))
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  editEvent = (eventData: IEventSchema): Promise<IEventSchema> => {
    return this.httpClient.put(`${environment.serverPath}${this.eventPath}/update`, { eventData })
      .toPromise()
      .then(parseResponse)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  deleteEvent = (eventData: IEventSchema, paginated: IPaginator): Promise<IEventResponse> => {
    return this.httpClient.post(`${environment.serverPath}${this.eventPath}/delete`, { eventData, paginated })
      .toPromise()
      .then(parseResponsePaginated)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

}
