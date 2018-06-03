import { Component, OnInit } from '@angular/core';

import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  menuVisible = false;
  constructor(
    private leftSidebarService: LeftSidebarService
  ) { }

  ngOnInit() { }

  toggleMenu = () => {
    this.leftSidebarService.update();
  }
}
