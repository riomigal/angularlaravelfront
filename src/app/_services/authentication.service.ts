import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user.model';
import { Router } from '@angular/router';
import { CurrentUser } from '../_models/current-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private locStorageKey = 'cUser';
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem(this.locStorageKey))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  getLocalStorageKey() {
    return this.locStorageKey;
  }

  register(
    name: string,
    email: string,
    password: string,
    confirm_password: string
  ) {
    return this.http.post<any>(`${environment.apiUrl}/api/register`, {
      email,
      name,
      password,
      confirm_password,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<CurrentUser>(`${environment.apiUrl}/api/login`, {
        email,
        password,
      })
      .pipe(
        pluck('data'),
        map((user: CurrentUser) => {
          this.loginUser(user);
          const currentUser = new CurrentUser(
            user.name,
            user.token,
            user.roles
          );
          return currentUser;
        })
      );
  }

  resendActivationEmail(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/email/resend`, {
      email,
      password,
    });
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.locStorageKey);
    return this.http.post<any>(`${environment.apiUrl}/api/logout`, {});
  }

  loginUser(user) {
    localStorage.removeItem(this.locStorageKey);
    localStorage.setItem(this.locStorageKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  resetPassword(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/password/email`, {
      email,
    });
  }

  setNewPassword(
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post<any>(`${environment.apiUrl}/api/password/reset`, {
      email,
      token,
      password,
      password_confirmation,
    });
  }
}
