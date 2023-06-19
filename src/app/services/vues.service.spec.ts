import { TestBed } from '@angular/core/testing';

import { VuesService } from './vues.service';

describe('VuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VuesService = TestBed.get(VuesService);
    expect(service).toBeTruthy();
  });
});
