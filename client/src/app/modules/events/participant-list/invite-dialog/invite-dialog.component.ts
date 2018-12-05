import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { IEventSchema } from './../../../../interfaces/event.interface';


@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
  exportAs: 'inviteDialog'
})
export class InviteDialogComponent implements OnInit {

  private static readonly EMAIL_REGEXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  @Input() iEvent: IEventSchema;
  @ViewChild('content') content;

  closeResult: string;
  modal: NgbModalRef;
  validators: ((c: AbstractControl) => {[value: string]: boolean})[];
  errorMessages: {[key: string]: string};

  private _emails: Array<string>;
  get emails(): Array<string> {
    return this._emails;
  }
  set emails(array: Array<string>) {
    this._emails = array;
  }

  private _inputText: string;
  get inputText(): string {
    return this._inputText;
  }
  set inputText(value: string) {
    this._inputText = value;
  }

  constructor(private modalService: NgbModal,
              private translationService: TranslateService) {
    this.validators = [this.validateEmail];
    this.errorMessages = {
      'email': translationService.instant('ERROR_WRONG_EMAIL')
    };
    this._emails = new Array();
  }

  ngOnInit(): void {}

  // TODO: redirect sending mails to backend
  sendInvitation(): void {
    // If input text is not empty validate it and pass to email array
    if (this._inputText && InviteDialogComponent.EMAIL_REGEXP.test(this._inputText)) {
      this._emails.push(this._inputText);
      this._inputText = null;
    }
    if (this._emails.length > 0) {
      // Build the invitation mail
      const mails = this._emails.join(';');
      const subject = this.translationService.instant('EMAIL_INVITATION_SUBJECT', {'name': this.iEvent.name});
      const dateFormat = 'D.M. YYYY';
      let body = this.translationService.instant('EMAIL_INVITATION_BODY', {
        'startDate': moment(this.iEvent.startDate).format(dateFormat),
        'endDate': moment(this.iEvent.endDate).format(dateFormat),
        'location': this.iEvent.location.address
      });
      if (this.iEvent.description) {
        body += this.translationService.instant('EMAIL_INVITATION_BODY_DETAILS', {'description': this.iEvent.description});
      }
      body += this.translationService.instant('EMAIL_INVITATION_LINK_JOIN', {'link': window.location.href});
      // Open email client
      window.location.href = `mailto:${mails}?subject=${subject}&body=${body}`;
      // Close modal
      this.modal.close('Invitation(s) sent');
    }
  }

  show(): void {
    this.open(this.content);
  }

  private open(content): void {
    this.modal = this.modalService.open(content, {centered: true});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private validateEmail(control: AbstractControl): {[value: string]: boolean} | null {
    if (!InviteDialogComponent.EMAIL_REGEXP.test(control.value)) {
      return {
        'email': true
      };
    }
    return null;
  }
}
