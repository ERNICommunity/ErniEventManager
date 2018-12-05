import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ICurrentPage } from '../../../interfaces';
import { LeftSidebarService } from '../../../services/left-sidebar/left-sidebar.service';
import { PageNameService } from '../../../services/page-name/page-name.service';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  menuVisible = false;
  currentPage: ICurrentPage;
  constructor(
    private leftSidebarService: LeftSidebarService,
    private pageNameService: PageNameService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
     this.currentPage = this.pageNameService.getPageText();
  }

  toggleMenu = () => {
    this.leftSidebarService.update();
  }

  navigate(path: Array<string>) {

    this.toggleMenu();
    this.router.navigate(path);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
