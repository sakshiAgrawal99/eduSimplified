import { Component } from '@angular/core';
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

    private sendMessageService: SendMessageService
  ) {}

  public showSuccess(): void {
    this.toastrService.success('Announcement Sent Successfully!', '');
  }

  sendMessage(message: string) {
    if (message && message.trim()) {
      const payload = {
        announcementText: message,
        postedBy: JSON.parse(localStorage.getItem('user') || '{}').username,
        postedAt: '2023-05-29T19:12:06.334Z',
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
}
