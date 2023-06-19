import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetConfirmpasswordComponent } from './reset-confirmpassword.component';

describe('ResetConfirmpasswordComponent', () => {
  let component: ResetConfirmpasswordComponent;
  let fixture: ComponentFixture<ResetConfirmpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetConfirmpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetConfirmpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
