import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDetailsComponent } from './admin/student-details/student-details.component';
import { ModalComponent } from './admin/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimetableEditorComponent } from './admin/timetable-editor/timetable-editor.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { ViewAnnouncementComponent } from './admin/view-announcement/view-announcement.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },

  { path: 'admin/courses', component: CoursesComponent },
  { path: 'admin/:courseId/dashboard', component: AdminDashboardComponent },
  {
    path: 'admin/:courseId/student-details',
    component: StudentDetailsComponent,
  },
  {
    path: 'admin/:courseId/upload-timetable',
    component: TimetableEditorComponent,
  },
  { path: 'admin/:courseId/subjects', component: SubjectsComponent },
  {
    path: 'admin/:courseId/view-announcements',
    component: ViewAnnouncementComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminDashboardComponent,
    StudentDetailsComponent,
    ModalComponent,
    FooterComponent,
    HeaderComponent,
    TimetableEditorComponent,
    CoursesComponent,
    SubjectsComponent,
    StudentDashboardComponent,
    ViewAnnouncementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
