import { Component, OnInit } from '@angular/core';
import { ICountryInfo } from '../../interfaces';
import { TranslateService } from '@ngx-translate/core';
import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';
import { storedLanguage } from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countries: Array<ICountryInfo>;

  constructor(
    public translate: TranslateService,
    private leftSidebarService: LeftSidebarService
  ) { }

  ngOnInit() {
    this.countries = [
      { country: 'England', short: 'en' },
      { country: 'Slovakia', short: 'sk' }];
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(storedLanguage, language);
  }

  toggleMenu() {
    this.leftSidebarService.update();
  }

}
