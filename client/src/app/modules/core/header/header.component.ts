import { Component, OnInit } from '@angular/core';
import { ICountryInfo } from '../../../interfaces';
import { TranslateService } from '@ngx-translate/core';
import { LeftSidebarService } from '../../../services/left-sidebar/left-sidebar.service';
import { storedLanguageKey } from '../../../app.constants';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countries: Array<ICountryInfo>;
  userName: string;

  constructor(
    public translate: TranslateService,
    private leftSidebarService: LeftSidebarService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.countries = [
      { country: 'England', short: 'en' },
      { country: 'Slovakia', short: 'sk' }];
    this.authService.loginChange.subscribe(() => {
      this.userName = `${localStorage.getItem('user_firstName')} ${localStorage.getItem('user_lastName')}`;
    });

    this.userName = `${localStorage.getItem('user_firstName')} ${localStorage.getItem('user_lastName')}`;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(storedLanguageKey, language);
  }

  toggleMenu() {
    this.leftSidebarService.update();
  }

  logout() {
    this.authService.logout();
  }
}
