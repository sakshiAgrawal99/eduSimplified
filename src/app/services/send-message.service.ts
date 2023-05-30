import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendMessageService {
  baseUrl = 'https://bkbcollegemanagement20230514173450.azurewebsites.net';
  constructor(private http: HttpClient) {}

  sendMessage(body = {}): Observable<any> {
    return this.http.post(this.baseUrl + '/api/Users/sendMessage', body).pipe();
  }

  sendAnnouncement(body = {}): Observable<any> {
    return this.http.post(this.baseUrl + '/api/Announcements', body).pipe();
  }
}
