import { TestBed } from '@angular/core/testing';

import { LoginGmailService } from './login-gmail.service';

describe('LoginGmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginGmailService = TestBed.get(LoginGmailService);
    expect(service).toBeTruthy();
  });
});
