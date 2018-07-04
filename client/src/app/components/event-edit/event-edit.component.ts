import { Component, OnInit, Output } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema } from '../../interfaces';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  @Output() event: IEventSchema;
  isCreate = false;
  startDate: NgbDate;
  endDate: NgbDate;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.event = new IEventSchema();
    const now = new Date();
    this.startDate = this.endDate = new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === 'new') {
      this.isCreate = true;
    } else {
      this.eventService.getEvent(this.route.snapshot.params['id'])
        .subscribe((event) => {
          this.event = event;
          this.importEventProperties(event);
        },
          (reason) => {
            this.router.navigate(['/']);
          }
        );
      this.isCreate = false;
    }
  }

  create() {
    this.eventService.createEvent(this.prepareEventForExport(this.event))
      .subscribe(
        (event) => {
          this.router.navigate(['/']); // success path
        },
        (error) => {
          console.log('Following error appeared: ', error);
        }
      );
  }

  edit() {
    this.eventService.editEvent(this.route.snapshot.params['id'], this.event)
      .subscribe((event) => {
        this.router.navigate(['/']);
      },
        (reason) => {
          console.log('Following error appeared: ', reason);
        }
      );
  }

  cancel() {
    this.router.navigate(['/']);
  }

  prepareEventForExport(event): IEventSchema {
    const startDate = new Date();
    startDate.setFullYear(this.startDate.year);
    startDate.setMonth(this.startDate.month - 1);
    startDate.setDate(this.startDate.day);
    event.startDate = startDate;
    const endDate = new Date();
    endDate.setFullYear(this.endDate.year);
    endDate.setMonth(this.endDate.month - 1);
    endDate.setDate(this.endDate.day)
    return event;
  }

  importEventProperties(event): void {
    if (event.startDate) {
      this.startDate = new NgbDate(event.startDate.getFullYear(),
        event.startDate.getMonth() + 1,
        event.startDate.getDate());
    }
    if (event.endDate) {
      this.endDate = new NgbDate(event.endDate.getFullYear(),
        event.endDate.getMonth() + 1,
        event.endDate.getDate());
    }
  }

}
