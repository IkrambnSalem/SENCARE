import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSectionComponent } from './offer-section.component';

describe('OfferSectionComponent', () => {
  let component: OfferSectionComponent;
  let fixture: ComponentFixture<OfferSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
