import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    public toastrService: ToastrService
  ) {
    this.IsUserLoggedIn();
  }

  ngOnInit(): void {}

  public showError(message: string): void {
    this.toastrService.error(message, '');
  }

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
      error: (msg: any) => {
        this.showError(
          'File with this name already exists. Please use another name to store your file.'
        );
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
