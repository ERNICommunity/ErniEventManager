import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventCardComponent } from '../event-card/event-card.component';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { routerSpy, eventResponseMock, paginatorMock,
  eventSchemaMock, eventResponseMock2, eventServiceSpy } from '../../../utils-test/index.spec';
import { of } from 'rxjs';
import { EventService } from '../../../services/event/event.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '../../loader/loader.module';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        EventCardComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        LoaderModule
      ],
      providers: [
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
        }}
      ]
    })
    .compileComponents();
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
