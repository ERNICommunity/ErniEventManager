import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoaderSpy, routerSpy, leftSidebarServiceSpy, authServiceSpy, localStorageMock } from '../../utils-test/index.spec';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpLoaderFactory } from '../../app.module';
import { Router } from '@angular/router';
import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';
import { AuthService } from '../../services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
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
        {provide: LeftSidebarService, useValue: leftSidebarServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
