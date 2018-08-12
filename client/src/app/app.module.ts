import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';

import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from './services/event/event.service';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventsComponent } from './components/events/events.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorInterceptor } from './error-handling/server.error.interceptor';
import { TokenInterceptor } from './services/auth/auth.interceptor';
import { ClientErrorHandler } from './error-handling/client.error.handler';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
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
    ParticipantListComponent,
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
    ReactiveFormsModule,
    routing,
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ClientErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
