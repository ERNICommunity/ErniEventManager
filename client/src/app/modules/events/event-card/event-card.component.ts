import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEventSchema } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventSchema;
  @Output() delete: EventEmitter<IEventSchema> = new EventEmitter();
  @Output() open: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private eventService: EventService) { }

  ngOnInit(): void {
  }

  openEvent (): void {
    this.open.emit(this.event._id);
  }

  deleteEvent(): void {
    this.delete.emit(this.event);
  }
}
