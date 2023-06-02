import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SendMessageService } from 'src/app/services/send-message.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private sendMessageService: SendMessageService
  ) {}

  public showSuccess(): void {
    this.toastrService.success('Announcement Sent Successfully!', '');
  }

  sendMessage(message: string) {
    if (message && message.trim()) {
      const payload = {
        announcementText: message,
        postedBy: JSON.parse(localStorage.getItem('user') || '{}').fullName,
      };
      this.sendMessageService
        .sendAnnouncement(payload)
        .subscribe((res: any) => {
          debugger;
          this.showSuccess();
          document.getElementById('closeModal')?.click();
          (document.getElementById('messageInput') as HTMLInputElement).value =
            '';
        });
    }
  }

  openStudentDetails() {
    const id = this.route.snapshot.paramMap.get('courseId');
    this.router.navigateByUrl('/admin/' + id + '/student-details');
  }

  openUploadTimeTable() {
    const id = this.route.snapshot.paramMap.get('courseId');
    this.router.navigateByUrl('/admin/' + id + '/upload-timetable');
  }

  openViewAnnouncements() {
    const id = this.route.snapshot.paramMap.get('courseId');
    this.router.navigateByUrl('/admin/' + id + '/view-announcements');
  }
}
