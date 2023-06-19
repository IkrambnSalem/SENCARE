import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Assistant1Component } from './assistant1.component';

describe('Assistant1Component', () => {
  let component: Assistant1Component;
  let fixture: ComponentFixture<Assistant1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Assistant1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Assistant1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
