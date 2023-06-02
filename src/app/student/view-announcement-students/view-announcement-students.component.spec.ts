import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnouncementStudentsComponent } from './view-announcement-students.component';

describe('ViewAnnouncementStudentsComponent', () => {
  let component: ViewAnnouncementStudentsComponent;
  let fixture: ComponentFixture<ViewAnnouncementStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnnouncementStudentsComponent]
    });
    fixture = TestBed.createComponent(ViewAnnouncementStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
