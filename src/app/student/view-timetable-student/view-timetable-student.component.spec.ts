import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimetableStudentComponent } from './view-timetable-student.component';

describe('ViewTimetableStudentComponent', () => {
  let component: ViewTimetableStudentComponent;
  let fixture: ComponentFixture<ViewTimetableStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTimetableStudentComponent]
    });
    fixture = TestBed.createComponent(ViewTimetableStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
