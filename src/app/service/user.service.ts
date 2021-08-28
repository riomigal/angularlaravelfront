import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register() {
    this.http
      .post<any>('http://shapenator.test/api/register', {
        name: 'saverio',
        email: 'saveri2o@migale.eu',
        password: 'aaaaaaaa',
      })
      .subscribe((value) => console.log(value));
  }
}
