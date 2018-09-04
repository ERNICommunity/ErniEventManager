import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from 'selenium-webdriver/http';
import { Component, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { translateLoaderSpy, pageNameServiceSpyAbstract, leftSidebarServiceSpy } from '../../utils-test/index.spec';
import { MockComponent } from '../../utils';
import { currenPageMock1, ICurrentPage } from '../../interfaces';
import { of, Subject } from 'rxjs';
import { PageNameService } from '../../services/page-name/page-name.service';
import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let translate: TranslateService;
  let getPageNameSpy: any;
  let getPageTextSpy: any;
  let getLeftSidebarSpy: any;

  beforeEach(async(() => {
    getPageTextSpy = pageNameServiceSpyAbstract.getPageText.and.returnValue( of(currenPageMock1) );
    getLeftSidebarSpy = leftSidebarServiceSpy.getSidebarSubject.and.returnValue( of({subscribe: () => false }) );
    getPageNameSpy = pageNameServiceSpyAbstract.getPageName.and.returnValue( of( {subscribe: () => currenPageMock1 }) );
    TestBed.configureTestingModule({
      declarations: [
        EventsComponent,
        MockComponent
      ],
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
        RouterTestingModule.withRoutes([
          {
            path: 'events',
            component: MockComponent
          }
        ])
      ],
      providers: [
        {provide: TranslateLoader, useValue: translateLoaderSpy},
        {provide: PageNameService, useValue: pageNameServiceSpyAbstract},
        {provide: LeftSidebarService, useValue: leftSidebarServiceSpy}
      ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('expect get PageText call', async() => {
    expect(getPageTextSpy.calls.any()).toBe(true, 'getPageTextcalled');
  });

  it('expect get sidebarSubject call', async() => {
    expect(getLeftSidebarSpy.calls.any()).toBe(true, 'getLeftSidebarcalled');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
