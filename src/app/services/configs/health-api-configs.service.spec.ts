import { TestBed } from '@angular/core/testing';

import { HealthApiConfigsService } from './health-api-configs.service';

describe('HealthApiConfigsService', () => {
  let service: HealthApiConfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthApiConfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
