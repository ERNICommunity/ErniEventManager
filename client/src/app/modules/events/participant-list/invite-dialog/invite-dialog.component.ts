import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
  exportAs: 'inviteDialog'
})
export class InviteDialogComponent implements OnInit {

  @Input() eventName: string;
  @ViewChild('content') content;

  closeResult: string;
  modal: NgbModalRef;

  private emails: string[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // Dummy data
    this.emails = ['john@erni.sk', 'hans@erni.ch', 'jurgen@erni.de'];
  }

  public sendInvitation(): void {
    // TODO: redirect sending mails to backend
    // Send invitations
    const mails = this.emails.join(';');
    const subject = 'Invitation to event: ' + this.eventName;
    const body = 'Dear friend,\n Let me kindly invite you to my event happening on <time> at <location>.' +
     '\n Please mind folowing details: \n <description> ';
    window.open(`mailto:${mails}?subject=${subject}&body=${body}`);
    console.log('Invitations sent via email');
    // Close modal
    this.modal.close('Invitation(s) sent');
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
}
