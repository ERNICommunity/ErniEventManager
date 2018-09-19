import { Component, OnInit, Input, Output } from '@angular/core';
import { IEventSchema } from '../../../interfaces/event.interface';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  @Input() event: IEventSchema;
  @Input() participants: any[] = [
    {name: 'John', surname: 'Doe', gender: 'male'},
    {name: 'Jane', surname: 'Doe', gender: 'female'},
    {name: 'Jack', surname: 'Kerouac', gender: 'male'}
  ];

  constructor() {}

  ngOnInit() {}

  invite() {
      // TODO: invite participants via E-mail
  }

  export() {
      // TODO: export participants to CSV file
  }

}
