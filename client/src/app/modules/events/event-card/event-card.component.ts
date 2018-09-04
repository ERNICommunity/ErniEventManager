import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IEventSchema } from '../../../interfaces';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  animations: [
    trigger('buttonGroupFadeInOut', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opacity: 0
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('250ms ease-in-out'))
    ])
  ]
})
export class EventCardComponent implements OnInit {
  @Input() event: IEventSchema;
  @Output() delete: EventEmitter<IEventSchema> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  buttonMenuState = 'out';

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
