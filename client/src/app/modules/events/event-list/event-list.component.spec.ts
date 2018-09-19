import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventCardComponent } from '../event-card/event-card.component';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { routerSpy, eventResponseMock, paginatorMock,
  eventSchemaMock, eventResponseMock2, eventServiceSpy, translateLoaderSpy } from '../../../utils-test/index.spec';
import { of } from 'rxjs';
import { EventService } from '../../../services/event/event.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '../../loader/loader.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient } from 'selenium-webdriver/http';
import { EventDatePipe } from '../event-card/event-date.pipe';
import { EventLocationPipe } from '../event-card/event-location.pipe';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        EventCardComponent,
        EventDatePipe,
        EventLocationPipe
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        LoaderModule,
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
        {provide: EventService, useValue: eventServiceSpy},
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {id: 'new'}
          },
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
                events: eventResponseMock
            })
          }
        }},
        TranslateService,
      ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    component.paginator = paginatorMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize component', () => {
    expect(component.events).toBe(eventResponseMock.list);
    expect(component.retreiveData).toBe(false);
  });

  it('delete event', () => {
    component.deleteEvent(eventSchemaMock);
    expect(component.events).toBe(eventResponseMock2.list);
  });

  it('open event', () => {
    component.openEvent(eventSchemaMock._id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/events', 'edit', eventSchemaMock._id]);
  });
});
