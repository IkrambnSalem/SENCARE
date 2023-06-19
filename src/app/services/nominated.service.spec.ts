import { TestBed } from '@angular/core/testing';

import { NominatedService } from './nominated.service';

describe('NominatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominatedService = TestBed.get(NominatedService);
    expect(service).toBeTruthy();
  });
});
