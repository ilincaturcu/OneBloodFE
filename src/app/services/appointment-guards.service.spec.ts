import { TestBed } from '@angular/core/testing';

import { AppointmentGuardsService } from './appointment-guards.service';

describe('AppointmentGuardsService', () => {
  let service: AppointmentGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
