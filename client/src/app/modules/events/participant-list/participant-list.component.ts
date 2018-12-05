import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IUserSchema } from '../../../interfaces';
import { IEventSchema } from '../../../interfaces/event.interface';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit, OnChanges {

  private static SEPARATOR_WORD = ';';
  private static SEPARATOR_LINE = '\n';

  private export_filename: string;
  private participants: IUserSchema[];
  private imgExportSrc = '/assets/images/icons/export-light-blue.png';
  private imgInviteSrc = '/assets/images/icons/invite-light-blue.png';
  private showInviteDialog = false;

  @Input() iEvent: IEventSchema;

  private static fileHeader = (): string => {
    return 'Name' + ParticipantListComponent.SEPARATOR_WORD +
           'Surname' + ParticipantListComponent.SEPARATOR_WORD +
           'Email' + ParticipantListComponent.SEPARATOR_LINE;
  }
  private static fileData = (person: IUserSchema): string => {
    return person.firstName + ParticipantListComponent.SEPARATOR_WORD +
           person.lastName + ParticipantListComponent.SEPARATOR_WORD +
           person.email + ParticipantListComponent.SEPARATOR_LINE;
  }

  constructor() {}

  ngOnInit(): void {
    // TODO: remove after "join event" functionality works
    const people: IUserSchema[] = [
      {_id: '1', email: 'j@d.com', firstName: 'John', lastName: 'Doe', type: 'participant', avatar: 'male', role: 'role'},
      {_id: '2', email: 'j@d.com', firstName: 'Jane', lastName: 'Doe', type: 'participant', avatar: 'female', role: 'role'},
      {_id: '3', email: 'j@d.com', firstName: 'Jack', lastName: 'Kerouac', type: 'participant', avatar: 'male', role: 'role'}
    ];
    this.participants = this.iEvent.participants;
  }

  ngOnChanges(): void {
    if (this.iEvent.name) {
      const name = this.iEvent.name.toLowerCase().replace(' ', '_');
      this.export_filename = name + '_participants.csv';
    }
    // TODO: uncomment this after "join event" functionality works
    this.participants = this.iEvent.participants;
  }

  public invite(): void {
      this.showInviteDialog = !this.showInviteDialog;
  }

  public export(): void {
      this.exportParticipantsToCsvFile();
  }

  private exportParticipantsToCsvFile(): void {
    const data = this.buildFileData();
    this.saveFileToDisk(data, this.export_filename);
  }

  private buildFileData(): Blob {
    const ws = ParticipantListComponent.SEPARATOR_WORD;
    const ls = ParticipantListComponent.SEPARATOR_LINE;
    // Header
    let data = ParticipantListComponent.fileHeader();
    // Data
    this.participants.forEach((participant) => {
      data += ParticipantListComponent.fileData(participant);
    });
    return new Blob([data], { type: 'text/csv;charset=utf-8;' });
  }

  private saveFileToDisk(blob: Blob, filename: string): void {
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    }
  }
}
