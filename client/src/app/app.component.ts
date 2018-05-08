import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private defaultLanguage = 'en';
  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang(this.defaultLanguage);
    const eem = localStorage.getItem("erniEventManager");
    if (eem) {
      translate.use(eem);
    } else {
      localStorage.setItem('erniEventManager', this.defaultLanguage);
      translate.use(this.defaultLanguage);
    }
  }

  ngOnInit() {

  }
}
