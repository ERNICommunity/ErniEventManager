import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema} from '../../interfaces';

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
   }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === 'new') {
      this.isCreate = true;
    } else {
      this.eventService.getEvent(this.route.snapshot.params['id'])
        .then((event) => {
          this.event = event;
        }).
        catch((reason) => {
          this.router.navigate(['/']);
        });
      this.isCreate = false;
    }
  }

  create() {
    this.eventService.createEvent(this.event)
      .then((event) => {
        this.router.navigate(['/']);
      })
      .catch((reason) => {
        console.log('Following error appeared: ', reason);
      });
  }

  edit() {
    this.eventService.editEvent(this.event)
      .then((event) => {
        this.router.navigate(['/']);
      })
      .catch((reason) => {
        console.log('Following error appeared: ', reason);
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
