import { TestBed } from '@angular/core/testing';

import { MesaServiceService } from './mesa-service.service';

describe('MesaServiceService', () => {
  let service: MesaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
