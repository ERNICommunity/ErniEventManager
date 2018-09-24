import { TagInputModule } from 'ngx-chips';
import { translateLoaderSpy } from './../../../utils-test/test-utils.spec';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListComponent } from './participant-list.component';
import { HttpLoaderFactory } from '../../../app.module';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ParticipantListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantListComponent, InviteDialogComponent ],
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
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
