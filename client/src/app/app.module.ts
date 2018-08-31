import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorInterceptor } from './error-handling/server.error.interceptor';
import { TokenInterceptor } from './services/auth/auth.interceptor';
import { ClientErrorHandler } from './error-handling/client.error.handler';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsModule } from './modules/events/events.module';
import { LoaderModule } from './modules/loader/loader.module';
import { UsersModule } from './modules/users/users.module';

@NgModule({
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
    ReactiveFormsModule,
    NgbModule.forRoot(),
    EventsModule,
    UsersModule,
    LoaderModule,
    AppRoutingModule,
  ],
  providers: [
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
