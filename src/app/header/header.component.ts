import { Component } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public accountService: AccountService, private router: Router) {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    const role = JSON.parse(localStorage.getItem('user') || '{}').role;
    if (username && username.trim() && role && role.trim()) {
      return true;
    }
    return false;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  getUsername() {
    return JSON.parse(localStorage.getItem('user') || '{}').username;
  }
}
