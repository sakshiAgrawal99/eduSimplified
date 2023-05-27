import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  courseData: any[] = [];

  constructor(public coursesService: CoursesService) {
    this.coursesService.getCourses().subscribe((res) => {
      this.courseData = res;
      console.log(this.courseData);
    });
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
}
