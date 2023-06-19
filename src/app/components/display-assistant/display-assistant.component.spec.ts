import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAssistantComponent } from './display-assistant.component';

describe('DisplayAssistantComponent', () => {
  let component: DisplayAssistantComponent;
  let fixture: ComponentFixture<DisplayAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
