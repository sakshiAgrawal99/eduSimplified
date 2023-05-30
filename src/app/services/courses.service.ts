import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  bseUrl = 'https://bkbcollegemanagementapi.azure-api.net';
  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<any[]>(this.bseUrl + '/api/Courses');
  }

  getSubjects(courseId: number) {
    return this.http.get<any[]>(
      this.bseUrl + '/api/courses/' + courseId + '/subjects'
    );
  }
}
