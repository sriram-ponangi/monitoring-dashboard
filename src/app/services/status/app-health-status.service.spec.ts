import { TestBed } from '@angular/core/testing';

import { AppHealthStatusService } from './app-health-status.service';

describe('AppHealthStatusService', () => {
  let service: AppHealthStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHealthStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
