import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantTableComponent } from './assistant-table.component';

describe('AssistantTableComponent', () => {
  let component: AssistantTableComponent;
  let fixture: ComponentFixture<AssistantTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
