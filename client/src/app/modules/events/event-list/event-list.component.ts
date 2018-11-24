import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event.service';
import { IEventSchema, IPaginator, IEventResponse} from '../../../interfaces';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  errorMessage: any;
  events: IEventSchema[] = [];
  retreiveData = false;
  paginator: IPaginator = new IPaginator(
    100,
    5,
    [5, 10, 25, 100],
    0,
    {},
    { field: 'name', way: '' },
    {}
  );

  constructor(
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: Data) => {
        const eventRes = data['events'];
        this.retreiveData = false;
        this.paginator.length = eventRes.length;
        this.events = eventRes.list;
      },
      (reason) => {
        this.displayError(reason);
        this.retreiveData = false;
      }
    );
  }

  openEvent(id: string): void {
    this.router.navigate(['/events', 'edit', id]);
  }

  deleteEvent(event: IEventSchema): void {
    this.retreiveData = true;
    this.eventService.deleteEvent(event, this.paginator)
      .subscribe((eventRes: IEventResponse) => {
        if (eventRes.qi === this.paginator.qi) {
          this.retreiveData = false;
          this.paginator.length = eventRes.length;
          this.events = eventRes.list;
        }
      },
      (reason) => {
        this.displayError(reason);
        this.retreiveData = false;
      }
    );
  }

  joinEvent(id: string): void {
    this.eventService.join(id)
      .subscribe((joinedEvent: IEventSchema) => {
        const event = this.events.find(item => item._id === joinedEvent._id);
        if (event) {
          event.participants = joinedEvent.participants;
        }
      });
  }

  leaveEvent(id: string): void {
    this.eventService.leave(id)
      .subscribe((joinedEvent: IEventSchema) => {
        const event = this.events.find(item => item._id === joinedEvent._id);
        if (event) {
          event.participants = joinedEvent.participants;
        }
      });
  }

  displayError(reason: any): void {
    this.errorMessage = reason && reason.error ? reason.error.err : 'Unexpected error appeared';
  }

}
