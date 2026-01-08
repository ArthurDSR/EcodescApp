import { TestBed } from '@angular/core/testing';

import { EcopaperService } from './ecopaper.service';

describe('EcopaperService', () => {
  let service: EcopaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcopaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
