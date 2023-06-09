import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudyMaterialService {
  bseUrl = 'https://bkbcollegemanagementapi.azure-api.net';
  constructor(private http: HttpClient) {}

  getStudyMaterial(subjectName: string, courseName: string) {
    let params = new HttpParams();
    params = params.append('courseName', courseName);
    params = params.append('subjectName', subjectName);

    return this.http.get<any[]>(
      this.bseUrl + '/api/Storage/GetStudyMaterials',
      { params }
    );
  }

  postStudyMaterial(
    formData: FormData,
    subjectName: string,
    courseName: string
  ) {
    debugger;
    let params = new HttpParams();
    params = params.append('courseName', courseName);
    params = params.append('subjectName', subjectName);

    return this.http.post<any[]>(
      'https://bkbcollegemanagement20230514173450.azurewebsites.net/api/Storage/UploadStudyMaterial',
      formData,
      { params }
    );
  }
}
