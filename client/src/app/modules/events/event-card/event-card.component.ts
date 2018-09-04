import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IEventSchema } from '../../../interfaces';

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
      transition('in => out', animate('250ms ease-out')),
      transition('out => in', animate('500ms ease-out'))
    ]),
  ]
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventSchema;
  @Output() delete: EventEmitter<IEventSchema> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  buttonMenuState: string = 'out';

  constructor() { }

  ngOnInit(): void {
  }

  toggleButtonMenu(): void {
    this.buttonMenuState = this.buttonMenuState === 'out' ? 'in' : 'out';
  }

  editEvent(): void {
    this.edit.emit(this.event._id);
  }

  deleteEvent(): void {
    this.delete.emit(this.event);
  }

}
