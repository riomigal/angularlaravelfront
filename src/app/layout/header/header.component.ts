import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}

  isLoggedIn() {
    if (this.authenticationService.currentUserValue == null) {
      return false;
    }
    return true;
  }
}
