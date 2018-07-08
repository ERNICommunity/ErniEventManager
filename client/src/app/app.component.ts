import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LeftSidebarService } from './services/left-sidebar/left-sidebar.service';
import { PageNameService } from './services/page-name/page-name.service';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private defaultLanguage = 'en';
  leftSidebarVisible: boolean;
  constructor(
    private translate: TranslateService,
    private leftSidebarService: LeftSidebarService,
    private pageNameService: PageNameService,
    private router: Router
  ) {
    translate.setDefaultLang(this.defaultLanguage);
    const eem = localStorage.getItem('erniEventManager');
    if (eem) {
      translate.use(eem);
    } else {
      localStorage.setItem('erniEventManager', this.defaultLanguage);
      translate.use(this.defaultLanguage);
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
