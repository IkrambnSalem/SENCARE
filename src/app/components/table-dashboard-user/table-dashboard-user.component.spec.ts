import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDashboardUserComponent } from './table-dashboard-user.component';

describe('TableDashboardUserComponent', () => {
  let component: TableDashboardUserComponent;
  let fixture: ComponentFixture<TableDashboardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDashboardUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
