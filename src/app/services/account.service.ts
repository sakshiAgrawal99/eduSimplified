import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://bkbcollegemanagement20230514173450.azurewebsites.net';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    var headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .post<User>(this.baseUrl + '/api/users/login', model, requestOptions)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
          return response;
        })
      );

    // (
    //   this.http.get(
    //     'https://www.youtube.com/watch?v=YGUgmWd9xaw'
    //   ) as Observable<any>
    // ).subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  // getLoginData(): Observable<any>{
  //   return this.http.get('./json/login.json')
  //     .map((result: Response) => result.json())
  //     .catch(this.getError);
  // }

  // register(model: any) {
  //   return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
  //     map((user) => {
  //       if (user) {
  //         this.setCurrentUser(user);
  //       }
  //     })
  //   );
  // }

  setCurrentUser(user: User) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
