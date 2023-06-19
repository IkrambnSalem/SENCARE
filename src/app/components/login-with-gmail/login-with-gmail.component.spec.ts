import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithGmailComponent } from './login-with-gmail.component';

describe('LoginWithGmailComponent', () => {
  let component: LoginWithGmailComponent;
  let fixture: ComponentFixture<LoginWithGmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithGmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
