import { TestBed, inject } from '@angular/core/testing';

import { LeftSidebarService } from './left-sidebar.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeftSidebarService]
    });
  });

  it('should be created', inject([LeftSidebarService], (service: LeftSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
