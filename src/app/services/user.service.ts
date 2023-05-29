import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  bseUrl = 'https://bkbcollegemanagementapi.azure-api.net';
  constructor(private http: HttpClient) {}

  getStudents(courseId: number) {
    return this.http.get<any[]>(
      this.bseUrl + '/api/courses/' + courseId + '/students'
    );
  }
}
