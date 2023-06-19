import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBanner1Component } from './app-banner1.component';

describe('AppBanner1Component', () => {
  let component: AppBanner1Component;
  let fixture: ComponentFixture<AppBanner1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBanner1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBanner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
