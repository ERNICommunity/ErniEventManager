import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarComponent } from './left-sidebar.component';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoaderSpy, routerSpy, pageNameServiceSpyReal } from '../../utils-test/index.spec';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from '../../utils';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { currenPageMock1 } from '../../interfaces';
import { PageNameService } from '../../services/page-name/page-name.service';

describe('LeftSidebarComponent', () => {
  let component: LeftSidebarComponent;
  let fixture: ComponentFixture<LeftSidebarComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeftSidebarComponent,
        MockComponent
      ],
      imports: [
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
        TranslateService,
        {provide: Router, useValue: routerSpy},
        {provide: TranslateLoader, useValue: translateLoaderSpy},
        {provide: PageNameService, useValue: pageNameServiceSpyReal}
      ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
