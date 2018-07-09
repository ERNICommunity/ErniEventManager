import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftSidebarService {

  sidebarSubject: Subject<boolean> = new Subject();
  
  private sidebarStatus = false;

  constructor() {}

  update(): void {
    this.sidebarSubject.next(this.sidebarStatus = !this.sidebarStatus);
  }
}
