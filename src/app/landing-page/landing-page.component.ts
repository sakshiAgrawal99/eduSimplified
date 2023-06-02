import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {
    this.IsUserLoggedIn();
  }

  ngOnInit(): void {}

  IsUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      user.username &&
      user.username.trim() &&
      user.role &&
      user.role.trim()
    ) {
      if (user.role === 'Admin') {
        this.router.navigateByUrl('/admin/courses');
      }
      return true;
    }
    return false;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (user: any) => {
        if (user.role === 'Admin') {
          this.router.navigateByUrl('/admin/courses');
        } else if (user.role === 'Student') {
          this.router.navigateByUrl('/student/' + user.userID + '/dashboard');
        }
        this.model = {};
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
