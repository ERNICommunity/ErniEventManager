import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrentPage } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PageNameService {
  public pageName: Subject<any> = new Subject();
  public pageText: ICurrentPage;

  constructor( ) { }

  getPageText(): ICurrentPage {
    return this.pageText;
  }

  changePage = (name) => {
    const currentPage: ICurrentPage = this.resolveName(name);
    this.pageText = currentPage;
    this.pageName.next(currentPage);
  }

  resolveName = (path) => {
    switch (path) {
      case '/events':
      case '/':
        return { name: 'ALL', path };
      case '/events/joined':
        return { name: 'EVENTS_I_JOINED', path };
      case '/events/archived':
        return { name: 'ARCHIVED', path };
    }
  }
}
