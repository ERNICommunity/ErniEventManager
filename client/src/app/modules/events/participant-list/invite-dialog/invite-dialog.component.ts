import { IEventSchema } from './../../../../../../../server/src/interfaces/mongo.interface';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

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
  validators;
  errorMessages;

  private emails: Array<any>;
  get _emails(): Array<string> {
    return this.emails;
  }
  set _emails(array: Array<string>) {
    this.emails = array;
  }

  private inputText: string;
  get _inputText(): string {
    return this.inputText;
  }
  set _inputText(value: string) {
    this.inputText = value;
  }

  constructor(private modalService: NgbModal,
              private translationService: TranslateService) {
    this.validators = [this.validateEmail];
    this.errorMessages = {
      'email': translationService.instant('ERROR_WRONG_EMAIL')
    };
  }

  ngOnInit(): void {
    this.emails = new Array();
  }

  // TODO: redirect sending mails to backend
  public sendInvitation(): void {
    // If input text is not empty validate it and pass to email array
    if (this.inputText && InviteDialogComponent.EMAIL_REGEXP.test(this.inputText)) {
      this.emails.push(this.inputText);
      this.inputText = null;
    }
    if (this.emails.length > 0) {
      // Build the invitation mail
      const mails = this.emails.join(';');
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

  public show() {
    this.open(this.content);
  }

  private open(content): void {
    this.modal = this.modalService.open(content, {centered: true, ariaLabelledBy: 'modal-basic-title'});
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

  private validateEmail(control: FormControl): {[value: string]: boolean} | null {
    if (!InviteDialogComponent.EMAIL_REGEXP.test(control.value)) {
      return {
        'email': true
      };
    }
    return null;
  }
}
