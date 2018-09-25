import { translateLoaderSpy } from './../../../../utils-test/test-utils.spec';
import { NgbModal, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDialogComponent } from './invite-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory } from '../../../../app.module';
import { IEventSchema } from '../../../../../../../server/src/interfaces/mongo.interface';

describe('InviteDialogComponent', () => {
  let component: InviteDialogComponent;
  let fixture: ComponentFixture<InviteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteDialogComponent ],
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        TagInputModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        {provide: TranslateLoader, useValue: translateLoaderSpy},
        NgbModal,
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendInvitation', () => {

    beforeEach(() => {
      component.iEvent = new IEventSchema();
      component.iEvent.name = 'name';
      component.iEvent.startDate = new Date();
      component.iEvent.endDate = new Date();
      component.iEvent.location.address = 'location';
      component.iEvent.description = 'description';
      component.iEvent.limit = 25;
    });

    it('should send fully defined mail', () => {
      // Given
      component._emails = ['john@doe.com'];
      component._inputText = 'someone@email.com';
      // When
      component.show();
      component.sendInvitation();
      // Then
      expect(component.modal).not.toBeUndefined();
      expect(component._inputText).toEqual(null);
      expect(component._emails).toEqual(['john@doe.com', 'someone@email.com']);
    });

    it('should send email if valid input text is present and no tag is entered', () => {
      // Given
      component._emails = [];
      component._inputText = 'someone@email.com';
      // When
      component.show();
      component.sendInvitation();
      // Then
      expect(component.modal).not.toBeUndefined();
      expect(component._inputText).toEqual(null);
      expect(component._emails).toEqual(['someone@email.com']);
    });

    it('shouldn\'t send anything if wrong data are presented', () => {
      // Given
      component._emails = [];
      component._inputText = 'someone@email'; // e.g. incomplete address
      // When
      component.show();
      component.sendInvitation();
      // Then
      expect(component.modal).not.toBeUndefined();
      expect(component._inputText).toEqual('someone@email');
      expect(component._emails).toEqual([]);
    });

    it('shouldn\'t send anything if no data are presented', () => {
      // Given
      component._emails = [];
      component._inputText = null;
      // When
      component.show();
      component.sendInvitation();
      // Then
      expect(component.modal).not.toBeUndefined();
      expect(component._inputText).toEqual(null);
      expect(component._emails).toEqual([]);
    });
  });

  describe('show', () => {
    // Can't test this...
    it('should open invite dialog', () => {
      // Given
      // When
      component.show();
      // Then
      expect(component.modal).not.toBeUndefined();
    });
  });
});
