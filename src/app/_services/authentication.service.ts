import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private locStorageKey = 'cUser';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(this.locStorageKey))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(
    name: string,
    email: string,
    password: string,
    confirm_password: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/register`, {
        email,
        name,
        password,
        confirm_password,
      })
      .pipe(
        pluck('data'),
        map((user: { name: string; token: string; roles: string[] }) => {
          localStorage.removeItem(this.locStorageKey);
          localStorage.setItem(this.locStorageKey, JSON.stringify(user));

          this.currentUserSubject.next(
            new User(user.name, user.token, user.roles)
          );
          return user;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/login`, {
        email,
        password,
      })
      .pipe(
        map((user: { name: string; token: string; roles: string[] }) => {
          localStorage.removeItem(this.locStorageKey);
          localStorage.setItem(this.locStorageKey, JSON.stringify(user));
          this.currentUserSubject.next(
            new User(user.name, user.token, user.roles)
          );
          return user;
        })
      );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.locStorageKey);
    return this.http.post<any>(`${environment.apiUrl}/api/logout`, {});
  }
}
