import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema } from '../../../interfaces';

@Component({
  selector: 'join-button',
  templateUrl: './join-button.component.html',
  styleUrls: ['./join-button.component.scss']
})
export class JoinButtonComponent implements OnInit {
  @Input() event: IEventSchema;
  @Output() joinedEvent = new EventEmitter();

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  joinEvent(): void {
    this.eventService.join(this.event._id)
      .subscribe((joinedEvent: IEventSchema) => {
          this.event = joinedEvent;
          this.joinedEvent.emit(joinedEvent);
      });
  }

  leaveEvent(): void {
    this.eventService.leave(this.event._id)
      .subscribe((joinedEvent: IEventSchema) => {
        this.event = joinedEvent;
        this.joinedEvent.emit(joinedEvent);
      });
  }

  joined(): boolean {
    return this.eventService.joined(this.event);
  }

  canJoin(): boolean {
    return this.event.limit && (+this.event.limit - this.event.participants.length > 0);
  }

}
