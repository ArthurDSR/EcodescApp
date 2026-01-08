import { TestBed } from '@angular/core/testing';

import { EcopontoService } from './ecoponto.service';

describe('EcopontoService', () => {
  let service: EcopontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcopontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
