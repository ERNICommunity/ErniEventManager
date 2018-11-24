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
  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() join: EventEmitter<string> = new EventEmitter();
  @Output() leave: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private eventService: EventService) { }

  ngOnInit(): void {
  }

  editEvent(): void {
    this.edit.emit(this.event._id);
  }

  deleteEvent(): void {
    this.delete.emit(this.event);
  }

  joinEvent(): void {
    this.join.emit(this.event._id);
  }

  leaveEvent(): void {
    this.leave.emit(this.event._id);
  }

  joined(): boolean {
    return this.eventService.joined(this.event);
  }
}
