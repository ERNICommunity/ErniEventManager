import { Component, OnInit } from '@angular/core';
import { ICountryInfo } from '../../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countries: Array<ICountryInfo>;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.countries = [
      { country: 'England', short: 'en' },
      { country: 'Slovakia', short: 'sk' }];
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('erniEventManager', language);
  }

}
