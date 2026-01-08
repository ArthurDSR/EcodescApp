import { TestBed } from '@angular/core/testing';

import { NovidadeService } from './novidade.service';

describe('NovidadeService', () => {
  let service: NovidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
