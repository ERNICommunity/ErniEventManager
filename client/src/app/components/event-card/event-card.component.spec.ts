import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';
import { By } from '@angular/platform-browser';
import { Predicate, DebugElement } from '@angular/core';
import { IEventSchema, eventSchemaMock } from '../../interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;
  let editDe: DebugElement;
  let delDe: DebugElement;
  let nameDe: DebugElement;
  let nameEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCardComponent ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();

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
