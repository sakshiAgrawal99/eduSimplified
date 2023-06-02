import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SendMessageService } from 'src/app/services/send-message.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  messageData: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sendMessageService: SendMessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('studentId');
    if (id) {
      debugger;
      this.sendMessageService.getStudentMessage(id).subscribe((res) => {
        this.messageData = res;
      });
    }
  }
  openViewAnnouncements() {
    const id = this.route.snapshot.paramMap.get('studentId');
    this.router.navigateByUrl('/student/' + id + '/view-announcements');
  }

  public getDays(dateSent: Date) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }
}
