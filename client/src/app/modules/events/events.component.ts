import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICurrentPage } from '../../interfaces';
import { PageNameService } from '../../services/page-name/page-name.service';
import { LeftSidebarService } from '../../services/left-sidebar/left-sidebar.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  currentPage: ICurrentPage;
  leftSidebarVisible: boolean;
  constructor(
    private router: Router,
    private pageNameService: PageNameService,
    private leftSidebarService: LeftSidebarService
  ) { }

  ngOnInit() {
    this.currentPage = this.pageNameService.getPageText();
    this.pageNameService.getPageName()
      .subscribe((name) => {
        this.currentPage = name;
      });
    this.leftSidebarVisible = false;
    this.leftSidebarService.getSidebarSubject().subscribe(
      status => {
        console.log('changed to: ' + status);
         this.leftSidebarVisible = status;
    });
  }

}
