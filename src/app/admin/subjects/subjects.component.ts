import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private studyMaterialService: StudyMaterialService
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
}
