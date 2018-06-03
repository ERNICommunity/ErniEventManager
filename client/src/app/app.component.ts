import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LeftSidebarService } from './services/left-sidebar/left-sidebar.service';

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
    private leftSidebarService: LeftSidebarService
  ) {
    translate.setDefaultLang(this.defaultLanguage);
    const eem = localStorage.getItem('erniEventManager');
    if (eem) {
      translate.use(eem);
    } else {
      localStorage.setItem('erniEventManager', this.defaultLanguage);
      translate.use(this.defaultLanguage);
    }
  }

  ngOnInit() {
    this.leftSidebarVisible = true;
    this.leftSidebarService.sidebarSubject.subscribe(
      status => {
        console.log('changed to: ' + status);
         this.leftSidebarVisible = status;
    });
  }
}
