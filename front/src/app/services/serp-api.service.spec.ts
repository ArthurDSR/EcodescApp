import { TestBed } from '@angular/core/testing';

import { SerpApiService } from './serp-api.service';

describe('SerpApiService', () => {
  let service: SerpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
