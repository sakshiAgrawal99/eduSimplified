import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudyMaterialService {
  bseUrl = 'https://bkbcollegemanagementapi.azure-api.net';
  constructor(private http: HttpClient) {}

  getStudyMaterial(courseId: number) {
    return this.http.get<any[]>(
      this.bseUrl + '/api/courses/' + courseId + '/students'
    );
  }
}
