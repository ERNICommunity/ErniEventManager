import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { translateLoaderSpy, userServiceSpy, routerSpy, userSchemaMock1 } from '../../utils-test/index.spec';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let translate: TranslateService;
  let getUserSpy: any;

  beforeEach(async(() => {
    getUserSpy = userServiceSpy.get.and.returnValue( of(userSchemaMock1) );
    TestBed.configureTestingModule({
      declarations: [ UserEditComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        {provide: TranslateLoader, useValue: translateLoaderSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({id: 'new'})
            }
          }
        },
      ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
