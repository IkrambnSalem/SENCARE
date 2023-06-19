import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssistantComponent } from './edit-assistant.component';

describe('EditAssistantComponent', () => {
  let component: EditAssistantComponent;
  let fixture: ComponentFixture<EditAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
