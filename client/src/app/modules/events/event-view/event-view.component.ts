import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema } from '../../../interfaces';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  iEvent: IEventSchema;
  canEditLocation = false;
  canEdit = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.iEvent = new IEventSchema();
    this.getEvent().subscribe(
      (receivedEvent) => {
        this.iEvent = receivedEvent;
        this.canEdit = this.iEvent.owner.email === localStorage.getItem('user_email');
      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnInit() {
  }


  editEvent(): void {
    this.router.navigate(['/events', 'edit', this.iEvent._id]);
  }

  getEvent(): Observable<IEventSchema> {
    return this.eventService.getEvent(this.route.snapshot.params['id']);
  }

  changeEvent(event: IEventSchema): void {
    this.iEvent = event;
  }
}
