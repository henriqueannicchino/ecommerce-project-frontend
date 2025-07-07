import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface ILoginData {
  email: string;
  password: string;
}

interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: ILoginData = {
    "email": "",
    "password": ""
  }

  signupData: ISignupData = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "repeatPassword": ""
  }

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.signIn(this.loginData).subscribe({
      next: () => {
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  onSignup(): void {
    if (this.signupData.password !== this.signupData.repeatPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.signUp({
      firstName: this.signupData.firstName,
      lastName: this.signupData.lastName,
      email: this.signupData.email,
      password: this.signupData.password
    }).subscribe({
      next: (data) => {
        if (data?.token) {
          localStorage.setItem('angularecommercetoken', data.token);
          this.authService.loadUserFromToken();
        }
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error('Signup failed:', err);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}
