import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftSidebarService {
  public sidebarSubject: Subject<any> = new Subject();
  sidebarStatus = false;

  constructor() {}

  update = () => {
    this.sidebarSubject.next(this.sidebarStatus = !this.sidebarStatus);
  }
}
