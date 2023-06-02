import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-view-timetable-student',
  templateUrl: './view-timetable-student.component.html',
  styleUrls: ['./view-timetable-student.component.css'],
})
export class ViewTimetableStudentComponent {
  imageUrl = '';
  baseURL =
    'https://bkbcollegemanagement20230514173450.azurewebsites.net/api/Storage';

  courseName = '';

  constructor(
    public coursesService: CoursesService,
    private http: HttpClient,
    public toastrService: ToastrService
  ) {
    this.courseName = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).courseName;
    this.getImageUrl(
      JSON.parse(localStorage.getItem('user') || '{}').courseName
    );
  }

  public showSuccess(message: string): void {
    this.toastrService.success(message, '');
  }

  public showError(message: string): void {
    this.toastrService.error(message, '');
  }

  public getImageUrl(courseName: string) {
    debugger;
    this.imageUrl = '';
    const url = this.baseURL + '/DownloadTimetable/' + courseName;
    const req = new HttpRequest('GET', url, { responseType: 'text' });

    this.http.request(req).subscribe(
      (res) => {
        this.imageUrl = JSON.parse(JSON.stringify(res)).body;
      },
      (error) => {
        if (JSON.parse(JSON.stringify(error)).status != 200) {
          this.showError('Timetable not uploaded yet for this course!');
        }
      }
    );
    return this.imageUrl;
  }

  public downloadButtonClicked(courseName: string) {
    const link = document.createElement('a');
    link.setAttribute('href', this.imageUrl);
    link.setAttribute('download', `Timetable.PNG`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.showSuccess(
      'Timetable for ' + courseName + ' downloaded successfully!'
    );
  }
}
