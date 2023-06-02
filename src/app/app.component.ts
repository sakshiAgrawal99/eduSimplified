import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    const role = JSON.parse(localStorage.getItem('user') || '{}').role;
    if (username && username.trim() && role && role.trim()) {
      return true;
    }
    this.router.navigateByUrl('/landing-page');
    return false;
  }

  showHeader() {
    return window.location.pathname !== '/landing-page';
  }
}
