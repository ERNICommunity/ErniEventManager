import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { EventEditComponent } from './event-edit.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient } from 'selenium-webdriver/http';
import { EventService } from '../../../services/event/event.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Injector, DebugElement } from '@angular/core';
import { translateLoaderSpy, routerSpy, eventSchemaMock, eventSchemaMock2, eventServiceSpy } from '../../../utils-test/index.spec';



const getConfigObject  = (routerParam: string) => {
  return {
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
      {provide: ActivatedRoute, useValue: {
        snapshot: {
          params: {id: routerParam}
        }
      }},
      TranslateService
    ]
  };
};

describe('EventEditComponent for edit', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;
  let cancelDe: DebugElement;
  let editDe: DebugElement;
  let nameDe: DebugElement;
  let nameEl: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule(
      getConfigObject('bla')
    ).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    component.event = eventSchemaMock2;
    fixture.detectChanges();
    cancelDe = fixture.debugElement.query(By.css('#test-cancel-event'));
    editDe = fixture.debugElement.queryAll(By.css('#test-edit-event'))[0];
    nameDe = fixture.debugElement.query(By.css('#test-edit-event-name'));
    nameEl = nameDe.nativeElement;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('should raise edit event when clicked (triggerEventHandler)', () => {
    expect(nameEl.textContent).toBe('');
    editDe.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should raise cancel event when clicked (triggerEventHandler)', () => {
    cancelDe.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  /* it('should create', async(inject([EventService], (eventService: EventService) => {
    expect(component).toBeTruthy();
  }))); */
});


describe('EventEditComponent for new create', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;
  let createDe: DebugElement;
  let cancelDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      getConfigObject('new')
    ).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cancelDe = fixture.debugElement.query(By.css('#test-cancel-event'));
    createDe = fixture.debugElement.queryAll(By.css('#test-create-event'))[0];
    fixture.detectChanges();
  });

  it('should raise create event when clicked on new (triggerEventHandler)', () => {
    createDe.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should raise cancel event when clicked on new (triggerEventHandler)', () => {
    cancelDe.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

});
