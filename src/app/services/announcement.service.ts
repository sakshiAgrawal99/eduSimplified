import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  bseUrl = 'https://bkbcollegemanagementapi.azure-api.net';
  constructor(private http: HttpClient) {}

  getAnnouncements() {
    return this.http.get<any[]>(this.bseUrl + '/api/announcements');
  }
}
