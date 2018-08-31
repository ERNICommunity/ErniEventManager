import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './components/page-404/page-404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorInterceptor } from './error-handling/server.error.interceptor';
import { ClientErrorHandler } from './error-handling/client.error.handler';

import { HttpLoaderFactory } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Page404Component,
        FooterComponent,
        HeaderComponent,
        LeftSidebarComponent,
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
        NgbModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      providers: [
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
