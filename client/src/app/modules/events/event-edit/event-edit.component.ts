import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema, IEventLocation } from '../../../interfaces';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  event: IEventSchema;
  isCreate = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.event = new IEventSchema();
    this.event.location = new IEventLocation();
   }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] === 'new') {
      this.isCreate = true;
    } else {
      this.eventService.getEvent(this.route.snapshot.params['id'])
        .subscribe((event) => {
          if (!event.location) {
            event.location = new IEventLocation();
          }
          this.event = event;
        },
        (reason) => {
          this.router.navigate(['/']);
        }
      );
      this.isCreate = false;
    }
  }

  create(): void {
    this.eventService.createEvent(this.event)
      .subscribe(
        (event) => {
          this.router.navigate(['/']); // success path
        },
        (error) => {
          console.log('Following error appeared: ', error);
        }
      );
  }

  edit(): void {
    this.eventService.editEvent(this.route.snapshot.params['id'], this.event)
      .subscribe((event) => {
        this.router.navigate(['/']);
      },
      (reason) => {
        console.log('Following error appeared: ', reason);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

}
