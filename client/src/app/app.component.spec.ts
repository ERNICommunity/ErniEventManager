import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { routing } from './app.routing';
import { Page404Component } from './components/page-404/page-404.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventsComponent } from './components/events/events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from './services/event/event.service';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorInterceptor } from './error-handling/server.error.interceptor';
import { ClientErrorHandler } from './error-handling/client.error.handler';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HttpLoaderFactory } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Page404Component,
        FooterComponent,
        HeaderComponent,
        EventListComponent,
        EventCardComponent,
        EventEditComponent,
        EventsComponent,
        LeftSidebarComponent,
        UserEditComponent,
        UserComponent,
        UserListComponent,
        UserCardComponent,
        LoaderComponent,
        LoginComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        routing,
        NgbModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        EventService,
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /* it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log('compiled', compiled);
    expect(compiled.querySelector('h3').textContent).toContain('All');
  })); */
});
