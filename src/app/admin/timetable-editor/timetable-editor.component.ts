import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-timetable-editor',
  templateUrl: './timetable-editor.component.html',
  styleUrls: ['./timetable-editor.component.css'],
})
export class TimetableEditorComponent {
  form: FormGroup;
  downloadURL = '';
  course: any = {};
  imageUrl = '';

  baseURL =
    'https://bkbcollegemanagement20230514173450.azurewebsites.net/api/Storage';
  ngOnInit() {}

  constructor(
    public coursesService: CoursesService,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    public toastrService: ToastrService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('courseId') || '1';

    this.coursesService.getCourse(id).subscribe((res) => {
      debugger;
      this.course = res;
      this.getImageUrl(res?.courseName || '');
    });

    this.form = this.fb.group({
      courseName: [''],
      timetableFile: [null],
    });
  }

  public showSuccess(message: string): void {
    this.toastrService.success(message, '');
  }

  public showError(message: string): void {
    this.toastrService.error(message, '');
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

  public getImageUrl(courseName: string) {
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

  deleteButtonClicked(courseName: string) {
    const url = this.baseURL + '/courseName?courseName=' + courseName;
    const req = new HttpRequest('DELETE', url, { responseType: 'text' });
    this.http.request(req).subscribe(
      (response) => {
        if (JSON.parse(JSON.stringify(response)).status == 200) {
          this.showSuccess(
            'Timetable for ' + courseName + ' deleted successfully!'
          );
          this.imageUrl = '';
        }
      },
      (error) => {
        if (JSON.parse(JSON.stringify(error)).status != 200) {
          this.showError('Timetable not uploaded yet for this course!');
        }
      }
    );
  }

  fileChange(event: any, courseName: string) {
    const file = event.target!.files[0]!;
    var formData = new FormData();
    console.log(courseName);
    this.form.patchValue({
      timetableFile: file,
      courseName: courseName,
    });

    formData.set('file', event.target!.files[0]!, event.target!.files[0]!.name);
    formData.set('courseName', courseName);
    const url = this.baseURL + '/UploadTimetable?courseName=' + courseName;
    const req = new HttpRequest('POST', url, formData, {
      responseType: 'json',
    });

    this.http.request(req).subscribe(
      (response) => {
        if (JSON.parse(JSON.stringify(response)).status == 200) {
          this.showSuccess(
            'Timetable for ' + courseName + ' uploaded successfully!'
          );
          this.getImageUrl(this.course.courseName || '');
        }
      },
      (error) => {
        if (JSON.parse(JSON.stringify(error)).status != 200) {
          this.showError(
            'File with this name already exists. Please use another name to store your file.'
          );
        }
      }
    );
  }
}
