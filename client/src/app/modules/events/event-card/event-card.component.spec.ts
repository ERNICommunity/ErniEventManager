import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';
import { EventDatePipe } from './event-date.pipe';
import { EventLocationPipe } from './event-location.pipe';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IEventSchema  } from '../../../interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { eventSchemaMock, translateLoaderSpy } from '../../../utils-test/index.spec';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient } from 'selenium-webdriver/http';


describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;
  let translate: TranslateService;

  let editDe: DebugElement;
  let delDe: DebugElement;
  let nameDe: DebugElement;
  let nameEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCardComponent, EventDatePipe, EventLocationPipe ],
      imports: [ 
        BrowserAnimationsModule,
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

    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    editDe = fixture.debugElement.query(By.css('#test-edit'));
    delDe  = fixture.debugElement.query(By.css('#test-delete'));
    nameDe = fixture.debugElement.query(By.css('#test-event-name'));
    nameEl = nameDe.nativeElement;
    component.event = eventSchemaMock;
    fixture.detectChanges();
  });

  it('should display event name in correct element', () => {
    const expectedName = eventSchemaMock.name;
    expect(nameEl.textContent).toContain(expectedName);
  });

  it('should raise edit event when clicked (triggerEventHandler)', () => {
    let eventId: string;
    component.edit.subscribe((id: string) => eventId = id);
    editDe.triggerEventHandler('click', null);
    expect(eventId).toBe(eventSchemaMock._id);
  });

  it('should raise delete event when clicked (triggerEventHandler)', () => {
    let delEvent: IEventSchema;
    component.delete.subscribe((event: IEventSchema) => delEvent = event);
    delDe.triggerEventHandler('click', null);
    expect(delEvent).toBe(eventSchemaMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
