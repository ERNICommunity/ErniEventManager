import { TestBed, inject } from '@angular/core/testing';

import { PageNameService } from './page-name.service';

describe('PageNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageNameService]
    });
  });

  it('should be created', inject([PageNameService], (service: PageNameService) => {
    expect(service).toBeTruthy();
  }));
});
