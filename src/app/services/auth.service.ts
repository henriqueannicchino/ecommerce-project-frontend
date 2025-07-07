import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../common/LoginData';
import { Observable, BehaviorSubject } from 'rxjs';
import { SignUpData } from '../common/SignUpData';
import { jwtDecode } from 'jwt-decode';

export interface IUserToken {
  iss: string;
  sub: string;
  firstName: string;
  lastName: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:5500/api/auth';

  private userSubject = new BehaviorSubject<string | undefined>(undefined);
  user$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadUserFromToken();
  }

  signIn(loginData: LoginData): Observable<any> {
    return new Observable(observer => {
      this.httpClient.post<any>(`${this.authUrl}/signin`, loginData).subscribe({
        next: (response) => {
          const token = response.token;
          localStorage.setItem('angularecommercetoken', token);
          this.loadUserFromToken();
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  signUp(signUpData: SignUpData): Observable<any> {
    return this.httpClient.post<SignUpData>(`${this.authUrl}/signup`, {
      ...signUpData,
      roles: 'CUSTOMER'
    });
  }

  loadUserFromToken(): void {
    const token = localStorage.getItem('angularecommercetoken');
    if (token) {
      try {
        const decoded: IUserToken = jwtDecode(token);
        this.userSubject.next(`${decoded.firstName} ${decoded.lastName}`);
      } catch (err) {
        console.error('Invalid JWT token:', err);
        this.userSubject.next(undefined);
      }
    } else {
      this.userSubject.next(undefined);
    }
  }

  logout(): void {
    localStorage.removeItem('angularecommercetoken');
    this.userSubject.next(undefined);
  }
}
