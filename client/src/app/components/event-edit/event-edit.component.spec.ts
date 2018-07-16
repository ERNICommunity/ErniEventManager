import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EventEditComponent } from './event-edit.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from 'selenium-webdriver/http';
import { EventService } from '../../services/event/event.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { eventSchema1 } from '../../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injector } from '@angular/core';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({'CARDS_TITLE': 'This is a test'});
  }
}

describe('EventEditComponent', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let getEventSpy: any;
  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(async(() => {

    const eventService = jasmine.createSpyObj('EventService', ['getEvent']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  // Make the spy return a synchronous Observable with the test data
    getEventSpy = eventService.getEvent.and.returnValue( eventSchema1 );
    TestBed.configureTestingModule({
      declarations: [ EventEditComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: FakeLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        {provide: EventService, useValue: eventService},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({id: 'new'})
            }
          }
        }
      ]
    }).compileComponents();
    translate = injector.get(TranslateService);
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
