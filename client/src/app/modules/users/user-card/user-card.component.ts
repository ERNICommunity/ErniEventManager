import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserSchema } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: IUserSchema;
  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editUser() {
    this.edit.emit(this.user._id);
  }

}
