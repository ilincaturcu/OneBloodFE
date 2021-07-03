import { TestBed } from '@angular/core/testing';

import { QuizGuardsService } from './quiz-guards.service';

describe('QuizGuardsService', () => {
  let service: QuizGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
