import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/services/courses.service';
import { StudyMaterialService } from 'src/app/services/study-material.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent {
  subjectData: any[] = [];
  course: any = {};
  studyMaterial: any[] = [];
  selectedSubjectName = '';
  baseURL =
    'https://bkbcollegemanagement20230514173450.azurewebsites.net/api/Storage';

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private studyMaterialService: StudyMaterialService,
    private http: HttpClient,
    public toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    if (id) {
      this.coursesService.getSubjects(parseInt(id)).subscribe((res) => {
        this.subjectData = res;
      });

      this.coursesService.getCourse(id).subscribe((res) => {
        this.course = res;
      });
    }
  }

  getClass(index: number) {
    if (index % 10 == 1 || index % 10 == 6) {
      return 'btn-outline-success';
    }
    if (index % 10 == 2 || index % 10 == 7) {
      return 'btn-outline-secondary';
    }
    if (index % 10 == 3 || index % 10 == 8) {
      return 'btn-outline-warning';
    }
    if (index % 10 == 4 || index % 10 == 9) {
      return 'btn-outline-primary';
    }
    if (index % 10 == 5 || index % 10 == 0) {
      return 'btn-outline-danger';
    }
    return 'btn-outline-dark';
  }

  getBtnClass(index: number) {
    if (index % 10 == 1 || index % 10 == 6) {
      return 'btn-success';
    }
    if (index % 10 == 2 || index % 10 == 7) {
      return 'btn-secondary';
    }
    if (index % 10 == 3 || index % 10 == 8) {
      return 'btn-warning';
    }
    if (index % 10 == 4 || index % 10 == 9) {
      return 'btn-primary';
    }
    if (index % 10 == 5 || index % 10 == 0) {
      return 'btn-danger';
    }
    return 'btn-dark';
  }

  public showSuccess(message: string): void {
    this.toastrService.success(message, '');
  }

  public showError(message: string): void {
    this.toastrService.error(message, '');
  }

  subjectClicked(subjectName: string) {
    if (subjectName && this.course.courseName) {
      this.selectedSubjectName = subjectName;
      this.studyMaterialService
        .getStudyMaterial(subjectName, this.course.courseName)
        .subscribe((res) => {
          this.studyMaterial = res;
        });
    }
  }

  subjectUploadClicked(subjectName: string) {
    if (subjectName && this.course.courseName) {
      this.studyMaterialService
        .getStudyMaterial(subjectName, this.course.courseName)
        .subscribe((res) => {
          this.studyMaterial = res;
        });
    }
  }

  download(url: string) {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Timetable.PNG`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // this.showSuccess(
    //   'Timetable for ' + courseName + ' downloaded successfully!'
    // );
  }

  fileChange(event: any, subjectName: string) {
    debugger;
    if (subjectName && this.course.courseName) {
      const file = event.target!.files[0]!;
      var formData = new FormData();
      formData.set(
        'file',
        event.target!.files[0]!,
        event.target!.files[0]!.name
      );
      formData.set('courseName', this.course.courseName);
      formData.set('subjectName', subjectName);

      this.studyMaterialService
        .postStudyMaterial(formData, subjectName, this.course.courseName)
        .subscribe(
          (response) => {
            if (JSON.parse(JSON.stringify(response)).status == 200) {
              this.showSuccess(
                'StudyMaterial for ' + subjectName + ' uploaded successfully!'
              );
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
}
