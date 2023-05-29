import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent {
  subjectData: any[] = [];

 constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    if (id) {
      this.coursesService.getSubjects(parseInt(id)).subscribe((res) => {
        this.subjectData = res;
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

  subjectClicked(courseId: number) {
   alert('Subject clicked!')
  }
}
