import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EventEditComponent } from './event-edit.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from 'selenium-webdriver/http';
import { EventService } from '../../services/event/event.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { eventSchemaMock } from '../../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Injector } from '@angular/core';
import { routerSpy, translateLoaderSpy, eventServiceSpy } from '../../utils-test/index.spec';

describe('EventEditComponent', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let getEventSpy: any;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {

    getEventSpy = eventServiceSpy.getEvent.and.returnValue( of(eventSchemaMock) );
    TestBed.configureTestingModule({
      declarations: [ EventEditComponent ],
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
        {provide: EventService, useValue: eventServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({id: 'new'})
            }
          }
        },
        TranslateService
      ]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('expect get event call', async() => {
    expect(getEventSpy.calls.any()).toBe(true, 'getEventcalled');
  });

  /* it('should create', async(inject([EventService], (eventService: EventService) => {
    expect(component).toBeTruthy();
  }))); */
});
