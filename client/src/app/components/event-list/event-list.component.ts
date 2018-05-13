import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { IEventSchema, IPaginator, IEventResponse} from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() headerMessage: string;
  errorMessage: any;
  events = [];
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

  ngOnInit() {
    this.retreiveData = true;
    this.eventService.queryEventsPaginated(this.paginator)
      .then((eventRes: IEventResponse) => {
        if (eventRes.qi === this.paginator.qi) {
          this.retreiveData = false;
          this.paginator.length = eventRes.length;
          this.events = eventRes.list;
        }
      })
      .catch((reason) => {
        this.displayError(reason);
        this.retreiveData = false;
      });
  }

  openEvent(event: string) {
    this.router.navigate(['/event/edit/' + event]);
  }

  deleteEvent(event: IEventSchema) {
    this.eventService.deleteEvent(event, this.paginator)
      .then((eventRes: IEventResponse) => {
        if (eventRes.qi === this.paginator.qi) {
          this.retreiveData = false;
          this.paginator.length = eventRes.length;
          this.events = eventRes.list;
        }
      })
      .catch((reason) => {
        this.displayError(reason);
        this.retreiveData = false;
      });
  }

  create() {
    this.openEvent('new');
  }

  displayError(reason: any) {
    this.errorMessage = reason && reason.error ? reason.error.err : 'Unexpected error appeared';
  }

}
