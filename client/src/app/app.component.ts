import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LeftSidebarService } from './services/left-sidebar/left-sidebar.service';
import { PageNameService } from './services/page-name/page-name.service';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { storedLanguage, defaultLanguage } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  leftSidebarVisible: boolean;

  constructor(
    private translate: TranslateService,
    private leftSidebarService: LeftSidebarService,
    private pageNameService: PageNameService,
    private router: Router
  ) {
    translate.setDefaultLang(defaultLanguage);
    const lang = localStorage.getItem(storedLanguage);
    if (lang) {
      translate.use(lang);
    } else {
      localStorage.setItem(storedLanguage, defaultLanguage);
      translate.use(defaultLanguage);
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((navigationStart: NavigationStart) => navigationStart.url))
      .subscribe((url: String) => {
        console.log('changepage to ' + url);
        this.pageNameService.changePage(url);
      });
  }

  ngOnInit() {
    this.leftSidebarVisible = false;
    this.leftSidebarService.sidebarSubject.subscribe(
      status => {
        console.log('changed to: ' + status);
         this.leftSidebarVisible = status;
    });

  }
}
