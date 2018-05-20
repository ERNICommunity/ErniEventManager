import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { IEventSchema, IEventRequest, IEventResponse, IPaginator } from '../../interfaces';
import { parseResponse, parseResponsePaginated, preparePaginator } from '../../utils';

@Injectable()
export class EventService {
  eventPath = 'api/event';
  eventsFromFile: Array<IEventSchema> = [];

  constructor(private httpClient: HttpClient) {
  }

  createEvent = (eventData: IEventSchema): Promise<IEventSchema> => {
    return this.httpClient.post(`${environment.serverPath}${this.eventPath}`, { eventData })
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
    return this.httpClient.get(`${environment.serverPath}${this.eventPath}`, {
      params: {
        ...preparePaginator(paginator)
      }
    }).toPromise()
      .then((parseResponsePaginated))
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  editEvent = (id: string, eventData: IEventSchema): Promise<IEventSchema> => {
    return this.httpClient.put(`${environment.serverPath}${this.eventPath}/${id}`, { eventData })
      .toPromise()
      .then(parseResponse)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  deleteEvent = (eventData: IEventSchema, paginated: IPaginator): Promise<IEventResponse> => {
    return this.httpClient.delete(`${environment.serverPath}${this.eventPath}/${eventData._id}`,
    {
      params: {
        ...preparePaginator(paginated)
      }
   })
      .toPromise()
      .then(parseResponsePaginated)
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

}
