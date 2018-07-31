import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEventSchema} from '../../interfaces';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {IEventFilter} from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  animations: [
    trigger('buttonMenuSlideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translate3d(20%, 0, 0)',
        opacity: 0
      })),
      transition('in => out', animate('2000ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ]),
  ]
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventSchema;
  @Input() eventFilter: IEventFilter;
  @Output() delete: EventEmitter<IEventSchema> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  buttonMenuState = 'out';

  constructor() { }

  ngOnInit() {
  }

  toggleButtonMenu() {
    this.buttonMenuState = this.buttonMenuState === 'out' ? 'in' : 'out';
  }

  editEvent() {
    this.edit.emit(this.event._id);
  }

  deleteEvent() {
    this.delete.emit(this.event);
  }

}
