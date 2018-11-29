import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IPaginator, IEventResponse } from '../../interfaces';
import { EventService } from '../../services/event/event.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class EventsResolver implements Resolve<IEventResponse> {
    paginator: IPaginator = new IPaginator(
        100,
        5,
        [5, 10, 25, 100],
        0,
        {},
        { field: 'name', way: '' },
        {}
      );
   constructor(private eventService: EventService) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEventResponse> {
    return this.eventService.queryEventsPaginated(this.paginator, route.params);
   }
}
