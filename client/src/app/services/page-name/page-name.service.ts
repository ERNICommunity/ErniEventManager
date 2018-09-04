import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrentPage } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PageNameService {
  public pageName: Subject<ICurrentPage> = new Subject();
  public pageText: ICurrentPage;

  constructor( ) { }

  getPageName(): Subject<ICurrentPage> {
    return this.pageName;
  }

  getPageText(): ICurrentPage {
    return this.pageText;
  }

  changePage(name: String): void {
    const currentPage: ICurrentPage = this.resolveName(name);
    this.pageText = currentPage;
    this.pageName.next(currentPage);
  }

  resolveName(path: String): ICurrentPage {
    switch (path) {
      case '/events':
      case '/':
        return { name: 'ALL', path };
      case '/events/joined':
        return { name: 'EVENTS_I_JOINED', path };
      case '/events/archived':
        return { name: 'ARCHIVED', path };
      default:
       return { name: 'DEFAULT', path};
    }
  }
}
