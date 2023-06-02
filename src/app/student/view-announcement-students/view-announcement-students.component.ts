import { Component } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-view-announcement-students',
  templateUrl: './view-announcement-students.component.html',
  styleUrls: ['./view-announcement-students.component.css'],
})
export class ViewAnnouncementStudentsComponent {
  announecmetData: any[] = [];
  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((res) => {
      this.announecmetData = res;
    });
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
