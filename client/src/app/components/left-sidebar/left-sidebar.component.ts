import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  menuVisible = false;
  currentPage: String;
  constructor(
    private leftSidebarService: LeftSidebarService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .pipe(map((navigationStart: NavigationStart) => navigationStart.url))
      .subscribe( (url: String) => {
        console.log(url);
        this.currentPage = url;
      });
  }

  ngOnInit() { }

  toggleMenu = () => {
    this.leftSidebarService.update();
  }

  navigate(path: String) {
    this.router.navigate([path]);
  }
}
