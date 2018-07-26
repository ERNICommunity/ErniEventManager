import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventCardComponent } from '../event-card/event-card.component';
import { LoaderComponent } from '../loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { routerSpy, eventServiceSpy } from '../../utils-test/index.spec';
import { eventSchemaMock } from '../../interfaces';
import { of } from 'rxjs';
import { EventService } from '../../services/event/event.service';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let getEventSpy: any;

  beforeEach(async(() => {
    getEventSpy = eventServiceSpy.queryEventsPaginated.and.returnValue( of(eventSchemaMock) );

    TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        EventCardComponent,
        LoaderComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: EventService, useValue: eventServiceSpy},
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
