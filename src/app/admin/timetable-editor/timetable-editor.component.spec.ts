import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableEditorComponent } from './timetable-editor.component';

describe('TimetableEditorComponent', () => {
  let component: TimetableEditorComponent;
  let fixture: ComponentFixture<TimetableEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableEditorComponent]
    });
    fixture = TestBed.createComponent(TimetableEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
