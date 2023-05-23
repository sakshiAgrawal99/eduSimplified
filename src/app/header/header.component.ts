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
  constructor(public accountService: AccountService, private router: Router) {}

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
