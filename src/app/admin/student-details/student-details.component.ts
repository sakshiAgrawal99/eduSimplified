import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';
import { SendMessageService } from 'src/app/services/send-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent {
  studentData: any[] = [];
  selectedUserId: number = -1;
  constructor(
    protected modalService: ModalService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService,
    private sendMessageService: SendMessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    if (id) {
      this.userService.getStudents(parseInt(id)).subscribe((res) => {
        this.studentData = res;
      });
    }
  }

  public showSuccess(): void {
    this.toastrService.success('Message Success!', 'Title Success!');
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

  openModal(userId: number) {
    this.selectedUserId = userId;
  }

  sendMessage(message: string) {
    if (message && message.trim()) {
      const payload = {
        messageContent: message,
        senderName: 'string@gmail.com',
        receiverId: this.selectedUserId,
        createdDate: '2023-05-29T19:12:06.334Z',
      };
      this.sendMessageService.sendMessage(payload).subscribe((res: any) => {
        //to do:close modal and get logged in user name, success message text change
        this.showSuccess();
      });
    }
  }
}
