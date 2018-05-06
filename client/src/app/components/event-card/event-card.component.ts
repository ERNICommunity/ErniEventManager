import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEventSchema} from '../../interfaces';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventSchema;
  @Output() delete: EventEmitter<IEventSchema> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editEvent() {
    this.edit.emit(this.event._id);
  }

  deleteEvent() {
    this.delete.emit(this.event);
  }

}
