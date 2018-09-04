import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  @Input() event: IEventSchema;

  constructor() {}

  ngOnInit() {}

  invite() {
      // TODO: invite participants via E-mail
  }

  export() {
      // TODO: export participants to CSV file
  }

}