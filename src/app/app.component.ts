import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

interface IUserToken {
  iss: string;
  sub: string;
  firstName: string;
  lastName: string;
  exp: number

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  isDropdownOpen = false;
  loggedUser: string | undefined = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      this.loggedUser = user;
    });

    this.authService.loadUserFromToken();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
