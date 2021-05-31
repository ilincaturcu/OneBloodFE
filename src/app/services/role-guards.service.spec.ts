import { TestBed } from '@angular/core/testing';

import { RoleGuardsService } from './role-guards.service';

describe('RoleGuardsService', () => {
  let service: RoleGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
