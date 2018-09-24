import { translateLoaderSpy } from './../../../../utils-test/test-utils.spec';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDialogComponent } from './invite-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory } from '../../../../app.module';

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
});
